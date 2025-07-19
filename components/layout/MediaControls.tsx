"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Volume1, Volume } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface MediaControlsProps {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  isDarkMode: boolean
}

export function MediaControls({ isPlaying, isMuted, volume, isDarkMode }: MediaControlsProps) {
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const volumeControlRef = useRef<HTMLDivElement>(null)
  const [canPlayAudio, setCanPlayAudio] = useState(false)
  const [interactionDetected, setInteractionDetected] = useState(false)
  const [lastError, setLastError] = useState("")

  // Cerrar control de volumen al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node) && showVolumeControl) {
        setShowVolumeControl(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showVolumeControl])

  useEffect(() => {
    // Verificar si podemos reproducir audio
    const checkAudioCapability = async () => {
      try {
        const audio = new Audio()
        // Usar un archivo de audio pequeño o un blob para la prueba
        audio.src =
          "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2YzU4LjM1LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAAAAAAAAAAAD/8xAxAAAAwAAAdwAAAAPwAAA+gAAAEwAAAkxAAACXgAAAn4AAAKfAAACrQAAAsMAAALXAAAC4wAAAvcAAAMDAAADFwAAAx8AAANFAAADUQAAANwAAADjAAAA6gAAAO8AAAD3AAAA/gAAAA==" // Pequeño MP3 silencioso
        audio.volume = 0
        audio.muted = true // Asegurar que esté muteado para la prueba

        const playPromise = audio.play()
        if (playPromise !== undefined) {
          await playPromise
          setCanPlayAudio(true)
          audio.pause()
          audio.remove() // Limpiar el elemento de audio
        }
      } catch (error) {
        setCanPlayAudio(false)
        setLastError(error instanceof Error ? error.message : "Error desconocido al verificar audio")
      }
    }

    checkAudioCapability()

    // Detectar interacciones del usuario
    const detectInteraction = () => {
      setInteractionDetected(true)
      // Remover listeners después de la primera interacción
      events.forEach((event) => {
        document.removeEventListener(event, detectInteraction)
      })
    }

    const events = ["click", "touchstart", "keydown", "mousedown"]
    events.forEach((event) => {
      document.addEventListener(event, detectInteraction, { once: true })
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, detectInteraction)
      })
    }
  }, [])

  // Alternar reproducción de video
  const togglePlayPause = () => {
    const event = new CustomEvent("toggleBackgroundVideo", {
      detail: { action: isPlaying ? "pause" : "play" },
    })
    document.dispatchEvent(event)
  }

  // Alternar audio
  const toggleMute = () => {
    const event = new CustomEvent("toggleBackgroundAudio", {
      detail: { action: isMuted ? "unmute" : "mute" },
    })
    document.dispatchEvent(event)
  }

  // Cambiar volumen
  const handleVolumeChange = (newVolume: number) => {
    const event = new CustomEvent("setBackgroundVolume", {
      detail: { volume: newVolume / 100 },
    })
    document.dispatchEvent(event)

    // Si el volumen es 0, considerar como muteado
    if (newVolume === 0 && !isMuted) {
      toggleMute()
    }
    // Si el volumen es mayor que 0 y está muteado, desmutearlo
    else if (newVolume > 0 && isMuted) {
      toggleMute()
    }
  }

  // Obtener el icono de volumen según el nivel
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />
    if (volume < 33) return <Volume size={20} />
    if (volume < 66) return <Volume1 size={20} />
    return <Volume2 size={20} />
  }

  // Variantes de animación para los botones
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {/* Botón de reproducción de video */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={togglePlayPause}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 30 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pause size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0, rotate: 30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -30 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Play size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>{isPlaying ? "Pausar video de fondo" : "Reproducir video de fondo"}</TooltipContent>
        </Tooltip>

        {/* Control de volumen con dropdown personalizado y animaciones mejoradas */}
        <div className="relative" ref={volumeControlRef}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => setShowVolumeControl(!showVolumeControl)}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                aria-label="Control de volumen"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`volume-${isMuted ? "muted" : volume}`}
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getVolumeIcon()}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>Control de volumen</TooltipContent>
          </Tooltip>

          {/* Panel de control de volumen con animaciones mejoradas */}
          <AnimatePresence>
            {showVolumeControl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 mt-2 w-64 p-4 rounded-md border bg-popover shadow-md z-50"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">Volumen</h4>
                    <motion.button
                      onClick={toggleMute}
                      className="p-1 rounded-full hover:bg-accent/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-4">
                    <Volume className="h-4 w-4 text-muted-foreground" />
                    <div className="relative flex-1 h-2 rounded-full overflow-hidden bg-muted">
                      <motion.div
                        className="absolute h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${isMuted ? 0 : volume}%` }}
                        transition={{ duration: 0.3 }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={volume}
                        onChange={(e) => handleVolumeChange(Number.parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <span className="text-xs w-8 text-right">{volume}%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  )
}
