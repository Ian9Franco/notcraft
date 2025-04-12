"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { GameButton } from "@/components/ui/button"

interface DownloadSpecificModButtonProps {
  className?: string
  variant?: "primary" | "secondary" | "accent" | "outline"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  modPath?: string
  text?: string
}

export default function DownloadSpecificModButton({
  className = "",
  variant = "secondary",
  size = "sm",
  fullWidth = false,
  modPath = "mods/create-1.20.1-6.0.4.jar",
  text = "Descargar Create Mod",
}: DownloadSpecificModButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsLoading(true)

      // Realizar la solicitud a la API
      const response = await fetch(`/api/download-mod?path=${encodeURIComponent(modPath)}`)

      if (!response.ok) {
        throw new Error("Error al descargar el mod")
      }

      // Obtener el blob de la respuesta
      const blob = await response.blob()

      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(blob)

      // Extraer el nombre del archivo de la ruta
      const fileName = modPath.split("/").pop() || "mod.jar"

      // Crear un elemento <a> temporal para descargar el archivo
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()

      // Limpiar
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error al descargar el mod:", error)
      alert("Hubo un error al descargar el mod. Por favor, inténtalo de nuevo más tarde.")
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
      icon={<Download className="h-4 w-4" />}
      onClick={handleDownload}
      disabled={isLoading}
    >
      {isLoading ? "Descargando..." : text}
    </GameButton>
  )
}
