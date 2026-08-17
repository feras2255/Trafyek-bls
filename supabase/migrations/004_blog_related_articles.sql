-- 004 · blogs: category link for "مقالات ذات صلة"
--
-- Why: the approved "مقال" design ends with a related-articles strip. There is
-- no relation on blogs today to decide what counts as related, so the strip has
-- nothing to query.
--
-- Approach: reuse the existing categories table rather than introducing a
-- parallel tagging system -- the dashboard already manages categories, so this
-- adds no new admin surface. on delete set null keeps articles alive if a
-- category is removed.
--
-- Safety: additive and nullable. Existing articles get category_id = null and
-- fall back to "most recent" for the related strip.
--
-- Review before running. Not applied by the app.

alter table public.blogs
  add column if not exists category_id bigint,
  add column if not exists updated_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'blogs_category_id_fkey'
  ) then
    alter table public.blogs
      add constraint blogs_category_id_fkey
      foreign key (category_id) references public.categories (id)
      on delete set null;
  end if;
end $$;

-- Supports "other articles in this category, excluding the current one".
create index if not exists blogs_category_id_idx
  on public.blogs (category_id);

-- The blog list and the related strip both order by recency.
create index if not exists blogs_created_at_idx
  on public.blogs (created_at desc);

-- NOTE on column type: category_id is declared bigint to match a bigint
-- identity primary key on categories, which is the Supabase default. If your
-- categories.id is uuid, change this column to uuid before running -- the
-- foreign key will otherwise fail with a type mismatch. Verify with:
--   select column_name, data_type from information_schema.columns
--   where table_name = 'categories' and column_name = 'id';
