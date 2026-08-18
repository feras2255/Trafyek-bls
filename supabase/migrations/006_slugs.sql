-- 006 · slug columns for categories, blogs and projects
--
-- Why: services live at /services/12 and articles at /blogs/48. A numeric id
-- throws away the strongest signal a URL can carry — the words themselves.
-- /services/local-seo-riyadh beats /services/12 for both search engines and
-- the person reading the result. This is also a prerequisite for the planned
-- city and service pages: a topical structure cannot be built on integers.
--
-- Safety: additive. Existing numeric URLs keep working — the routing change
-- that follows resolves BOTH a slug and an id, and 301s the id form to the
-- slug form, so nothing already indexed breaks.
--
-- ORDER OF OPERATIONS — this matters:
--   1. Run this file. It adds the columns and backfills every existing row.
--   2. Check the generated slugs (query at the bottom) and fix any that read
--      badly. They are your URLs; a machine-generated one is a starting point.
--   3. Only then deploy the routing change. Deploying it first would 404
--      everything, because no row would have a slug yet.
--
-- Review before running. Not applied by the app.

alter table public.categories add column if not exists slug text;
alter table public.blogs      add column if not exists slug text;
alter table public.projects   add column if not exists slug text;

-- Arabic-aware slugify.
--
-- Deliberately KEEPS Arabic letters rather than transliterating them: Arabic
-- URLs are percent-encoded by the browser but display correctly, and they match
-- what people actually search for in this market. Latin text lowercases as
-- usual. Everything else collapses to a single hyphen.
create or replace function public.slugify(value text)
returns text
language sql
immutable
as $$
  select trim(both '-' from
    regexp_replace(
      regexp_replace(
        regexp_replace(
          -- Harakat, superscript alef and tatweel are REMOVED, not turned into
          -- separators. Treating them as separators tore words apart:
          -- "السِّيو" came out as "الس-يو".
          regexp_replace(
            -- Arabic-Indic and extended Arabic-Indic digits -> 0-9, otherwise
            -- "أفضل ١٠ شركات" loses the number completely.
            translate(
              lower(coalesce(value, '')),
              '٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹',
              '01234567890123456789'
            ),
            '[ً-ْٰـ]', '', 'g'
          ),
          -- keep: arabic letter block, latin letters, digits. replace the rest.
          '[^ء-يa-z0-9]+', '-', 'g'
        ),
        '-{2,}', '-', 'g'
      ),
      '^-+|-+$', '', 'g'
    )
  );
$$;

-- Backfill. Arabic title is the source because it is the primary locale; the
-- id is appended only where that would otherwise collide or come out empty.
update public.categories
  set slug = public.slugify(coalesce(title_ar, title_en))
  where slug is null;
update public.blogs
  set slug = public.slugify(coalesce(title_ar, title_en))
  where slug is null;
update public.projects
  set slug = public.slugify(coalesce(title_ar, title_en))
  where slug is null;

-- Anything that slugified to empty (title was punctuation-only, or null) falls
-- back to the id so the column is never blank.
update public.categories set slug = 'category-' || id where slug is null or slug = '';
update public.blogs      set slug = 'post-'     || id where slug is null or slug = '';
update public.projects   set slug = 'project-'  || id where slug is null or slug = '';

-- De-duplicate: two rows with the same title would otherwise collide. Appends
-- the id to every duplicate after the first.
with dupes as (
  select id, slug,
         row_number() over (partition by slug order by id) as rn
  from public.categories
)
update public.categories c set slug = c.slug || '-' || c.id
from dupes d where c.id = d.id and d.rn > 1;

with dupes as (
  select id, slug, row_number() over (partition by slug order by id) as rn
  from public.blogs
)
update public.blogs b set slug = b.slug || '-' || b.id
from dupes d where b.id = d.id and d.rn > 1;

with dupes as (
  select id, slug, row_number() over (partition by slug order by id) as rn
  from public.projects
)
update public.projects p set slug = p.slug || '-' || p.id
from dupes d where p.id = d.id and d.rn > 1;

-- Now that every row has a unique value, enforce it.
create unique index if not exists categories_slug_key on public.categories (slug);
create unique index if not exists blogs_slug_key      on public.blogs (slug);
create unique index if not exists projects_slug_key   on public.projects (slug);

alter table public.categories alter column slug set not null;
alter table public.blogs      alter column slug set not null;
alter table public.projects   alter column slug set not null;

-- STEP 2 — review the generated slugs before deploying the routing change:
--
--   select id, title_ar, slug from public.categories order by id;
--   select id, title_ar, slug from public.blogs      order by id;
--   select id, title_ar, slug from public.projects   order by id;
--
-- Edit any that read badly. Once a slug is live and indexed, changing it costs
-- a redirect, so it is much cheaper to get them right now.
