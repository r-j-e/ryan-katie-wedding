# Project preferences

## Branching workflow — IMPORTANT

This repo deploys to **Cloudflare Pages** (free, fast) and currently also to
**Netlify** (until the RSVP form is migrated off Netlify Forms).

- **`main` branch → Cloudflare Pages (production)** at
  https://ryan-katie-wedding.rjelliott39.workers.dev/ — free, ~10s deploys.
  Also still deploys to **Netlify** (~15 credits per push) until the RSVP
  form is migrated. So pushing to main *still costs credits today*.
- **`staging` branch → Cloudflare Pages (preview deploy)** at a per-branch
  `*.workers.dev` URL (see Deployments tab in the Cloudflare dashboard).
  Free, no credits.

### Default behaviour

- **Push iteration work to `staging`**, not main. Every visual change,
  copy tweak, layout experiment — staging.
- **Only push to `main` when the user explicitly says** "push to main",
  "ship it", "promote to live", or similar. Until Netlify is fully
  retired, every push to main burns ~15 credits.
- Promote by fast-forward-merging `staging` into `main` and pushing main.
  Don't squash — staging history is the production history.

### Working on the staging branch

After committing on staging, just `git push origin staging` — Cloudflare
Pages builds a preview deploy automatically. Find the URL under
Deployments in the Cloudflare dashboard.

### Pending migrations

- **RSVP form** still posts to Netlify Forms (see the hidden `<form>` in
  `index.html` and `data-netlify="true"` on the React form in `rsvp.jsx`).
  Needs migration to a Cloudflare Pages Function before Netlify can be
  retired. Until then, keep Netlify deploying so the form keeps working.
- **GitHub Pages** is no longer needed and can be turned off in repo
  Settings → Pages → Unpublish.
