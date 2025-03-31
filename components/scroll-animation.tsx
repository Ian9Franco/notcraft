"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function ScrollAnimation() {
  const pathname = usePathname()
  const router = useRouter()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isInitialRender = useRef(true)
  const navigationInProgress = useRef(false)

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

  // Interceptar clics en enlaces para asegurar que las animaciones no interfieran
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (link && link.getAttribute("href")?.startsWith("/") && !link.getAttribute("target")) {
        e.preventDefault()

        // Evitar navegaciones múltiples
        if (navigationInProgress.current) return
        navigationInProgress.current = true

        // Hacer visible todo inmediatamente
        document.querySelectorAll(".fade-in-section").forEach((element) => {
          element.classList.add("is-visible")
        })

        // Navegar después de un breve retraso
        setTimeout(() => {
          router.push(link.getAttribute("href") || "/")
          navigationInProgress.current = false
        }, 50)
      }
    }

    document.addEventListener("click", handleLinkClick)
    return () => document.removeEventListener("click", handleLinkClick)
  }, [router])

  return null
}

