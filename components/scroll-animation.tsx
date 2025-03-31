"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export default function ScrollAnimation() {
  const pathname = usePathname()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isInitialRender = useRef(true)

  useEffect(() => {
    // Inmediatamente hacer visible todo el contenido para evitar páginas en blanco
    document.querySelectorAll(".fade-in-section").forEach((element) => {
      element.classList.add("is-visible")
    })

    // Después de un breve retraso, configurar el observador para animaciones futuras
    const timer = setTimeout(() => {
      // Limpiar observador anterior
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      // Crear nuevo observador
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible")
            }
          })
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        },
      )

      // Observar elementos
      const fadeElements = document.querySelectorAll(".fade-in-section")
      fadeElements.forEach((element) => {
        if (observerRef.current) {
          observerRef.current.observe(element)
        }
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [pathname])

  return null
}

