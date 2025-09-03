# VVordle (Vue + Vite)

A Vue implementation of the Wordle game. Built with Vite and configured for GitHub Pages via the `docs/` folder.

This repository is open sourced for learning purposes only — the original creator(s) of Wordle own all applicable rights to the game itself.

## Local development

```sh
yarn dev
```

## Build

Builds to `docs/` so GitHub Pages can serve from there:

```sh
yarn build
```

## Deploy to GitHub Pages

In your repository settings, enable Pages with:

- Source: Deploy from a branch
- Branch: `master` (or `main`) / folder: `/docs`

Your site will be available at `https://<username>.github.io/vvordle/`.

If you previously used `deploy.sh` to push to `gh-pages`, you can remove that flow after switching to the `docs/` setup.
