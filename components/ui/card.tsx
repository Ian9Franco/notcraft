"use client"

import * as React from "react"
import Image from "next/image"
import type { Variants } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Componentes de tarjeta básica
 */
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
  ),
)
Card.displayName = "Card"

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

/**
 * Props para GameCard
 */
interface GameCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  glassEffect?: boolean
  borderGlow?: boolean
  initialAnimation?: boolean
  hoverScale?: number
  glowColor?: string
  glowIntensity?: "low" | "medium" | "high"
  variant?: "default" | "raised" | "flat" | "gradient"
}

/**
 * Tarjeta con estilo de juego y efectos mejorados
 */
export function GameCard({
  children,
  className = "",
  hoverEffect = true,
  glassEffect = true,
  borderGlow = false,
  initialAnimation = true,
  hoverScale = 1.02,
  glowColor,
  glowIntensity = "medium",
  variant = "default",
  ...props
}: GameCardProps) {
  // Mapeo de intensidad a valores
  const intensityMap = {
    low: "0 0 10px",
    medium: "0 0 15px",
    high: "0 0 25px",
  }

  // Obtener color de brillo según la variante
  const getGlowColor = () => {
    if (glowColor) return glowColor

    switch (variant) {
      case "gradient":
      case "raised":
        return "hsl(var(--accent))"
      case "flat":
        return "hsl(var(--primary))"
      default:
        return "hsl(var(--accent))"
    }
  }

  // Obtener estilos según la variante
  const getVariantStyles = () => {
    switch (variant) {
      case "raised":
        return "bg-secondary/40 shadow-lg border-2 border-border/50"
      case "flat":
        return "bg-background/80 border border-border/30"
      case "gradient":
        return "bg-gradient-to-br from-accent/20 to-background border border-accent/20"
      default:
        return "bg-secondary/30 border border-border"
    }
  }

  // Crear un objeto con las propiedades de animación
  const animationProps = {
    whileHover: hoverEffect
      ? {
          y: -5,
          scale: hoverScale,
          boxShadow: borderGlow ? `${intensityMap[glowIntensity]} ${getGlowColor()}` : "0 10px 25px rgba(0, 0, 0, 0.2)",
        }
      : undefined,
    initial: initialAnimation ? { opacity: 0, y: 20 } : undefined,
    animate: initialAnimation ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.4 },
  }

  return (
    <div
      className={cn(
        "relative rounded-lg p-4 overflow-hidden",
        getVariantStyles(),
        glassEffect && "backdrop-blur-sm",
        hoverEffect && "transition-all duration-300",
        className,
      )}
      {...props}
    >
      {/* Usamos un div normal en lugar de motion.div para evitar conflictos de tipos */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-300",
          hoverEffect && "hover:-translate-y-5 hover:shadow-lg",
          borderGlow && "border border-accent/50",
        )}
        style={{
          boxShadow: borderGlow ? `${intensityMap[glowIntensity]} ${getGlowColor()}` : undefined,
        }}
      />

      {borderGlow && (
        <div
          className="absolute inset-0 rounded-lg border border-accent/50 pointer-events-none"
          style={{
            animation: "pulse 2s infinite alternate",
          }}
        />
      )}

      {/* Reflection effect */}
      {hoverEffect && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 pointer-events-none transition-opacity duration-300 hover:opacity-50" />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}

/**
 * Props para FeatureCard
 */
interface FeatureCardProps {
  title: string
  description: string
  imageSrc: string
  className?: string
  onClick?: () => void
  hoverEffect?: boolean
  borderGlow?: boolean
  glowColor?: string
  badge?: string
}

/**
 * Tarjeta para mostrar características con animaciones mejoradas
 */
export function FeatureCard({
  title,
  description,
  imageSrc,
  className,
  onClick,
  hoverEffect = true,
  borderGlow = false,
  glowColor,
  badge,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group bg-secondary/80 border border-border rounded-md overflow-hidden transition-all duration-300 cursor-pointer",
        borderGlow && "border-accent/30",
        hoverEffect && "hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
      onClick={onClick}
      style={{
        boxShadow: borderGlow && hoverEffect ? `0 0 15px ${glowColor || "hsl(var(--accent))"}` : undefined,
      }}
    >
      <div className="relative h-48 overflow-hidden">
        {badge && (
          <div className="absolute top-2 right-2 z-10 bg-accent/90 text-accent-foreground px-2 py-1 rounded text-xs font-bold">
            {badge}
          </div>
        )}
        <Image
          src={imageSrc || "/placeholder.svg?height=192&width=384"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-4">
        <h3 className="font-title text-xl text-accent mb-2 group-hover:text-glow">{title}</h3>
        <p className="text-sm text-muted-foreground font-body">{description}</p>
      </div>
    </div>
  )
}

/**
 * Props para SectionHeader
 */
interface SectionHeaderProps {
  title: string
  subtitle?: string
  accent?: boolean
  className?: string
  align?: "left" | "center" | "right"
  animated?: boolean
  decorative?: boolean
}

/**
 * Componente para encabezados de sección con animaciones mejoradas
 */
export function SectionHeader({
  title,
  subtitle,
  accent = false,
  className = "",
  align = "left",
  animated = true,
  decorative = false,
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  // Variantes de animación para el título
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Variantes de animación para el subtítulo
  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className={cn("mb-8 fade-in-section", alignmentClasses[align], className)}>
      <div className="relative">
        <h2
          className={cn(
            "font-title text-3xl md:text-4xl lg:text-5xl mb-3 relative z-10",
            accent ? "text-accent text-glow" : "text-primary",
          )}
        >
          {title || ""}
        </h2>

        {decorative && (
          <div
            className="absolute -bottom-2 left-0 h-1 bg-accent/30 rounded-full z-0"
            style={{
              width: align === "center" ? "100%" : "50%",
              transition: "width 0.8s ease",
            }}
          />
        )}
      </div>

      {subtitle ? (
        <p
          className={cn(
            "text-muted-foreground text-lg font-body font-light",
            align === "center" ? "max-w-3xl mx-auto" : "max-w-3xl",
            align === "right" ? "ml-auto" : "",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Props para InfoCard
 */
interface InfoCardProps {
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
  className?: string
  variant?: "default" | "accent" | "warning" | "success" | "error"
  hoverEffect?: boolean
}

/**
 * Tarjeta para mostrar información con diferentes variantes
 */
export function InfoCard({ title, content, icon, className, variant = "default", hoverEffect = true }: InfoCardProps) {
  // Obtener estilos según la variante
  const getVariantStyles = () => {
    switch (variant) {
      case "accent":
        return "bg-accent/10 border-accent/30 text-accent"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-500"
      case "success":
        return "bg-green-500/10 border-green-500/30 text-green-500"
      case "error":
        return "bg-red-500/10 border-red-500/30 text-red-500"
      default:
        return "bg-secondary/30 border-border text-foreground"
    }
  }

  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        getVariantStyles(),
        hoverEffect && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {icon && <div className="shrink-0 mt-1">{icon}</div>}
        <div>
          <h3 className="font-title text-lg mb-2">{title}</h3>
          <div className="text-sm text-muted-foreground">{content}</div>
        </div>
      </div>
    </div>
  )
}
