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
