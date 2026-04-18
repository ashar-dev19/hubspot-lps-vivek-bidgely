# Bidgely Custom Theme — project & module guide

This file is the **handoff document** for anyone cloning this repo on a new machine. It summarizes **how the project is structured**, **rules we follow for custom modules** (especially Customer Engagement–style sections), and **HubSpot CLI authentication** so you can build and upload without hunting through old chats.

---

## 1. What this repository is

- **HubSpot developer project** named `bidgely-custom-theme` (see root `hsproject.json`).
- **Source root:** `src/`. The installable theme lives under **`src/unified-theme/`** (based on HubSpot’s Elevate theme pattern: React/TS modules, HubL templates, fields).
- **CSS build:** Root **`vite`** compiles HubL-facing CSS (including `bidgely-custom.css`) into **`src/unified-theme/assets/dist/css/`**. The theme’s `main.hubl.css` imports the built bundles — **edit source under `assets/_hs/css` and `assets/css`, then run `npm run build`** before upload if CSS changed.
- **Customer Engagement (CE) work:** Section markup lives in **modules** (e.g. `CeHeroSection`). **Global CE section styles** live in **`src/unified-theme/assets/css/bidgely-custom.css`** (merged block scoped with `.customer-engagement-page` and `@scope`). There is **no** dedicated Customer Engagement page template in this repo anymore — use a **blank / drag-and-drop** template in HubSpot and place modules on the page.

---

## 2. Repository layout (high level)

| Path | Role |
|------|------|
| `hsproject.json` | Developer project name, `srcDir`, `platformVersion` (HubSpot may require bumps over time). |
| `package.json` (root) | `npm run build` (Vite), `npm run upload` / `npm run build-upload` (`hs project upload`). |
| `src/unified-theme/` | Theme: `theme.json`, `templates/`, `fields.json`, `components/modules/`, `assets/`. |
| `src/unified-theme/components/modules/*/` | Custom React modules (each folder = one module). |
| `src/unified-theme/assets/css/bidgely-custom.css` | Shared overrides + **CE section CSS** (large merged section). |
| `src/unified-theme/assets/_hs/css/main.hubl.css` | Theme stylesheet entry; **`@import` of `bidgely-custom.css`** (among others). |
| `src/unified-theme/assets/dist/css/` | **Generated** — do not hand-edit; produced by `npm run build`. |
| `src/unified-theme/package.json` | Theme-local deps (`@hubspot/cms-components`, etc.) and `npm run start` → CMS dev server. |

Optional local reference (not uploaded as part of the theme project unless you copy it in):

- `../HTML/customer-engagement.html` + `customer-engagement.css` — static prototypes outside the theme; use for visual/copy parity when building new CE modules.

---

## 3. Rules for building custom modules

These conventions came from how we **avoided duplicate CSS** and kept CE pages maintainable.

### 3.1 Tech stack per module

- **React + TypeScript** under `src/unified-theme/components/modules/<ModuleName>/`.
- Typical files:
  - **`index.tsx`** — `Component` export, `meta`, `defaultModuleConfig`, optional `hublDataTemplate`.
  - **`fields.tsx`** — field groups (HubSpot `FieldGroup`, text, links, etc.).
  - **`assets/*.svg`** — module icon for the picker.
- Use existing helpers from the theme: e.g. **`createComponent`** for HTML elements HubSpot expects, **`getLinkFieldHref`** / **`getLinkFieldTarget`** / **`getLinkFieldRel`** for link fields, types from **`@hubspot/cms-components/fields`**.

### 3.2 Module registration (`defaultModuleConfig`)

- Set **`moduleName`** to the HubSpot path pattern, e.g. `elevate/components/modules/ce_hero_section` (snake_case slug; folder is `CeHeroSection`).
- Set **`themeModule: true`** for theme-embedded modules.
- Bump **`version`** when you change **structure or fields** in a way that should invalidate cached module instances in the page editor.

### 3.3 CSS strategy (important)

1. **Prefer one global file for full-page / multi-section “design system” styles**  
   Put shared section layout, utilities, and CE-specific rules in **`bidgely-custom.css`** (or another file already imported by `main.hubl.css`) instead of duplicating the same rules in a second stylesheet or in multiple module CSS files.

2. **Customer Engagement–scoped styles**  
   The CE block in `bidgely-custom.css` uses **`.customer-engagement-page`** as the scope root and **`@scope (.customer-engagement-page)`** for inner rules. Any module that relies on those styles must render **inside** an element with `class="customer-engagement-page"` (the `CeHeroSection` module wraps its root in that div).

3. **Avoid a second `@import` mid-file**  
   Vite/bundlers require **`@import` at the top** of a CSS file before other rules. **Montserrat** (or other fonts) should be imported **once** at the top of `bidgely-custom.css`, not again inside merged sections.

