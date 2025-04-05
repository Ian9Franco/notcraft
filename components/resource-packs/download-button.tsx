"use client"

import { useState } from "react"
import { Download, Loader2, Check, AlertCircle } from "lucide-react"
import { GameButton } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ResourceFile {
  id: string
  name: string
}

interface DownloadButtonProps {
  files: ResourceFile[] | ResourceFile
  variant?: "primary" | "secondary" | "accent" | "outline"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  className?: string
  onComplete?: () => void
}

/**
 * Componente para descargar archivos de Google Drive sin recargar la página
 * Soporta descarga de uno o múltiples archivos
 */
export default function DownloadButton({
  files,
  variant = "outline",
  size = "md",
  fullWidth = true,
  className = "",
  onComplete,
}: DownloadButtonProps) {
  const [status, setStatus] = useState<"idle" | "downloading" | "success" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  // Convertir a array si es un solo archivo
  const fileArray = Array.isArray(files) ? files : [files]
  const multipleFiles = fileArray.length > 1

  const downloadFile = async (fileId: string, fileName: string) => {
    try {
      // URL para descarga directa desde Google Drive
      const url = `https://drive.google.com/uc?export=download&id=${fileId}`

      // Crear un elemento <a> invisible para la descarga
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      link.target = "_blank" // Necesario para algunos navegadores

      // Añadir al DOM, hacer clic y luego eliminar
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return true
    } catch (error) {
      console.error("Error downloading file:", error)
      return false
    }
  }

  const handleDownload = async () => {
    if (status === "downloading") return

    setStatus("downloading")
    setProgress(0)
    setErrorMessage("")

    let successCount = 0
    const totalFiles = fileArray.length

    // Descargar archivos secuencialmente para evitar bloqueos del navegador
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]
      const success = await downloadFile(file.id, `${file.name}.zip`)

      if (success) {
        successCount++
        setProgress(Math.round((successCount / totalFiles) * 100))
      }

      // Pequeña pausa entre descargas para evitar problemas
      if (i < fileArray.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
    }

    if (successCount === totalFiles) {
      setStatus("success")
      if (onComplete) onComplete()

      // Volver al estado inicial después de un tiempo
      setTimeout(() => {
        setStatus("idle")
      }, 3000)
    } else {
      setStatus("error")
      setErrorMessage(`Solo se descargaron ${successCount} de ${totalFiles} archivos`)
    }
  }

  // Determinar el texto del botón según el estado
  const getButtonText = () => {
    switch (status) {
      case "downloading":
        return multipleFiles ? `Descargando (${progress}%)` : "Descargando..."
      case "success":
        return "¡Descargado!"
      case "error":
        return "Error"
      default:
        return multipleFiles ? `Descargar ${fileArray.length} archivos` : "Descargar"
    }
  }

  // Determinar el icono del botón según el estado
  const getButtonIcon = () => {
    switch (status) {
      case "downloading":
        return <Loader2 className="h-5 w-5 animate-spin" />
      case "success":
        return <Check className="h-5 w-5" />
      case "error":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Download className="h-5 w-5" />
    }
  }

  return (
    <div className="relative">
      <GameButton
        variant={status === "error" ? "accent" : variant}
        size={size}
        fullWidth={fullWidth}
        className={className}
        onClick={handleDownload}
        disabled={status === "downloading"}
        icon={getButtonIcon()}
      >
        {getButtonText()}
      </GameButton>

      {/* Barra de progreso para múltiples archivos */}
      {status === "downloading" && multipleFiles && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Mensaje de error */}
      {status === "error" && errorMessage && (
        <motion.div
          className="mt-2 text-xs text-destructive flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="h-3 w-3" />
          <span>{errorMessage}</span>
        </motion.div>
      )}
    </div>
  )
}

