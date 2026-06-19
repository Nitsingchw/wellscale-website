#!/usr/bin/env python3
"""
Apply strict black + lime theme across all section/page files.

Replaces any white-background or light-grey references with dark-theme equivalents.
Only two visual colors should remain: black (background family) + lime (accent).
Text colors: white (with opacity variations) for body, lime for accents.
"""

import re
from pathlib import Path

FILES = [
    "src/components/site/navbar.tsx",
    "src/components/site/metrics-section.tsx",
    "src/components/site/services-section.tsx",
    "src/components/site/guarantee-section.tsx",
    "src/components/site/contact-section.tsx",
    "src/components/site/footer.tsx",
    "src/components/site/mobile-cta.tsx",
    "src/components/site/page-hero.tsx",
    "src/components/site/about-page.tsx",
    "src/components/site/team-page.tsx",
    "src/components/site/contact-page.tsx",
    "src/components/site/legal-page.tsx",
    "src/components/site/privacy-page.tsx",
    "src/components/site/terms-page.tsx",
]

# Replacements applied in order
REPLACEMENTS = [
    # === Background colors ===
    # White backgrounds -> transparent / dark
    ("bg-white/85", "bg-ink/85"),
    ("bg-white/95", "bg-ink/95"),
    ("bg-white/90", "bg-ink/90"),
    ("bg-white/70", "bg-ink/70"),
    ("bg-white/60", "bg-ink/60"),
    ("bg-white/50", "bg-ink/50"),
    ("bg-white/40", "bg-ink/40"),
    ("bg-white/30", "bg-ink/30"),
    ("bg-white/20", "bg-ink/20"),
    ("bg-white/10", "bg-ink/10"),
    ("bg-white/5", "bg-ink/5"),
    # bare bg-white -> dark
    ("bg-white", "bg-ink"),

    # bg-ink/85 backdrop-blur-xl — keep as is (it's already dark)
    # bg-ink (bare) — keep

    # Mint wash / lime wash — lime-wash now dark in globals.css, keep
    # bg-mint-wash — legacy, replace
    ("bg-mint-wash", "bg-lime-wash"),

    # === Borders ===
    # Light borders -> dark borders
    ("border-[oklch(0.90_0.005_120)]", "border-white/10"),
    ("border-[oklch(0.92_0.01_180)]", "border-white/10"),
    ("border-[oklch(0.88_0.01_180)]", "border-white/10"),
    ("border-[oklch(0.94_0.01_180)]", "border-white/10"),
    ("border-[oklch(0.94_0.003_120)]", "border-white/5"),
    ("border-[oklch(0.85_0.005_120)]", "border-white/10"),

    # === Text colors ===
    # text-ink on light backgrounds -> text-white on dark backgrounds
    ("text-ink", "text-white"),
    # text-foreground on light -> text-white
    ("text-foreground", "text-white"),
    # text-muted-foreground -> text-white/60 (since muted is now dark grey)
    ("text-muted-foreground", "text-white/60"),
    # foreground/80 etc.
    ("text-foreground/80", "text-white/80"),
    ("text-foreground/70", "text-white/70"),
    ("text-foreground/60", "text-white/60"),

    # === Background utilities derived from old light palette ===
    # bg-secondary (was light grey) -> use white/5 (dark grey translucent)
    ("bg-secondary/60", "bg-white/5"),
    ("bg-secondary/70", "bg-white/5"),
    ("bg-secondary/50", "bg-white/5"),
    ("bg-secondary/40", "bg-white/5"),
    ("bg-secondary/30", "bg-white/5"),
    ("bg-secondary/20", "bg-white/5"),
    ("bg-secondary", "bg-white/5"),

    # bg-lime-soft (was pale lime) -> lime/10 (translucent lime on dark)
    ("bg-lime-soft/40", "bg-lime/10"),
    ("bg-lime-soft/60", "bg-lime/10"),
    ("bg-lime-soft/70", "bg-lime/10"),
    ("bg-lime-soft", "bg-lime/10"),

    # hover:bg-secondary -> hover:bg-white/5
    ("hover:bg-secondary/60", "hover:bg-white/5"),
    ("hover:bg-secondary/50", "hover:bg-white/5"),
    ("hover:bg-secondary", "hover:bg-white/5"),

    # focus:bg-ink/10 (was used for active state on white) — keep, but ensure dark-friendly
    # bg-ink/10 used as accent — keep

    # === Shadow tints — make sure they're dark-friendly ===
    # oklch shadow refs that referenced old colors — keep most, but tweak the ink shadow
    ("shadow-[0_4px_24px_-12px_oklch(0.13_0.005_240_/_0.12)]",
     "shadow-[0_4px_24px_-12px_oklch(0_0_0_/_0.5)]"),
    ("shadow-[0_10px_24px_-8px_oklch(0.13_0.005_240_/_0.55)]",
     "shadow-[0_10px_24px_-8px_oklch(0.88_0.21_124_/_0.45)]"),
    ("shadow-[0_14px_30px_-8px_oklch(0.13_0.005_240_/_0.7)]",
     "shadow-[0_14px_30px_-8px_oklch(0.88_0.21_124_/_0.6)]"),
    ("shadow-[0_14px_32px_-10px_oklch(0.13_0.005_240_/_0.6)]",
     "shadow-[0_14px_32px_-10px_oklch(0.88_0.21_124_/_0.5)]"),
    ("shadow-[0_18px_40px_-10px_oklch(0.13_0.005_240_/_0.75)]",
     "shadow-[0_18px_40px_-10px_oklch(0.88_0.21_124_/_0.65)]"),
    ("shadow-[0_18px_40px_-10px_oklch(0.13_0.005_240_/_0.8)]",
     "shadow-[0_18px_40px_-10px_oklch(0.88_0.21_124_/_0.7)]"),
    ("shadow-[0_-10px_30px_-12px_oklch(0.13_0.005_240_/_0.25)]",
     "shadow-[0_-10px_30px_-12px_oklch(0_0_0_/_0.5)]"),

    # === Specific section backgrounds ===
    # metrics section bg-ink -> already dark, keep
    # guarantee section bg-lime-wash -> now dark (lime radial on ink), keep
    # services bg-lime-wash -> keep
    # contact bg-ink (was bg-white) -> already handled by bg-white -> bg-ink

    # "ring-2 ring-lime/50" — keep
    # "ring-2 ring-primary/30" — keep (primary is now lime)

    # === Form inputs ===
    # Input bg-white -> bg-ink/40 (translucent dark)
    # These have specific border-[oklch(0.85_0.005_120)] which we already replaced

    # === Color class swaps that don't conflict ===
    # text-white stays text-white
    # text-lime stays text-lime
    # bg-lime stays bg-lime
    # bg-ink stays bg-ink

    # === Specific: ring-amber-400 (for stars) -> ring-lime ===
    ("fill-amber-400", "fill-lime"),
    ("text-amber-400", "text-lime"),
]

def retheme(content: str) -> str:
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)
    return content

def main():
    base = Path("/home/z/my-project")
    total_changes = 0
    for rel in FILES:
        path = base / rel
        if not path.exists():
            print(f"MISS: {path}")
            continue
        original = path.read_text()
        updated = retheme(original)
        if updated != original:
            path.write_text(updated)
            # rough change count
            diffs = sum(1 for a, b in zip(original, updated) if a != b)
            total_changes += diffs
            print(f"OK:  {rel}  (~{diffs} chars changed)")
        else:
            print(f"NOP: {rel}")
    print(f"\nTotal: ~{total_changes} chars changed across {len(FILES)} files")

if __name__ == "__main__":
    main()
