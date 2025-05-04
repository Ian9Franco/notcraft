"use client"

import { useState, useEffect } from "react"

export default function AudioDebug() {
  const [audioState, setAudioState] = useState({
    muted: true,
    canPlayAudio: false,
    interactionDetected: false,
    lastError: "",
  })

  useEffect(() => {
    // Verificar si podemos reproducir audio
    const checkAudio = async () => {
      try {
        const audio = new Audio()
        audio.src = "/images/landscape/landscape_final.mp4"
        audio.volume = 0

        const playPromise = audio.play()
        if (playPromise !== undefined) {
          await playPromise
          setAudioState((prev) => ({ ...prev, canPlayAudio: true }))
          audio.pause()
        }
      } catch (error) {
        setAudioState((prev) => ({
          ...prev,
          canPlayAudio: false,
          lastError: error instanceof Error ? error.message : "Error desconocido",
        }))
      }
    }

    checkAudio()

    // Monitorear el estado del video principal
    const checkVideoState = () => {
      const video = document.querySelector("video")
      if (video) {
        setAudioState((prev) => ({
          ...prev,
          muted: video.muted,
        }))
      }
    }

    const interval = setInterval(checkVideoState, 1000)

    // Detectar interacciones
    const detectInteraction = () => {
      setAudioState((prev) => ({ ...prev, interactionDetected: true }))
    }

    const events = ["click", "touchstart", "keydown", "mousedown"]
    events.forEach((event) => {
      document.addEventListener(event, detectInteraction, { once: true })
    })

    return () => {
      clearInterval(interval)
      events.forEach((event) => {
        document.removeEventListener(event, detectInteraction)
      })
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg z-50 text-xs max-w-xs">
      <h3 className="font-bold mb-2">Estado del Audio</h3>
      <p>Silenciado: {audioState.muted ? "✓ Sí" : "✗ No"}</p>
      <p>Puede reproducir audio: {audioState.canPlayAudio ? "✓ Sí" : "✗ No"}</p>
      <p>Interacción detectada: {audioState.interactionDetected ? "✓ Sí" : "✗ No"}</p>
      {audioState.lastError && <p className="text-red-400">Error: {audioState.lastError}</p>}

      <div className="mt-4 flex gap-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
          onClick={() => {
            const video = document.querySelector("video")
            if (video) {
              video.muted = false
              video.volume = 0.5
              video
                .play()
                .then(() => console.log("Audio activado manualmente"))
                .catch((err) => console.error("Error al activar audio:", err))
            }
          }}
        >
          Activar Audio
        </button>
      </div>
    </div>
  )
}
