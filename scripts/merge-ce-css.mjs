import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const NEW_CE = path.join(REPO, "HTML New", "customer-engagement.css");
const BIDGELY = path.join(__dirname, "..", "src", "unified-theme", "assets", "css", "bidgely-custom.css");
const LOG = path.join(__dirname, "merge-ce-log.txt");

const CE_PREAMBLE = `/* -----------------------------------------------------------------------------
   Customer Engagement page — all section styles (merged from HTML New/customer-engagement.css)
   ----------------------------------------------------------------------------- */

/* -----------------------------------------------------------------------------
   Design tokens (scoped — only applies inside .customer-engagement-page)
   ----------------------------------------------------------------------------- */
.customer-engagement-page {
  --font-size: 16px;
  --white: #ffffff;
  --off: #eff7ff;
  --off-b: #d7efff;
  --light-blue: #d7efff;
  --ink: #152d49;
  --ink-mid: #1e3d5c;
  --ink-muted: rgba(21, 45, 73, 0.52);
  --ink-faint: rgba(21, 45, 73, 0.1);
  --ink-hair: rgba(21, 45, 73, 0.07);
  --navy: #152d49;
  --navy-mid: #1a3558;
  --teal: #449bd5;
  --teal-lt: #7abfe8;
  --sans: "Montserrat", sans-serif;
  --body: "Montserrat", sans-serif;
  --space-page: 3.5rem;
  --container: 1200px;
  --radius-lg: 24px;
  --radius-md: 18px;
  --radius-sm: 14px;
  --radius-xs: 9px;
  --shadow-mock: 0 4px 24px rgba(13, 17, 23, 0.08), 0 1px 6px rgba(13, 17, 23, 0.04);
  --shadow-card: 0 4px 20px rgba(13, 17, 23, 0.07);
  font-size: var(--font-size);
  scroll-behavior: smooth;
  margin: 0;
  font-family: var(--body);
  line-height: 1.6;
  color: var(--ink);
  background: var(--white);
  overflow-x: hidden;
}

/* -----------------------------------------------------------------------------
   Base (scoped to Customer Engagement page)
   ----------------------------------------------------------------------------- */
.customer-engagement-page *,
.customer-engagement-page *::before,
.customer-engagement-page *::after {
  box-sizing: border-box;
}

.customer-engagement-page p {
  margin: 0;
}

.customer-engagement-page img {
  max-width: 100%;
  height: auto;
}

.customer-engagement-page a {
  color: inherit;
}

/* All section + utility rules below only match inside the Customer Engagement page wrapper */
@scope (.customer-engagement-page) {
`;

function stripGlobalPreamble(src) {
  let s = src.replace(
    /@import\s+url\("https:\/\/fonts\.googleapis\.com\/css2[^"]+"\)\s*;\s*/,
    "",
  );
  s = s.replace(
    /\/\* -+\s*\n\s*Design tokens\s*-+ \*\/\s*:root\s*\{[^}]*\}\s*/s,
    "",
  );
  s = s.replace(
    /\/\* -+\s*\n\s*Base\s*-+ \*\/\s*\*,\s*\*::before,\s*\*::after\s*\{[^}]*\}\s*html\s*\{[^}]*\}\s*body\s*\{[^}]*\}\s*\/\* Reset browser[^*]*\*\/\s*p\s*\{[^}]*\}\s*img\s*\{[^}]*\}\s*a\s*\{[^}]*\}\s*/s,
    "",
  );
  s = s.replace(/^\/\* =+\s*\n\s*Customer Engagement[^*]*\*\/\s*/m, "");
  s = s.replace(
    /(@media\s*\(max-width:\s*768px\)\s*\{)\s*:root\s*\{/,
    "$1\n  .customer-engagement-page {",
  );
  return s.trim();
}

function findScopeBlock(css) {
  const start = css.indexOf(
    "/* -----------------------------------------------------------------------------\n   Customer Engagement page",
  );
  if (start === -1) throw new Error("CE section start not found");
  const scopeKw = "@scope (.customer-engagement-page) {";
  const scopeStart = css.indexOf(scopeKw, start);
  if (scopeStart === -1) throw new Error("@scope not found");
  let pos = scopeStart + scopeKw.length - 1;
  if (css[pos] !== "{") throw new Error("expected {");
  let depth = 1;
  pos += 1;
  while (pos < css.length && depth) {
    const c = css[pos];
    if (c === "{") depth += 1;
    else if (c === "}") depth -= 1;
    pos += 1;
  }
  return [start, pos];
}

try {
  const newSrc = fs.readFileSync(NEW_CE, "utf8");
  const inner = stripGlobalPreamble(newSrc);
  const bidgely = fs.readFileSync(BIDGELY, "utf8");
  const [s0, s1] = findScopeBlock(bidgely);
  const merged =
    bidgely.slice(0, s0) + CE_PREAMBLE + inner + "\n\n}\n" + bidgely.slice(s1);
  fs.writeFileSync(BIDGELY, merged, "utf8");
  fs.writeFileSync(
    LOG,
    `OK wrote ${merged.length} chars to bidgely-custom.css\nNEW_CE=${NEW_CE}\n`,
    "utf8",
  );
} catch (e) {
  fs.writeFileSync(LOG, String(e?.stack || e), "utf8");
  process.exit(1);
}
