"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { CuboidIcon as Cube, Home, Package, Palette, Server, ImageIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { NetheriousLogo } from "@/components/icons/netherious-logo"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MediaControls } from "@/components/layout/MediaControls"

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
 * - Controles para video de fondo y audio (delegados a MediaControls)
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(30) // Volumen de 0 a 100
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
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
      {/* Removed 'container mx-auto' to allow full width within SidebarInset */}
      <div className="w-full px-4">
        <div className="flex justify-between items-center">
          {/* Logo para móvil con animación mejorada */}
          <Link href="/" className="md:hidden flex items-center space-x-2">
            <div className="relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isMounted && (
                  <motion.div
                    key="logo-header"
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
            className="hidden md:flex items-center gap-2 ml-16"
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

          {/* Controles de medios */}
          <TooltipProvider>
            <MediaControls
              isPlaying={isPlaying}
              isMuted={isMuted}
              volume={volume}
              isDarkMode={resolvedTheme === "dark"}
            />
          </TooltipProvider>
        </div>
      </div>
    </header>
  )
}
