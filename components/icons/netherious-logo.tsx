"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Mantenemos la misma interfaz para no romper el código existente
export interface NetheriousLogoProps {
  className?: string
  size?: number
  showText?: boolean
  animate?: boolean
  intensity?: "low" | "medium" | "high" | string
}

export function NetheriousLogo({
  className,
  size = 80,
  showText = true,
  animate = true,
  intensity = "medium",
}: NetheriousLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Determinamos los colores basados en la intensidad
  const getIntensityColors = () => {
    switch (intensity) {
      case "low":
        return {
          primary: "#8B5CF6",
          secondary: "#C4B5FD",
          glow: "rgba(139, 92, 246, 0.5)",
        }
      case "high":
        return {
          primary: "#4F46E5",
          secondary: "#818CF8",
          glow: "rgba(79, 70, 229, 0.8)",
        }
      default: // medium
        return {
          primary: "#6D28D9",
          secondary: "#A78BFA",
          glow: "rgba(109, 40, 217, 0.6)",
        }
    }
  }

  const colors = getIntensityColors()

  // Efecto para el canvas con partículas mejoradas
  useEffect(() => {
    if (!canvasRef.current) return
    if (!animate) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configuramos el canvas para alta resolución
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    // Configuración de partículas basada en la intensidad
    const particleCount = intensity === "low" ? 15 : intensity === "high" ? 35 : 25
    const particleMaxSize = intensity === "low" ? 2 : intensity === "high" ? 3 : 2.5
    const particleMaxSpeed = intensity === "low" ? 0.3 : intensity === "high" ? 0.7 : 0.5

    // Creamos partículas con propiedades mejoradas
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * size,
      y: Math.random() * size,
      size: Math.random() * particleMaxSize + 0.5,
      speedX: (Math.random() - 0.5) * particleMaxSpeed,
      speedY: (Math.random() - 0.5) * particleMaxSpeed,
      opacity: Math.random() * 0.5 + 0.3,
      // Añadimos propiedades para efectos de pulsación
      pulse: Math.random() * 0.02 + 0.01,
      pulseTick: Math.random() * Math.PI * 2,
      // Color aleatorio entre primario y secundario
      color: Math.random() > 0.7 ? colors.secondary : colors.primary,
    }))

    // Función para dibujar las conexiones entre partículas cercanas
    const drawConnections = () => {
      const connectionDistance = size * 0.25
      ctx.strokeStyle = colors.secondary + "40" // 25% de opacidad
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance
            ctx.globalAlpha = opacity * 0.2
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    // Función para dibujar las partículas
    const draw = () => {
      ctx.clearRect(0, 0, size, size)

      // Dibujamos un sutil resplandor de fondo
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      gradient.addColorStop(0, colors.glow + "30") // 19% opacidad
      gradient.addColorStop(1, "transparent")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size, size)

      // Dibujamos las conexiones
      drawConnections()

      // Dibujamos las partículas
      particles.forEach((p) => {
        // Efecto de pulsación
        p.pulseTick += p.pulse
        const pulseFactor = 0.2 * Math.sin(p.pulseTick) + 1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2)
        ctx.fillStyle =
          p.color +
          Math.floor(p.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Añadimos un sutil resplandor
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * pulseFactor * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = p.color + "20" // 12% opacidad
        ctx.fill()
      })
    }

    // Función para actualizar las posiciones
    const update = () => {
      particles.forEach((p) => {
        // Movimiento de partículas
        p.x += p.speedX
        p.y += p.speedY

        // Rebote en los bordes con un pequeño margen
        if (p.x < p.size || p.x > size - p.size) {
          p.speedX *= -1
          p.x = Math.max(p.size, Math.min(size - p.size, p.x))
        }
        if (p.y < p.size || p.y > size - p.size) {
          p.speedY *= -1
          p.y = Math.max(p.size, Math.min(size - p.size, p.y))
        }
      })
    }

    // Bucle de animación
    let animationFrame: number
    const animateParticles = () => {
      // Cambié el nombre de 'animate' a 'animateParticles'
      draw()
      update()
      animationFrame = requestAnimationFrame(animateParticles)
    }

    animateParticles() // Iniciar la animación con el nuevo nombre

    // Limpieza al desmontar
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [animate, size, intensity])

  // Variantes para la animación del texto
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Curva de animación suave
      },
    },
  }

  // Variantes para la animación del logo
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Variantes para el resplandor
  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.4, 0.6, 0.4],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  }

  // Colores para el SVG del logo
  const { primary, secondary, glow } = getIntensityColors()

  return (
    <div className={cn("relative flex items-center", className)} style={{ height: size }}>
      {/* Canvas para las partículas de fondo */}
      <canvas ref={canvasRef} className="absolute top-0 left-0" style={{ width: size, height: size }} />

      {/* Logo principal */}
      <motion.div
        className="relative z-10"
        initial="hidden"
        animate={animate ? "visible" : "hidden"}
        variants={logoVariants}
      >
        {/* Efecto de resplandor */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md"
          style={{ backgroundColor: glow }}
          variants={glowVariants}
        />

        {/* SVG del logo */}
        <svg
          width={size * 0.8}
          height={size * 0.8}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Forma hexagonal para representar un bloque de Minecraft */}
          <path d="M50 5L87.5 25V75L50 95L12.5 75V25L50 5Z" fill={primary} stroke={secondary} strokeWidth="2" />

          {/* Letra N estilizada */}
          <path d="M35 30V70H40V45L60 70H65V30H60V55L40 30H35Z" fill="white" />

          {/* Detalles decorativos */}
          <circle cx="25" cy="25" r="3" fill={secondary} />
          <circle cx="75" cy="25" r="3" fill={secondary} />
          <circle cx="25" cy="75" r="3" fill={secondary} />
          <circle cx="75" cy="75" r="3" fill={secondary} />
        </svg>
      </motion.div>

      {/* Texto del logo */}
      {showText && (
        <motion.div
          className="ml-3 font-bold tracking-wider"
          style={{
            fontSize: size * 0.3,
            background: `linear-gradient(135deg, ${primary}, ${secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          variants={textVariants}
        >
          Netherious
        </motion.div>
      )}
    </div>
  )
}

