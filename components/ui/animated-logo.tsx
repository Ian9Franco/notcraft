"use client"

import { NetheriousLogo } from "@/components/icons/netherious-logo"

/**
 * Componente que muestra el logo animado
 * Ahora utiliza el nuevo componente NetheriousLogo para mantener compatibilidad
 */
export default function AnimatedLogo() {
  return <NetheriousLogo size={40} animate={true} intensity="medium" />
}

