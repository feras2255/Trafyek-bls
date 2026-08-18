-- ═══════════════════════════════════════════════════════════════════
-- RUN-ME.sql · الهجرات الثلاث الضرورية في ملف واحد
--
-- الصقه كاملاً في: Supabase → SQL Editor → Run
-- خذ نسخة احتياطية أولاً: Database → Backups
--
-- كله إضافي: لا يحذف عموداً ولا يعيد تسمية شيء ولا يلمس صفاً قائماً.
-- آمن للتشغيل أكثر من مرة (كل شيء if not exists / where not exists).
--
-- 001 = حقول العميل المحتمل   (بدونها تفقد نوع الخدمة والميزانية والحالة)
-- 002 = جدول القائمة البريدية (بدونها لا يعمل الاشتراك في المدونة)
-- 007 = الصفحات القانونية     (بدونها تُخفى روابط الفوتر)
-- 011 = إغلاق صلاحيات RLS     ⚠️ بدونها بيانات عملائك مكشوفة للعامة
-- ═══════════════════════════════════════════════════════════════════


-- ───────────────────────────────────────────────────────────────────
-- 001_contact_messages_lead_fields.sql
-- ───────────────────────────────────────────────────────────────────
-- 001 · contact_messages: lead qualification + follow-up state
--
-- Why: the approved "تواصل معنا" design adds a service-type and a budget
-- selector to the form, and the audit found leads have no follow-up state --
-- a message lands in the table and waits for someone to remember to look.
--
-- Safety: additive only. No column is dropped, renamed or retyped, and every
-- new column is nullable or carries a default, so existing rows and the
-- current insert path (name, email, phone, message) keep working untouched.
--
-- Review before running. Not applied by the app.

alter table public.contact_messages
  -- from the design's "اسم الشركة / النشاط" field
  add column if not exists company text,
  -- from the design's "نوع الخدمة المطلوبة" selector
  add column if not exists service_type text,
  -- from the design's "الميزانية التقديرية" selector; stored as the bucket
  -- label rather than a number because the form offers ranges, not amounts
  add column if not exists budget_range text,

  -- follow-up state, so a lead can't sit unseen
  add column if not exists status text not null default 'new',
  add column if not exists handled_by text,
  add column if not exists internal_note text,
  add column if not exists contacted_at timestamptz,

  -- attribution: lets you see which channel and page actually produce clients
  add column if not exists source_page text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists locale text,

  add column if not exists created_at timestamptz not null default now();

-- Keep status to a known set. Named constraint so it is easy to find and drop.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'contact_messages_status_check'
  ) then
    alter table public.contact_messages
      add constraint contact_messages_status_check
      check (status in ('new', 'contacted', 'qualified', 'won', 'lost', 'spam'));
  end if;
end $$;

-- The dashboard lists newest-first and will filter by status.
create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
create index if not exists contact_messages_status_idx
  on public.contact_messages (status);


-- ───────────────────────────────────────────────────────────────────
-- 002_newsletter_subscribers.sql
-- ───────────────────────────────────────────────────────────────────
-- 002 · newsletter_subscribers
--
-- Why: the approved "المدونة" design ends with a subscribe block
-- ("لا تفوّت أي مقال جديد"). There is no table behind it today.
--
-- Safety: new table only. Nothing existing is touched.
--
-- Review before running. Not applied by the app.

create table if not exists public.newsletter_subscribers (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  locale       text,
  source_page  text,
  -- double opt-in support; a row is not mailable until confirmed_at is set
  confirm_token text,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at   timestamptz not null default now()
);

-- One row per address, case-insensitively: Ahmed@x.com and ahmed@x.com are
-- the same subscriber. Enforced in the database so a double submit cannot
-- create duplicates regardless of what the form does.
create unique index if not exists newsletter_subscribers_email_key
  on public.newsletter_subscribers (lower(email));

alter table public.newsletter_subscribers enable row level security;

-- Deliberately no anon select policy: the subscriber list must never be
-- readable from the browser. Inserts are expected to arrive through a
-- server action holding a verified session or the service role, so no anon
-- insert policy is granted here either -- add one only if you decide the
-- form should write directly from the client.


