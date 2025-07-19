"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { ChevronDown, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Componentes de pestañas mejorados
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
>(({ className, children, ...props }, ref) => {
  // Usar useState para rastrear el estado activo
  const [active, setActive] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  // Función para comprobar si el elemento está activo
  const checkIfActive = React.useCallback((element: HTMLElement | null) => {
    if (!element) return false
    return element.getAttribute("data-state") === "active"
  }, [])

  // Efecto para observar cambios en el atributo data-state
  React.useEffect(() => {
    const element = triggerRef.current
    if (!element) return

    // Establecer estado inicial
    setActive(checkIfActive(element))

    // Configurar observador de mutaciones
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-state") {
          setActive(checkIfActive(element))
        }
      })
    })

    observer.observe(element, { attributes: true })
    return () => observer.disconnect()
  }, [checkIfActive])

  return (
    <TabsPrimitive.Trigger
      ref={(node) => {
        // Manejar la referencia sin asignar directamente a current
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          // No asignamos directamente a ref.current
        }
        triggerRef.current = node
      }}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm relative overflow-hidden group",
        className,
      )}
      {...props}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent"
        initial={{ width: 0 }}
        animate={{ width: active ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute inset-0 bg-accent/10 opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  </TabsPrimitive.Content>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

/**
 * Componentes de tooltip mejorados
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
 * Componentes de acordeón mejorados
 */
export const Accordion = AccordionPrimitive.Root

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b border-border last:border-0", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  // Usar useState para rastrear el estado abierto
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  // Función para comprobar si el elemento está abierto
  const checkIfOpen = React.useCallback((element: HTMLElement | null) => {
    if (!element) return false
    return element.getAttribute("data-state") === "open"
  }, [])

  // Efecto para observar cambios en el atributo data-state
  React.useEffect(() => {
    const element = triggerRef.current
    if (!element) return

    // Establecer estado inicial
    setOpen(checkIfOpen(element))

    // Configurar observador de mutaciones
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-state") {
          setOpen(checkIfOpen(element))
        }
      })
    })

    observer.observe(element, { attributes: true })
    return () => observer.disconnect()
  }, [checkIfOpen])

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={(node) => {
          // Manejar la referencia sin asignar directamente a current
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            // No asignamos directamente a ref.current
          }
          triggerRef.current = node
        }}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:text-accent [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </motion.div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  // Usar useState para rastrear el estado abierto
  const [open, setOpen] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement | null>(null)

  // Función para comprobar si el elemento está abierto
  const checkIfOpen = React.useCallback((element: HTMLElement | null) => {
    if (!element) return false
    return element.getAttribute("data-state") === "open"
  }, [])

  // Efecto para observar cambios en el atributo data-state
  React.useEffect(() => {
    const element = contentRef.current
    if (!element) return

    // Establecer estado inicial
    setOpen(checkIfOpen(element))

    // Configurar observador de mutaciones
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-state") {
          setOpen(checkIfOpen(element))
        }
      })
    })

    observer.observe(element, { attributes: true })
    return () => observer.disconnect()
  }, [checkIfOpen])

  return (
    <AccordionPrimitive.Content
      ref={(node) => {
        // Manejar la referencia sin asignar directamente a current
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          // No asignamos directamente a ref.current
        }
        contentRef.current = node
      }}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: open ? 1 : 0,
          height: open ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className={cn("pb-4 pt-0", className)}
      >
        {children}
      </motion.div>
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = AccordionPrimitive.Content.displayName

/**
 * Interfaz para elementos del acordeón interactivo
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
  variant?: "default" | "fancy" | "minimal"
}

/**
 * Componente de acordeón interactivo con animaciones mejoradas
 */
