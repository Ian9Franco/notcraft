"use client"

import { useEffect } from "react"

export default function ScrollAnimation() {
  useEffect(() => {
    // Función para manejar la animación de entrada
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Si el elemento es visible
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
        } else {
          // Opcional: remover la clase cuando el elemento sale del viewport
          // para que se anime nuevamente al volver a entrar
          // entry.target.classList.remove("is-visible");
        }
      })
    }

    // Configurar el observador con opciones
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // viewport
      rootMargin: "0px", // sin margen
      threshold: 0.15, // 15% del elemento debe ser visible
    })

    // Observar todos los elementos con la clase fade-in-section
    const fadeElements = document.querySelectorAll(".fade-in-section")
    fadeElements.forEach((element) => {
      observer.observe(element)
    })

    // Limpiar el observador cuando el componente se desmonte
    return () => {
      fadeElements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])

  return null
}