4. **Module-level `*.module.css`**  
   The Elevate theme still uses co-located CSS for many stock modules. For **new CE sections** we standardized on **global CE CSS + markup-only modules** to prevent drift between a static page and HubSpot. You may still use `*.module.css` for **small, truly local** widget styles if it does not duplicate a global section design.

5. **Class names**  
   Match the global CSS: e.g. hero uses **`hero`**, **`hero__inner`**, **`btn btn--dark`**, **`eyebrow`**, etc., as defined in `bidgely-custom.css`, rather than inventing parallel BEM namespaces unless you also add those rules globally.

### 3.4 `meta` export

- **`label`**, **`icon`**, **`categories`**, **`content_types`** (`SITE_PAGE`, `LANDING_PAGE`, etc.) control where the module appears in HubSpot.

### 3.5 Accessibility & links

- Give main headings stable **`id`** and reference with **`aria-labelledby`** on sections when appropriate.
- Use the link-field helpers so **`target`** / **`rel`** behave correctly for external links.

---

## 4. Day-to-day commands

Run from **`bidgely-custom-theme/`** (repository root) unless noted.

| Command | Purpose |
|---------|---------|
| `npm install` | Root dependencies (Vite, PostCSS, etc.). |
| `npm install --prefix src/unified-theme` | Theme/React module dependencies (or `cd src/unified-theme && npm install`). |
| `npm run build` | Compile CSS (and any other Vite inputs) into `assets/dist/`. |
| `npm run upload` | Upload developer project to HubSpot (**requires CLI auth**). |
| `npm run build-upload` | Build then upload (recommended before verifying in the portal). |
| `cd src/unified-theme && npm run start` | Local **CMS dev server** (`hs-cms-dev-server`) for iterative module/template work. |

---

## 5. HubSpot CLI — install & authentication

Official references: [HubSpot CLI](https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/hubspot-cli-reference), [Personal access key](https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/personal-access-key), [Account commands](https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/commands/account-commands).

### 5.1 Install the CLI (global)

```bash
npm install -g @hubspot/cli@latest
```

Confirm:

```bash
hs --version
```

### 5.2 Authenticate (recommended: global config)

Create or update credentials in the **global** CLI config (CLI ≥ 7.4):

```bash
hs account auth
```

You will be prompted for a **personal access key**. Create one in HubSpot: **Settings → Account Setup → Integrations → Private Apps** (or the direct “personal access key” flow linked in HubSpot’s docs). Grant scopes needed for **CMS / developer projects** (and uploads), per your org’s policy.

Non-interactive example (CI or scripted):

```bash
hs account auth --personal-access-key="YOUR_KEY" --account="my-portal-alias"
```

Use a short **alias** with **no spaces** for `--account`.

### 5.3 Useful account commands

```bash
hs account list
hs account use <accountNameOrId>
hs account remove <accountNameOrId>
```

Optional: pin a different default **only in this folder**:

```bash
hs account create-override
```

### 5.4 Older pattern (still supported)

```bash
hs init
```

can create a local `hubspot.config.yml`. Prefer **`hs account auth`** for new setups so one global config works across projects.

### 5.5 Upload targeting

If you have multiple accounts:

```bash
hs project upload --account=<accountNameOrId>
```

(Exact flag spelling may vary slightly by CLI version; use `hs project upload --help`.)

---

## 6. New machine checklist

1. Install **Node.js** (LTS, matches what your team uses).
2. Clone repo → `cd bidgely-custom-theme`.
3. `npm install` and `npm install --prefix src/unified-theme`.
4. `npm install -g @hubspot/cli@latest`.
5. `hs account auth` → paste personal access key → `hs account list` / `hs account use` as needed.
6. `npm run build-upload` to push the theme project to the linked HubSpot account.
7. In HubSpot: create pages with a **blank** (or DnD) template, add **Bidgely Custom Theme** modules, publish.

---

## 7. Operational notes

- **Platform version:** `hsproject.json` sets `platformVersion`. HubSpot may warn when a version approaches end-of-support; upgrade per [HubSpot developer project docs](https://developers.hubspot.com/docs/cms/reference/hsl/projects) when required.
- **Build warnings** during `hs project upload` (e.g. unresolved optional module fields in **stock** templates) are often **non-fatal**; fix when they point at your own templates/modules.
- **Removing templates** from the repo does not change existing HubSpot pages still assigned to that template — update those pages in the UI.

---

## 8. Quick reference — CE hero module

- **Folder:** `src/unified-theme/components/modules/CeHeroSection/`
- **Wrapper:** outer `<div class="customer-engagement-page">` so global CE CSS applies.
- **Styles:** `bidgely-custom.css` (not a separate CE-only CSS file in the theme).

If you add more CE sections, repeat the pattern: **fields + React markup in the module**, **classes aligned with `bidgely-custom.css`**, **scope wrapper** when using the CE design tokens and `@scope` block.
