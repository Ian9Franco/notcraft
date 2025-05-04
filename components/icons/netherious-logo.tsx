"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface NetheriousLogoProps {
  className?: string
  size?: number
  showText?: boolean
  animate?: boolean
  intensity?: "low" | "medium" | "high"
}

export function NetheriousLogo({
  className,
  size = 80,
  showText = true,
  animate = false,
  intensity = "medium",
}: NetheriousLogoProps) {
  // Configuración de animación basada en la intensidad
  const getAnimationProps = () => {
    if (!animate) return {}

    const intensityValues = {
      low: { scale: 1.05, rotate: 3, duration: 3 },
      medium: { scale: 1.1, rotate: 5, duration: 2.5 },
      high: { scale: 1.15, rotate: 8, duration: 2 },
    }

    const values =
      typeof intensity === "string" && intensity in intensityValues
        ? intensityValues[intensity as keyof typeof intensityValues]
        : intensityValues.medium

    return {
      animate: {
        scale: [1, values.scale, 1],
        rotate: [0, values.rotate, 0],
      },
      transition: {
        duration: values.duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    }
  }

  const animationProps = getAnimationProps()

  return (
    <div className={cn("relative flex items-center", className)} style={{ height: size }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          ...animationProps.animate,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          ...animationProps.transition,
        }}
        className="relative"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/logos/netherious.png"
          alt="Netherious Logo"
          width={size}
          height={size}
          className="object-contain"
        />
      </motion.div>

      {showText && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-accent font-title text-2xl ml-2"
          style={{ fontSize: size / 3 }}
        >
          Netherious
        </motion.span>
      )}
    </div>
  )
}
