"""Merge HTML New/customer-engagement.css into the theme's bidgely-custom.css CE @scope block.

Run from repo root (folder that contains `scripts/` and `bidgely-custom-theme/`):

  python scripts/merge-ce-css.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
THEME_ROOT = REPO_ROOT / "bidgely-custom-theme"
NEW_CE = REPO_ROOT / "HTML New" / "customer-engagement.css"
BIDGELY = THEME_ROOT / "src" / "unified-theme" / "assets" / "css" / "bidgely-custom.css"

CE_PREAMBLE = r"""/* -----------------------------------------------------------------------------
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
  --container: 1300px;
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
  /* Theme: let the page/template background show through (standalone HTML may use --white on body instead). */
  background: transparent;
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

p {
  margin-block: 0;
}

.customer-engagement-page a {
  color: inherit;
}

/* All section + utility rules below only match inside the Customer Engagement page wrapper */
@scope (.customer-engagement-page) {
"""


def strip_global_preamble(src: str) -> str:
    """Remove @import, :root, and global base rules up through anchor `a` (before Utilities)."""
    s = re.sub(
        r"@import\s+url\(\"https://fonts\.googleapis\.com/css2[^\"]+\"\)\s*;\s*",
        "",
        src,
        count=1,
    )
    s = re.sub(
        r"/\* -+\s*\n\s*Design tokens\s*-+ \*/\s*:root\s*\{[^}]*\}\s*",
        "",
        s,
        count=1,
        flags=re.DOTALL,
    )
    s = re.sub(
        r"/\* -+\s*\n\s*Base\s*-+ \*/\s*"
        r"\*,\s*\*::before,\s*\*::after\s*\{[^}]*\}\s*"
        r"html\s*\{[^}]*\}\s*"
        r"body\s*\{[^}]*\}\s*"
        r"/\* Reset browser[^*]*\*/\s*"
        r"p\s*\{[^}]*\}\s*"
        r"img\s*\{[^}]*\}\s*"
        r"a\s*\{[^}]*\}\s*",
        "",
        s,
        count=1,
        flags=re.DOTALL,
    )
    s = re.sub(
        r"^/\* =+\s*\n\s*Customer Engagement[^*]*\*/\s*",
        "",
        s,
        count=1,
        flags=re.MULTILINE,
    )
    s = re.sub(
        r"(@media\s*\(max-width:\s*768px\)\s*\{)\s*:root\s*\{",
        r"\1\n  .customer-engagement-page {",
        s,
    )
    return s.strip()


def find_scope_block(css: str) -> tuple[int, int]:
    """Return [start, end) slice indices for CE block from comment through closing @scope `}`."""
    start = css.find(
        "/* -----------------------------------------------------------------------------\n   Customer Engagement page"
    )
    if start == -1:
        raise ValueError("CE section start not found")
    scope_kw = "@scope (.customer-engagement-page) {"
    scope_start = css.find(scope_kw, start)
    if scope_start == -1:
        raise ValueError("@scope not found")
    pos = scope_start + len(scope_kw) - 1
    assert css[pos] == "{", repr(css[pos - 5 : pos + 5])
    depth = 1
    pos += 1
    while pos < len(css) and depth:
        c = css[pos]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
        pos += 1
    return start, pos


def main() -> None:
    if not NEW_CE.is_file():
        print(f"Missing source: {NEW_CE}", file=sys.stderr)
        sys.exit(1)
    if not BIDGELY.is_file():
        print(f"Missing target: {BIDGELY}", file=sys.stderr)
        sys.exit(1)

    new_src = NEW_CE.read_text(encoding="utf-8")
    inner = strip_global_preamble(new_src)

    bidgely = BIDGELY.read_text(encoding="utf-8")
    s0, s1 = find_scope_block(bidgely)
    before = bidgely[:s0]
    after = bidgely[s1:].lstrip("\n")
    if after.startswith("}"):
        after = after[1:].lstrip("\n")

    merged = before + CE_PREAMBLE + inner + "\n\n}\n" + after
    BIDGELY.write_text(merged, encoding="utf-8", newline="\n")
    print(f"Wrote {BIDGELY} ({len(merged)} chars); CE inner ~{len(inner)} chars")


if __name__ == "__main__":
    main()
