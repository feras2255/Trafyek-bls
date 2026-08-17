-- 010 · المخ التقني — الأحداث الأولية (First-party events)
--
-- Layer L0 of docs/technical-brain/02-architecture.md.
--
-- لماذا هذا الجدول موجود أصلاً:
-- المشروع اليوم لا يرسل حدث تتبع واحداً. حاوية GTM مركّبة في
-- src/app/[locale]/layout.js منذ البداية، ولا يوجد أي dataLayer.push في
-- ١١٦ ملفاً. النتيجة أنه لا يمكن حساب معدل تحويل لأي خدمة، ولا معرفة أين
-- يتوقف الزائر في النموذج، ولا ربط الزيارة بالعميل المحتمل.
--
-- ولماذا لا نكتفي بـ GA4:
--   • يُحجب لدى شريحة من الزوار بمانعات الإعلانات
--   • يعيّن العينات على الاستعلامات الكبيرة
--   • لا يمكن ضمّه مع contact_messages في استعلام SQL واحد — وهذا بالضبط
--     ما يحتاجه ربط Traffic → Lead
-- يبقى GA4 للتسويق، ويعتمد المخ على هذا الجدول.
--
-- الخصوصية (القرار المعتمد: جمع أولي بلا لافتة موافقة):
--   • عنوان IP لا يُخزَّن إطلاقاً — يُخزَّن sha256(ip + ملح يومي) فقط
--   • الملح يتغيّر يومياً ⇒ لا يمكن تتبّع نفس الزائر عبر الأيام
--   • لا اسم ولا بريد ولا هاتف في هذا الجدول. ربط العميل يتم عبر
--     contact_messages وحده، وعندما يرسل النموذج بإرادته
--   • البيانات الخام تُقلَّم بعد ٩٠ يوماً؛ يبقى الملخّص في bi_metrics
--
-- Safety: جدول جديد فقط. RLS مفعّلة بلا policies ⇒ لا anon ولا authenticated
-- يصل إليه؛ الكتابة عبر /api/collect بصلاحية الخدمة حصراً.
--
-- Review before running. Not applied by the app.

create table if not exists public.bi_events (
  id           bigint generated always as identity primary key,

  -- من src/lib/brain/events.js — القائمة مغلقة عمداً، فحدث غير معروف يُرفض
  -- عند الاستقبال قبل أن يصل إلى هنا.
  event        text not null,

  path         text,
  locale       text,
  device       text check (device in ('mobile','tablet','desktop','unknown')),

  -- referrer host فقط، لا الرابط الكامل (قد يحمل معرّفات في المسار)
  referrer_host text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,

  -- sha256(ip + user-agent + ملح اليوم). لا يُعكس ولا يربط بين الأيام.
  visitor_hash text,
  -- معرّف جلسة يولّده المتصفح في sessionStorage. ينتهي بإغلاق التبويب.
  session_hash text,

  props        jsonb not null default '{}'::jsonb,

  occurred_at  timestamptz not null default now(),
  received_at  timestamptz not null default now()
);

-- التلخيص الليلي يمسح بالتاريخ.
create index if not exists bi_events_occurred_idx
  on public.bi_events (occurred_at desc);
create index if not exists bi_events_event_time_idx
  on public.bi_events (event, occurred_at desc);
create index if not exists bi_events_path_time_idx
  on public.bi_events (path, occurred_at desc);
-- إعادة بناء القمع تتطلب ترتيب أحداث الجلسة الواحدة.
create index if not exists bi_events_session_idx
  on public.bi_events (session_hash, occurred_at);
-- حد المعدل في /api/collect يعدّ أحداث البصمة في النافذة الأخيرة.
create index if not exists bi_events_visitor_recent_idx
  on public.bi_events (visitor_hash, received_at desc);

alter table public.bi_events enable row level security;

-- ─────────────────────────────────────────────────────────────────────────
-- التقليم — البيانات الخام مؤقتة بطبيعتها
--
-- بعد التلخيص الليلي إلى bi_metrics لا تبقى للصف الخام قيمة تحليلية، وتبقى
-- عليه تكلفة تخزين ومسؤولية خصوصية. ٩٠ يوماً تكفي لإعادة بناء أي قمع بأثر
-- رجعي إن تغيّر تعريف التلخيص.
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.bi_prune_events(keep_days int default 90)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  removed int;
begin
  delete from public.bi_events
   where occurred_at < now() - make_interval(days => keep_days);
  get diagnostics removed = row_count;
  return removed;
end $$;

revoke all on function public.bi_prune_events(int) from public, anon, authenticated;

-- يُستدعى من /api/brain/rollup بعد التلخيص:
--   select public.bi_prune_events(90);
