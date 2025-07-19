"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Package, Palette, Server, ImageIcon, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { NetheriousLogo } from "@/components/icons/netherious-logo"
import { useMediaQuery } from "@/hooks/use-media-query" // Ensure this is correctly imported

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
  const isMobileQuery = useMediaQuery("(max-width: 768px)") // Usa el hook useMediaQuery
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [logoAnimationKey, setLogoAnimationKey] = useState(0)
  const prevCollapsedState = useRef(isCollapsed)

  // Ajusta el estado de colapso basado en el tamaño de la pantalla
  useEffect(() => {
    if (isMobileQuery) {
      setIsCollapsed(true) // Colapsa automáticamente en móvil
    } else {
      // Si pasa de móvil a escritorio, expande por defecto si estaba colapsado por móvil
      if (prevCollapsedState.current && isCollapsed) {
        setIsCollapsed(false)
      }
    }
    prevCollapsedState.current = isCollapsed
  }, [isMobileQuery, isCollapsed])

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
  if (isMobileQuery) return null

  return (
    <motion.aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 z-40 border-r border-border",
        "sidebar shadow-lg shadow-black/20 dark:shadow-black/40",
      )}
      // Animación de entrada más suave al montar el componente
      initial={{ width: 64, x: -64, opacity: 0 }} // Inicia desde fuera de la pantalla y colapsado
      animate={{
        width: isCollapsed ? 64 : 224,
        x: 0, // Siempre anima a la posición 0
        opacity: 1, // Siempre anima a la opacidad 1
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
              isHovered ? "bg-accent/10 text-accent" : "bg-background text-accent",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label={isCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
          >
            {/* Animación de rotación para la flecha */}
            <motion.div
              className="text-xl"
              animate={{ rotate: isCollapsed ? 180 : 0 }} // Rota 180 grados cuando está colapsado
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ChevronLeft size={20} /> {/* Usa un solo icono y rota su contenedor */}
            </motion.div>
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
  const isMobile = useMediaQuery("(max-width: 768px)") // Usa el hook useMediaQuery
  // Ref para controlar que la animación del logo solo se ejecute una vez
  const hasAnimated = useRef(false)

  // Efecto para establecer hasAnimated a true después de la animación
  useEffect(() => {
    const timer = setTimeout(() => {
      hasAnimated.current = true
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Solo renderizar en dispositivos móviles
  if (!isMobile) return null

  return (
    <>
      {/* Barra de navegación móvil - Mejorada */}
      <motion.nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-t border-border shadow-lg shadow-black/30" // Mejoras estéticas
        initial={{ y: 100, opacity: 0 }} // Animación de entrada más suave
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex justify-around items-center h-16 px-2">
          {" "}
          {/* Añadido px-2 para un poco de padding */}
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 flex flex-col items-center justify-center h-full relative group"
              >
                {" "}
                {/* Añadido group */}
                <motion.div
                  className={cn(
                    "flex items-center justify-center p-2 rounded-full transition-colors duration-200", // Añadido padding y redondeo
                    isActive ? "text-accent bg-accent/10" : "text-foreground hover:bg-foreground/5", // Mejoras de color y hover
                  )}
                  whileHover={{ scale: 1.15 }} // Animación de hover más pronunciada
                  whileTap={{ scale: 0.9 }}
                >
                  {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                </motion.div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 w-full h-1 bg-accent rounded-t-md" // Indicador de ancho completo
                      layoutId="mobileActiveIndicator"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {!isActive && (
                    <motion.span
                      className="absolute -bottom-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" // Etiqueta que aparece al hacer hover
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 0, y: 5 }} // Por defecto oculta
                      whileHover={{ opacity: 1, y: 0 }} // Muestra al hacer hover
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </div>
      </motion.nav>
    </>
  )
}
