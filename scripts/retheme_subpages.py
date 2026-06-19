#!/usr/bin/env python3
"""
Retheme sub-pages from medical/teal to agency black+lime.

Replacements (applied in order):
- Stethoscope -> Megaphone (icon import name)
- HeartPulse -> TrendingUp
- Activity -> TrendingUp  (where it appears in agency context)
- bg-mint-wash -> bg-lime-wash
- clinical-card -> agency-card
- bg-foreground -> bg-ink
- text-primary -> text-ink (but keep text-primary for the lime brand where used as accent on white)
- text-accent -> text-lime
- bg-primary -> bg-ink (since on white, primary button is dark)
- bg-accent -> bg-lime
- border-primary -> border-lime
- border-accent -> border-lime
- text-foreground -> text-ink (mostly)
- text-white -> text-white (keep, but on dark sections)
- ring-primary -> ring-lime
- ring-accent -> ring-lime
- focus:ring-primary -> focus:ring-lime
- focus:border-primary -> focus:border-lime
- bg-primary/10 -> bg-lime/15
- bg-accent/10 -> bg-lime/15
- bg-primary/20 -> bg-lime/20
- bg-accent/20 -> bg-lime/20
- text-primary-foreground -> text-lime (when on dark bg)
- ecg-line -> growth-line
- pulse-dot -> live-dot
"""

import re
import sys
from pathlib import Path

FILES = [
    "src/components/site/about-page.tsx",
    "src/components/site/team-page.tsx",
    "src/components/site/contact-page.tsx",
    "src/components/site/legal-page.tsx",
]

# Replacements applied in order. Order matters!
REPLACEMENTS = [
    # Icon imports
    ("Stethoscope", "Megaphone"),
    ("HeartPulse", "TrendingUp"),
    # Backgrounds
    ("bg-mint-wash", "bg-lime-wash"),
    ("clinical-card", "agency-card"),
    ("bg-foreground", "bg-ink"),
    ("bg-chart-grid-dark", "bg-chart-grid-dark"),  # keep
    # ECG -> growth line
    ("ecg-line", "growth-line"),
    ("pulse-dot", "live-dot"),
    # Focus/border colors
    ("focus:ring-primary/20", "focus:ring-lime/30"),
    ("focus:ring-primary", "focus:ring-lime"),
    ("focus:border-primary", "focus:border-lime"),
    # Tints
    ("bg-primary/10", "bg-lime/15"),
    ("bg-accent/10", "bg-lime/15"),
    ("bg-primary/20", "bg-lime/20"),
    ("bg-accent/20", "bg-lime/20"),
    ("bg-primary/30", "bg-lime/30"),
    ("bg-accent/30", "bg-lime/30"),
    # Border tints
    ("border-primary/15", "border-lime/20"),
    ("border-primary/20", "border-lime/30"),
    ("border-primary/30", "border-lime/40"),
    ("border-primary/40", "border-lime/50"),
    ("border-accent/15", "border-lime/20"),
    ("border-accent/20", "border-lime/30"),
    ("border-accent/30", "border-lime/40"),
    # Ring
    ("ring-primary/20", "ring-lime/30"),
    ("ring-primary/30", "ring-lime/40"),
    ("ring-primary", "ring-lime"),
    ("ring-accent", "ring-lime"),
    # Solid colors - on white, primary button becomes dark (ink), accent becomes lime
    # But where text-primary is used as the accent color, it should be lime
    # We need to be careful: bg-primary on light = ink button (text-lime), bg-accent = lime button (text-ink)
    # text-primary on light = lime brand accent
    # text-foreground = ink body text
    # text-primary-foreground on dark = lime text
    # text-accent-foreground on lime = ink text
    ("text-primary-foreground", "text-lime"),
    ("text-accent-foreground", "text-ink"),
    ("bg-primary", "bg-ink"),
    ("bg-accent", "bg-lime"),
    ("text-primary", "text-lime"),
    ("text-accent", "text-lime"),
    # Foreground on light backgrounds -> ink (very dark)
    ("text-foreground", "text-ink"),
    # Borders generic
    ("border-primary", "border-lime"),
    ("border-accent", "border-lime"),
    # Shadow tinted references
    ("oklch(0.55 0.13 185)", "oklch(0.13 0.005 240)"),
    ("oklch(0.62 0.16 162)", "oklch(0.88 0.21 124)"),
    # Specific teal hex/oklch leftovers
    ("oklch(0.92 0.01 180)", "oklch(0.90 0.005 120)"),
    ("oklch(0.88 0.01 180)", "oklch(0.85 0.005 120)"),
    ("oklch(0.94 0.01 180)", "oklch(0.92 0.003 120)"),
    ("oklch(0.94_0.01_180)", "oklch(0.92_0.003_120)"),
    ("oklch(0.92_0.01_180)", "oklch(0.90_0.005_120)"),
    ("oklch(0.88_0.01_180)", "oklch(0.85_0.005_120)"),
]

def retheme(content: str) -> str:
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)
    return content

def main():
    base = Path("/home/z/my-project")
    for rel in FILES:
        path = base / rel
        if not path.exists():
            print(f"MISS: {path}")
            continue
        original = path.read_text()
        updated = retheme(original)
        if updated != original:
            path.write_text(updated)
            # Count changes
            changes = sum(1 for a, b in zip(original, updated) if a != b)
            print(f"OK:  {rel}  (~{changes} chars changed)")
        else:
            print(f"NOP: {rel}")

if __name__ == "__main__":
    main()
