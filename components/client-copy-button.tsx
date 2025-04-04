"use client"

import { CopyButton } from "@/components/ui/form-elements"

/**
 * Componente de botón para copiar texto
 * Versión cliente para usar en páginas
 */
export default function ClientCopyButton({ text, className = "" }: { text: string; className?: string }) {
  return <CopyButton text={text} className={className} />
}

