# Module + CSS working notes (Bidgely theme)

This repo uses a mix of **global theme styles** (`bidgely-theme/css/main.css`) and **module-scoped styles** (`bidgely-theme/modules/<module>.module/module.css`).  
Use this doc as the “rules of the road” when creating or updating modules.

## When to use `main.css` vs module CSS

- **Use `main.css`** when:
  - A style is truly **global and reused** across many templates/modules (buttons, typography, base section spacing, shared utilities).
  - The class names are already part of the site-wide system (examples: `.btn`, `.section`, `.container`, shared `.hero` patterns).

- **Use module CSS** when:
  - The style is **specific to one module** or a one-off layout.
  - You are adding new layout rules (grid/flex) that might conflict with other pages.
  - You need per-instance customization (e.g. background images) without touching global CSS.

## How to scope module CSS correctly

- Always scope rules under a module-specific wrapper/class so you don’t affect other pages.
  - Good: `.hero--2-cols .hero__inner { ... }`
  - Good: `.resources-hubdb .splide__pagination { ... }`
  - Avoid: `.hero__inner { ... }` (too global)

- Prefer **adding a unique modifier class** to the module root (example: `hero--2-cols`) and scope everything beneath it.

## Responsive behavior (recommended defaults)

- Desktop layouts should collapse cleanly for mobile.
- Prefer breakpoints that match existing theme usage:
  - **≤ 991px**: stack 2-column layouts into 1 column
  - **≤ 768px**: reduce large headings/padding when needed

Example pattern used in modules:

```css
.my-module .two-col {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;
}

@media (max-width: 991px) {
  .my-module .two-col {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

## Dynamic CSS (per-page/per-instance values)

If something needs to be editable in HubSpot (like a background image), **don’t hardcode it in `main.css`**.

- Add a module field (ex: `background_image`).
- Pass it into the markup as a **CSS variable** on the module root element:

```html
<section class="my-module" style="--my-bg: url('{{ module.background_image.src|escape }}');">
```

- Use the variable in module CSS:

```css
.my-module {
  background-image: var(--my-bg);
  background-repeat: no-repeat;
  background-position: center;
}
```

This keeps the behavior isolated to the module instance.

## HubL module include notes (templates)

When pasting a `{% module %}` include into a template:

- Use **plain HubL object syntax** (no escaped quotes like `\"...\"`).  
  Escaped quotes can cause HubSpot validation errors during upload.

Correct example:

```hubl
{% module "hero_affordability"
  path="../modules/hero-2-columns.module",
  cta_link={ "url": { "type": "EXTERNAL", "href": "#" }, "open_in_new_tab": false, "no_follow": false },
  image={ "src": "https://example.com/image.png", "alt": "Alt text", "loading": "lazy" }
%}
```

## Carousel/slider behavior (library choice + UX)

If you need a carousel:

- Prefer a **library** instead of custom slider logic.
- Current approach used in this repo: **Splide (CDN)**.
- UX requirements we followed:
  - **No arrows**
  - **Dots/pagination enabled**
  - **Autoplay**: `interval: 5000`
  - **Pause on hover** enabled
  - Responsive columns:
    - Mobile: 1
    - Tablet: 2
    - Desktop: 3

## Practical checklist for new modules

- **Fields**: create `fields.json` with sensible defaults (match the HTML you start from).
- **Markup**: keep markup clean; reuse existing global classes (`.container`, `.btn`) where appropriate.
- **CSS**: add only what’s needed; keep it scoped under a module wrapper.
- **Responsiveness**: stack columns at ≤991px by default unless specified otherwise.
- **Template usage**: include a copy/paste `{% module %}` snippet comment inside `module.html` if the module is often pasted into templates.

