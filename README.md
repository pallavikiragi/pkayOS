# Pallavi OS — Design Workstation Portfolio

A retro Macintosh-inspired portfolio shell: fixed viewport (no page scroll), desktop folder icons, draggable windows, filter chips, and a background image slideshow.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Structure

- **Desktop icons** — UX Systems, Interactive Media, Sound.exe, Experiments, Playground, About, Trash
- **Folder windows** — project list with tag filter chips and “Open case study” CTAs
- **Project windows** — case study content in monospace document layout
- **Background** — grayscale cyber/ambient slideshow behind the OS chrome

## Customize

Edit `src/data/content.ts` to update projects, copy, images, and tags. Replace Unsplash URLs with your own assets in `public/` if you prefer local images.

## Build

```bash
npm run build
npm run preview
```
