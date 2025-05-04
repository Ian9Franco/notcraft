"use client"

import { useRef, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface BackgroundVideoProps {
    audioEnabled?: boolean
    blurAmount?: number
    manualPlayTrigger?: boolean // 👈 NUEVA PROP
  }
export default function BackgroundVideo({
  audioEnabled = true,
  blurAmount = 8, // Valor para el difuminado
  manualPlayTrigger = false, // ← también le das un valor por defecto
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const pathname = usePathname() // Para detectar cambios de ruta

  // Efecto para manejar la reproducción inicial
  useEffect(() => {
    if (typeof window === "undefined") return

    const video = videoRef.current
    if (!video) return

    // Configuración inicial - siempre muteado para permitir autoplay
    video.muted = true
    video.volume = 0

    // Intenta reproducir el video automáticamente
    const playVideo = async () => {
      try {
        await video.play()
        console.log("Video de fondo reproducido automáticamente")
      } catch (error) {
        console.error("Error al reproducir el video de fondo:", error)

        // Reintento con delay
        setTimeout(() => {
          if (video) {
            video.play().catch((e) => console.error("Reintento fallido:", e))
          }
        }, 1000)
      }
    }

    playVideo()

    video.addEventListener("canplay", () => {
      video.play().catch((err) => console.warn("Error al reproducir en canplay:", err))
    })
  }, [])

  // Efecto para activar el audio cuando cambia la ruta (navegación por sidebar)
  // Reacciona al trigger manual para habilitar el audio
  useEffect(() => {
    if (manualPlayTrigger && !hasInteracted) {
      enableAudio()
    }
  }, [manualPlayTrigger, hasInteracted])
  
  useEffect(() => {
    if (!audioEnabled || hasInteracted) return

    // Si hay un cambio de ruta y no se ha activado el audio aún
    if (pathname) {
      enableAudio()
    }
  }, [pathname, audioEnabled, hasInteracted])

  // Función para habilitar el audio
  const enableAudio = () => {
    const video = videoRef.current
    if (!video || !audioEnabled || hasInteracted) return

    setHasInteracted(true)

    try {
      video.muted = false
      video.volume = 0.5
      video.play().catch((err) => {
        console.error("Error al activar el audio:", err)
        setTimeout(() => {
          video.muted = false
          video.volume = 0.5
          video.play().catch((e) => console.error("Reintento fallido:", e))
        }, 1000)
      })
    } catch (error) {
      console.error("Error al intentar activar el audio:", error)
    }
  }
  // Efecto para detectar clics en botones y enlaces
  useEffect(() => {
    if (manualPlayTrigger && !hasInteracted) {
      enableAudio()
    }
  }, [manualPlayTrigger, hasInteracted])

  useEffect(() => {
    if (!audioEnabled || hasInteracted) return
    if (pathname) {
      enableAudio()
    }
  }, [pathname, audioEnabled, hasInteracted])

  // Manejador de clic para el fondo
  const handleBackgroundClick = () => {
    if (!hasInteracted) {
      enableAudio()
    }
  }

  return (
    <div
      onClick={handleBackgroundClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -10,
        overflow: "hidden",
        cursor: hasInteracted ? "default" : "pointer", // Cambiar cursor a pointer si aún no se ha interactuado
      }}
    >
      {/* Overlay con desenfoque */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "transparent",
          backdropFilter: `blur(${blurAmount}px)`,
          zIndex: 1,
        }}
      />

      {/* Video de fondo */}
      <video
        ref={videoRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
        src="/images/landscape/landscape_final.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Fallback en caso de error */}
      {videoRef.current?.error && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#0f0f0f", // Fondo oscuro como fallback
            zIndex: 0,
          }}
        />
      )}
    </div>
  )
}
