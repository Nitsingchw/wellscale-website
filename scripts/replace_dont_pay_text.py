#!/usr/bin/env python3
"""
Replace "you don't pay" / "or you don't pay" / "pay us a single rupee" text
with stronger, professional copy that fits a performance marketing agency.

The user asked to remove "you don't pay" and replace it with better text.
"""

from pathlib import Path

REPLACEMENTS = [
    # Footer description
    (
        "Performance marketing agency built exclusively for aesthetic clinics. We\n"
        "              scale your revenue 3X in 30 days — or you don&apos;t pay us a single rupee.",
        "Performance marketing agency built exclusively for aesthetic clinics. We\n"
        "              engineer patient pipelines that scale your revenue 3X in 30 days.",
    ),

    # Contact section "What happens next" card
    (
        'body: "If we don\'t 3X your revenue in 30 days, you don\'t pay us a single rupee.",',
        'body: "If we don\'t hit 3X revenue growth in 30 days, we work free until we do.",',
    ),

    # Contact page "What happens next" card
    (
        'body: "If we don\'t 3X your revenue in 30 days, you don\'t pay us a single rupee. No contracts lock you in.",',
        'body: "If we don\'t hit 3X revenue growth in 30 days, we work free until we do. No contracts lock you in.",',
    ),

    # Guarantee section main copy
    (
        "We are so confident in our system that if we don&apos;t scale your\n"
        "              clinic&apos;s revenue by 3X within 30 days, you don&apos;t pay us a single\n"
        "              rupee after that. No fine print. No awkward conversations. Just results —\n"
        "              or a clean exit.",
        "We are so confident in our system that we put our fees on the line. If we\n"
        "              don&apos;t scale your clinic&apos;s revenue by 3X within 30 days, we work for\n"
        "              free until we do. No fine print. No awkward conversations. Just\n"
        "              measurable results — tracked weekly, signed off monthly.",
    ),

    # Guarantee section badge text "Or You Don't Pay"
    (
        '<span className="relative z-10">Or You Pay</span>',
        '<span className="relative z-10">Or We Work</span>',
    ),
    (
        "Or You Don&apos;t Pay</div>",
        "Or We Work Free</div>",
    ),

    # Terms page section 3 (the guarantee clause) — keep formal phrasing but tweak
    (
        "campaign launch, you do not pay us a single rupee for that",
        "campaign launch, we waive our service fees for that",
    ),
]

FILES = [
    "src/components/site/footer.tsx",
    "src/components/site/contact-section.tsx",
    "src/components/site/contact-page.tsx",
    "src/components/site/guarantee-section.tsx",
    "src/components/site/terms-page.tsx",
]

def main():
    base = Path("/home/z/my-project")
    for rel in FILES:
        path = base / rel
        if not path.exists():
            print(f"MISS: {path}")
            continue
        original = path.read_text()
        updated = original
        for old, new in REPLACEMENTS:
            updated = updated.replace(old, new)
        if updated != original:
            path.write_text(updated)
            diffs = sum(1 for a, b in zip(original, updated) if a != b)
            print(f"OK:  {rel}  (~{diffs} chars changed)")
        else:
            print(f"NOP: {rel}")

if __name__ == "__main__":
    main()
