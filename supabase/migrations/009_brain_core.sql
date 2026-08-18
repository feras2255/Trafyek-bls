-- 009 · المخ التقني — مخزن الحقائق (Fact Store)
--
-- Layer L2 of docs/technical-brain/02-architecture.md.
--
-- The rule this schema exists to enforce: no insight without a stored,
-- dated, source-attributed number behind it. Every finding carries the ids
-- of the metric rows that produced it, so any figure on the dashboard can be
-- traced back to where it came from. Nothing here computes anything from
-- assumptions — a metric row either was measured or does not exist.
--
-- Missing data is modelled as a first-class output (bi_data_gaps), not as an
-- absent row. A disconnected source therefore renders as "no data" on the
-- dashboard instead of a zero that looks like a measurement.
--
-- Safety: new tables only, all prefixed bi_. Nothing existing is read,
-- altered, or dropped. RLS is enabled with NO policies, which means anon and
-- authenticated can do nothing at all; only the service role (server-side)
-- reaches these tables.
--
-- Review before running. Not applied by the app.

-- ─────────────────────────────────────────────────────────────────────────
-- المصادر — أين نقف من كل مصدر بيانات
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.bi_sources (
  key           text primary key,          -- 'firstparty', 'gsc', 'ga4', …
  kind          text not null,             -- internal | analytics | search | crawl | external
  -- connected  = يعمل ويسحب بيانات
  -- unconfigured = لم تُضبط بيئته بعد
  -- blocked    = مضبوط لكن الحساب/الحصة تمنعه
  -- error      = فشل آخر مزامنة
  status        text not null default 'unconfigured'
                check (status in ('connected','unconfigured','blocked','error')),
  last_sync_at  timestamptz,
  last_error    text,
  notes         text,
  updated_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- الكيانات — الشيء الذي يوصف بالقياس
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.bi_entities (
  id           bigint generated always as identity primary key,
  type         text not null
               check (type in ('service','city','page','keyword','competitor',
                               'channel','segment','route','form','site')),
  -- المعرّف داخل نوعه: id الخدمة، slug المدينة، مسار الصفحة، نص الكلمة…
  external_ref text not null,
  name_ar      text,
  name_en      text,
  attrs        jsonb not null default '{}'::jsonb,
  first_seen_at timestamptz not null default now(),
  last_seen_at  timestamptz not null default now()
);

create unique index if not exists bi_entities_type_ref_key
  on public.bi_entities (type, external_ref);

-- ─────────────────────────────────────────────────────────────────────────
-- القياسات — جدول ضيّق وطويل عمداً
--
-- مقياس جديد لا يحتاج هجرة جديدة: يكفي metric_key جديد. الثمن أن الأنواع
-- غير مفروضة على مستوى العمود، والمقابل أن المخ يتوسّع بلا تعديل مخطط.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.bi_metrics (
  id           bigint generated always as identity primary key,
  metric_key   text not null,              -- 'gsc.impressions', 'tech.lcp_p75', …
  entity_id    bigint references public.bi_entities(id) on delete cascade,
  -- تقسيمات إضافية: {"device":"mobile","country":"sa"}
  dimension    jsonb not null default '{}'::jsonb,
  value        numeric not null,
  unit         text,                       -- 'count' | 'ms' | 'ratio' | 'sar' | …
  period_start date not null,
  period_end   date not null,
  source_key   text not null references public.bi_sources(key),
  ingested_at  timestamptz not null default now()
);

-- إعادة السحب لنفس اليوم يجب أن تُحدِّث لا أن تُكرِّر.
-- entity_id قد يكون NULL (قياس على مستوى الموقع) فيُعامل كصفر في المفتاح.
create unique index if not exists bi_metrics_unique_observation
  on public.bi_metrics (metric_key, coalesce(entity_id, 0), dimension,
                        period_start, source_key);

create index if not exists bi_metrics_lookup_idx
  on public.bi_metrics (metric_key, period_start desc);
create index if not exists bi_metrics_entity_idx
  on public.bi_metrics (entity_id, metric_key, period_start desc);

-- ─────────────────────────────────────────────────────────────────────────
-- النتائج — ما اكتشفه محلّل حتمي
--
-- kind يفصل الحقيقة عن الفرضية على مستوى المخطط، لا على مستوى صياغة النص.
-- هذا هو التنفيذ الهندسي للبند ٢٠ من التكليف: «كل Insight يجب أن يكون
-- Data-backed أو يوضع بوضوح على أنه Hypothesis».
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.bi_findings (
  id               bigint generated always as identity primary key,
  analyzer_key     text not null,
  analyzer_version int  not null default 1,
  kind             text not null check (kind in ('insight','hypothesis')),
  entity_id        bigint references public.bi_entities(id) on delete cascade,
  severity         text not null default 'info'
                   check (severity in ('critical','high','medium','low','info')),
  -- 0..1 — تبدأ من ثقة المحلّل وتُعدَّل لاحقاً بسجلّه في bi_analyzer_scores
  confidence       numeric not null default 0.5
                   check (confidence >= 0 and confidence <= 1),
  title_ar         text not null,
  title_en         text,
  detail_ar        text,
  -- أرقام bi_metrics التي أنتجت هذه النتيجة. بدونها لا تُقبل النتيجة.
  evidence         jsonb not null default '[]'::jsonb,
  computed_at      timestamptz not null default now(),
  resolved_at      timestamptz
);

create index if not exists bi_findings_open_idx
  on public.bi_findings (analyzer_key, computed_at desc)
  where resolved_at is null;

-- نتيجة بلا دليل ليست نتيجة. الفرضية معفاة لأنها بطبيعتها ما لم يُثبت بعد.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'bi_findings_insight_needs_evidence'
  ) then
    alter table public.bi_findings
      add constraint bi_findings_insight_needs_evidence
      check (kind = 'hypothesis' or jsonb_array_length(evidence) > 0);
  end if;
