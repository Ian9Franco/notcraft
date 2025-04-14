"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
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
  { href: "/resource-packs", icon: <Palette />, label: "Resource Packs" },
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
              {!isCollapsed && (
                <span className="font-minecraft text-sm whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
              )}
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
 * Componente principal de la barra lateral de navegación
 */
export function SidebarNavigation() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Función para verificar si el dispositivo es móvil
  const checkMobile = useCallback(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    if (mobile) setIsCollapsed(true)
  }, [])

  // Efecto para detectar cambios en el tamaño de la ventana
  useEffect(() => {
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [checkMobile])

  // No renderizar en dispositivos móviles
  if (isMobile) return null

  return (
    <motion.aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 z-40 border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-56",
        "sidebar shadow-lg shadow-black/20 dark:shadow-black/40",
      )}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      layout
    >
      <div className="flex flex-col h-full">
        {/* Logo y título */}
        <div className="p-4 flex items-center justify-center">
          <Link href="/" className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-start gap-2")}>
            <div className="w-10 h-10 relative flex items-center justify-center">
              <NetheriousLogo size={40} showText={false} animate={true} intensity="medium" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  className="font-title text-xl text-accent tracking-wider"
                  initial={{ opacity: 0, x: -10, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: "auto" }}
                  exit={{ opacity: 0, x: -10, width: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  Netherious
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Elementos de navegación */}
        <div className="flex-1 py-8 flex flex-col gap-2 px-2">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} {...item} isActive={pathname === item.href} isCollapsed={isCollapsed} />
          ))}
        </div>

        {/* Botón para colapsar/expandir con animación mejorada */}
        <div className="p-4 border-t border-border/30">
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
              "w-full flex items-center justify-center p-2 rounded-md transition-colors",
              isHovered ? "bg-accent/10 text-sidebar-fg" : "bg-[#1a1a1a] dark:bg-[#0a0a0a] text-accent",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isCollapsed ? 0 : 180 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
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

  return (
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
              <div className="flex flex-col items-center justify-center h-full relative">
                <div
                  className={cn(
                    "flex flex-col items-center justify-center",
                    isActive ? "text-accent" : "text-foreground",
                  )}
                >
                  {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                  <span className="text-xs mt-1 font-minecraft">{item.label}</span>
                </div>

                {isActive && (
                  <motion.div
                    className="absolute bottom-0 w-12 h-1 bg-accent rounded-t-md"
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
  )
}

/**
 * Componente de animaciones
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
}) {
  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 }
      case "down":
        return { y: -50, opacity: 0 }
      case "left":
        return { x: 50, opacity: 0 }
      case "right":
        return { x: -50, opacity: 0 }
      default:
        return { y: 50, opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialProps()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Componente de sección con efecto parallax
 */
export function ParallaxSection({
  children,
  bgImage,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  height = "400px",
  className = "",
}: {
  children: React.ReactNode
  bgImage: string
  overlayColor?: string
  height?: string
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ height }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          transform: "translateZ(0)",
        }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />
      <div className="relative z-10 h-full flex items-center justify-center">{children}</div>
    </div>
  )
}
