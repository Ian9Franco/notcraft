"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, CuboidIcon as Cube, Sun, Moon, Axe, Package, Palette, Server, ImageIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { NetheriousLogo } from "@/components/icons/netherious-logo"
import { Button } from "@/components/ui/button"


import { Play } from "lucide-react"


/**
 * Componente de encabezado de la aplicación
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // Efecto para detectar scroll y montaje
  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cerrar el menú móvil cuando cambia la ruta
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  /**
   * Función para obtener el título de la página actual
   */
  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return "Inicio"
      case "/modpack":
        return "Modpack"
      case "/resource-packs":
        return "Apariencia"
      case "/server-info":
        return "Server Info"
      case "/gallery":
        return "Galería"
      default:
        return "Netherious"
    }
  }

  /**
   * Función para obtener el icono de la página actual
   */
  const getPageIcon = () => {
    switch (pathname) {
      case "/":
        return <Axe className="h-5 w-5 text-accent" />
      case "/modpack":
        return <Package className="h-5 w-5 text-accent" />
      case "/resource-packs":
        return <Palette className="h-5 w-5 text-accent" />
      case "/server-info":
        return <Server className="h-5 w-5 text-accent" />
      case "/gallery":
        return <ImageIcon className="h-5 w-5 text-accent" />
      default:
        return <Cube className="h-5 w-5 text-accent" />
    }
  }

  // Enlaces de navegación
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/modpack", label: "Modpack" },
    { href: "/resource-packs", label: "Apariencia" },
    { href: "/server-info", label: "Server Info" },
    { href: "/gallery", label: "Galería" },
  ]

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "bg-transparent py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo - visible only on mobile */}
          <Link href="/" className="md:hidden flex items-center space-x-2">
            <div className="relative flex items-center justify-center">
              {isMounted ? (
                <NetheriousLogo size={40} showText={false} animate={true} />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-md">
                  <Cube className="text-accent" />
                </div>
              )}
            </div>
            <span className="font-title text-xl text-accent tracking-wider">Netherious</span>
          </Link>

          {/* Page title - visible on all devices */}
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Estilo Minecraft para el título de la página */}
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

              {/* Efecto de sombra estilo Minecraft */}
              <motion.div
                className="absolute inset-0 bg-accent/10 rounded border-2 border-accent/20 translate-x-1 translate-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </div>
          </motion.div>


          {/* Play intro video */}
            <motion.button
              onClick={() => {
                const video = document.getElementById("intro-video") as HTMLVideoElement
                if (video) {
                  video.play()
                  video.scrollIntoView({ behavior: "smooth", block: "center" })
                }
              }}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Reproducir video de introducción"
            >
              <Play size={20} />
            </motion.button>


          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {isMounted && (
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1, rotate: theme === "dark" ? 180 : 0 }}
                whileTap={{ scale: 0.9 }}
                aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            )}

            {/* Mobile menu button - only visible on mobile */}
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

      {/* Mobile Navigation - only visible when menu is open */}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-md font-minecraft transition-colors",
                    pathname === link.href ? "bg-accent/20 text-accent" : "hover:bg-accent/10 hover:text-accent",
                  )}
                >
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

// Función de utilidad para combinar clases
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
