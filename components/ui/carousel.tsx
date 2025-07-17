"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import "@/app/premium/carousel-premium.css" // ✅ Importar el nuevo archivo CSS para el carrusel

interface CarouselProps {
  children: React.ReactNode
  autoPlay?: boolean
  interval?: number
  showControls?: boolean
  showIndicators?: boolean
  className?: string
  pauseOnHover?: boolean
  transitionEffect?: "slide" | "fade" | "zoom"
}

export function Carousel({
  children,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  className = "",
  pauseOnHover = true,
  transitionEffect = "slide",
}: CarouselProps) {
  const childrenArray = React.Children.toArray(children)
  const totalItems = childrenArray.length

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(0) // 0: initial, 1: next, -1: prev
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems)
  }, [totalItems])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)
  }, [totalItems])

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
    },
    [currentIndex],
  )

  // Gestión de autoplay
  useEffect(() => {
    if (autoPlay && !isPaused && totalItems > 1) {
      timerRef.current = setInterval(() => {
        nextSlide()
      }, interval)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [autoPlay, interval, isPaused, totalItems, nextSlide])

  // Gestión de eventos de ratón
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false)
    }
  }

  // Gestión de eventos táctiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      prevSlide()
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Animaciones según el efecto seleccionado
  const getVariants = useCallback(
    (dir: number) => {
      switch (transitionEffect) {
        case "fade":
          return {
            enter: { opacity: 0 },
            center: { opacity: 1 },
            exit: { opacity: 0 },
          }
        case "zoom":
          return {
            enter: { opacity: 0, scale: 0.85 },
            center: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.85 },
          }
        case "slide":
        default:
          return {
            // ✅ Animación de slide corregida:
            // enter: el nuevo slide viene de la dirección del movimiento
            // exit: el viejo slide sale en la dirección opuesta al movimiento
            enter: { x: dir > 0 ? "100%" : "-100%", opacity: 0 },
            center: { x: "0%", opacity: 1 },
            exit: { x: dir > 0 ? "-100%" : "100%", opacity: 0 },
          }
      }
    },
    [transitionEffect],
  )

  // Teclas de navegación
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevSlide, nextSlide])

  // Si no hay elementos, no renderizar nada
  if (totalItems === 0) {
    return null
  }

  return (
    <div
      ref={carouselRef}
      className={cn(
        "carousel-container-wrapper", // ✅ Clase para el contenedor principal con estilos premium
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Carrusel de contenido"
      aria-roledescription="carrusel"
    >
      {/* ✅ Capas de fondo para la estética del modal */}
      <div className="carousel-bg"></div>
      <div className="carousel-mesh"></div>
      <div className="carousel-border"></div>
      <div className="carousel-glow"></div>
      <div className="carousel-premium-glow"></div>

      <div className="relative w-full h-full z-10 overflow-hidden">
        {" "}
        {/* ✅ Asegurar overflow-hidden aquí también */}
        <AnimatePresence initial={false} mode="wait">
          {childrenArray.map((child, index) =>
            index === currentIndex ? (
              <motion.div
                key={currentIndex} // La clave debe cambiar para que AnimatePresence detecte la salida/entrada
                className="absolute top-0 left-0 w-full h-full"
                variants={getVariants(direction)} // ✅ Usar variants con custom prop
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut" }} // ✅ Transición unificada
              >
                {child}
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>

      {showControls && totalItems > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none z-20">
          <motion.button
            onClick={prevSlide}
            className="bg-black/50 p-2 rounded-full text-white pointer-events-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="bg-black/50 p-2 rounded-full text-white pointer-events-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      )}

      {showIndicators && totalItems > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {Array.from({ length: totalItems }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn("w-3 h-3 rounded-full", index === currentIndex ? "bg-white" : "bg-gray-400")}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              aria-label={`Ir a la diapositiva ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  )
}
