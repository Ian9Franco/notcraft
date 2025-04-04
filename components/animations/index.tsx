"use client"

import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"

/**
 * Componente que gestiona las animaciones de aparición al hacer scroll
 * Configura un IntersectionObserver para detectar elementos con la clase 'fade-in-section'
 */
export function ScrollAnimation() {
  const pathname = usePathname()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Inmediatamente hacer visible todo el contenido para evitar páginas en blanco
    document.querySelectorAll(".fade-in-section").forEach((element) => {
      element.classList.add("is-visible")
    })

    // Configurar el observador para animaciones futuras después de un breve retraso
    const timer = setTimeout(() => {
      // Limpiar observador anterior
      if (observerRef.current) observerRef.current.disconnect()

      // Crear nuevo observador
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("is-visible")
          })
        },
        { threshold: 0.1 },
      )

      // Observar elementos
      document.querySelectorAll(".fade-in-section").forEach((element) => {
        if (observerRef.current) observerRef.current.observe(element)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [pathname])

  return null
}

/**
 * Props para el componente ScrollReveal
 */
interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
}

/**
 * Componente que revela elementos con animación cuando aparecen en el viewport
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
}: ScrollRevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Props para el componente ParallaxSection
 */
interface ParallaxSectionProps {
  children: ReactNode
  bgImage?: string
  speed?: number
  className?: string
}

/**
 * Componente que crea un efecto de parallax al hacer scroll
 */
export function ParallaxSection({ children, bgImage, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {bgImage && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

