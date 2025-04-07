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

  const logoColor = mounted ? (theme === "dark" ? "#b4ff3a" : "#3a7aff") : "#b4ff3a"
  const particleColor = mounted ? (theme === "dark" ? "#b4ff3a" : "#3a7aff") : "#b4ff3a"

  const particleCount = intensity === "low" ? 6 : intensity === "medium" ? 12 : 20
  const glowIntensity = intensity === "low" ? 0.3 : intensity === "medium" ? 0.5 : 0.8
  const animationSpeed = intensity === "low" ? 0.7 : intensity === "medium" ? 1 : 1.5

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Animated 'N' monogram with spark effect */}
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
                rotate: [0, 2, -2, 0],
              }
            : false
        }
        transition={{
          duration: 3 * animationSpeed,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <motion.path
          d="M10,90 V10 L90,90 V10"
          fill="none"
          stroke={logoColor}
          strokeWidth={6}
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
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        />
      </motion.svg>

      {/* Particles */}
      {animate && mounted && (
        <>
          {[...Array(particleCount)].map((_, i) => (
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
                x: [0, (Math.random() - 0.5) * 60],
                y: [0, (Math.random() - 0.5) * 60],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      {/* Glow */}
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
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundColor: "transparent",
            boxShadow: `0 0 30px ${logoColor}${Math.floor(glowIntensity * 100).toString(16)}`,
          }}
        />
      )}

      {/* Waves */}
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
                repeat: Infinity,
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

      {/* Optional Text */}
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
              repeat: Infinity,
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
