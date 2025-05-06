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
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
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
  const buttonRef = React.useRef<HTMLDivElement>(null)

  // Detectar si es un dispositivo móvil
  React.useEffect(() => {
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
   * Maneja el clic en el botón con efecto de partículas
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)

    // Si hay un manejador de clic personalizado, lo llamamos
    if (onClick) onClick(e)

    // Efecto de explosión de partículas en el clic
    if (animated && buttonRef.current && !isMobile) {
      const button = buttonRef.current
      const rect = button.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Crear partículas adicionales en el clic
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement("span")
        particle.className = `absolute w-1.5 h-1.5 rounded-full pointer-events-none`
        particle.style.backgroundColor = getEffectColor()
        particle.style.boxShadow = `0 0 6px ${getEffectColor()}`
        particle.style.top = `${centerY}px`
        particle.style.left = `${centerX}px`
        particle.style.opacity = "0.8"

        // Animación aleatoria
        const angle = Math.random() * Math.PI * 2
        const distance = 50 + Math.random() * 100
        const duration = 0.5 + Math.random() * 0.5

        particle.animate(
          [
            { transform: "translate(-50%, -50%) scale(1)", opacity: 0.8 },
            {
              transform: `translate(
                calc(-50% + ${Math.cos(angle) * distance}px), 
                calc(-50% + ${Math.sin(angle) * distance}px)
              ) scale(0)`,
              opacity: 0,
            },
          ],
          { duration: duration * 1000, easing: "cubic-bezier(0.1, 0.8, 0.2, 1)" },
        )

        button.appendChild(particle)
        setTimeout(() => particle.remove(), duration * 1000)
      }
    }
  }

  return (
    <div
      ref={buttonRef}
      className={cn("relative", fullWidth ? "w-full" : "", className)}
      style={{
        transform: !disabled && isHovered ? `scale(${hoverScale})` : "scale(1)",
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
        {/* Partículas animadas (solo visibles al hacer hover en desktop) */}
        {isHovered && !disabled && !isMobile && animated && (
          <>
            {[...Array(particleCount)].map((_, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                style={{
                  background: getEffectColor(),
                  boxShadow: `0 0 6px ${getEffectColor()}`,
                  top: "50%",
                  left: "50%",
                  opacity: 0.8,
                  animation: `particle-${(i % 4) + 1} 0.8s ease-out forwards`,
                }}
              />
            ))}
          </>
        )}

        {/* Efecto de resplandor interno */}
        <span
          className={cn(
            "absolute inset-0 rounded-md opacity-0 pointer-events-none transition-opacity duration-300",
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

        {/* Contenido del botón */}
        <span className="flex items-center justify-center gap-2 z-10 relative">
          {icon && (
            <span
              className="mr-1"
              style={{
                animation: isHovered && !disabled && !isMobile && animated ? "wiggle 1.5s infinite" : "none",
              }}
            >
              {icon}
            </span>
          )}
          <span
            style={{
              animation: isHovered && !disabled && !isMobile && animated ? "float-text 1.5s infinite" : "none",
            }}
          >
            {children}
          </span>
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

  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        "relative overflow-hidden group",
        fullWidth ? "w-full" : "",
        className,
      )}
      style={{
        boxShadow: isHovered ? `${intensityMap[glowIntensity]} ${getGlowColor()}` : "none",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        transform: isHovered ? "scale(1.03)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Efecto de brillo */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
        style={{
          animation: "shine 1.5s infinite linear",
          backgroundSize: "200% 100%",
          backgroundPosition: isHovered ? "right center" : "left center",
          transition: "background-position 1.5s linear",
        }}
      />

      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}

export { buttonVariants }
