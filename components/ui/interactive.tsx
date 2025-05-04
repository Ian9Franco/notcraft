"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Componentes de pestañas
 */
export const Tabs = TabsPrimitive.Root

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

/**
 * Componentes de tooltip
 */
export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {props.children}
    </motion.div>
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

/**
 * Interfaz para elementos del acordeón
 */
interface AccordionItem {
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
}

/**
 * Props para el acordeón interactivo
 */
interface InteractiveAccordionProps {
  items: AccordionItem[]
  className?: string
  defaultOpenIndex?: number | null
  allowMultiple?: boolean
}

/**
 * Componente de acordeón interactivo con animaciones mejoradas
 */
export function InteractiveAccordion({
  items,
  className = "",
  defaultOpenIndex = 0,
  allowMultiple = false,
}: InteractiveAccordionProps) {
  const [activeIndices, setActiveIndices] = React.useState<number[]>(
    defaultOpenIndex !== null ? [defaultOpenIndex] : [],
  )

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setActiveIndices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    } else {
      setActiveIndices((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => {
        const isActive = activeIndices.includes(index)

        return (
          <div key={index} className="rounded-md overflow-hidden">
            <motion.button
              className={cn(
                "w-full flex items-center justify-between p-4 text-left transition-colors",
                isActive ? "bg-accent/20 text-accent" : "bg-secondary/50 text-foreground hover:bg-secondary/80",
              )}
              onClick={() => toggleItem(index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              aria-expanded={isActive}
            >
              <div className="flex items-center gap-3">
                {item.icon && <span>{item.icon}</span>}
                <span className="font-minecraft text-sm">{item.title}</span>
              </div>
              <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-background/80 backdrop-blur-sm border-x border-b border-border">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Props para el componente Carousel
 */
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

/**
 * Componente de carrusel mejorado con animaciones fluidas
 */
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
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [touchStart, setTouchStart] = React.useState(0)
  const [touchEnd, setTouchEnd] = React.useState(0)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const carouselRef = React.useRef<HTMLDivElement>(null)

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
  React.useEffect(() => {
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
  React.useEffect(() => {
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
      className={cn("relative w-full overflow-hidden rounded-lg", className)}
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
              className={cn("w-full absolute inset-0", index === currentIndex ? "z-10" : "z-0")}
              {...getAnimationProps(index === currentIndex)}
              style={{ display: index === currentIndex ? "block" : "none" }}
            >
              {child}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showControls && totalItems > 1 && (
        <>
          <motion.button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full backdrop-blur-sm z-20 transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full backdrop-blur-sm z-20 transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </>
      )}

      {showIndicators && totalItems > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {Array.from({ length: totalItems }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-accent w-5" : "bg-foreground/30 hover:bg-foreground/50",
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
