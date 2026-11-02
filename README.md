# HEYULA

Landing page for [heyula.co](https://heyula.co) — *strange comics, carefully made.*
Next.js 16 (App Router), fully static, built from the Figma file `HEYULA.fig`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build check
```

## Where things live

| What | File |
| --- | --- |
| Brand copy, URL, email, SEO keywords, social links | `lib/site.ts` |
| Page markup / styles / animations | `app/page.tsx`, `app/page.module.css` |
| Live Istanbul date + clock | `components/IstanbulClock.tsx` |
| Metadata + JSON-LD structured data | `app/layout.tsx` |
| Social share image (OG / Twitter) | `lib/og.tsx` |
| robots.txt, sitemap.xml, llms.txt, manifest | `app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts`, `app/manifest.ts` |
| Favicon (placeholder) | `app/icon.svg` |

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repo. The defaults (framework *Next.js*, `npm run build`) are correct — no `vercel.json` needed.
3. **Settings → Environment Variables**: add `NEXT_PUBLIC_SITE_URL = https://heyula.co` for *Production*. (Preview deployments use their own URL automatically.)
4. **Settings → Domains**: add `heyula.co` and `www.heyula.co`, set `www` to redirect to the apex, and add the DNS records Vercel shows at your domain registrar.
5. Redeploy. Every push to `main` deploys to production; other branches get preview URLs.

Alternative without GitHub: `npx vercel` (preview) and `npx vercel --prod` from this folder, after `npx vercel login`.

## After launch

- Submit `https://heyula.co/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters) (Bing also feeds ChatGPT and Copilot search).
- Check the share card with the [Open Graph debugger](https://www.opengraph.xyz/) and the structured data with [Google's Rich Results Test](https://search.google.com/test/rich-results).
