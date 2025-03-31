"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Package, Palette, Server, ImageIcon, ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import AnimatedLogo from "./animated-logo"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  isCollapsed: boolean
}

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

export default function SidebarNavigation() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const navItems = [
    { href: "/", icon: <Home />, label: "Inicio" },
    { href: "/modpack", icon: <Package />, label: "Modpack" },
    { href: "/resource-packs", icon: <Palette />, label: "Resource Packs" },
    { href: "/server-info", icon: <Server />, label: "Server Info" },
    { href: "/gallery", icon: <ImageIcon />, label: "Galería" },
  ]

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
        <div className="p-4 flex items-center justify-center">
          <Link href="/" className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-start gap-2")}>
            <div className="w-10 h-10 relative flex items-center justify-center">
              <AnimatedLogo />
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

        <div className="flex-1 py-8 flex flex-col gap-2 px-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        <div className="p-4 border-t border-border/30">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
      </div>
    </motion.aside>
  )
}

