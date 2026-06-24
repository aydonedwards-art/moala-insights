# Deploying the Moala Global insights site

One-time setup, ~15 minutes. Order matters. DNS step touches **CNAME only** (D09 guardrail).

## 1. Create the public GitHub repo

1. github.com → New repository → name: `moala-insights` (public — this is the published site source; the private vault never goes here, per D27).
2. On the empty repo page choose **uploading an existing file** and drag in the full contents of this folder (everything except `node_modules/` and `dist/`, which `.gitignore` excludes anyway).
3. Commit to `main`.

## 2. Connect Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create → Pages → **Connect to Git** → select `moala-insights`.
2. Framework preset: **Astro**. Build command: `npm run build`. Output directory: `dist`.
3. Deploy. First build takes a minute or two; you get a `*.pages.dev` URL immediately. Check the index, one article, `/rss.xml`.

## 3. Wire the subdomain (CNAME only)

1. Cloudflare Pages project → Custom domains → add `insights.moalaglobal.com`.
2. In the DNS zone for `moalaglobal.com`, add the **CNAME** record Cloudflare specifies (`insights` → the pages.dev target). Touch nothing else — no MX/TXT/SPF/DKIM (D09).
3. Wait for the domain to validate (minutes to an hour).

## 4. Publish workflow from here (D27)

Word → Pandoc markdown → frontmatter (schema in `publications-schedule.md`) → drop the `.md` into `src/content/insights/` on GitHub (Add file → Upload) → Cloudflare auto-deploys in ~1 minute.

The 12 seed articles in `src/content/insights/` are placeholders — replace them with the converted backlog. Delete a seed file to remove its page.

## Notes

- `astro.config.mjs` holds the canonical URL (`insights.moalaglobal.com`). If the subdomain decision changes, change it there before deploying.
- OG/social tags generate from each article's frontmatter; add a `cover` image path per article when branded title-cards exist (drop PNGs in `public/covers/`).
- Local preview (optional, after Claude Code unlock): `npm install`, then `npm run dev`.
