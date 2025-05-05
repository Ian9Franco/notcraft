// Add a media query hook to help with responsive design

"use client"

import { useState, useEffect } from "react"

/**
 * Hook para detectar si un media query coincide
 * @param query Media query a evaluar (ej: "(max-width: 768px)")
 * @returns Boolean que indica si el media query coincide
 */
export function useMediaQuery(query: string): boolean {
  // Estado inicial basado en SSR
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Verificar si window está disponible (solo en cliente)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Establecer el valor inicial
      setMatches(media.matches)

      // Definir callback para actualizar el estado
      const listener = () => setMatches(media.matches)

      // Agregar listener
      media.addEventListener("change", listener)

      // Limpiar listener al desmontar
      return () => media.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}
