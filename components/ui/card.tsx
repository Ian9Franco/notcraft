"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
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
interface GameCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  glassEffect?: boolean
  borderGlow?: boolean
}

/**
 * Tarjeta con estilo de juego
 */
export function GameCard({
  children,
  className = "",
  hoverEffect = true,
  glassEffect = true,
  borderGlow = false,
}: GameCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-lg border border-border bg-secondary/30 p-4 overflow-hidden",
        glassEffect && "backdrop-blur-sm",
        hoverEffect && "transition-all duration-300",
        className,
      )}
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {borderGlow && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-accent/50 pointer-events-none"
          animate={{
            boxShadow: ["0 0 0px hsl(var(--accent))", "0 0 8px hsl(var(--accent))", "0 0 0px hsl(var(--accent))"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      )}

      {/* Reflection effect */}
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 pointer-events-none"
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {children}
    </motion.div>
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
}

/**
 * Tarjeta para mostrar características
 */
export function FeatureCard({ title, description, imageSrc, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group bg-secondary/80 border border-border rounded-md overflow-hidden transition-all duration-300",
        className,
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-title text-xl text-accent mb-2">{title}</h3>
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
}

/**
 * Componente para encabezados de sección
 */
export function SectionHeader({ title, subtitle, accent = false }: SectionHeaderProps) {
  return (
    <div className="mb-8 text-center md:text-left fade-in-section">
      <h2
        className={`font-title text-3xl md:text-4xl lg:text-5xl mb-3 ${accent ? "text-accent text-glow" : "text-primary"}`}
      >
        {title || ""}
      </h2>
      {subtitle ? (
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto md:mx-0 font-body font-light">{subtitle}</p>
      ) : null}
    </div>
  )
}

