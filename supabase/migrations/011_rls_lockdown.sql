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
