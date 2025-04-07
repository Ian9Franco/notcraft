"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
  animate = false,
  intensity = "medium",
}: NetheriousLogoProps) {
  // Mantenemos la interfaz de props igual para compatibilidad con el código existente
  // pero ahora usamos la nueva imagen del logo

  return (
    <div className={cn("relative flex items-center", className)} style={{ height: size }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
        style={{ width: size, height: size }}
      >
        <Image
          src="../../public/images/logos/netherious.png"
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

