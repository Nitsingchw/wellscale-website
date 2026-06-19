#!/usr/bin/env python3
"""
Convert hardcoded oklch() values in src/app/globals.css (utility classes only,
NOT the theme-variable blocks) to use CSS variables so they adapt per-theme.

Strategy: simple regex substitutions for the most common color patterns.
We avoid touching the :root/.dark/.light/.lime-light variable declaration
blocks (those SHOULD have hardcoded values).
"""

import re
from pathlib import Path

SRC = Path("/home/z/my-project/src/app/globals.css")
text = SRC.read_text(encoding="utf-8")
lines = text.splitlines(keepends=True)

# Identify the variable-declaration blocks we must NOT touch.
# These are: :root, .dark, .light, .lime-light — every line inside
# `--xxx: oklch(...)` should remain literal.
# We detect block boundaries by tracking brace depth and selector.
out = []
in_var_block = False
brace_depth = 0

# Substitution rules — order matters (longest patterns first).
# Each rule: (regex, replacement). We use color-mix() for opacity variants.
rules = [
    # lime with opacity  → color-mix with --lime
    (re.compile(r"oklch\(0\.88\s+0\.21\s+124\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--lime) {float(m.group(1))*100:.0f}%, transparent)"),
    # lime solid
    (re.compile(r"oklch\(0\.88\s+0\.21\s+124\)"), "var(--lime)"),

    # darker lime chart-2 with opacity
    (re.compile(r"oklch\(0\.70\s+0\.18\s+124\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--chart-2) {float(m.group(1))*100:.0f}%, transparent)"),
    (re.compile(r"oklch\(0\.70\s+0\.18\s+124\)"), "var(--chart-2)"),
    (re.compile(r"oklch\(0\.75\s+0\.22\s+132\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--chart-2) {float(m.group(1))*100:.0f}%, transparent)"),
    (re.compile(r"oklch\(0\.75\s+0\.22\s+132\)"), "var(--chart-2)"),
    (re.compile(r"oklch\(0\.95\s+0\.18\s+124\)"), "var(--lime-soft)"),
    (re.compile(r"oklch\(0\.95\s+0\.08\s+124\)"), "var(--lime-soft)"),

    # near-white lime-tinted foreground text
    (re.compile(r"oklch\(0\.95\s+0\.02\s+124\)"), "var(--foreground)"),

    # deep ink
    (re.compile(r"oklch\(0\.13\s+0\.005\s+240\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--ink) {float(m.group(1))*100:.0f}%, transparent)"),
    (re.compile(r"oklch\(0\.13\s+0\.005\s+240\)"), "var(--ink)"),

    # card panel
    (re.compile(r"oklch\(0\.18\s+0\.005\s+240\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--card) {float(m.group(1))*100:.0f}%, transparent)"),
    (re.compile(r"oklch\(0\.18\s+0\.005\s+240\)"), "var(--card)"),

    # secondary panel
    (re.compile(r"oklch\(0\.24\s+0\.005\s+240\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--secondary) {float(m.group(1))*100:.0f}%, transparent)"),
    (re.compile(r"oklch\(0\.24\s+0\.005\s+240\)"), "var(--secondary)"),

    # muted panel
    (re.compile(r"oklch\(0\.20\s+0\.005\s+240\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--muted) {float(m.group(1))*100:.0f}%, transparent)"),
    (re.compile(r"oklch\(0\.20\s+0\.005\s+240\)"), "var(--muted)"),

    # sidebar panel
    (re.compile(r"oklch\(0\.15\s+0\.005\s+240\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--sidebar) {float(m.group(1))*100:.0f}%, transparent)"),
    (re.compile(r"oklch\(0\.15\s+0\.005\s+240\)"), "var(--sidebar)"),

    # border
    (re.compile(r"oklch\(0\.28\s+0\.005\s+240\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--border) {float(m.group(1))*100:.0f}%, transparent)"),
    (re.compile(r"oklch\(0\.28\s+0\.005\s+240\)"), "var(--border)"),

    # black with opacity → use shadow-base for ~0.5/0.6, otherwise color-mix
    (re.compile(r"oklch\(0\s+0\s+0\s*/\s*0\.5\)"), "var(--shadow-base)"),
    (re.compile(r"oklch\(0\s+0\s+0\s*/\s*0\.6\)"), "var(--shadow-base-strong)"),
    (re.compile(r"oklch\(0\s+0\s+0\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--black) {float(m.group(1))*100:.0f}%, transparent)"),

    # white with opacity → use --white (which is theme-aware)
    (re.compile(r"oklch\(1\s+0\s+0\s*/\s*([\d.]+)\)"),
     lambda m: f"color-mix(in oklch, var(--white) {float(m.group(1))*100:.0f}%, transparent)"),
    (re.compile(r"oklch\(1\s+0\s+0\)"), "var(--white)"),

    # chart-4 / chart-5 grey shades
    (re.compile(r"oklch\(0\.40\s+0\.02\s+240\)"), "var(--chart-4)"),
    (re.compile(r"oklch\(0\.25\s+0\.02\s+240\)"), "var(--chart-5)"),

    # near-black "0.99 0 0" used for ink-foreground in places
    (re.compile(r"oklch\(0\.99\s+0\s+0\)"), "var(--ink-foreground)"),
]

def transform_value(val: str) -> str:
    """Apply all substitution rules to a CSS value string."""
    out_val = val
    for pattern, repl in rules:
        if callable(repl):
            out_val = pattern.sub(repl, out_val)
        else:
            out_val = pattern.sub(repl, out_val)
    return out_val


def is_var_declaration_block_start(line: str) -> bool:
    """Detect lines that open a variable declaration block.
    We treat :root, .dark, .light, .lime-light as var blocks."""
    stripped = line.strip()
    # Match selectors like ":root,", ":root {", ".dark {", ".light {", ".lime-light {"
    # (possibly with comma-separated selectors like ":root, .dark {")
    return bool(re.match(r"^(?::root(?:\s*,\s*\.dark)?|\.dark|\.light|\.lime-light)\s*\{", stripped))


for line in lines:
    stripped = line.strip()

    # Track entering a var declaration block
    if is_var_declaration_block_start(line):
        in_var_block = True
        brace_depth = line.count("{") - line.count("}")
        out.append(line)
        continue

    if in_var_block:
        brace_depth += line.count("{") - line.count("}")
        out.append(line)
        if brace_depth <= 0:
            in_var_block = False
        continue

    # Outside any var block — check if this line declares a CSS var
    # (e.g. `--grid-line: oklch(...)`). We DO want to skip those because they
    # are intentionally literal.
    if re.match(r"^\s*--[a-z-]+\s*:", line) and "oklch(" in line:
        out.append(line)
        continue

    # Otherwise, apply transformations to the line
    transformed = transform_value(line)
    out.append(transformed)

new_text = "".join(out)
SRC.write_text(new_text, encoding="utf-8")
print(f"Done. Wrote {len(new_text)} bytes to {SRC}")

# Quick sanity check: count remaining hardcoded oklch() outside var blocks
remaining = 0
in_var_block = False
brace_depth = 0
for line in new_text.splitlines():
    if is_var_declaration_block_start(line + "\n"):
        in_var_block = True
        brace_depth = 1
        continue
    if in_var_block:
        brace_depth += line.count("{") - line.count("}")
        if brace_depth <= 0:
            in_var_block = False
        continue
    if re.match(r"^\s*--[a-z-]+\s*:", line) and "oklch(" in line:
        continue
    if "oklch(0." in line or "oklch(1 0 0" in line or "oklch(0 0 0" in line:
        remaining += 1
        print(f"  Remaining: {line.strip()[:100]}")

print(f"\nLines with remaining hardcoded oklch outside var blocks: {remaining}")
