"use client"

import { useRef, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface BackgroundVideoProps {
  audioEnabled?: boolean
  blurAmount?: number
  manualPlayTrigger?: boolean
  videoSrc?: string
  fallbackImage?: string
  overlayColor?: string
  overlayOpacity?: number
}

export default function BackgroundVideo({
  audioEnabled = true,
  blurAmount = 8,
  manualPlayTrigger = false,
  videoSrc = "/images/landscape/landscape_final.mp4",
  fallbackImage = "/images/landscape/home.png",
  overlayColor = "rgba(0, 0, 0, 0.4)",
  overlayOpacity = 0.4,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoError, setIsVideoError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const video = videoRef.current;
    if (!video) return;
  
    // Asegurar mute para autoplay
    video.muted = true;
    video.volume = 0;
  
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
        console.log("Video de fondo reproducido automáticamente");
      } catch (error) {
        console.error("Error al reproducir el video de fondo:", error);
        // Reintento con delay
        setTimeout(() => {
          video.play().catch((e) => {
            console.error("Reintento fallido:", e);
          });
        }, 1000);
      }
    };
  
    const handleLoadedData = () => {
      if (!isVideoLoaded) {
        setIsVideoLoaded(true);
      }
      playVideo();
    };
  
    const handleError = (e: Event) => {
      console.error("Error en el video de fondo:", e);
      setIsVideoError(true);
    };
  
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
  
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
  
    // Si el video ya está cargado (por ejemplo desde caché)
    if (video.readyState >= 2) {
      handleLoadedData();
    }
  
    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [videoRef, isVideoLoaded]);
  

    // Cleanup


  // Escuchar eventos para controlar el video desde otros componentes
  useEffect(() => {
    const handleToggleVideo = (e: CustomEvent) => {
      const video = videoRef.current
      if (!video) return

      if (e.detail.action === "play" && video.paused) {
        video
          .play()
          .then(() => {
            setIsPlaying(true)
            // Notificar el cambio de estado
            document.dispatchEvent(
              new CustomEvent("backgroundVideoStateChange", {
                detail: { state: "playing" },
              }),
            )
          })
          .catch((err) => console.error("Error al reproducir video:", err))
      } else if (e.detail.action === "pause" && !video.paused) {
        video.pause()
        setIsPlaying(false)
        // Notificar el cambio de estado
        document.dispatchEvent(
          new CustomEvent("backgroundVideoStateChange", {
            detail: { state: "paused" },
          }),
        )
      }
    }

    const handleToggleAudio = (e: CustomEvent) => {
      const video = videoRef.current
      if (!video) return

      if (e.detail.action === "unmute") {
        video.muted = false
        video.volume = 0.3
        setIsMuted(false)
        setHasInteracted(true)
        // Notificar el cambio de estado
        document.dispatchEvent(
          new CustomEvent("backgroundVideoStateChange", {
            detail: { state: "unmuted" },
          }),
        )
      } else if (e.detail.action === "mute") {
        video.muted = true
        video.volume = 0
        setIsMuted(true)
        // Notificar el cambio de estado
        document.dispatchEvent(
          new CustomEvent("backgroundVideoStateChange", {
            detail: { state: "muted" },
          }),
        )
      }
    }

    document.addEventListener("toggleBackgroundVideo", handleToggleVideo as EventListener)
    document.addEventListener("toggleBackgroundAudio", handleToggleAudio as EventListener)

    return () => {
      document.removeEventListener("toggleBackgroundVideo", handleToggleVideo as EventListener)
      document.removeEventListener("toggleBackgroundAudio", handleToggleAudio as EventListener)
    }
  }, [])

  // Efecto para activar el audio cuando se solicita manualmente
  useEffect(() => {
    if (manualPlayTrigger && !hasInteracted) {
      enableAudio()
    }
  }, [manualPlayTrigger, hasInteracted])

  // Efecto para activar el audio cuando cambia la ruta
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
      video.volume = 0.3 // Volumen más bajo por defecto

      // Fade in del volumen para una experiencia más suave
      let currentVolume = 0
      const volumeInterval = setInterval(() => {
        currentVolume += 0.05
        if (currentVolume >= 0.3) {
          currentVolume = 0.3
          clearInterval(volumeInterval)
        }
        video.volume = currentVolume
      }, 100)

      video.play().catch((err) => {
        console.error("Error al activar el audio:", err)
        // Reintento con delay
        setTimeout(() => {
          if (video) {
            video.muted = false
            video.volume = 0.3
            video.play().catch((e) => console.error("Reintento fallido:", e))
          }
        }, 1000)
      })
    } catch (error) {
      console.error("Error al intentar activar el audio:", error)
    }
  }

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
        cursor: hasInteracted ? "default" : "pointer",
      }}
    >
      {/* Overlay con desenfoque y color */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          backdropFilter: `blur(${blurAmount}px)`,
          zIndex: 1,
        }}
      />

      {/* Video de fondo */}
      <motion.video
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
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded && !isVideoError ? 1 : 0 }}
        transition={{ duration: 1 }}
        onError={() => setIsVideoError(true)}
      />

      {/* Fallback en caso de error o mientras carga */}
      {(!isVideoLoaded || isVideoError) && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${fallbackImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
      )}
    </div>
  )
}
