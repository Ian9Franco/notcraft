"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

export interface NetheriousLogoProps {
  className?: string
  size?: number
  showText?: boolean
  animate?: boolean
  intensity?: "low" | "medium" | "high"
  forceVariant?: "white" | "black"
  location?: "sidebar" | "header" | "footer"
}

/**
 * Logo que cambia entre blanco y negro según la ubicación y tema.
 *
 * | Ubicación | Claro     | Oscuro     |
 * |-----------|-----------|------------|
 * | footer    | Negro     | Blanco     |
 * | otros     | Negro     | Negro      |
 *
 * Características:
 * - Cambia automáticamente entre versiones clara y oscura según el tema
 * - Efecto hover que aumenta ligeramente el tamaño al pasar el cursor
 * - Tamaño personalizable mediante la prop 'size'
 * - Ubicaciones predefinidas (sidebar, header, footer) con comportamientos específicos
 * - Animación de entrada suave y efecto de flotación constante
 */
export function NetheriousLogo({
  className,
  size = 180,
  showText = false,
  animate = false,
  intensity = "medium",
  forceVariant,
  location = "sidebar",
}: NetheriousLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    setMounted(true)

    // Iniciar la animación de entrada
    controls
      .start({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 1.2, // Animación más lenta
          ease: "easeOut",
        },
      })
      .then(() => {
        // Iniciar la animación de flotación después de completar la entrada
        controls.start("float")
      })
  }, [controls])

  // Determina qué archivo de logo usar según el tema y la ubicación
  const getLogoFile = (): string => {
    if (forceVariant === "white") return "netherious-light-r.png"
    if (forceVariant === "black") return "netherious-dark-r.png"

    if (!mounted) return "netherious-dark-r.png"

    if (["footer", "sidebar", "header"].includes(location)) {
      return resolvedTheme === "dark" ? "netherious-dark-r.png" : "netherious-light-r.png"
    }

    return "netherious-dark-r.png"
  }

  const logoPath = `/images/logos/${getLogoFile()}`

  // Configuración de animación según la intensidad
  const getFloatVariants = () => {
    const intensityValues = {
      low: { y: [-3, 3], duration: 4 },
      medium: { y: [-5, 5], duration: 3.5 },
      high: { y: [-8, 8], duration: 3 },
    }

    const values = intensityValues[intensity] || intensityValues.medium

    return {
      initial: {
        opacity: 0,
        x: -20,
        scale: 0.9,
      },
      animate: {
        opacity: 1,
        x: 0,
        scale: isHovered ? 1.1 : 1,
      },
      float: {
        y: values.y,
        transition: {
          y: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: values.duration,
            ease: "easeInOut",
          },
        },
      },
    }
  }

  const floatVariants = getFloatVariants()

  return (
    <div
      className={cn("relative flex items-center", className)}
      style={{ width: "auto" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial="initial"
        animate={controls}
        variants={floatVariants}
        className="relative"
        style={{ width: size }}
      >
        <Image
          src={logoPath || "/placeholder.svg"}
          alt="Netherious Logo"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </motion.div>

      {showText && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-accent font-title ml-2"
          style={{ fontSize: size / 3 }}
        >
          Netherious
        </motion.span>
      )}
    </div>
  )
}
