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
