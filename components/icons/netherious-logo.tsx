"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
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

  useEffect(() => {
    setMounted(true)
  }, [])

  const getLogoFile = (): string => {
    if (forceVariant === "white") return "netherious-light-r.png"
    if (forceVariant === "black") return "netherious-dark-r.png"
  
    if (!mounted) return "netherious-dark-r.png"
  
    if (["footer", "sidebar", "header"].includes(location)) {
      return resolvedTheme === "dark"
        ? "netherious-dark-r.png"
        : "netherious-light-r.png"
    }
  
    return "netherious-dark-r.png"
  }
  

  const logoPath = `/images/logos/${getLogoFile()}`

  const getAnimationProps = () => {
    if (!animate) return {}

    const intensityValues = {
      low: { scale: 1.05, rotate: 3, duration: 3 },
      medium: { scale: 1.1, rotate: 5, duration: 2.5 },
      high: { scale: 1.15, rotate: 8, duration: 2 },
    }

    const values = intensityValues[intensity] || intensityValues.medium

    return {
      animate: {
        scale: [1, values.scale, 1],
        rotate: [0, values.rotate, 0],
      },
      transition: {
        duration: values.duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }
  }

  const animationProps = getAnimationProps()

  return (
    <div className={cn("relative flex items-center", className)} style={{ width: "auto" }}>
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.9 }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
          ...animationProps.animate,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          ...animationProps.transition,
        }}
        className="relative"
        style={{ width: size }}
      >
        <Image
          src={logoPath}
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
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-accent font-title ml-2"
          style={{ fontSize: size / 3 }}
        >
          Netherious
        </motion.span>
      )}
    </div>
  )
}
