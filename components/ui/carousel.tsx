"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselProps {
  children: React.ReactNode[]
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const totalItems = React.Children.count(children)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Gestión de autoplay
  useEffect(() => {
    if (autoPlay && !isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide()
      }, interval)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [autoPlay, interval, isPaused, totalItems])

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
      // Deslizar a la izquierda
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Deslizar a la derecha
      prevSlide()
    }
  }

  // Animaciones según el efecto seleccionado
  const getAnimationProps = (isCurrentSlide: boolean) => {
    switch (transitionEffect) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: isCurrentSlide ? 1 : 0 },
          exit: { opacity: 0 },
          transition: { duration: 0.5 },
        }
      case "zoom":
        return {
          initial: { opacity: 0, scale: 0.85 },
          animate: { opacity: isCurrentSlide ? 1 : 0, scale: isCurrentSlide ? 1 : 0.85 },
          exit: { opacity: 0, scale: 0.85 },
          transition: { duration: 0.5 },
        }
      case "slide":
      default:
        return {
          initial: { opacity: 0, x: 100 },
          animate: { opacity: isCurrentSlide ? 1 : 0, x: isCurrentSlide ? 0 : 100 },
          exit: { opacity: 0, x: -100 },
          transition: { duration: 0.5 },
        }
    }
  }

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
  }, [])

  return (
    <div
      ref={carouselRef}
      className={cn("carousel-container", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Carrusel de contenido"
      aria-roledescription="carrusel"
    >
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          {React.Children.toArray(children).map((child, index) => (
            <motion.div
              key={index}
              className={cn("carousel-slide absolute inset-0", index === currentIndex ? "z-10" : "z-0")}
              {...getAnimationProps(index === currentIndex)}
              style={{ display: index === currentIndex ? "block" : "none" }}
            >
              {child}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showControls && totalItems > 1 && (
        <div className="carousel-controls">
          <motion.button
            onClick={prevSlide}
            className="carousel-control-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="carousel-control-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      )}

      {showIndicators && totalItems > 1 && (
        <div className="carousel-indicators">
          {Array.from({ length: totalItems }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "carousel-indicator",
                index === currentIndex ? "carousel-indicator-active" : "carousel-indicator-inactive",
              )}
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
