# Areej Adel — Portfolio

- **`index.html`** — the portfolio landing page (research, experience, work sample).
- **`demo/`** — a live React + TypeScript work sample ([details](./demo/README.md)).

The landing page is a single static HTML file. The demo is a Vite app that builds to
static files. A GitHub Actions workflow publishes both together to GitHub Pages.

---

## How to put this online (one-time setup)

You'll get one link like `https://<your-username>.github.io/areej-portfolio/`
that opens the landing page, with the live demo one click away.

1. **Create the repository.**
   On GitHub, create a new **public** repo named `areej-portfolio` (empty, no README).

2. **Upload these files.**
   On the new repo page → **Add file → Upload files** → drag in *everything* inside this
   `areej-portfolio` folder (the `index.html`, the `demo` folder, and the `.github` folder).
   Then **Commit changes**.
   > If the drag-and-drop skips the `.github` folder, use GitHub Desktop, or ask me and
   > I'll walk you through it.

3. **Turn on Pages with Actions.**
   Repo → **Settings → Pages** → under **Build and deployment → Source**, choose
   **GitHub Actions**.

4. **Wait ~2 minutes.**
   The **Actions** tab shows the build running. When it's green, your site is live at
   `https://<your-username>.github.io/areej-portfolio/`.

5. **Paste that link** into the company's *Portfolio / work samples* field. Done.

---

## What to write in the application field

> Portfolio: https://<your-username>.github.io/areej-portfolio/
> (Includes my IEEE Access publication, and a live React/TypeScript work sample I built.)

---

## Editing later

- The **demo link** on the landing page already points to `./demo/` — no edit needed once deployed.
- To tweak text, edit `index.html` and commit; the site rebuilds automatically.
