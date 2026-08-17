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
