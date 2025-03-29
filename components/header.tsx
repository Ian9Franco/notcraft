"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-foreground hover:text-accent transition-colors duration-200 font-pixel py-2 px-4">
    {children}
  </Link>
)

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="Minecraft Server Logo" width={40} height={40} className="pixelated" />
            <span className="minecraft-style text-xl md:text-2xl text-accent">Minecraft Server</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Inicio</NavLink>
            <NavLink href="/modpack">Modpack</NavLink>
            <NavLink href="/resource-packs">Resource Packs</NavLink>
            <NavLink href="/server-info">Server Info</NavLink>
            <NavLink href="/gallery">Galería</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground hover:text-accent"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col">
              <NavLink href="/">Inicio</NavLink>
              <NavLink href="/modpack">Modpack</NavLink>
              <NavLink href="/resource-packs">Resource Packs</NavLink>
              <NavLink href="/server-info">Server Info</NavLink>
              <NavLink href="/gallery">Galería</NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

