"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Definimos la interfaz de propiedades para el componente NetheriousLogo
export interface NetheriousLogoProps {
  className?: string
  size?: number
  showText?: boolean
  // El problema estaba aquí: TypeScript no estaba reconociendo correctamente la prop 'animate'
  // Aseguramos que esté correctamente definida como un booleano opcional
  animate?: boolean
  // Mantenemos la definición original de intensity
  intensity?: "low" | "medium" | "high" | string
}

export function NetheriousLogo({
  className,
  size = 80,
  showText = true,
  animate = true,
  intensity = "medium",
}: NetheriousLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!animate) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const intensityFactor = intensity === "low" ? 100 : intensity === "high" ? 300 : 200
    const particles: { x: number; y: number; dx: number; dy: number; r: number }[] = []
    const numParticles = intensityFactor

    const width = (canvas.width = size)
    const height = (canvas.height = size)

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.5 + 0.5,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "white"
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const update = () => {
      for (const p of particles) {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > width) p.dx *= -1
        if (p.y < 0 || p.y > height) p.dy *= -1
      }
    }

    const animateLoop = () => {
      draw()
      update()
      requestAnimationFrame(animateLoop)
    }
    animateLoop()
  }, [animate, intensity, size])

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      {showText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold"
        >
          N
        </motion.div>
      )}
    </div>
  )
}

