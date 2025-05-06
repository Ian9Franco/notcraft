"use client"

import React, { useEffect, useRef } from "react"
import { motion, useAnimation, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Componente que revela elementos con animación cuando aparecen en el viewport
 * Versión mejorada con más efectos y opciones de personalización
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  once = true,
  amount = 0.1,
  duration = 0.6,
  ease = [0.22, 1, 0.36, 1],
  staggerChildren = 0,
  staggerDelay = 0.1,
  withFade = true,
  distance = 50,
  scale = 1,
  rotate = 0,
}: {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
  once?: boolean
  amount?: number
  duration?: number
  ease?: number[] | string
  staggerChildren?: number
  staggerDelay?: number
  withFade?: boolean
  distance?: number
  scale?: number
  rotate?: number
}) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })
  const hasAnimated = useRef(false)

  // Obtener propiedades iniciales según la dirección
  const getInitialProps = () => {
    const initialProps: any = { opacity: withFade ? 0 : 1 }

    if (scale !== 1) {
      initialProps.scale = scale
    }

    if (rotate !== 0) {
      initialProps.rotate = rotate
    }

    switch (direction) {
      case "up":
        initialProps.y = distance
        break
      case "down":
        initialProps.y = -distance
        break
      case "left":
        initialProps.x = distance
        break
      case "right":
        initialProps.x = -distance
        break
    }

    return initialProps
  }

  // Animar cuando el elemento entra en el viewport
  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      controls.start((i = 0) => ({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
          duration,
          delay: delay + (staggerChildren ? i * staggerDelay : 0),
          ease,
        },
      }))
      hasAnimated.current = true
    }
  }, [isInView, controls, delay, duration, ease, staggerChildren, staggerDelay])

  // Reiniciar la animación si once es false y el elemento sale del viewport
  useEffect(() => {
    if (!once && !isInView && hasAnimated.current) {
      controls.start(getInitialProps())
      hasAnimated.current = false
    }
  }, [isInView, once, controls])

  // Si no hay hijos, no renderizar nada
  if (!children) return null

  // Si staggerChildren es mayor que 0, animar cada hijo por separado
  if (staggerChildren > 0 && React.Children.count(children) > 1) {
    return (
      <div ref={ref} className={className}>
        {React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            custom={i}
            initial={getInitialProps()}
            animate={controls}
            className="will-change-transform"
          >
            {child}
          </motion.div>
        ))}
      </div>
    )
  }

  // Animación estándar para un solo elemento o grupo
  return (
    <motion.div
      ref={ref}
      initial={getInitialProps()}
      animate={controls}
      className={cn("will-change-transform", className)}
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
  speed = 0.5,
}: {
  children: React.ReactNode
  bgImage: string
  overlayColor?: string
  height?: string
  className?: string
  speed?: number
}) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ height }}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
        initial={{ scale: 1.1 }}
        whileInView={{
          scale: 1,
          y: [0, -15 * speed],
        }}
        transition={{
          scale: { duration: 1.5, ease: "easeOut" },
          y: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            duration: 8,
            ease: "easeInOut",
          },
        }}
        viewport={{ once: true, margin: "-100px" }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />
      <div className="relative z-10 h-full flex items-center justify-center">{children}</div>
    </div>
  )
}

/**
 * Componente para animar la entrada de elementos
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}) {
  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { y: 20, opacity: 0 }
      case "down":
        return { y: -20, opacity: 0 }
      case "left":
        return { x: 20, opacity: 0 }
      case "right":
        return { x: -20, opacity: 0 }
      default:
        return { y: 20, opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialProps()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
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
  from = 0.9,
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  from?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: from }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Componente para animar texto letra por letra
 */
export function TextReveal({
  text,
  delay = 0,
  staggerChildren = 0.03,
  className = "",
  highlightWords = [],
  highlightColor = "text-accent",
}: {
  text: string
  delay?: number
  staggerChildren?: number
  className?: string
  highlightWords?: string[]
  highlightColor?: string
}) {
  const words = text.split(" ")

  return (
    <motion.div
      className={cn("inline-block", className)}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {words.map((word, wordIndex) => {
        const isHighlighted = highlightWords.includes(word)

        return (
          <span key={wordIndex} className="inline-block mr-1">
            <motion.span
              className={isHighlighted ? highlightColor : ""}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + wordIndex * staggerChildren * 2, duration: 0.3 }}
            >
              {Array.from(word).map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: delay + (wordIndex * word.length + charIndex) * staggerChildren,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </span>
        )
      })}
    </motion.div>
  )
}

