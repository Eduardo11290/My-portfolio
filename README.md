# Portfolio — Eduard

An award-tier, dark editorial developer portfolio. Built as a single-page
experience with cinematic typography, smooth scrolling and tasteful motion.

## Stack

- **React 19** + **TypeScript**
- **Vite** (build tool / dev server)
- **Tailwind CSS v4** (design tokens defined in `src/index.css` under `@theme`)
- **Framer Motion** (animations)
- **Lenis** (smooth scrolling)

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Project structure

```
src/
├── App.tsx              # Page composition (order of sections)
├── main.tsx            # React entry
├── index.css           # Tailwind v4 + design tokens (@theme) + base styles
├── data/
│   └── content.ts      # ⭐ ALL editable content lives here (bio, projects…)
├── lib/
│   └── motion.ts       # Shared Framer Motion variants & easing
├── components/         # Reusable building blocks
│   ├── SmoothScroll.tsx  # Lenis wrapper
│   ├── Cursor.tsx        # Custom desktop cursor
│   ├── Loader.tsx        # Intro % counter curtain
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Magnetic.tsx      # Magnetic hover effect for buttons
│   ├── Marquee.tsx       # Infinite scrolling strip
│   └── Reveal.tsx        # Scroll-into-view fade/rise helper
└── sections/           # The page sections
    ├── Hero.tsx
    ├── Work.tsx
    ├── About.tsx
    ├── Process.tsx
    └── Contact.tsx
```

## Making it yours

Open **`src/data/content.ts`** — every value marked `PLACEHOLDER` is meant to be
replaced with your real details: name, role, bio, projects, links, stats and
skills. The whole site updates from that one file.

- **Add a photo:** drop an image in `/public` and replace the gradient block in
  `src/sections/About.tsx` with an `<img>`.
- **Change the color accent:** edit `--color-ember` (and friends) in
  `src/index.css`.
- **Reorder sections:** edit the JSX order in `src/App.tsx`.

## Accessibility & performance

- Respects `prefers-reduced-motion` (disables smooth scroll, loader and
  animations).
- Keyboard-focusable, semantic landmarks, high-contrast text.
- Custom cursor only mounts on fine-pointer (desktop) devices.
