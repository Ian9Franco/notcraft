"use client"

import { useRef, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface BackgroundVideoProps {
  audioEnabled?: boolean
  blurAmount?: number // Cantidad de desenfoque (en píxeles)
}

export default function BackgroundVideo({
  audioEnabled = true,
  blurAmount = 8, // Valor para el difuminado
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

    // Función para forzar la reproducción del video
    const forcePlay = () => {
      if (!video) return

      // Intenta reproducir el video con múltiples estrategias
      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error al reproducir el video:", error)

          // Reintento con delay
          setTimeout(() => {
            if (video) {
              video.play().catch((e) => console.error("Reintento fallido:", e))
            }
          }, 1000)
        })
      }
    }

    // Intenta reproducir el video inmediatamente
    forcePlay()

    // También intenta reproducir cuando el video está listo
    video.addEventListener("canplay", forcePlay)

    return () => {
      video.removeEventListener("canplay", forcePlay)
    }
  }, [])

  // Efecto para activar el audio cuando cambia la ruta (navegación por sidebar)
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
      // Asegurarse de que el video esté reproduciendo
      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Una vez que el video está reproduciendo, activar el audio
            video.muted = false
            video.volume = 0.5 // Volumen al 50%
            console.log("Audio activado correctamente")
          })
          .catch((err) => {
            console.error("Error al activar el audio:", err)
          })
      }
    } catch (error) {
      console.error("Error al intentar activar el audio:", error)
    }
  }

  // Efecto para detectar clics en botones y enlaces
  useEffect(() => {
    if (!audioEnabled || hasInteracted) return

    // Función para detectar clics en botones y enlaces
    const handleButtonClick = () => {
      enableAudio()
    }

    // Seleccionar todos los botones y enlaces
    const buttons = document.querySelectorAll("button, a")

    // Añadir event listener a cada botón y enlace
    buttons.forEach((button) => {
      button.addEventListener("click", handleButtonClick)
    })

    // Limpieza
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleButtonClick)
      })
    }
  }, [audioEnabled, hasInteracted])

  return (
    <div
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
    </div>
  )
}
