"use client"

import type { ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Props para el proveedor de temas
 */
interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

/**
 * Proveedor de temas para la aplicación
 * Permite cambiar entre temas claro, oscuro y sistema
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  )
}

