# Mahmoud Ramadan — Portfolio

Live: **https://mahmod-ramdan.github.io/portfolio/**

Built with [Astro](https://astro.build), GSAP and Lenis. `BRIEF.md` is the full design and content brief.

## Branches

- **`source`**: this code. Edit here.
- **`main`**: the built site that GitHub Pages serves. Don't edit it by hand. A GitHub Action rebuilds it on every push to `source`.

## Edit content

Everything you'll want to change is plain text:

| What | Where |
|---|---|
| Case studies | `src/content/cases/*.md` (one file per case) |
| Lab items | `src/content/lab/*.md` |
| Name, hero line, contact, proof numbers, timeline, brands | `src/data/site.ts` |
| Colors, fonts, spacing | `src/styles/global.css` (the `:root` tokens) |
| Motion | `src/scripts/motion.ts` |

`todos:` lists in the case files only show in dev (`npm run dev`), never on the live site.

### Add the CV
Save the updated CV as `public/Mahmoud_Ramadan_CV.pdf`, then set `cv: { file: 'Mahmoud_Ramadan_CV.pdf', ready: true }` in `src/data/site.ts`. The "Download CV" buttons appear automatically.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321/
```

Production build (same as the deploy):

```bash
SITE_URL=https://mahmod-ramdan.github.io BASE_PATH=/portfolio npm run build
```
