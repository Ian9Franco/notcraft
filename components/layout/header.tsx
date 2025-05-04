"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
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
} from "lucide-react"
import { useTheme } from "next-themes"
import { NetheriousLogo } from "@/components/icons/netherious-logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Importamos los iconos personalizados
import { CoffeeIcon } from "@/components/icons/coffee-icon"
import { CatIcon } from "@/components/icons/cat-icon"

/**
 * Elementos de navegación disponibles
 */
const NAV_ITEMS = [
  { href: "/", icon: <Home />, label: "Inicio" },
  { href: "/modpack", icon: <Package />, label: "Modpack" },
  { href: "/resource-packs", icon: <Palette />, label: "Apariencia" },
  { href: "/server-info", icon: <Server />, label: "Server Info" },
  { href: "/gallery", icon: <ImageIcon />, label: "Galería" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [logoAnimationKey, setLogoAnimationKey] = useState(0)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Efecto para detectar scroll y montar componente
  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cerrar menú al cambiar de página
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Obtener título de la página actual
  const getPageTitle = () => {
    const currentPage = NAV_ITEMS.find((item) => item.href === pathname)
    return currentPage ? currentPage.label : "Netherious"
  }

  // Obtener icono de la página actual
  const getPageIcon = () => {
    const currentPage = NAV_ITEMS.find((item) => item.href === pathname)
    return currentPage ? (
      React.cloneElement(currentPage.icon, { className: "h-5 w-5 text-accent" })
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
      }
    }

    document.addEventListener("backgroundVideoStateChange", handleVideoStateChange as EventListener)
    return () => {
      document.removeEventListener("backgroundVideoStateChange", handleVideoStateChange as EventListener)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "bg-transparent py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo para móvil - Usa la misma animación que la sidebar */}
          <Link href="/" className="md:hidden flex items-center space-x-2">
            <div className="relative flex items-center justify-center">
              {isMounted && (
                <motion.div
                  key={`logo-header-${logoAnimationKey}`}
                  initial={{ x: -100, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <NetheriousLogo size={40} />
                </motion.div>
              )}
              {!isMounted && (
                <div className="w-10 h-10 flex items-center justify-center rounded-md">
                  <Cube className="text-accent" />
                </div>
              )}
            </div>
          </Link>

          {/* Título de la página actual (solo en desktop) */}
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {getPageIcon()}
              <motion.h1
                className="text-xl font-minecraft text-foreground bg-secondary/50 px-4 py-1 rounded border-2 border-border relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {getPageTitle()}
              </motion.h1>

              <motion.div
                className="absolute inset-0 bg-accent/10 rounded border-2 border-accent/20 translate-x-1 translate-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Botones de control de medios y tema */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              {/* Botón de reproducción de video */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>{isPlaying ? "Pausar video de fondo" : "Reproducir video de fondo"}</TooltipContent>
              </Tooltip>

              {/* Botón de audio */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={toggleMute}
                    className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={isMuted ? "Activar audio" : "Silenciar audio"}
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>{isMuted ? "Activar audio" : "Silenciar audio"}</TooltipContent>
              </Tooltip>

              {/* Botón de tema con iconos personalizados */}
              {isMounted && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1, rotate: theme === "dark" ? 180 : 0 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
                    >
                      {theme === "dark" ? <CoffeeIcon size={20} /> : <CatIcon size={20} />}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>{theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}</TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>

            {/* Botón de menú móvil */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para móvil con iconos */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border/30"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {NAV_ITEMS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md font-minecraft transition-colors",
                    pathname === link.href ? "bg-accent/20 text-accent" : "hover:bg-accent/10 hover:text-accent",
                  )}
                >
                  <span className="text-xl">
                    {React.cloneElement(link.icon, {
                      className: cn("h-5 w-5", pathname === link.href ? "text-accent" : "text-foreground"),
                    })}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
