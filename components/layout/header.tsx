"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, CuboidIcon as Cube, Sun, Moon, Axe, Package, Palette, Server, ImageIcon } from "lucide-react"
import { useTheme } from "next-themes"
import AnimatedLogo from "../ui/animated-logo"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"

/**
 * Componente de encabezado de la aplicación
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, signInWithGoogle, logout } = useUser()

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
        return "Resource Packs"
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

  return (
    <header
      className={`bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2 shadow-md" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo - visible only on mobile */}
          <Link href="/" className="md:hidden flex items-center space-x-2">
            <div className="w-10 h-10 relative flex items-center justify-center">
              {isMounted ? (
                <AnimatedLogo />
              ) : (
                <div className="w-full h-full flex items-center justify-center rounded-md">
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

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1, rotate: theme === "dark" ? 180 : 0 }}
              whileTap={{ scale: 0.9 }}
              aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* User login/profile */}
            {user ? (
              <div className="flex items-center gap-2">
                <motion.img
                  src={user.photoURL || "/placeholder.svg?height=32&width=32"}
                  alt={user.displayName || "Usuario"}
                  className="w-8 h-8 rounded-full border border-border"
                  whileHover={{ scale: 1.1 }}
                />
                <Button variant="ghost" size="sm" onClick={logout} className="hidden md:inline-flex">
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={signInWithGoogle} className="hidden md:inline-flex">
                Iniciar sesión
              </Button>
            )}

            {/* Mobile menu button - only visible on mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground hover:text-accent transition-colors"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - only visible when menu is open */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border/30"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            {!user ? (
              <Button variant="outline" size="sm" onClick={signInWithGoogle} className="w-full mb-4">
                Iniciar sesión con Google
              </Button>
            ) : (
              <div className="flex items-center justify-between mb-4 p-2 bg-secondary/30 rounded-md">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || "/placeholder.svg?height=32&width=32"}
                    alt={user.displayName || "Usuario"}
                    className="w-8 h-8 rounded-full border border-border"
                  />
                  <span className="text-sm">{user.displayName}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Salir
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}

