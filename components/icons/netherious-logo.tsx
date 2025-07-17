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
  location?: "sidebar" | "sidebar-small" | "header" | "footer" | "hero"
}

export function NetheriousLogo({
  className,
  size = 180,
  showText = false,
  animate = false,
  intensity = "medium",
  forceVariant,
  location = "hero",
}: NetheriousLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    setMounted(true)

    if (animate) {
      controls
        .start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 1.2,
            ease: "easeOut",
          },
        })
        .then(() => {
          controls.start("float")
        })
    }
  }, [controls, animate])

  const getLogoFile = (): string => {
    if (forceVariant === "white") return "netherious-light-r.png"
    if (forceVariant === "black") return "netherious-dark-r.png"

    if (!mounted) return "netherious-dark-r.png"

    // Lógica corregida:
    // Si el tema es oscuro, usa el logo oscuro (netherious-dark-r.png)
    // Si el tema es claro, usa el logo claro (netherious-light-r.png)
    if (location === "hero") {
      return resolvedTheme === "dark" ? "netherious-dark-r.png" : "netherious-light-r.png"
    }

    // Para otras ubicaciones, si no se especifica forceVariant, también sigue la lógica de tema
    return resolvedTheme === "dark" ? "netherious-dark-r.png" : "netherious-light-r.png"
  }

  const logoPath = `/images/logos/${getLogoFile()}`

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
        y: -20,
        scale: 0.9,
      },
      animate: {
        opacity: 1,
        y: 0,
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={animate ? "initial" : false}
        animate={animate ? controls : false}
        variants={animate ? floatVariants : undefined}
        className="relative"
        style={{ width: size, height: size }}
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
