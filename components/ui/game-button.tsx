"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Props para el botón de juego
 */
interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
}

/**
 * Componente de botón con estilo de juego
 */
export function GameButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  icon,
  fullWidth = false,
  ...props
}: GameButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const baseStyles =
    "relative font-minecraft uppercase tracking-wider flex items-center justify-center rounded-md transition-all duration-300"

    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-secondary/50",
      accent: "bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-accent/50",
      outline: "bg-background text-foreground border-2 border-border hover:border-accent hover:text-accent",
      ghost: "bg-transparent text-foreground hover:bg-accent/20", // ✅ nuevo estilo
    }

  const sizeStyles = {
    sm: "text-xs py-1 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-3 px-6",
  }

  /**
   * Obtiene el color para los efectos según la variante
   */
  const getEffectColor = () => {
    switch (variant) {
      case "primary":
        return "hsl(var(--primary))"
      case "secondary":
        return "hsl(var(--secondary))"
      case "accent":
        return "hsl(var(--accent))"
      default:
        return "hsl(var(--accent))"
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        "group",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Partículas animadas (solo visibles al hacer hover) */}
      {isHovered && !disabled && (
        <>
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className={`absolute w-1 h-1 rounded-full pointer-events-none animate-particle-${(i % 4) + 1}`}
              style={{
                background: getEffectColor(),
                boxShadow: `0 0 6px ${getEffectColor()}`,
                top: "50%",
                left: "50%",
                opacity: 0.8,
              }}
            />
          ))}
        </>
      )}

      {/* Efecto de resplandor interno */}
      <span
        className={`absolute inset-0 rounded-md opacity-0 pointer-events-none bg-radial-glow transition-opacity duration-300 ${isHovered && !disabled ? "opacity-30" : ""}`}
        style={{
          background: `radial-gradient(circle, ${getEffectColor()}20 0%, transparent 70%)`,
        }}
      />

      {/* Efecto de borde pulsante */}
      <span
        className={cn(
          "absolute inset-0 rounded-md border-2 pointer-events-none transition-all duration-300",
          variant === "primary"
            ? "border-primary/50"
            : variant === "accent"
              ? "border-accent/50"
              : variant === "secondary"
                ? "border-secondary/50"
                : "border-accent/30",
          isHovered && !disabled ? "shadow-glow" : "",
        )}
        style={{
          boxShadow: isHovered && !disabled ? `0 0 10px ${getEffectColor()}` : "none",
        }}
      />

      {/* Contenido del botón */}
      <span className="flex items-center justify-center gap-2 z-10 relative">
        {icon && (
          <span className={`mr-1 transition-transform duration-300 ${isHovered && !disabled ? "animate-wiggle" : ""}`}>
            {icon}
          </span>
        )}
        <span className={`transition-transform duration-300 ${isHovered && !disabled ? "animate-float-text" : ""}`}>
          {children}
        </span>
      </span>
    </button>
  )
}

