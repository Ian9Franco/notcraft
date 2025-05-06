"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  CuboidIcon as Cube,
  Home,
  Package,
  Palette,
  Server,
  ImageIcon,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Volume,
} from "lucide-react"
import { useTheme } from "next-themes"
import { NetheriousLogo } from "@/components/icons/netherious-logo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-media-query"

// Importamos los iconos personalizados
import { CoffeeIcon } from "@/components/icons/coffee-icon"
import { CatIcon } from "@/components/icons/cat-icon"

/**
 * Elementos de navegación disponibles
 */
const NAV_ITEMS = [
  { href: "/", icon: <Home />, label: "Inicio" },
  { href: "/modpack", icon: <Package />, label: "Modpack" },
  { href: "/appearance", icon: <Palette />, label: "Apariencia" },
  { href: "/server-info", icon: <Server />, label: "Server Info" },
  { href: "/gallery", icon: <ImageIcon />, label: "Galería" },
]

/**
 * Componente de encabezado principal
 *
 * Características:
 * - Barra de navegación responsive
 * - Logo con efecto hover
 * - Controles para video de fondo y audio
 * - Cambio de tema claro/oscuro
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(30) // Volumen de 0 a 100
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const [logoAnimationKey, setLogoAnimationKey] = useState(0)
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const videoRef = useRef<HTMLVideoElement>(null)
  const volumeControlRef = useRef<HTMLDivElement>(null)
  const isDarkMode = resolvedTheme === "dark"
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Efecto para detectar scroll y montar componente
  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  // Obtener título de la página actual
  const getPageTitle = () => {
    const currentPage = NAV_ITEMS.find((item) => item.href === pathname)
    return currentPage ? currentPage.label : "Netherious"
  }

  // Obtener icono de la página actual
  const getPageIcon = () => {
    const currentPage = NAV_ITEMS.find((item) => item.href === pathname)
    return currentPage ? (
      React.cloneElement(currentPage.icon as React.ReactElement, { className: "h-5 w-5 text-accent" })
    ) : (
      <Cube className="h-5 w-5 text-accent" />
    )
  }

  // Alternar reproducción de video
  const togglePlayPause = () => {
    // Disparar un evento personalizado para comunicarse con BackgroundVideo
    const event = new CustomEvent("toggleBackgroundVideo", {
      detail: { action: isPlaying ? "pause" : "play" },
    })
    document.dispatchEvent(event)
    setIsPlaying(!isPlaying)
  }

  // Alternar audio
  const toggleMute = () => {
    // Disparar un evento personalizado para comunicarse con BackgroundVideo
    const event = new CustomEvent("toggleBackgroundAudio", {
      detail: { action: isMuted ? "unmute" : "mute" },
    })
    document.dispatchEvent(event)
    setIsMuted(!isMuted)
  }

  // Cambiar volumen
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)

    // Disparar un evento personalizado para comunicarse con BackgroundVideo
    const event = new CustomEvent("setBackgroundVolume", {
      detail: { volume: newVolume / 100 },
    })
    document.dispatchEvent(event)

    // Si el volumen es 0, considerar como muteado
    if (newVolume === 0 && !isMuted) {
      setIsMuted(true)
      document.dispatchEvent(
        new CustomEvent("toggleBackgroundAudio", {
          detail: { action: "mute" },
        }),
      )
    }
    // Si el volumen es mayor que 0 y está muteado, desmutearlo
    else if (newVolume > 0 && isMuted) {
      setIsMuted(false)
      document.dispatchEvent(
        new CustomEvent("toggleBackgroundAudio", {
          detail: { action: "unmute" },
        }),
      )
    }
  }

  // Obtener el icono de volumen según el nivel
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />
    if (volume < 33) return <Volume size={20} />
    if (volume < 66) return <Volume1 size={20} />
    return <Volume2 size={20} />
  }

  // Escuchar eventos del video de fondo
  useEffect(() => {
    const handleVideoStateChange = (e: CustomEvent) => {
      if (e.detail.state === "playing") {
        setIsPlaying(true)
      } else if (e.detail.state === "paused") {
        setIsPlaying(false)
      } else if (e.detail.state === "muted") {
        setIsMuted(true)
      } else if (e.detail.state === "unmuted") {
        setIsMuted(false)
      } else if (e.detail.state === "volume" && typeof e.detail.value === "number") {
        setVolume(Math.round(e.detail.value * 100))
      }
    }

    document.addEventListener("backgroundVideoStateChange", handleVideoStateChange as EventListener)
    return () => {
      document.removeEventListener("backgroundVideoStateChange", handleVideoStateChange as EventListener)
    }
  }, [])

  // Ajustar tamaño del logo según el tamaño de pantalla
  const logoSize = isMobile ? 50 : 80

  // Variantes de animación para los botones
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
  }

  // Variantes de animación para el título
  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  // Variantes de animación para el fondo del título
  const titleBgVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1, ease: "easeOut" } },
  }

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "bg-transparent py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo para móvil con animación mejorada */}
          <Link href="/" className="md:hidden flex items-center space-x-2">
            <div className="relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isMounted && (
                  <motion.div
                    key={`logo-header-${logoAnimationKey}`}
                    initial={{ x: -20, opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ x: -20, opacity: 0, scale: 0.9, rotate: -5 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <NetheriousLogo size={logoSize} location="header" />
                  </motion.div>
                )}
                {!isMounted && (
                  <div className="w-10 h-10 flex items-center justify-center rounded-md">
                    <Cube className="text-accent" />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Título de la página actual (solo en desktop) con animación mejorada */}
          <motion.div
            className="hidden md:flex items-center gap-2"
            variants={titleVariants}
            initial="initial"
            animate="animate"
          >
            <div className="relative">
              <motion.div
                className="absolute -left-7 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {getPageIcon()}
              </motion.div>

              <motion.h1
                className="text-xl font-minecraft text-foreground bg-secondary/50 px-4 py-1 pl-8 rounded border-2 border-border relative z-10"
                variants={titleVariants}
              >
                {getPageTitle()}
              </motion.h1>

              <motion.div
                className="absolute inset-0 bg-accent/10 rounded border-2 border-accent/20 translate-x-1 translate-y-1"
                variants={titleBgVariants}
                initial="initial"
                animate="animate"
              />
            </div>
          </motion.div>

          {/* Botones de control de medios y tema con animaciones mejoradas */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
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
                          <div
                            className="relative flex-1 h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: isDarkMode ? "#1f1f1f" : "#f5e9d5" }}
                          >
                            <motion.div
                              className="absolute h-full"
                              style={{
                                backgroundColor: isDarkMode ? "#B6EFBA" : "#3d2b1f",
                              }}
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

              {/* Botón de tema con iconos personalizados y animaciones mejoradas */}
              {isMounted && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
                    >
                      <AnimatePresence mode="wait">
                        {theme === "dark" ? (
                          <motion.div
                            key="coffee"
                            initial={{ rotate: 180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -180, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CoffeeIcon size={20} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="cat"
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 180, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CatIcon size={20} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {theme === "dark" ? "Cambiar al tema Cozy" : "Cambiar al tema original"}
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  )
}
