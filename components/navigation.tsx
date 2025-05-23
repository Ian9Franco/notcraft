"use client"

import React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Package, Palette, Server, ImageIcon, ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { NetheriousLogo } from "@/components/icons/netherious-logo"

/**
 * Definición de un elemento de navegación
 */
interface NavItem {
  href: string
  icon: React.ReactNode
  label: string
}

/**
 * Props para el componente NavItem
 */
interface NavItemProps extends NavItem {
  isActive: boolean
  isCollapsed: boolean
}

/**
 * Elementos de navegación disponibles
 */
const NAV_ITEMS: NavItem[] = [
  { href: "/", icon: <Home />, label: "Inicio" },
  { href: "/modpack", icon: <Package />, label: "Modpack" },
  { href: "/appearance", icon: <Palette />, label: "Apariencia" },
  { href: "/server-info", icon: <Server />, label: "Server Info" },
  { href: "/gallery", icon: <ImageIcon />, label: "Galería" },
]

/**
 * Componente para un elemento individual de navegación
 */
const NavItem = ({ href, icon, label, isActive, isCollapsed }: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className="w-full">
            <motion.div
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                isCollapsed ? "justify-center" : "justify-start",
                isActive ? "bg-accent/20 text-accent" : "text-sidebar-fg hover:bg-accent/10 hover:text-accent",
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-xl">{icon}</span>
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    className="font-minecraft text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute left-0 w-1 h-8 bg-accent rounded-r-md"
                  layoutId="activeIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right" sideOffset={10}>
            <p>{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

/**
 * Componente principal de la barra lateral de navegación para escritorio
 *
 * Características:
 * - Barra lateral colapsable
 * - Logo con efecto hover
 * - Navegación con indicador de página activa
 * - Adaptable a diferentes tamaños de pantalla
 */
export function SidebarNavigation() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [logoAnimationKey, setLogoAnimationKey] = useState(0)
  const prevCollapsedState = useRef(isCollapsed)

  // Detectar si es dispositivo móvil
  const checkMobile = useCallback(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    if (mobile) setIsCollapsed(true)
  }, [])

  // Configurar detector de tamaño de ventana
  useEffect(() => {
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [checkMobile])

  // Reiniciar animación del logo cuando se expande la barra lateral
  useEffect(() => {
    if (prevCollapsedState.current && !isCollapsed) {
      setLogoAnimationKey((prev) => prev + 1)
    }
    prevCollapsedState.current = isCollapsed
  }, [isCollapsed])

  // Manejar el toggle de la sidebar
  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  // No renderizar en dispositivos móviles
  if (isMobile) return null

  return (
    <motion.aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 z-40 border-r border-border",
        "sidebar shadow-lg shadow-black/20 dark:shadow-black/40",
      )}
      initial={{ x: -50, opacity: 0 }}
      animate={{
        width: isCollapsed ? 64 : 224,
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
        width: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
      }}
      style={{ minWidth: isCollapsed ? "64px" : "224px" }} // Asegura un ancho mínimo consistente
    >
      <div className="flex flex-col h-full relative">
        {/* Contenedor del logo */}
        <div className="h-24 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                key={`logo-${logoAnimationKey}`}
                className="absolute top-0 left-0 w-full p-4 flex items-center justify-center"
                initial={{ x: -100, opacity: 0, scale: 0.9 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link href="/" className="flex items-center justify-start">
                  <NetheriousLogo size={120} location="sidebar" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Elementos de navegación */}
        <div className="flex-1 flex flex-col gap-2 px-2 py-4 w-full">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} {...item} isActive={pathname === item.href} isCollapsed={isCollapsed} />
          ))}
        </div>

        {/* Botón para colapsar/expandir */}
        <div className="p-4 border-t border-border/30">
          <motion.button
            onClick={handleToggleSidebar}
            onMouseEnter={() => {
              setIsHovered(true)
            }}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
              "w-full flex items-center justify-center p-2 rounded-md transition-colors",
              isHovered ? "bg-accent/10 text-accent" : "bg-background text-accent dark:bg-[#0a0a0a]",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label={isCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
          >
            <div className="text-xl">{isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}</div>
          </motion.button>
        </div>
      </div>
    </motion.aside>
  )
}

/**
 * Componente de navegación móvil
 */
export function MobileNavigation() {
  const pathname = usePathname()
  // Ref para controlar que la animación del logo solo se ejecute una vez
  const hasAnimated = useRef(false)

  // Efecto para establecer hasAnimated a true después de la animación
  useEffect(() => {
    const timer = setTimeout(() => {
      hasAnimated.current = true
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Barra de navegación móvil - Corregida para no mostrar etiquetas */}
      <motion.nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-around items-center h-16">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href} className="w-full">
                <div className="flex items-center justify-center h-full relative">
                  <motion.div
                    className={cn("flex items-center justify-center", isActive ? "text-accent" : "text-foreground")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                  </motion.div>

                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 w-8 h-1 bg-accent rounded-t-md"
                      layoutId="mobileActiveIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </motion.nav>
    </>
  )
}