-- ───────────────────────────────────────────────────────────────────
-- 007_seed_legal_pages.sql
-- ───────────────────────────────────────────────────────────────────
-- 007 · make sure the legal page rows actually exist
--
-- Why this is not hypothetical:
-- The old /pages/[slug] component ignored its route param and always queried
-- slug = 'privacy-policy'. So /pages/terms-conditions LOOKED like it worked —
-- it rendered the privacy policy. Nobody would have noticed that the
-- terms-conditions row was never created, because the page never asked for it.
--
-- That bug is fixed (batch 06), and the page now returns a real 404 when the
-- row is missing. Which means: if terms-conditions was never created, the
-- footer link to it — present on every page of the site — now 404s in
-- production. This file closes that gap.
--
-- Safety: inserts ONLY the slugs that are missing. `where not exists` means a
-- row you already wrote is never touched or overwritten.
--
-- Review before running. Not applied by the app.

insert into public.pages (slug, title_ar, title_en, content_ar, content_en)
select 'privacy-policy',
       'سياسة الخصوصية',
       'Privacy Policy',
       '<p>هذا نص مبدئي. يُرجى تحريره من لوحة التحكم.</p>',
       '<p>Placeholder content. Please edit this from the dashboard.</p>'
where not exists (select 1 from public.pages where slug = 'privacy-policy');

insert into public.pages (slug, title_ar, title_en, content_ar, content_en)
select 'terms-conditions',
       'الشروط والأحكام',
       'Terms & Conditions',
       '<p>هذا نص مبدئي. يُرجى تحريره من لوحة التحكم.</p>',
       '<p>Placeholder content. Please edit this from the dashboard.</p>'
where not exists (select 1 from public.pages where slug = 'terms-conditions');

insert into public.pages (slug, title_ar, title_en, content_ar, content_en)
select 'about-us',
       'من نحن',
       'About Us',
       '<p>هذا نص مبدئي. يُرجى تحريره من لوحة التحكم.</p>',
       '<p>Placeholder content. Please edit this from the dashboard.</p>'
where not exists (select 1 from public.pages where slug = 'about-us');

-- Check what you have, and replace any placeholder text:
--   select slug, title_ar, left(content_ar, 60) from public.pages order by slug;
--
-- These three slugs are the ones the site and the dashboard sidebar both
-- expect. Adding a fourth legal page means adding it to the sidebar and to the
-- footer's quickLinks as well, or it becomes an orphan page.



-- ───────────────────────────────────────────────────────────────────
-- 011_rls_lockdown.sql   ⚠️ مانع إطلاق — لا تطلق بدونه
-- ───────────────────────────────────────────────────────────────────
-- 011 · RLS lockdown  ⚠️ LAUNCH BLOCKER FIX
--
-- ما المشكلة التي يحلها هذا الملف
-- ─────────────────────────────────────────────────────────────────────────
-- لوحة التحكم كلها تقرأ وتكتب من المتصفح بمفتاح anon العام:
--   grep -rln "supabaseAdmin" "src/app/[locale]/(admin)/"   → لا شيء
-- وصندوق رسائل العملاء يُجلب عبر src/lib/contact.js الذي يستورد نفس العميل.
--
-- ولكي تعمل اللوحة اليوم، يجب أن تسمح السياسات لـ anon بقراءة
-- contact_messages — وهو جدول يحمل اسم كل عميل محتمل وبريده وجواله.
-- ومفتاح anon يُشحن داخل صفحات الموقع للعامة بحكم التصميم.
--
-- النتيجة: أي شخص يستطيع سحب قائمة عملائك كاملة بطلب واحد، بلا تسجيل دخول.
-- حارس اللوحة في (admin)/layout.js لا يمنع ذلك إطلاقاً — لأنه فحص في
-- المتصفح (useEffect + router.push) بينما البيانات تُطلب من Supabase مباشرة.
-- هذا تسريب بيانات شخصية، ومسؤولية قانونية تحت نظام حماية البيانات
-- الشخصية السعودي (PDPL).
--
-- الحل: anon يقرأ المحتوى العام فقط. البيانات الشخصية والكتابة للمشرفين فقط.
--
-- لماذا لا يحتاج هذا أي تعديل في الكود
-- ─────────────────────────────────────────────────────────────────────────
-- src/lib/supabaseClient.js ينشئ العميل بـ persistSession الافتراضي، أي أن
-- المتصفح بعد تسجيل الدخول يرسل JWT المستخدم لا مفتاح anon. فتعمل اللوحة
-- تحت سياسات "authenticated" كما هي تماماً.
--
-- الأمان: يشغّل مرة واحدة. آمن لإعادة التشغيل (drop policy if exists).
-- خذ نسخة احتياطية أولاً.

