"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { NetheriousLogo } from "./netherious-logo"

/**
 * Componente de depuración que muestra todos los posibles estados del logo
 * para ayudar a visualizar cómo se ven en diferentes combinaciones.
 */
export function LogoDebug() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratación usando useEffect
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-6 space-y-8 bg-background rounded-lg border border-border">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Configuración del Logo</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`px-4 py-2 rounded-md ${theme === "light" ? "bg-accent text-accent-foreground" : "bg-secondary"}`}
          >
            Tema Claro
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 rounded-md ${theme === "dark" ? "bg-accent text-accent-foreground" : "bg-secondary"}`}
          >
            Tema Oscuro
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          Tema actual: <span className="font-semibold">{theme === "dark" ? "Oscuro" : "Claro"}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="p-4 border border-border rounded-lg">
          <h3 className="mb-2 font-semibold">Ubicación: Sidebar</h3>
          <div className="h-20">
            <NetheriousLogo size={80} location="sidebar" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Logo usado: Negro (siempre)</p>
        </div>

        {/* Header */}
        <div className="p-4 border border-border rounded-lg">
          <h3 className="mb-2 font-semibold">Ubicación: Header</h3>
          <div className="h-20">
            <NetheriousLogo size={80} location="header" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Logo usado: Negro (siempre)</p>
        </div>

        {/* Footer */}
        <div className="p-4 border border-border rounded-lg">
          <h3 className="mb-2 font-semibold">Ubicación: Footer</h3>
          <div className="h-20">
            <NetheriousLogo size={80} location="footer" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Logo usado: {theme === "dark" ? "Blanco" : "Negro"}
          </p>
        </div>

        {/* Forzado blanco */}
        <div className="p-4 border border-border rounded-lg">
          <h3 className="mb-2 font-semibold">Forzado: Blanco</h3>
          <div className="h-20">
            <NetheriousLogo size={80} forceVariant="white" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Logo siempre blanco independientemente del tema</p>
        </div>

        {/* Forzado negro */}
        <div className="p-4 border border-border rounded-lg">
          <h3 className="mb-2 font-semibold">Forzado: Negro</h3>
          <div className="h-20">
            <NetheriousLogo size={80} forceVariant="black" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Logo siempre negro independientemente del tema</p>
        </div>
      </div>

      <div className="p-4 bg-secondary/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Guía de Uso</h3>
        <p className="text-sm mb-3">Para usar el logo en cualquier componente:</p>
        <pre className="p-3 bg-background text-xs overflow-x-auto rounded-md">
          {`import { NetheriousLogo } from "@/components/icons/netherious-logo"

// Logo que cambia automáticamente según tema y ubicación
<NetheriousLogo size={120} location="sidebar" /> // Siempre negro
<NetheriousLogo size={120} location="header" />  // Siempre negro
<NetheriousLogo size={120} location="footer" />  // Negro en claro, blanco en oscuro

// Forzar un color específico
<NetheriousLogo size={60} forceVariant="white" />
<NetheriousLogo size={60} forceVariant="black" />`}
        </pre>
      </div>
    </div>
  )
}
