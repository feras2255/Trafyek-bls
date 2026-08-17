# Traffic Plus — ترافيك بلس

Bilingual (ar/en) marketing site and content dashboard for Traffic Plus.

- **Framework**: Next.js 16, App Router, JavaScript
- **UI**: React 19, Tailwind CSS 4
- **Data**: Supabase — Postgres, Storage, Auth
- **i18n**: next-intl, `ar` (default) and `en`

## Running locally

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000 -> redirects to /ar
```

`npm run build` requires the same variables to be set — the Supabase client is
constructed at module load, so an empty URL fails the build rather than the
request.

## Checks

```bash
npx eslint src        # must exit 0 with no output
npm run build
```

## Database migrations

SQL lives in `supabase/migrations/`, numbered in apply order. **Nothing applies
them automatically** — read each one and run it yourself in the Supabase SQL
editor.

| File | What it adds | Needed by |
| --- | --- | --- |
| `001_contact_messages_lead_fields.sql` | company, service type, budget, follow-up status, UTM columns | **The contact form. Without it, submissions fail.** |
| `002_newsletter_subscribers.sql` | Newsletter table | **The blog subscribe box. Without it, subscribing fails.** |
| `003_project_case_study_fields.sql` | Case-study and result fields | The featured case study on /ourwork (section hides until set) |
| `004_blog_related_articles.sql` | `category_id` on blogs, indexes | A proper related-articles relation (a text-column fallback works today) |
| `005_categories_highlight.sql` | Highlighted service card | The promoted card on /services (renders normally until set) |

001 and 002 are required before deploying. 003–005 are optional: the features
they back degrade to hidden or to a fallback until applied.

## Architecture notes

### Security boundary is RLS

There are no API routes. Reads happen in server components; writes go through
server actions in `app/[locale]/(website)/*/actions.js`. Two Supabase clients:

- `lib/supabaseClient.js` — anon key, subject to RLS. Safe in the browser.
- `lib/supabaseAdmin.js` — service role, **bypasses RLS**. Server only. Never
  import it into a file carrying `"use client"`.

Because the anon key is public by design, **your RLS policies are the actual
security boundary**. Keep them under review; they are not currently checked into
this repo.

### Anything rendering CMS HTML must sanitise

`lib/sanitize.js` wraps DOMPurify with an allow-list matching what the dashboard
editor produces. Every `dangerouslySetInnerHTML` carrying database content goes
through it. Do not add a new one without it.

### Canonical and hreflang are per page

`lib/seo.js` provides `alternatesFor()` and `buildMetadata()`. **Never put
`alternates` on a layout** — Next.js inherits layout metadata into every page
that lacks its own, which previously made six page groups declare the Arabic
home page as their canonical. Every new page must set its own.

### Content sources

Marketing copy lives in `messages/ar.json` and `messages/en.json` and must stay
at parity. Services, projects, articles and legal pages come from Supabase so
the dashboard controls them.

### Security headers

`next.config.mjs` sets them. CSP currently ships as **Report-Only** — check the
browser console on the home page, a service page, the contact page (map iframe)
and the dashboard (image upload), then rename the header to
`Content-Security-Policy` to enforce.

## Known outstanding work

- Dashboard route protection is client-side only; `middleware.js` handles i18n
  and does not check the session.
- Remaining dashboard writes still run from the browser under RLS.
- ~18 unused modules await a decision before deletion.
