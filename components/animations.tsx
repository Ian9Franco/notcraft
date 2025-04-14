"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Componente que revela elementos con animación cuando aparecen en el viewport
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
}) {
  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 }
      case "down":
        return { y: -50, opacity: 0 }
      case "left":
        return { x: 50, opacity: 0 }
      case "right":
        return { x: -50, opacity: 0 }
      default:
        return { y: 50, opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialProps()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Componente de sección con efecto parallax
 */
export function ParallaxSection({
  children,
  bgImage,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  height = "400px",
  className = "",
}: {
  children: React.ReactNode
  bgImage: string
  overlayColor?: string
  height?: string
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ height }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          transform: "translateZ(0)",
        }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />
      <div className="relative z-10 h-full flex items-center justify-center">{children}</div>
    </div>
  )
}

/**
 * Componente que gestiona las animaciones de aparición al hacer scroll
 */
export function ScrollAnimation() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".fade-in-section")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return null
}

/**
 * Componente para animar la entrada de elementos
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Componente para animar elementos con escala
 */
export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
