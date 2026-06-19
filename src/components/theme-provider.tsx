"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * Wrap the app with next-themes so users can switch between
 * "dark" (default), "light" (white) and "lime-light" themes.
 *
 * The theme class is applied to <html> via `attribute="class"`,
 * so globals.css rules like `.light { ... }` and `.lime-light { ... }`
 * take effect automatically.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
