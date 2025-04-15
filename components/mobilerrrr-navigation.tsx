"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Package, Palette, Server, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MobileNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: <Home size={20} />, label: "Inicio" },
    { href: "/modpack", icon: <Package size={20} />, label: "Modpack" },
    { href: "/resource-packs", icon: <Palette size={20} />, label: "Packs" },
    { href: "/server-info", icon: <Server size={20} />, label: "Server" },
    { href: "/gallery", icon: <ImageIcon size={20} />, label: "Galería" },
  ]

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
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
                  {item.icon}
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

