"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

/**
 * Props para el botón de copiar
 */
interface CopyButtonProps {
  text: string
  className?: string
  successDuration?: number
}

/**
 * Botón que copia texto al portapapeles y muestra una confirmación visual
 */
export default function CopyButton({ text, className = "", successDuration = 2000 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), successDuration)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${className}`}
      onClick={handleCopy}
      aria-label={copied ? "Copiado" : "Copiar al portapapeles"}
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}

