"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { GameButton } from "@/components/ui/button"

interface DownloadModpackButtonProps {
  className?: string
  variant?: "primary" | "secondary" | "accent" | "outline"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  text?: string
}

export default function DownloadModpackButton({
  className = "",
  variant = "accent",
  size = "md",
  fullWidth = false,
  text = "Descargar Modpack Completo",
}: DownloadModpackButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsLoading(true)

      // Realizar la solicitud a la API
      const response = await fetch("/api/download-modpack")

      if (!response.ok) {
        throw new Error("Error al descargar el modpack")
      }

      // Obtener el blob de la respuesta
      const blob = await response.blob()

      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(blob)

      // Crear un elemento <a> temporal para descargar el archivo
      const a = document.createElement("a")
      a.href = url
      a.download = "netherious-modpack.zip"
      document.body.appendChild(a)
      a.click()

      // Limpiar
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error al descargar el modpack:", error)
      alert("Hubo un error al descargar el modpack. Por favor, inténtalo de nuevo más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GameButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      icon={<Download className="h-5 w-5" />}
      onClick={handleDownload}
      disabled={isLoading}
    >
      {isLoading ? "Generando ZIP..." : text}
    </GameButton>
  )
}
