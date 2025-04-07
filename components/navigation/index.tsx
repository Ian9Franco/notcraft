"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Package, Palette, Server, ImageIcon, ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { NetheriousLogo } from "@/components/icons/netherious-logo"

/**
 * Definición de elementos de navegación
 */
const NAV_ITEMS = [
  { href: "/", icon: <Home />, label: "Inicio" },
  { href: "/modpack", icon: <Package />, label: "Modpack" },
  { href: "/resource-packs", icon: <Palette />, label: "Resource Packs" },
  { href: "/server-info", icon: <Server />, label: "Server Info" },
  { href: "/gallery", icon: <ImageIcon />, label: "Galería" },
]

/**
 * Props para el componente NavItem
 */
interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  isCollapsed?: boolean
}

/**
 * Componente para un elemento individual de navegación en la barra lateral
 */
const SidebarNavItem = ({ href, icon, label, isActive, isCollapsed = false }: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className="w-full">
            <motion.div
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                isCollapsed ? "justify-center" : "justify-start",
                isActive
                  ? "bg-accent/20 text-accent"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-xl">{icon}</span>
              {!isCollapsed && <span className="font-title text-sm">{label}</span>}
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
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

/**
 * Componente de navegación para la barra lateral
 */
export function SidebarNavigation() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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
        "hidden md:flex flex-col h-screen bg-background/95 backdrop-blur-sm border-r border-border sticky top-0 z-40 transition-all duration-300",
        isCollapsed ? "w-16" : "w-56",
      )}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full">
        {/* Logo y título */}
        <div className="p-4 flex items-center justify-center">
          <Link href="/" className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-start gap-2")}>
            <div className="w-10 h-10 relative flex items-center justify-center">
              <NetheriousLogo size={40} animate={true} intensity="medium" />
            </div>
            {!isCollapsed && (
              <motion.span
                className="font-title text-xl text-accent tracking-wider"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                Netherious
              </motion.span>
            )}
          </Link>
        </div>

        {/* Elementos de navegación */}
        <div className="flex-1 py-8 flex flex-col gap-2 px-2">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem key={item.href} {...item} isActive={pathname === item.href} isCollapsed={isCollapsed} />
          ))}
        </div>

        {/* Botón para colapsar/expandir */}
        <div className="p-4 border-t border-border/30">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
      </div>
    </motion.aside>
  )
}

/**
 * Componente de navegación para dispositivos móviles
 */
export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border"
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
                    isActive ? "text-accent" : "text-muted-foreground",
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

