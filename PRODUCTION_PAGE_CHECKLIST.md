# Bidgely Production Page Checklist (HubSpot)

Use this checklist before publishing or updating any production page built with the Bidgely theme.

---

## 1) Template and Theme Readiness

- [ ] Page is using the correct production theme/template (not a sandbox/test template).
- [ ] Template metadata is valid:
  - [ ] `templateType` is correct (`page`, `blog`, etc.).
  - [ ] `isAvailableForNewContent` is intentionally set (`true` only when needed).
  - [ ] Template label is clear and non-ambiguous.
- [ ] Required HubSpot includes are present:
  - [ ] `{{ standard_header_includes }}`
  - [ ] `{{ standard_footer_includes }}`
- [ ] Global header/footer modules are included and rendering correctly.

---

## 2) Module Integrity

- [ ] All required modules render in editor and on preview.
- [ ] Module fields have safe defaults (no blank critical values).
- [ ] No module runtime warnings in HubSpot preview/build logs for critical fields.
- [ ] Conditional fields behave correctly for all common content states.
- [ ] If using video/search/custom modules, verify required field keys are populated (for example `player_id`, style settings, etc.).

---

## 3) Content and UX Quality

- [ ] H1 is present and unique on the page.
- [ ] Hero content, CTAs, and links are final and approved.
- [ ] All internal/external links work and open as intended.
- [ ] Images have meaningful alt text where relevant.
- [ ] No placeholder copy/images remain.
- [ ] Forms submit to the correct destination and confirmation flow works.

---

## 4) SEO and Metadata

- [ ] Page title and meta description are set and reviewed.
- [ ] Canonical URL is correct (if applicable).
- [ ] Open Graph/social preview fields are set (where needed).
- [ ] Indexing behavior (`noindex`/`nofollow`) matches intent.

---

## 5) Accessibility and Responsiveness

- [ ] Keyboard navigation works for primary interactions.
- [ ] Color contrast is acceptable for text and buttons.
- [ ] Focus states are visible.
- [ ] Page layout is validated on desktop, tablet, and mobile breakpoints.
- [ ] No content overlap/truncation at common viewport widths.

---

## 6) Performance and Stability

- [ ] Images are optimized/compressed appropriately.
- [ ] Avoid unnecessary large inline CSS/JS in template head.
- [ ] Page loads without visible layout breakage or console-critical errors.
- [ ] Third-party scripts are necessary and intentionally included.

---

## 7) Build and Deploy (CMS CLI Flow)

Run from your local theme root (folder containing `theme.json`):

```bash
npm run build
hs account use <production_account_alias_or_id>
hs cms upload "<local_theme_folder>" "<remote_theme_folder>"
```

Release only when:

- [ ] Upload completes successfully with no blocking errors.
- [ ] Any warnings are reviewed and accepted, or fixed if high risk.
- [ ] Updated theme files are visible in production Design Manager.

---

## 8) Account and Environment Safety

- [ ] Confirm active HubSpot account before upload/deploy.
- [ ] Verify you are not deploying sandbox content to production accidentally.
- [ ] Production URLs and account-specific IDs/tokens are correct.
- [ ] Account-specific assets (files, forms, HubDB tables) exist in production.

---

## 9) Post-Deploy Verification

- [ ] Open deployed URL and verify key sections visually.
- [ ] Submit at least one form test in production-safe manner.
- [ ] Validate critical CTAs and conversion paths.
- [ ] Confirm analytics/tracking events fire as expected.
- [ ] Confirm no new high-severity warnings/errors in logs.

---

## 10) Rollback Plan

- [ ] Previous stable Git commit/tag is recorded.
- [ ] Team knows who can run rollback upload.
- [ ] Rollback command/process is tested and documented.

Recommended:

```bash
# checkout known-good revision first, then re-upload that version
git checkout <known_good_commit_or_tag>
hs cms upload "<local_theme_folder>" "<remote_theme_folder>"
```

---

## Team Sign-off

- [ ] Dev sign-off
- [ ] QA sign-off
- [ ] Content sign-off
- [ ] Final deploy owner sign-off

Release date:

Owner:

