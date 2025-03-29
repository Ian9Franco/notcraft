"use client"

import type { ReactNode } from "react"

interface ClientWrapperProps {
  children: ReactNode
  className?: string
}

// Este componente ya no es necesario, pero lo mantenemos por compatibilidad
// con el código existente. En su lugar, usamos 'use client' directamente en las páginas.
export function ClientWrapper({ children, className = "" }: ClientWrapperProps) {
  return <div className={`fade-in-section ${className}`}>{children}</div>
}

