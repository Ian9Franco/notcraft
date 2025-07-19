"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, Palette, Server, ImageIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar, // Importa el hook useSidebar
} from "@/components/ui/sidebar"
import { NetheriousLogo } from "@/components/icons/netherious-logo"

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

export function AppMobileSidebar() {
  const { isMobile } = useSidebar() // Usa el hook para saber si es móvil
  const pathname = usePathname()

  // Solo renderizar en dispositivos móviles
  if (!isMobile) return null

  return (
    <Sidebar side="left" collapsible="offcanvas">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center justify-center">
          <NetheriousLogo size={80} location="sidebar" />
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 flex flex-col gap-2 p-2">
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
