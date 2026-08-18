-- 005 · categories: highlighted service card
--
-- Why: the approved "الخدمات" design gives one service card an inverted navy
-- treatment with a "جديد" badge (it shows the AI/GEO service there). Services
-- are rendered from the categories table, so without a flag the page has no
-- way to know which card to promote.
--
-- Alternative considered and rejected: hardcoding "highlight the last card".
-- That silently changes which service is promoted whenever the ordering
-- changes, which is exactly the kind of surprise a dashboard should prevent.
--
-- Safety: additive and nullable/defaulted. Until you set the flag on a row the
-- page renders every card in the standard treatment, which is the current
-- appearance -- so this migration changes nothing on its own.
--
-- Review before running. Not applied by the app.

alter table public.categories
  add column if not exists is_highlighted boolean not null default false,
  -- badge text is editable because "جديد" will not always be the right word
  add column if not exists badge_ar text,
  add column if not exists badge_en text,
  add column if not exists updated_at timestamptz;

-- The services grid orders by "order"; this supports the promoted lookup
-- without scanning when only one row is flagged.
create index if not exists categories_is_highlighted_idx
  on public.categories (is_highlighted)
  where is_highlighted;

-- Optional: promote the AI/GEO service the design highlights. Left commented
-- because it depends on your actual row titles -- check them first with
--   select id, title_ar from public.categories order by "order";
--
-- update public.categories
--   set is_highlighted = true, badge_ar = 'جديد', badge_en = 'New'
--   where id = <the AI/GEO category id>;
