/**
 * Declaración de tipos para react-intersection-observer
 * Extiende la definición del módulo para proporcionar tipado correcto
 */
import type React from "react"

declare module "react-intersection-observer" {
  /**
   * Hook useInView para detectar cuando un elemento entra en el viewport
   *
   * @param options - Opciones de configuración para IntersectionObserver
   * @returns Tupla con [ref, inView, entry]
   *   - ref: Referencia para adjuntar al elemento observado
   *   - inView: Boolean que indica si el elemento está en el viewport
   *   - entry: Objeto IntersectionObserverEntry con información detallada
   */
  export function useInView(options?: {
    /** Si es true, el observador se desconecta después de la primera vez que el elemento entra en el viewport */
    triggerOnce?: boolean
    /** Valor entre 0 y 1 que indica qué porcentaje del elemento debe estar visible */
    threshold?: number | number[]
    /** Margen alrededor del elemento para el cálculo de intersección */
    rootMargin?: string
    /** Elemento que se usa como viewport para comprobar la visibilidad */
    root?: Element | null
  }): [React.RefObject<any>, boolean, IntersectionObserverEntry | undefined]
}

