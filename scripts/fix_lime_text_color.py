#!/usr/bin/env python3
"""
Replace `text-white` with `text-ink` ONLY on elements that have a solid `bg-lime`
background (not translucent variants like bg-lime/15, bg-lime/10, etc.).

Solid lime backgrounds are bright — text on them should be black (text-ink) for readability.
Translucent lime backgrounds sit on dark — text on them should stay lime/white.

Also handle:
- `bg-lime text-white` -> `bg-lime text-ink`
- `border-lime bg-lime text-white` -> `border-lime bg-lime text-ink`
- Standalone `bg-lime` followed by `text-white` in same className string
"""

import re
from pathlib import Path

FILES = [
    "src/components/site/navbar.tsx",
    "src/components/site/hero-section.tsx",
    "src/components/site/metrics-section.tsx",
    "src/components/site/services-section.tsx",
    "src/components/site/guarantee-section.tsx",
    "src/components/site/contact-section.tsx",
    "src/components/site/contact-page.tsx",
    "src/components/site/footer.tsx",
    "src/components/site/mobile-cta.tsx",
    "src/components/site/page-hero.tsx",
    "src/components/site/about-page.tsx",
    "src/components/site/team-page.tsx",
    "src/components/site/legal-page.tsx",
]

def fix_content(content: str) -> str:
    # Strategy: find className strings that contain `bg-lime` (solid, NOT followed by /)
    # and replace `text-white` with `text-ink` within those strings.

    # Pattern: match className="..." or className={`...`} that contains `bg-lime` (solid)
    # We'll process line by line for simplicity.

    lines = content.split('\n')
    out = []
    for line in lines:
        # Check if line contains solid bg-lime (bg-lime not followed by / or -)
        # Use regex: bg-lime followed by space, quote, or word boundary (not / or -)
        if re.search(r'bg-lime(?![-/\w])', line):
            # This line has a solid bg-lime. Replace text-white -> text-ink on this line.
            new_line = re.sub(r'\btext-white\b', 'text-ink', line)
            out.append(new_line)
        else:
            out.append(line)

    return '\n'.join(out)

def main():
    base = Path("/home/z/my-project")
    total = 0
    for rel in FILES:
        path = base / rel
        if not path.exists():
            print(f"MISS: {path}")
            continue
        original = path.read_text()
        updated = fix_content(original)
        if updated != original:
            path.write_text(updated)
            # count
            diffs = sum(1 for a, b in zip(original, updated) if a != b)
            total += diffs
            print(f"OK:  {rel}  (~{diffs} chars changed)")
        else:
            print(f"NOP: {rel}")
    print(f"\nTotal: ~{total} chars changed")

if __name__ == "__main__":
    main()
