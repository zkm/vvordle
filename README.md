# VVordle (Vue + Vite)

A Vue implementation of the Wordle game. Built with Vite and configured for GitHub Pages via the `docs/` folder.

This repository is open sourced for learning purposes only — the original creator(s) of Wordle own all applicable rights to the game itself.

## Prerequisites

- Node.js 18+ (LTS recommended)
- Yarn 1.x (this repo uses `yarn.lock`)

## Install

```sh
yarn install
```

## Local development

```sh
yarn dev
```

## Testing

This project uses Vitest with jsdom and Vue Test Utils.

```sh
# watch mode
yarn test

# one-shot, CI-friendly
yarn test:run
```

## Build (for GitHub Pages)

The Vite config sets `base: '/vvordle/'` and outputs to `docs/` so GitHub Pages can serve the built site directly.

```sh
yarn build
```

This will create/overwrite files under `docs/`. Commit those changes when you want to publish updates.

## Deploy to GitHub Pages

In your repository settings, enable Pages with:

- Source: Deploy from a branch
- Branch: `master` (or `main`) / folder: `/docs`

Your site will be available at `https://<username>.github.io/vvordle/`.

Notes:
- If you fork under a different repository name, update `base` in `vite.config.ts` to match: `base: '/<your-repo-name>/'`.
- For SPA refreshes on GitHub Pages, you may want to add a `404.html` copy of `index.html` in `docs/` so deep links work.
- `deploy.sh` (gh-pages branch flow) is not required with the `docs/` setup and can be removed if unused.
