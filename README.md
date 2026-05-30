# Simon Wacziarg Portfolio

A recruiter-first portfolio for Simon Wacziarg, built with React, TypeScript, and Vite. The site is fully static, deploys to GitHub Pages with GitHub Actions, and includes optional puzzle-mode interactions.

## Local Development

```bash
npm install
npm run dev
```

Vite will print a local URL, usually `http://127.0.0.1:5173/`.

## Checks

```bash
npm run lint
npm run build
```

`npm run lint` runs TypeScript with `--noEmit`. `npm run build` type-checks and creates the production build in `dist/`.

## GitHub Pages Deployment

The workflow in `.github/workflows/pages.yml` builds the app and deploys `dist/` through the standard GitHub Pages action flow:

- `actions/configure-pages`
- `actions/upload-pages-artifact`
- `actions/deploy-pages`

Because this repository is named `SimonPortfolio`, Vite is configured with:

```ts
base: "/SimonPortfolio/"
```

If the project is moved to `swacziarg.github.io`, change the Vite `base` in `vite.config.ts` to `/`.

## Content Notes

Only real public destinations are rendered. Add email, LinkedIn, resume, and project-specific links once final URLs are available.
