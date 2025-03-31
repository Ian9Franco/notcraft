"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GameCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
  glassEffect?: boolean
  borderGlow?: boolean
}

export function GameCard({
  children,
  className = "",
  hoverEffect = true,
  glassEffect = true,
  borderGlow = false,
}: GameCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-lg border border-border bg-secondary/30 p-4 overflow-hidden",
        glassEffect && "backdrop-blur-sm",
        hoverEffect && "transition-all duration-300",
        className,
      )}
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {borderGlow && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-accent/50 pointer-events-none"
          animate={{
            boxShadow: ["0 0 0px hsl(var(--accent))", "0 0 8px hsl(var(--accent))", "0 0 0px hsl(var(--accent))"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      )}

      {/* Reflection effect */}
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 pointer-events-none"
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {children}
    </motion.div>
  )
}

