"use client"

import { cn } from "@/lib/utils"

/**
 * Props para SectionHeader
 */
interface SectionHeaderProps {
  title: string
  subtitle?: string
  accent?: boolean
  className?: string
}

/**
 * Componente para encabezados de sección
 */
export function SectionHeader({ title, subtitle, accent = false, className = "" }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 text-center md:text-left fade-in-section", className)}>
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

