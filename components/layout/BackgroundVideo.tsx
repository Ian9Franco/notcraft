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
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)

  // Efecto para verificar si el video existe
  useEffect(() => {
    const checkVideoExists = async () => {
      try {
        const response = await fetch("/images/landscape/landscape_final.mp4", { method: "HEAD" })
        if (!response.ok) {
          setVideoError(`El video no se encontró (${response.status})`)
          console.error("El video no existe en la ruta especificada")
        }
      } catch (error) {
        setVideoError("Error al verificar el video")
        console.error("Error al verificar si el video existe:", error)
      }
    }

    checkVideoExists()
  }, [])

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
        setVideoLoaded(true)
      } catch (error) {
        console.error("Error al reproducir el video de fondo:", error)
      }
    }

    playVideo()

    video.addEventListener("canplay", () => {
      console.log("Video listo para reproducirse (evento canplay)")
      setVideoLoaded(true)
      video.play().catch((err) => console.warn("Error al reproducir en canplay:", err))
    })

    video.addEventListener("error", (e) => {
      console.error("Error en el elemento de video:", e)
      setVideoError("Error al cargar el video")
    })
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
      video.muted = false
      video.volume = 0.5 // Volumen al 50%

      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio activado correctamente")
          })
          .catch((err) => {
            console.error("Error al activar el audio:", err)

            // Reintento con delay
            setTimeout(() => {
              if (video) {
                video.muted = false
                video.volume = 0.5
                video.play().catch((e) => console.error("Reintento fallido:", e))
              }
            }, 1000)
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

      {/* Fallback en caso de error */}
      {videoError && (
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

      {/* Indicador de depuración (solo en desarrollo) */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
            padding: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            fontSize: "12px",
            zIndex: 9999,
            borderRadius: "4px",
          }}
        >
          {videoError ? (
            <span style={{ color: "red" }}>{videoError}</span>
          ) : videoLoaded ? (
            <span style={{ color: "green" }}>Video cargado ✓</span>
          ) : (
            <span>Cargando video...</span>
          )}
          <br />
          <span>Audio: {hasInteracted ? "Activado" : "Silenciado"}</span>
        </div>
      )}
    </div>
  )
}

