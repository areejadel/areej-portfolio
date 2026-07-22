# Bilingual AI-Ops Dashboard

A small, production-shaped demo built to mirror the stack and practices I use in
client work — without exposing any client code. Everything here is mine to share.

**Live:** open `../` (the portfolio landing page) → **View demo**, or run it locally below.

## What it shows

- **Bilingual UI (Arabic / English) with full RTL** — `react-i18next`; the document
  `dir`/`lang` switch automatically with the language.
- **Drag-and-drop task board** — `@dnd-kit`, move cards across `To do → In progress → Done`.
- **Optimistic updates** — cards move instantly and roll back on error
  (`@tanstack/react-query` mutations).
- **Type-safe forms with Zod** — validation messages are i18n keys, resolved per language.
- **AI assistant panel with structured output** — turns a prompt into a validated list of
  subtasks. The model's raw output is parsed through a **Zod boundary** before it touches the UI.
- **Tested** — `Vitest` + React Testing Library (schema, form validation, and the
  structured-output boundary).

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · TanStack Query · Zod · dnd-kit ·
react-i18next · Vitest · ESLint · Prettier

## Architecture

Feature-module layout — each feature owns its types, data access, hooks, components and tests:

```
src/
  features/
    board/        # task board: types, zod schema, api, hooks, components, tests
    assistant/    # AI panel: model (stand-in), zod-validated api, hook, component, tests
  components/      # shared UI (language toggle)
  i18n/           # i18next setup + AR/EN locales
  lib/            # query client
  mocks/          # in-memory data store
  test/           # test setup + helpers
```

**Data layer.** `boardApi` and `askAssistant` are the only places that "talk to a backend."
In this demo they resolve from an in-memory store with simulated latency, so the app runs
fully client-side on GitHub Pages with no server. In a real project the same interfaces are
backed by a REST API and covered with MSW integration tests — the components and hooks stay
identical; only these modules change.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run test     # run the test suite
npm run build    # production build → dist/
```
