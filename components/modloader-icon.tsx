"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ModloaderIconProps {
  type: "forge" | "fabric" | "neoforged"
  size?: number
  className?: string
  animated?: boolean
}

export function ModloaderIcon({ type, size = 24, className, animated = false }: ModloaderIconProps) {
  const logoPath = `/images/logos/${type}-logo.png`

  // Colores para el fondo según el tipo de modloader
  const bgColors = {
    forge: "bg-orange-500/10 border-orange-500/30",
    fabric: "bg-blue-500/10 border-blue-500/30",
    neoforged: "bg-purple-500/10 border-purple-500/30",
  }

  const IconWrapper = animated ? motion.div : "div"
  const animationProps = animated
    ? {
        whileHover: { scale: 1.1, rotate: 5 },
        whileTap: { scale: 0.95 },
        transition: { duration: 0.2 },
      }
    : {}

  return (
    <IconWrapper
      className={cn("relative flex items-center justify-center rounded-md border p-1", bgColors[type], className)}
      style={{ width: size, height: size }}
      {...animationProps}
    >
      <Image
        src={logoPath || "/placeholder.svg"}
        alt={`${type} logo`}
        width={size * 0.8}
        height={size * 0.8}
        className="pixelated object-contain"
      />
    </IconWrapper>
  )
}
