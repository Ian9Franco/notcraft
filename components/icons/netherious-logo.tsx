"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface NetheriousLogoProps {
  className?: string
  size?: number
  showText?: boolean
  animate?: boolean
}

export function NetheriousLogo({ className = "", size = 40, showText = false, animate = true }: NetheriousLogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Colores según el tema
  const logoColor = mounted ? (theme === "dark" ? "#b4ff3a" : "#b4ff3a") : "#b4ff3a"
  const particleColor = mounted ? (theme === "dark" ? "#b4ff3a" : "#b4ff3a") : "#b4ff3a"

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Logo principal */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        width={size}
        height={size}
        initial={animate ? { scale: 0.9, opacity: 0 } : false}
        animate={animate ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <motion.path
          d="M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0C198.4 0 208 9.6 208 21.3V43.5c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7C384 434 306 512 209.7 512H192C86 512 0 426 0 320v-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6C85.9 176 96 186.1 96 198.6V288c0 35.3 28.7 64 64 64s64-28.7 64-64v-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7c0-27.7 9-54.8 25.6-76.9z"
          fill={logoColor}
          initial={animate ? { pathLength: 0, fillOpacity: 0 } : false}
          animate={animate ? { pathLength: 1, fillOpacity: 1 } : false}
          transition={{
            pathLength: { duration: 1.5, ease: "easeInOut" },
            fillOpacity: { duration: 1, delay: 0.5, ease: "easeInOut" },
          }}
        />
      </motion.svg>

      {/* Partículas animadas */}
      {animate && mounted && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full z-0"
              style={{
                backgroundColor: particleColor,
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                boxShadow: `0 0 4px ${particleColor}`,
                top: `${50 + (Math.random() * 40 - 20)}%`,
                left: `${50 + (Math.random() * 40 - 20)}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 30],
                y: [0, (Math.random() - 0.5) * 30],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      {/* Resplandor de fondo */}
      {animate && (
        <motion.div
          className="absolute inset-0 rounded-full -z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            backgroundColor: "transparent",
            boxShadow: `0 0 20px ${logoColor}40`,
          }}
        />
      )}

      {/* Texto del logo (opcional) */}
      {showText && (
        <motion.div
          className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="font-title text-xl text-accent tracking-wider">Netherious</span>
        </motion.div>
      )}
    </div>
  )
}