/**
 * Componente para animar elementos con efecto de flotación
 */
export function FloatingElement({
  children,
  amplitude = 10,
  duration = 3,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  amplitude?: number
  duration?: number
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Componente para animar elementos con efecto de rotación
 */
export function RotateElement({
  children,
  degrees = 10,
  duration = 3,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  degrees?: number
  duration?: number
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      animate={{
        rotate: [-degrees / 2, degrees / 2, -degrees / 2],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Componente para animar elementos con efecto de pulsación
 */
export function PulseElement({
  children,
  scale = 1.05,
  duration = 2,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  scale?: number
  duration?: number
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Componente para animar la aparición de elementos en secuencia
 */
export function StaggerChildren({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}) {
  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { y: 20, opacity: 0 }
      case "down":
        return { y: -20, opacity: 0 }
      case "left":
        return { x: 20, opacity: 0 }
      case "right":
        return { x: -20, opacity: 0 }
      default:
        return { y: 20, opacity: 0 }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: getInitialProps(),
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div className={className} variants={containerVariants} initial="hidden" animate="show">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child

        return <motion.div variants={itemVariants}>{child}</motion.div>
      })}
    </motion.div>
  )
}

/**
 * Componente para animar la transición entre páginas
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  )
}

/**
 * Componente para animar elementos con efecto de desvanecimiento
 */
export function FadeInOut({
  children,
  duration = 0.5,
  className = "",
  isVisible = true,
}: {
  children: React.ReactNode
  duration?: number
  className?: string
  isVisible?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Componente para animar elementos con efecto de rebote
 */
export function BounceElement({
  children,
  amplitude = 10,
  duration = 0.6,
  delay = 0,
  className = "",
  repeat = true,
}: {
  children: React.ReactNode
  amplitude?: number
  duration?: number
  delay?: number
  className?: string
  repeat?: boolean
}) {
  const bounceVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -amplitude, 0],
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
        repeat: repeat ? Number.POSITIVE_INFINITY : 0,
        repeatDelay: 1,
      },
    },
  }

  return (
    <motion.div className={className} variants={bounceVariants} initial="initial" animate="animate">
      {children}
    </motion.div>
  )
}

/**
 * Componente para animar elementos con efecto de escritura
 */
export function TypewriterEffect({
  text,
  delay = 0,
  speed = 0.05,
  className = "",
  cursor = true,
}: {
  text: string
  delay?: number
  speed?: number
  className?: string
  cursor?: boolean
}) {
  const [displayText, setDisplayText] = React.useState("")
  const [index, setIndex] = React.useState(0)
  const [showCursor, setShowCursor] = React.useState(true)

  React.useEffect(() => {
    let timeout: NodeJS.Timeout

    if (index < text.length) {
      timeout = setTimeout(
        () => {
          setDisplayText((prev) => prev + text.charAt(index))
          setIndex((prev) => prev + 1)
        },
        delay * 1000 + speed * 1000,
      )
    } else if (cursor) {
      // Blink cursor after typing is complete
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)
      return () => clearInterval(cursorInterval)
    }

    return () => clearTimeout(timeout)
  }, [index, text, delay, speed, cursor])

  return (
    <div className={className}>
      <span>{displayText}</span>
      {cursor && index < text.length && <span className="animate-pulse">|</span>}
      {cursor && index >= text.length && showCursor && <span>|</span>}
    </div>
  )
}

/**
 * Componente para animar elementos con efecto de desplazamiento
 */
export function SlideIn({
  children,
  direction = "left",
  distance = 100,
  duration = 0.5,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  direction?: "left" | "right" | "up" | "down"
  distance?: number
  duration?: number
  delay?: number
  className?: string
}) {
  const getInitialProps = () => {
    switch (direction) {
      case "left":
        return { x: -distance, opacity: 0 }
      case "right":
        return { x: distance, opacity: 0 }
      case "up":
        return { y: -distance, opacity: 0 }
      case "down":
        return { y: distance, opacity: 0 }
      default:
        return { x: -distance, opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialProps()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
