"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GameButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "accent" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}

export function GameButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  icon,
  fullWidth = false,
}: GameButtonProps) {
  const baseStyles =
    "relative font-minecraft uppercase tracking-wider flex items-center justify-center rounded-md transition-colors"

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

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className,
      )}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      <span
        className={cn(
          "absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-100",
          variant === "primary"
            ? "bg-primary/20"
            : variant === "accent"
              ? "bg-accent/20"
              : variant === "secondary"
                ? "bg-secondary/20"
                : "bg-accent/10",
        )}
      />

      {/* Button content */}
      <span className="flex items-center justify-center gap-2 z-10">
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </span>

      {/* Border glow animation */}
      <motion.span
        className={cn(
          "absolute inset-0 rounded-md border-2",
          variant === "primary"
            ? "border-primary/50"
            : variant === "accent"
              ? "border-accent/50"
              : variant === "secondary"
                ? "border-secondary/50"
                : "border-accent/30",
        )}
        animate={{
          boxShadow: [
            `0 0 0px ${
              variant === "primary"
                ? "hsl(var(--primary))"
                : variant === "accent"
                  ? "hsl(var(--accent))"
                  : variant === "secondary"
                    ? "hsl(var(--secondary))"
                    : "hsl(var(--accent))"
            }`,
            `0 0 8px ${
              variant === "primary"
                ? "hsl(var(--primary))"
                : variant === "accent"
                  ? "hsl(var(--accent))"
                  : variant === "secondary"
                    ? "hsl(var(--secondary))"
                    : "hsl(var(--accent))"
            }`,
            `0 0 0px ${
              variant === "primary"
                ? "hsl(var(--primary))"
                : variant === "accent"
                  ? "hsl(var(--accent))"
                  : variant === "secondary"
                    ? "hsl(var(--secondary))"
                    : "hsl(var(--accent))"
            }`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </motion.button>
  )
}

