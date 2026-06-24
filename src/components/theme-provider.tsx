import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Thin wrapper around next-themes. The portfolio is dark-only, so we default
 * to (and keep) the `dark` theme — this also makes `useTheme()` resolve to
 * "dark" for components like DottedSurface that branch on it.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
