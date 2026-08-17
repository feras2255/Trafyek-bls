-- 003 · projects: case-study and results fields
--
-- Why: the approved "أعمالنا" design leads with a featured case study and an
-- "أثرنا بالأرقام" band. The projects table today carries only title,
-- description and image, so there is nowhere to put a result.
--
-- Safety: additive only, all nullable. Existing project rows and the current
-- project pages keep rendering exactly as they do now -- the new sections
-- simply have nothing to show until you fill them in.
--
-- Review before running. Not applied by the app.

alter table public.projects
  -- the one project pinned to the top of the page as a full case study
  add column if not exists is_case_study boolean not null default false,

  -- narrative, bilingual to match the rest of the table's convention
  add column if not exists challenge_ar text,
  add column if not exists challenge_en text,
  add column if not exists solution_ar  text,
  add column if not exists solution_en  text,

  -- headline result, e.g. "+240%" / "زيادة الزيارات"
  add column if not exists result_value    text,
  add column if not exists result_label_ar text,
  add column if not exists result_label_en text,

  add column if not exists client_name text,
  add column if not exists project_url text,
  add column if not exists updated_at timestamptz;

-- Only the case-study flag is queried as a filter; the rest are read with
-- the row that is already being fetched.
create index if not exists projects_is_case_study_idx
  on public.projects (is_case_study)
  where is_case_study;
