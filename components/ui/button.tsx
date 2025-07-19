"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Variantes para el botón estándar
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90", // Asegurado que la variante 'accent' esté presente
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
  variant?: "default" | "secondary" | "accent" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
  animated?: boolean
  particleCount?: number
  glowOnHover?: boolean
  glowColor?: string
  hoverScale?: number
}

/**
 * Componente de botón con estilo de juego y animaciones mejoradas
 */
export function GameButton({
  children,
  onClick,
  variant = "default",
  size = "md",
  className = "",
  disabled = false,
  icon,
  fullWidth = false,
  animated = true,
  particleCount = 8,
  glowOnHover = true,
  glowColor,
  hoverScale = 1.03,
  ...props
}: GameButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false) // Nuevo estado para hidratación
  const buttonRef = React.useRef<HTMLDivElement>(null)

  // Detectar si es un dispositivo móvil y si el componente está montado en el cliente
  React.useEffect(() => {
    setIsClient(true) // El componente se ha montado en el cliente
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const baseStyles =
    "relative font-minecraft uppercase tracking-wider flex items-center justify-center rounded-md transition-all duration-300 overflow-visible"

  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary/50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-secondary/50",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-accent/50",
    outline: "bg-background text-foreground border-2 border-border hover:border-accent hover:text-accent",
    ghost: "bg-transparent text-foreground hover:bg-accent/20",
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
    if (glowColor) return glowColor

    switch (variant) {
      case "default":
        return "hsl(var(--primary))"
      case "secondary":
        return "hsl(var(--secondary))"
      case "accent":
        return "hsl(var(--accent))"
      default:
        return "hsl(var(--accent))"
    }
  }

  /**
   * Maneja el clic en el botón sin efecto de partículas
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)

    // Si hay un manejador de clic personalizado, lo llamamos
    if (onClick) onClick(e)

    // Eliminado: Efecto de explosión de partículas en el clic
  }

  return (
    <div
      ref={buttonRef}
      className={cn("relative", fullWidth ? "w-full" : "", className)}
      style={{
        transform: !disabled && isHovered && isClient ? `scale(${hoverScale})` : "scale(1)", // Solo animar en cliente
        transition: "transform 0.2s ease",
      }}
    >
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size as keyof typeof sizeStyles],
          fullWidth ? "w-full" : "",
          disabled ? "opacity-50 cursor-not-allowed" : "",
          isClicked ? "scale-95" : "",
          "group",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Eliminado: Partículas animadas (antes visibles al hacer hover) */}

        {/* Efecto de resplandor interno (solo en cliente) */}
        {isClient && (
          <span
            className={cn(
              "absolute inset-0 rounded-md opacity-0 pointer-events-none transition-opacity duration-300",
              isHovered && !disabled ? "opacity-30" : "",
            )}
            style={{
              background: `radial-gradient(circle, ${getEffectColor()}20 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Efecto de borde pulsante (solo en cliente) */}
        {isClient && (
          <span
            className={cn(
              "absolute inset-0 rounded-md border-2 pointer-events-none transition-all duration-300",
              variant === "default"
                ? "border-primary/50"
                : variant === "accent"
                  ? "border-accent/50"
                  : variant === "secondary"
                    ? "border-secondary/50"
                    : "border-accent/30",
              isHovered && !disabled && !isMobile && glowOnHover ? "shadow-glow" : "",
            )}
            style={{
              boxShadow: isHovered && !disabled && !isMobile && glowOnHover ? `0 0 10px ${getEffectColor()}` : "none",
            }}
          />
        )}

        {/* Contenido del botón */}
        <span className="flex items-center justify-center gap-2 z-10 relative">
          {icon &&
            isClient && ( // Solo animar en cliente
              <span
                className="mr-1"
                style={{
                  animation: isHovered && !disabled && !isMobile && animated ? "wiggle 1.5s infinite" : "none",
                }}
              >
                {icon}
              </span>
            )}
          {isClient ? ( // Solo animar en cliente
            <span
              style={{
                animation: isHovered && !disabled && !isMobile && animated ? "float-text 1.5s infinite" : "none",
              }}
            >
              {children}
            </span>
          ) : (
            <span>{children}</span> // Renderizar sin animación en el servidor
          )}
        </span>
      </button>
    </div>
  )
}

/**
 * Props para el botón con efecto de brillo
 */
interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "secondary" | "accent" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  glowColor?: string
  glowIntensity?: "low" | "medium" | "high"
  icon?: React.ReactNode
  fullWidth?: boolean
}

/**
 * Componente de botón con efecto de brillo
 */
export function GlowButton({
  children,
  variant = "default",
  size = "default",
  className = "",
  glowColor,
  glowIntensity = "medium",
  icon,
  fullWidth = false,
  ...props
}: GlowButtonProps) {
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
      case "default":
        return "hsl(var(--primary))"
      case "secondary":
        return "hsl(var(--secondary))"
      case "accent":
        return "hsl(var(--accent))"
      default:
        return "hsl(var(--accent))"
    }
  }

  const [isHovered, setIsHovered] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false) // Nuevo estado para hidratación

  React.useEffect(() => {
    setIsClient(true) // El componente se ha montado en el cliente
  }, [])

  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        "relative overflow-hidden group",
        fullWidth ? "w-full" : "",
        className,
      )}
      style={{
        boxShadow: isClient && isHovered ? `${intensityMap[glowIntensity]} ${getGlowColor()}` : "none", // Solo animar en cliente
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        transform: isClient && isHovered ? "scale(1.03)" : "scale(1)", // Solo animar en cliente
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Efecto de brillo (solo en cliente) */}
      {isClient && (
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
          style={{
            animation: "shine 1.5s infinite linear",
            backgroundSize: "200% 100%",
            backgroundPosition: isHovered ? "right center" : "left center",
            transition: "background-position 1.5s linear",
          }}
        />
      )}

      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}

export { buttonVariants }
