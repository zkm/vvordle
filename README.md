# VVordle – Code Overview

[![Deploy to GitHub Pages](https://github.com/zkm/vvordle/actions/workflows/pages.yml/badge.svg)](https://github.com/zkm/vvordle/actions/workflows/pages.yml)
[![play](https://img.shields.io/website?url=https%3A%2F%2Fzkm.github.io%2Fvvordle%2F&label=play)](https://zkm.github.io/vvordle/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![Yarn 4](https://img.shields.io/badge/Yarn-4-2C8EBB?logo=yarn&logoColor=white)

VVordle is a small, readable Vue 3 + Vite implementation of Wordle. This document focuses on how the code is structured and how the game logic works.

This repository is open sourced for learning purposes only — the original creator(s) of Wordle own all applicable rights to the game itself.

## Project layout

- `src/main.ts` — App bootstrap; mounts the app and manages a `--vh` CSS variable for mobile viewport sizing.
- `src/Game.vue` — The core game: board state, input handling, guess evaluation, messages, and animations.
- `src/Keyboard.vue` — On-screen keyboard component. Emits key events consumed by `Game.vue`.
- `src/words.ts` — Word lists and `getWordOfTheDay()` selection logic (with querystring override for demos/tests).
- `src/types.ts` — Shared types and the `LetterState` enum.
- `src/game.css` — Styles for the board, tiles, and animations.
- `test/Keyboard.test.ts` — Unit tests for keyboard behavior.
- `test/words.test.ts` — Unit tests for word-of-the-day logic.

## Data model

- Tile: `{ letter: string, state: LetterState }`
- Board: `Tile[][]` — 6 rows × 5 columns
- `LetterState` (see `src/types.ts`): `INITIAL`, `PRESENT`, `CORRECT`, `ABSENT`
- Keyboard letter states: `Record<string, LetterState>` used to tint keys as information is discovered

## Component contracts

Keyboard (`src/Keyboard.vue`):
- Props
	- `letterStates: Record<string, LetterState>` — latest knowledge about each letter
- Emits
	- `key` with a payload of `'a'..'z' | 'Enter' | 'Backspace'`

Game (`src/Game.vue`):
- Listens for `window` keyup and `<Keyboard @key=...>` to funnel all input through a single handler.
- Controls progression via `allowInput` so animations can complete before accepting more input.

## Game flow and evaluation algorithm

1) Input collection
- On letter: fills the next empty tile in the current row.
- On Backspace: clears the last non-empty tile in the current row.
- On Enter: validates and evaluates the guess if the row is full.

2) Validation
- The guess must be in `allWords` unless it equals the actual `answer` (answer is always allowed).
- Invalid: show message "Not in word list" and briefly shake the current row.

3) Scoring (three passes)
- Pass 1: Mark exact matches as `CORRECT` and null out those positions in a working copy of the answer.
- Pass 2: Mark remaining letters as `PRESENT` if they exist in the working copy (consuming one occurrence).
- Pass 3: Mark anything else as `ABSENT`.
- Keyboard coloring is updated monotonically (e.g., `PRESENT` won’t be downgraded to `ABSENT`).

4) End states
- All five tiles `CORRECT`: show a success message, generate a sharable result grid (🟩🟨⬜), and set `success=true`.
- Not solved and rows remain: advance to the next row after flip animations.
- Out of rows: reveal the answer.

5) UX details
- Tile flip, shake, and jump animations are driven by CSS, using transition/animation delays for a cascade effect.
- `main.ts` sets `--vh` on resize to work around mobile viewport sizing issues.

## Word-of-the-day selection

`getWordOfTheDay()` (`src/words.ts`):
- Base behavior: deterministic daily selection based on a start date (e.g., `new Date(2022, 0, 0)`).
- Override for demos/tests: if `location.search` contains a raw base64 word (e.g., `?Y2lnYXI=` for `cigar`), that is used instead.
- Exposes `allWords` for validation.

## Tests

Powered by Vitest (jsdom) and Vue Test Utils:
- `Keyboard.test.ts`: mounts the component and asserts it emits `key` for a letter, Enter, and Backspace (SVG button).
- `words.test.ts`: uses fake timers to pin the date and verifies both the base case and the base64 override path.

Run tests:

```sh
yarn test        # watch mode
yarn test:run    # one-shot
```

## Run locally

```sh
yarn install
yarn dev
```

## Build

```sh
yarn build
```

This produces a static build suitable for hosting. The current Vite setup emits to `docs/`.
