# Project preferences

## Branching workflow — IMPORTANT

This repo has two deploy targets:

- **`staging` branch → GitHub Pages** at https://r-j-e.github.io/ryan-katie-wedding/
  Free, no build credits. Auto-deploys on push.
- **`main` branch → Netlify (production)** at the live wedding URL.
  Costs ~15 Netlify credits per push, so we want to push here sparingly.

### Default behaviour

- **Push iteration work to `staging`**, not main. Every visual change,
  copy tweak, layout experiment — staging.
- **Only push to `main` when the user explicitly says** "push to main",
  "ship it", "promote to live", or similar. Don't promote on your own
  initiative just because staging looks good.
- Promote by fast-forward-merging `staging` into `main` and pushing main.
  Don't squash — staging history is the production history.

### Working on the staging branch

After committing on staging, just `git push origin staging` — GitHub Pages
rebuilds automatically and the new build is live at the staging URL
within ~1 minute.