-- ── من هو المشرف ──────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  note       text,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- تسجيل الحسابات الموجودة الآن كمشرفين.
-- هذه حساباتك أنت — لا يوجد تسجيل عام في هذا المشروع. أي حساب يُنشأ بعد
-- تشغيل هذه الهجرة لن يكون مشرفاً حتى تضيفه يدوياً، وهذا هو المقصود:
-- لو كان التسجيل مفتوحاً في إعدادات Supabase Auth لأمكن لأي شخص التسجيل
-- ثم قراءة عملائك.
insert into public.admin_users (user_id, note)
select id, 'auto-enrolled by migration 011'
from auth.users
on conflict (user_id) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users a where a.user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ── البيانات الشخصية: لا وصول لـ anon إطلاقاً ─────────────────────────────
do $$
declare t text;
begin
  foreach t in array array['contact_messages', 'newsletter_subscribers'] loop
    if to_regclass('public.' || t) is not null then
      execute format('alter table public.%I enable row level security', t);

      -- أي سياسة قديمة متساهلة تُزال أولاً.
      execute format('drop policy if exists "anon_all_%s"    on public.%I', t, t);
      execute format('drop policy if exists "public_read_%s" on public.%I', t, t);
      execute format('drop policy if exists "admin_read_%s"  on public.%I', t, t);
      execute format('drop policy if exists "admin_write_%s" on public.%I', t, t);

      execute format(
        'create policy "admin_read_%s" on public.%I for select to authenticated using (public.is_admin())', t, t);
      execute format(
        'create policy "admin_write_%s" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t, t);
      -- لا سياسة INSERT: الإدخال يتم من الخادم بصلاحية service_role التي
      -- تتجاوز RLS. النموذج العام لم يعد يكتب من المتصفح منذ نقل الإرسال
      -- إلى server action.
    end if;
  end loop;
end $$;

-- ── المحتوى العام: anon يقرأ · المشرف يكتب ────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array[
    'categories', 'blogs', 'projects', 'pages', 'partners', 'hero',
    'site_settings', 'products', 'city_pages'
  ] loop
    if to_regclass('public.' || t) is not null then
      execute format('alter table public.%I enable row level security', t);

      execute format('drop policy if exists "public_read_%s" on public.%I', t, t);
      execute format('drop policy if exists "admin_write_%s" on public.%I', t, t);
      execute format('drop policy if exists "anon_all_%s"    on public.%I', t, t);

      execute format(
        'create policy "public_read_%s" on public.%I for select to anon, authenticated using (true)', t, t);
      execute format(
        'create policy "admin_write_%s" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t, t);
    end if;
  end loop;
end $$;

-- ── تحقّق ────────────────────────────────────────────────────────────────
-- ١) يجب أن يعيد صفاً واحداً على الأقل — وإلا لا أحد يستطيع إدارة اللوحة:
--      select count(*) from public.admin_users;
--
-- ٢) الاختبار الحقيقي — نفّذه من طرفية خارج المتصفح بمفتاح anon.
--    يجب أن يعيد [] وليس بيانات عملاء:
--      curl "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/contact_messages?select=*" \
--           -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY"
--
--    إن أعاد أسماء وأرقام هواتف، فالهجرة لم تُطبَّق. لا تطلق قبل أن يعيد [].
--
-- ٣) بعدها افتح /dashboard/messages وسجّل الدخول — يجب أن تظهر الرسائل
--    طبيعياً، لأن متصفحك يرسل JWT حسابك لا مفتاح anon.


-- ═══════════════════════════════════════════════════════════════════
-- تحقق بعد التشغيل — يجب أن يعيد الأول أعمدة service_type و budget_range
-- والثاني ثلاثة صفوف.
-- ═══════════════════════════════════════════════════════════════════
-- select column_name from information_schema.columns
--  where table_name = 'contact_messages' order by column_name;
-- select slug from public.pages order by slug;