end $$;

-- ─────────────────────────────────────────────────────────────────────────
-- فجوات البيانات — البند ٢٠
--
-- هذا الجدول هو سبب كون هذا النظام صادقاً. المحلّل الذي ينقصه مصدر لا يُنتج
-- مخرجات فارغة تبدو كنتيجة؛ يُنتج صفاً هنا يقول ما الناقص ولماذا يهم وكيف
-- يُحصَّل. اللوحة تعرض هذه الصفوف بدل أن تعرض أصفاراً.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.bi_data_gaps (
  id             bigint generated always as identity primary key,
  domain         text not null,            -- 'seo' | 'revenue' | 'journey' | …
  gap_key        text not null,            -- معرّف ثابت حتى لا يتكرر الصف
  missing_ar     text not null,
  why_matters_ar text not null,
  how_to_obtain_ar text not null,
  blocked_by     text,                     -- 'user' | 'engineering' | 'vendor'
  status         text not null default 'open'
                 check (status in ('open','in_progress','resolved','wont_fix')),
  created_at     timestamptz not null default now(),
  resolved_at    timestamptz
);

create unique index if not exists bi_data_gaps_key on public.bi_data_gaps (gap_key);

-- ─────────────────────────────────────────────────────────────────────────
-- التوصيات — البند ١٣ و١٤
--
-- الحقول السبعة الأخيرة هي حرفياً ما طلبته: ما المشكلة؟ لماذا حدثت؟ ما
-- الفرصة؟ ماذا نفعل؟ ما الأولوية؟ ما التأثير المتوقع؟ كيف نقيس؟
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.bi_recommendations (
  id                bigint generated always as identity primary key,
  category          text not null,          -- 'seo' | 'geo' | 'ux' | 'tech' | …
  finding_ids       jsonb not null default '[]'::jsonb,

  -- 1..5 لكل بُعد
  impact            int check (impact between 1 and 5),
  effort            int check (effort between 1 and 5),
  confidence        int check (confidence between 1 and 5),
  business_value    int check (business_value between 1 and 5),
  seo_value         int check (seo_value between 1 and 5),
  revenue_potential int check (revenue_potential between 1 and 5),
  score             numeric,                -- impact*confidence/effort — يحسبه L4
  priority          text check (priority in ('P0','P1','P2','P3')),

  title_ar            text not null,
  problem_ar          text,
  cause_ar            text,
  opportunity_ar      text,
  action_ar           text,
  expected_impact_ar  text,
  measurement_ar      text,
  -- المقياس الذي ستُقاس به هذه التوصية بعد التنفيذ. بدونه لا تُغلق الحلقة.
  measure_metric_key  text,
  measure_entity_id   bigint references public.bi_entities(id) on delete set null,

  status     text not null default 'proposed'
             check (status in ('proposed','needs_scoping','accepted',
                               'in_progress','done','dismissed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists bi_recommendations_open_idx
  on public.bi_recommendations (priority, score desc)
  where status in ('proposed','accepted','in_progress');

-- توصية بلا تقدير جهد لا تُرتَّب وتبقى needs_scoping — لا نخمّن الجهد.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'bi_recommendations_scored_or_scoping'
  ) then
    alter table public.bi_recommendations
      add constraint bi_recommendations_scored_or_scoping
      check (status = 'needs_scoping' or (impact is not null
             and effort is not null and confidence is not null));
  end if;
end $$;

-- ─────────────────────────────────────────────────────────────────────────
-- الحلقة المغلقة — البند ٢١
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.bi_actions (
  id                 bigint generated always as identity primary key,
  recommendation_id  bigint not null references public.bi_recommendations(id)
                     on delete cascade,
  status             text not null default 'executed'
                     check (status in ('executed','reverted')),
  executed_at        timestamptz not null default now(),
  executed_by        text,
  change_description text
);

create table if not exists public.bi_experiments (
  id             bigint generated always as identity primary key,
  action_id      bigint not null references public.bi_actions(id) on delete cascade,
  metric_key     text not null,
  entity_id      bigint references public.bi_entities(id) on delete set null,
  baseline_start date not null,
  baseline_end   date not null,
  baseline_value numeric,
  measure_start  date not null,
  measure_end    date not null,
  result_value   numeric,
  delta_pct      numeric,
  verdict        text check (verdict in ('improved','no_change','worse','inconclusive')),
  measured_at    timestamptz
);

create index if not exists bi_experiments_due_idx
  on public.bi_experiments (measure_end)
  where measured_at is null;

-- سجل المحلّلات: من أين تأتي الثقة في المرة القادمة.
-- بعد عدة دورات، محلّل توصياته لا تنجح تنخفض ثقته وتهبط أولوياته تلقائياً.
-- هذا هو «التعلّم» في هذا النظام — إحصاء، لا مجاز.
create table if not exists public.bi_analyzer_scores (
  analyzer_key text primary key,
  wins         int not null default 0,
  losses       int not null default 0,
  neutral      int not null default 0,
  avg_delta    numeric,
  updated_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- RLS: مغلقة بالكامل
--
-- تفعيل RLS بلا أي policy يعني أن anon و authenticated لا يستطيعان شيئاً.
-- service_role يتجاوز RLS، وهو المسار الوحيد الذي يصل هذه الجداول. لوحة
-- التحكم تقرأ عبر الخادم لا عبر المتصفح.
-- ─────────────────────────────────────────────────────────────────────────
alter table public.bi_sources          enable row level security;
alter table public.bi_entities         enable row level security;
alter table public.bi_metrics          enable row level security;
alter table public.bi_findings         enable row level security;
alter table public.bi_data_gaps        enable row level security;
alter table public.bi_recommendations  enable row level security;
alter table public.bi_actions          enable row level security;
alter table public.bi_experiments      enable row level security;
alter table public.bi_analyzer_scores  enable row level security;

-- ─────────────────────────────────────────────────────────────────────────
-- المصادر المعروفة، بحالتها الحقيقية اليوم.
-- لا شيء هنا موصوف بأنه متصل وهو ليس كذلك.
-- ─────────────────────────────────────────────────────────────────────────
insert into public.bi_sources (key, kind, status, notes) values
  ('internal',   'internal',  'connected',
   'جداول Supabase الخاصة بالمشروع: categories, contact_messages, blogs, city_pages, projects'),
  ('firstparty', 'analytics', 'connected',
   'أحداث الموقع عبر /api/collect — المصدر الوحيد الذي يمكن ضمّه مع contact_messages في SQL'),
  ('tech',       'internal',  'connected',
   'قياسات تقنية: أزمنة الاستجابة، الأخطاء، Core Web Vitals، الروابط المكسورة'),
  ('gsc',        'search',    'unconfigured',
   'Search Console — النطاق trafyekbls.com غير مربوط. يحجب محرّكات السيو والـ GEO وفرص الصفحات'),
  ('ga4',        'analytics', 'unconfigured',
   'GA4 — غير مربوط لهذا النطاق. حاوية GTM مركّبة لكنها لا تستقبل أحداثاً'),
  ('gbp',        'external',  'unconfigured',
   'Google Business Profile — لا يوجد نشاط مربوط لترافيك بلس'),
  ('semrush',    'external',  'blocked',
   'وحدات الـ API مستنفدة'),
  ('competitors','crawl',     'unconfigured',
   'زحف مُنظّم لبنية مواقع المنافسين. يقرأ الهيكل والخدمات فقط، ولا ينسخ محتوى')
on conflict (key) do nothing;

-- ─────────────────────────────────────────────────────────────────────────
-- فجوات البيانات المعروفة — مأخوذة من docs/technical-brain/01-deep-audit.md
--
-- هذه ليست ملاحظات؛ هي المخرَج الأول للنظام. طالما بقيت مفتوحة، تبقى
-- المحرّكات المقابلة لها فارغة على اللوحة بشكل صريح.
-- ─────────────────────────────────────────────────────────────────────────
insert into public.bi_data_gaps
  (domain, gap_key, missing_ar, why_matters_ar, how_to_obtain_ar, blocked_by)
values
  ('seo', 'gsc_not_connected',
   'Search Console غير مربوط بنطاق trafyekbls.com',
   'يحجب البنود ٦ و٧ و٨ بالكامل: الكلمات المفتاحية، CTR، المراكز، الفهرسة، وفرص الصفحات الجديدة. لا يمكن اقتراح صفحة واحدة بلا بيانات طلب حقيقية.',
   'أضف النطاق في Search Console وامنح صلاحية القراءة، أو اربطه عبر موصل البيانات المستخدم.',
   'user'),

  ('analytics', 'ga4_not_connected',
   'GA4 غير مربوط لهذا النطاق',
   'حاوية GTM مركّبة منذ البداية لكنها لا تستقبل حدثاً واحداً. لا يوجد قياس لأي تحويل.',
   'أنشئ Property لـ trafyekbls.com واربطها بالحاوية GTM-K46W3W6N.',
   'user'),

  ('geo', 'gbp_not_connected',
   'لا يوجد Google Business Profile مربوط لترافيك بلس',
   'يحجب البند ٧ (GEO / Local SEO): التقييمات، الظهور في الخرائط، الترتيب المحلي لكل مدينة.',
   'وثّق النشاط في Google Business Profile ثم امنح صلاحية القراءة.',
   'user'),

  ('revenue', 'no_revenue_source',
   'لا يوجد أي مصدر إيرادات في المشروع: لا طلبات ولا مدفوعات ولا فواتير ولا تكاليف',
   'يجعل البنود ٩ و١٠ و١١ و١٢ (الخدمة، التسعير، التنبؤ، الإيراد) غير قابلة للحساب. أي رقم يُعرض فيها اليوم سيكون مُختلقاً.',
   'يتطلب ربط نظام يحتوي طلبات وإيرادات فعلية. الموقع الحالي نموذج تواصل فقط ولا يمر به أي تحويل مالي.',
   'user'),

  ('pricing', 'no_published_prices',
   'الموقع لا ينشر أي أسعار، ولا توجد بيانات تكلفة أو هامش ربح',
   'يجعل البند ١٠ (Pricing Intelligence) بلا طرف أول للمقارنة. مقارنة أسعارنا بالمنافسين تتطلب معرفة أسعارنا.',
   'قرار تجاري: نشر أسعار أو باقات على الموقع، أو تزويد النظام بجدول أسعار داخلي غير منشور.',
   'user'),

  ('forecast', 'no_history',
   'لا يوجد تاريخ محفوظ لأي مقياس',
   'التنبؤ بالطلب (البند ١١) يحتاج ١٢ شهراً على الأقل. لا يوجد شهر واحد محفوظ حتى الآن.',
   'يبدأ التاريخ بالتراكم تلقائياً من لحظة تشغيل جمع الأحداث وربط Search Console. مسألة وقت لا مسألة كود.',
   'engineering'),

  ('competitor', 'no_competitor_inventory',
   'لا يوجد مخزون منافسين: لا خدماتهم ولا صفحاتهم ولا كلماتهم',
   'يحجب البند ٥ كاملاً، وأهم جزء فيه: اكتشاف ما لا يفعله أي منافس (Blue Ocean).',
   'حدّد ٥–١٠ منافسين بأسمائهم، ويتولى موصل الزحف قراءة بنية مواقعهم وخدماتهم دورياً. لا يُنسخ محتوى.',
   'user'),

  ('customer', 'no_repeat_or_value_data',
   'لا توجد بيانات تكرار شراء ولا قيمة عميل',
   'شرائح مثل High Value وChurn Risk وPotential VIP في البند ٢ مبنية رياضياً على تكرار الشراء وقيمة الطلب. بدونهما تكون التصنيفات افتراضات لا بيانات، وهو ما استبعدته صراحة.',
   'يحتاج مصدر طلبات. حتى ذلك الحين يُصنَّف العميل بنية الشراء المرصودة من سلوكه على الموقع فقط.',
   'user')
on conflict (gap_key) do nothing;

-- للاطلاع بعد التشغيل:
--   select domain, missing_ar, blocked_by from public.bi_data_gaps
--    where status = 'open' order by domain;
