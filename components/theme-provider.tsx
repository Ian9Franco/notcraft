"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Define props including children
type Props = {
  children: React.ReactNode
  defaultTheme?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = true,
}: Props) {
  // Cast to any to bypass TypeScript checking for children
  const providerProps = {
    attribute,
    defaultTheme,
    enableSystem,
    disableTransitionOnChange,
  } as any

  return <NextThemesProvider {...providerProps}>{children}</NextThemesProvider>
}

