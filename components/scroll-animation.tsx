"use client"

import { useEffect } from "react"

export default function ScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          } else {
            // Opcional: remover la clase cuando el elemento sale del viewport
            // entry.target.classList.remove("is-visible");
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    const fadeElements = document.querySelectorAll(".fade-in-section")
    fadeElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      fadeElements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])

  return null
}

