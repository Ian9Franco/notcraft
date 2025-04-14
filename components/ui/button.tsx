"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Variantes para el botón estándar
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

/**
 * Props para el botón estándar
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
}

/**
 * Componente de botón estándar
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, leftIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
      </Comp>
    )
  },
)
Button.displayName = "Button"

/**
 * Props para el botón de juego
 */
interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
  animated?: boolean
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
  animated = true,
  ...props
}: GameButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  // Detectar si es un dispositivo móvil
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const baseStyles =
    "relative font-minecraft uppercase tracking-wider flex items-center justify-center rounded-md transition-all duration-300"

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary/50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-secondary/50",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-accent/50",
    outline: "bg-background text-foreground border-2 border-border hover:border-accent hover:text-accent",
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

  // Usar button normal en lugar de motion.button para evitar problemas de tipos
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
      {/* Partículas animadas (solo visibles al hacer hover en desktop) */}
      {isHovered && !disabled && !isMobile && animated && (
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
        className={cn(
          "absolute inset-0 rounded-md opacity-0 pointer-events-none bg-radial-glow transition-opacity duration-300",
          isHovered && !disabled ? "opacity-30" : "",
        )}
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
          isHovered && !disabled && !isMobile ? "shadow-glow" : "",
        )}
        style={{
          boxShadow: isHovered && !disabled && !isMobile ? `0 0 10px ${getEffectColor()}` : "none",
        }}
      />

      {/* Contenido del botón */}
      <span className="flex items-center justify-center gap-2 z-10 relative">
        {icon && (
          <span
            className={cn(
              "mr-1 transition-transform duration-300",
              isHovered && !disabled && !isMobile && animated ? "animate-wiggle" : "",
            )}
          >
            {icon}
          </span>
        )}
        <span
          className={cn(
            "transition-transform duration-300",
            isHovered && !disabled && !isMobile && animated ? "animate-float-text" : "",
          )}
        >
          {children}
        </span>
      </span>
    </button>
  )
}

export { buttonVariants }
