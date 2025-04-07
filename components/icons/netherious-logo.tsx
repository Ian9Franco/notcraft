"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface NetheriousLogoProps {
  className?: string
  size?: number
  showText?: boolean
  animate?: boolean
  intensity?: "low" | "medium" | "high"
}

export function NetheriousLogo({
  className = "",
  size = 40,
  showText = false,
  animate = true,
  intensity = "medium",
}: NetheriousLogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Colores según el tema
  const logoColor = mounted ? (theme === "dark" ? "#b4ff3a" : "#3a7aff") : "#b4ff3a"
  const particleColor = mounted ? (theme === "dark" ? "#b4ff3a" : "#3a7aff") : "#b4ff3a"
  const lavaColor = mounted ? (theme === "dark" ? "#ff7b00" : "#ff5500") : "#ff7b00"
  const lavaGlowColor = mounted ? (theme === "dark" ? "#ffcc00" : "#ffaa00") : "#ffcc00"

  // Configuración de intensidad de animación
  const particleCount = intensity === "low" ? 8 : intensity === "medium" ? 15 : 25
  const lavaDropCount = intensity === "low" ? 3 : intensity === "medium" ? 6 : 10
  const glowIntensity = intensity === "low" ? 0.3 : intensity === "medium" ? 0.5 : 0.8
  const animationSpeed = intensity === "low" ? 0.7 : intensity === "medium" ? 1 : 1.5

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Logo principal con animación mejorada - Bloque de Netherite */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        initial={animate ? { scale: 0.9, opacity: 0 } : false}
        animate={
          animate
            ? {
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0],
              }
            : false
        }
        transition={{
          duration: 3 * animationSpeed,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        {/* Bloque base (cubo isométrico) */}
        <motion.path
          d="M20,65 L20,35 L50,15 L80,35 L80,65 L50,85 L20,65 Z"
          fill="#3a3a45"
          stroke={logoColor}
          strokeWidth="2"
          initial={animate ? { fillOpacity: 0 } : false}
          animate={
            animate
              ? {
                  fillOpacity: [0.7, 0.9, 0.7],
                }
              : false
          }
          transition={{
            duration: 2 * animationSpeed,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Letra N en el centro */}
        <motion.path
          d="M40,40 L40,60 L60,60 L60,40 M40,40 L60,60"
          fill="none"
          stroke={logoColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0, strokeOpacity: 0 } : false}
          animate={
            animate
              ? {
                  pathLength: 1,
                  strokeOpacity: [0, 1, 0.8, 1],
                }
              : false
          }
          transition={{
            pathLength: { duration: 1.5 * animationSpeed, ease: "easeInOut" },
            strokeOpacity: {
              duration: 3 * animationSpeed,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        />

        {/* Detalles del bloque - líneas de netherite */}
        <motion.path
          d="M35,25 L65,25 M35,75 L65,75"
          stroke={logoColor}
          strokeWidth="1.5"
          strokeDasharray="3,3"
          initial={animate ? { strokeOpacity: 0 } : false}
          animate={
            animate
              ? {
                  strokeOpacity: [0.3, 0.7, 0.3],
                }
              : false
          }
          transition={{
            duration: 4 * animationSpeed,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.svg>

      {/* Efecto de partículas de netherite */}
      {animate && mounted && (
        <>
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full z-0"
              style={{
                backgroundColor: particleColor,
                width: 1 + Math.random() * 2,
                height: 1 + Math.random() * 2,
                boxShadow: `0 0 4px ${particleColor}`,
                top: `${50 + (Math.random() * 40 - 20)}%`,
                left: `${50 + (Math.random() * 40 - 20)}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 40],
                y: [0, (Math.random() - 0.5) * 40],
              }}
              transition={{
                duration: 1.5 + Math.random() * 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Efecto de lava/magma */}
      {animate && mounted && (
        <>
          {[...Array(lavaDropCount)].map((_, i) => (
            <motion.div
              key={`lava-${i}`}
              className="absolute rounded-full blur-[1px] z-0"
              style={{
                background: `radial-gradient(circle, ${lavaGlowColor} 0%, ${lavaColor} 70%, transparent 100%)`,
                width: 3 + Math.random() * 4,
                height: 3 + Math.random() * 4,
                bottom: `${70 + Math.random() * 20}%`,
                left: `${40 + Math.random() * 20}%`,
              }}
              initial={{ opacity: 0.7, scale: 0.8 }}
              animate={{
                opacity: [0.7, 0.9, 0.3],
                scale: [0.8, 1.2, 0.5],
                y: [-5, -15 - Math.random() * 10],
                x: [(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 15],
              }}
              transition={{
                duration: 1 + Math.random() * 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeOut",
                delay: Math.random() * 1,
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
            opacity: [0.2 * glowIntensity, 0.6 * glowIntensity, 0.2 * glowIntensity],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: 3 * animationSpeed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            backgroundColor: "transparent",
            boxShadow: `0 0 30px ${logoColor}${Math.floor(glowIntensity * 100).toString(16)}`,
          }}
        />
      )}

      {/* Ondas expansivas */}
      {animate && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute inset-0 rounded-full -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.5 * glowIntensity, 0],
                scale: [1, 2],
              }}
              transition={{
                duration: 2 * animationSpeed,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.6,
                ease: "easeOut",
              }}
              style={{
                border: `1px solid ${logoColor}`,
              }}
            />
          ))}
        </>
      )}

      {/* Texto del logo (opcional) */}
      {showText && (
        <motion.div
          className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.span
            className="font-title text-xl text-accent tracking-wider"
            animate={{
              textShadow: animate
                ? [
                    "0 0 2px rgba(180, 255, 58, 0.3)",
                    "0 0 8px rgba(180, 255, 58, 0.6)",
                    "0 0 2px rgba(180, 255, 58, 0.3)",
                  ]
                : "none",
            }}
            transition={{
              duration: 2 * animationSpeed,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            Netherious
          </motion.span>
        </motion.div>
      )}
    </div>
  )
}

