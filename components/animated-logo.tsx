"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { CuboidIcon as Cube } from "lucide-react"
import { motion } from "framer-motion"

// Dynamically import Three.js components with no SSR
const AnimatedCube = dynamic(() => import("./animated-cube"), { ssr: false })

export default function AnimatedLogo() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="w-full h-full min-h-[120px] relative" style={{ aspectRatio: "1/1" }}>
      {/* Partículas de fondo */}
      {isMounted && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/50 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </>
      )}

      {/* Anillo giratorio */}
      {isMounted && (
        <motion.div
          className="absolute inset-0 border-2 border-dashed border-accent/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      )}

      {/* Logo principal */}
      {isMounted ? (
        <motion.div
          className="w-full h-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedCube />
        </motion.div>
      ) : (
        // Fallback para SSR
        <motion.div
          className="w-full h-full flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <Cube className="text-accent" />
        </motion.div>
      )}

      {/* Resplandor de fondo */}
      {isMounted && (
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/5 -z-10"
          animate={{
            boxShadow: ["0 0 0px hsl(var(--accent))", "0 0 20px hsl(var(--accent))", "0 0 0px hsl(var(--accent))"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      )}
    </div>
  )
}