export function InteractiveAccordion({
  items,
  className = "",
  defaultOpenIndex = 0,
  allowMultiple = false,
  variant = "default",
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

  // Variantes de estilo para el acordeón
  const getButtonStyles = (isActive: boolean) => {
    switch (variant) {
      case "fancy":
        return cn(
          "w-full flex items-center justify-between p-4 text-left transition-colors rounded-t-md",
          isActive
            ? "bg-accent/20 text-accent border-b border-accent/30"
            : "bg-secondary/50 text-foreground hover:bg-secondary/80 border-b border-border/30",
        )
      case "minimal":
        return cn(
          "w-full flex items-center justify-between p-3 text-left transition-colors",
          isActive ? "text-accent font-medium" : "text-foreground hover:text-accent",
        )
      default:
        return cn(
          "w-full flex items-center justify-between p-4 text-left transition-colors rounded-md",
          isActive ? "bg-accent/20 text-accent" : "bg-secondary/50 text-foreground hover:bg-secondary/80",
        )
    }
  }

  const getContentStyles = (isActive: boolean) => {
    switch (variant) {
      case "fancy":
        return "p-4 bg-background/80 backdrop-blur-sm border-x border-b border-border rounded-b-md"
      case "minimal":
        return "p-3 pl-8"
      default:
        return "p-4 bg-background/80 backdrop-blur-sm border-x border-b border-border"
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => {
        const isActive = activeIndices.includes(index)

        return (
          <div key={index} className={variant === "minimal" ? "" : "rounded-md overflow-hidden"}>
            <motion.button
              className={getButtonStyles(isActive)}
              onClick={() => toggleItem(index)}
              whileHover={{ scale: variant === "minimal" ? 1 : 1.01 }}
              whileTap={{ scale: variant === "minimal" ? 0.98 : 0.99 }}
              aria-expanded={isActive}
            >
              <div className="flex items-center gap-3">
                {item.icon && <span>{item.icon}</span>}
                <span className="font-minecraft text-sm">{item.title}</span>
              </div>
              <motion.div
                animate={{
                  rotate: isActive ? 180 : 0,
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {variant === "fancy" ? isActive ? <Minus size={18} /> : <Plus size={18} /> : <ChevronDown size={18} />}
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
                  <div className={getContentStyles(isActive)}>{item.content}</div>
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
  transitionEffect?: "slide" | "fade" | "zoom" | "flip"
  aspectRatio?: "auto" | "square" | "video" | "portrait"
  infiniteLoop?: boolean
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
  aspectRatio = "auto",
  infiniteLoop = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [touchStart, setTouchStart] = React.useState(0)
  const [touchEnd, setTouchEnd] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const carouselRef = React.useRef<HTMLDivElement>(null)

  const totalItems = React.Children.count(children)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)

    if (infiniteLoop || currentIndex < totalItems - 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems)
    }

    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)

    if (infiniteLoop || currentIndex > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)
    }

    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Gestión de autoplay
  React.useEffect(() => {
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
  }, [autoPlay, interval, isPaused, totalItems, currentIndex, isAnimating])

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
    if (isAnimating) return

    if (touchStart - touchEnd > 50) {
      // Deslizar a la izquierda
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Deslizar a la derecha
      prevSlide()
    }
  }

  // Obtener clases para el aspect ratio
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "video":
        return "aspect-video"
      case "portrait":
        return "aspect-[3/4]"
      default:
        return ""
    }
  }

  // Animaciones según el efecto seleccionado
  const getAnimationVariants = (): Variants => {
    switch (transitionEffect) {
      case "fade":
        return {
          enter: { opacity: 0 },
          center: { opacity: 1, zIndex: 1 },
          exit: { opacity: 0, zIndex: 0 },
        }
      case "zoom":
        return {
          enter: { opacity: 0, scale: 0.85 },
          center: { opacity: 1, scale: 1, zIndex: 1 },
          exit: { opacity: 0, scale: 1.15, zIndex: 0 },
        }
      case "flip":
        return {
          enter: { opacity: 0, rotateY: 90 },
          center: { opacity: 1, rotateY: 0, zIndex: 1 },
          exit: { opacity: 0, rotateY: -90, zIndex: 0 },
        }
      case "slide":
      default:
        return {
          enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
          }),
          center: { x: 0, opacity: 1, zIndex: 1 },
          exit: (direction: number) => ({
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
            zIndex: 0,
          }),
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
  }, [isAnimating])

  // Calcular la dirección para la animación
  const [[page, direction], setPage] = React.useState([0, 0])

  React.useEffect(() => {
    setPage([currentIndex, currentIndex > page ? 1 : -1])
  }, [currentIndex])

  const variants = getAnimationVariants()

  return (
    <div
      ref={carouselRef}
      className={cn("relative overflow-hidden rounded-lg", getAspectRatioClass(), className)}
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
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.4 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            {React.Children.toArray(children)[currentIndex]}
          </motion.div>
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
            disabled={isAnimating || (!infiniteLoop && currentIndex === 0)}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full backdrop-blur-sm z-20 transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Siguiente"
            disabled={isAnimating || (!infiniteLoop && currentIndex === totalItems - 1)}
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
              disabled={isAnimating}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Props para el componente de pestañas con animación
 */
interface AnimatedTabsProps {
  tabs: {
    label: string
    content: React.ReactNode
    icon?: React.ReactNode
  }[]
  defaultValue?: string
  className?: string
  tabsClassName?: string
  contentClassName?: string
  variant?: "underline" | "pills" | "boxed"
}

/**
 * Componente de pestañas con animaciones mejoradas
 */
export function AnimatedTabs({
  tabs,
  defaultValue,
  className,
  tabsClassName,
  contentClassName,
  variant = "underline",
}: AnimatedTabsProps) {
  const defaultTab = defaultValue || tabs[0]?.label.toLowerCase().replace(/\s+/g, "-")
  const [activeTab, setActiveTab] = React.useState(defaultTab)

  // Obtener estilos según la variante
  const getTabStyles = (isActive: boolean) => {
    switch (variant) {
      case "pills":
        return cn(
          "px-4 py-2 rounded-full transition-all",
          isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/10 hover:text-accent",
        )
      case "boxed":
        return cn(
          "px-4 py-2 transition-all border-b-2",
          isActive
            ? "border-accent bg-accent/10 text-accent"
            : "border-transparent hover:border-accent/30 hover:text-accent",
        )
      case "underline":
      default:
        return cn("px-4 py-2 transition-all relative", isActive ? "text-accent" : "hover:text-accent")
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("flex space-x-1 mb-4 overflow-x-auto", tabsClassName)}>
        {tabs.map((tab) => {
          const id = tab.label.toLowerCase().replace(/\s+/g, "-")
          const isActive = activeTab === id

          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn("font-medium text-sm whitespace-nowrap flex items-center gap-2", getTabStyles(isActive))}
              aria-selected={isActive}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>

              {variant === "underline" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div className={cn("relative", contentClassName)}>
        <AnimatePresence mode="wait">
          {tabs.map((tab) => {
            const id = tab.label.toLowerCase().replace(/\s+/g, "-")
            if (activeTab !== id) return null

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {tab.content}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}