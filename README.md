# A&E Creative Studio — website

Single-page portfolio site. React 18 + Vite 6 + Tailwind CSS 4 + TypeScript. Static output, no backend, no accounts, no paid services.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs static site to dist/
npm run preview    # serve dist/ locally to check the production build
```

Requires Node.js 18+ (tested on Node 22).

## Before publishing: contact settings

Edit **`src/config.ts`**:

| Field | Example | Effect |
|---|---|---|
| `email` | `hello@yourdomain.com` | Form opens the visitor's email app (`mailto:`) with all fields pre-filled; email shown in Contact |
| `telegram` | `ae_studio` (no @) | Shows a link to `https://t.me/ae_studio` |
| `whatsapp` | `380501234567` (digits only) | Shows a link to `https://wa.me/380501234567` |
| `formEndpoint` | Formspree/Getform URL | Optional. If set, the form POSTs JSON there instead of using `mailto:` |

While a field is empty, the site shows "not configured yet" instead of a link (no broken links), and the form shows a visible "Configuration needed" notice.

Also, after you have a domain: in `index.html` uncomment `og:url` and set your real URL.

## Deploy

### Vercel (fastest)
1. Push this folder to a GitHub repo.
2. vercel.com → **Add New → Project** → import the repo. Vite is auto-detected (build `npm run build`, output `dist`).
3. Deploy, then add your domain under **Settings → Domains**.

Or from the terminal: `npx vercel` (preview) and `npx vercel --prod`.

> **Note:** Vercel's free **Hobby** plan is for non-commercial use only. For a business site use the **Pro** plan, or a host that allows commercial use on its free tier, e.g. **Cloudflare Pages** or **Netlify** (both: build command `npm run build`, output directory `dist`).

### Any static host
Run `npm run build` and upload the contents of `dist/`.

## Project structure

```
public/portfolio/<brand>/NN_name.png        original images (exact paths from the brief, used as fallback)
public/portfolio/<brand>/NN_name-640.webp   optimized grid version
public/portfolio/<brand>/NN_name-1280.webp  optimized lightbox/hero version
src/config.ts                 contact settings
src/i18n.ts                   all EN / UA text
src/data/portfolio-manifest.json   supplied manifest (paths)
src/data/portfolio.ts         brands, categories, EN/UA titles and descriptions
src/components/               Header, Portfolio (filters + grid), Lightbox, Contact, Picture
src/App.tsx                   page sections: Hero, Services, Process, About, FAQ, Footer
scripts/optimize-images.mjs   regenerates the .webp files
```

### Replacing or adding photos
1. Put the PNG at the same path (or add it to `src/data/portfolio-manifest.json`).
2. Add its EN/UA title and description in `src/data/portfolio.ts`.
3. Run `npm run optimize-images`.

## Features
- EN / UA toggle (English by default), choice saved in `localStorage`
- 4 category filters plus "All"; each shows its brand's 5 images; keyboard accessible (`aria-pressed`)
- Lightbox: Esc / ← → keys, focus trap, returns focus on close
- Lazy-loaded responsive WebP images (~1.4 MB for the whole grid vs 46 MB of PNGs), PNG fallback
- Mobile menu (Esc closes), skip link, semantic sections, reduced-motion support
- No prices, no testimonials, honest "Independent AI concept project" labeling + footer disclosure
