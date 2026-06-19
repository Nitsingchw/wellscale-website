#!/usr/bin/env python3
"""
Fix the "invisible sections" issue.

Root cause: framer-motion's `whileInView` with `initial={{ opacity: 0 }}`
can fail to trigger when:
  - The user scrolls past a section quickly (the viewport never intersects
    for long enough)
  - The browser's intersection observer hasn't fired yet on initial paint
  - The section is taller than the viewport (so the "enter" threshold isn't met)

When this happens, the element stays at `opacity: 0` and appears blank.

Fix: replace `whileInView` with `animate` for section headers and key
content blocks (so they ALWAYS animate in on mount), and only keep
`whileInView` for staggered card grids where the reveal is purely cosmetic.
Also make viewport margins much more generous.
"""

import re
from pathlib import Path

FILES = [
    "src/components/site/metrics-section.tsx",
    "src/components/site/guarantee-section.tsx",
    "src/components/site/services-section.tsx",
    "src/components/site/contact-section.tsx",
    "src/components/site/hero-section.tsx",
    "src/components/site/about-page.tsx",
    "src/components/site/team-page.tsx",
    "src/components/site/contact-page.tsx",
    "src/components/site/legal-page.tsx",
    "src/components/site/page-hero.tsx",
]

def fix_content(content: str) -> str:
    # Pattern: initial={{ opacity: 0, ... }} whileInView={{ opacity: 1, ... }} viewport={{ once: true, margin: "..." }}
    # Replace `whileInView` with `animate` so the element always animates in on mount.

    # Match a motion.* element with initial + whileInView + viewport + transition
    # We'll do a simpler approach: replace the keyword `whileInView` with `animate`
    # wherever it appears alongside `viewport={{ once: true`. This makes the element
    # animate in on mount regardless of scroll position.

    # Strategy: any `whileInView={{ opacity: 1` (which is the "show" state) -> `animate={{ opacity: 1`
    # And remove the `viewport={...}` prop since it's no longer needed (animate runs on mount).
    # But preserve `whileInView` for staggered grids where we want the reveal on scroll.

    # Simplest fix that addresses the bug: convert ALL `whileInView` -> `animate` and
    # remove `viewport={...}` props. This makes everything visible on mount, with the
    # entrance animation still playing. Cards will all animate in at once instead of
    # staggering, but the user prefers visibility over stagger.

    # Replace `whileInView=` with `animate=`
    content = re.sub(r'\bwhileInView=', 'animate=', content)

    # Remove `viewport={{ ... }}` props (single-line)
    content = re.sub(r'\s*viewport=\{\{[^}]*\}\}', '', content)

    return content

def main():
    base = Path("/home/z/my-project")
    for rel in FILES:
        path = base / rel
        if not path.exists():
            print(f"MISS: {path}")
            continue
        original = path.read_text()
        updated = fix_content(original)
        if updated != original:
            path.write_text(updated)
            # Count changes
            changes_while = original.count("whileInView=") - updated.count("whileInView=")
            changes_viewport = original.count("viewport=") - updated.count("viewport=")
            print(f"OK:  {rel}  (removed {changes_while} whileInView, {changes_viewport} viewport)")
        else:
            print(f"NOP: {rel}")

if __name__ == "__main__":
    main()
