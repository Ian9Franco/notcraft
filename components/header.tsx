"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, CuboidIcon as Cube } from "lucide-react"
import AnimatedLogo from "./animated-logo"

const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => (
  <Link
    href={href}
    className={`relative font-title text-foreground hover:text-accent transition-colors duration-200 py-2 px-4 group ${
      isActive ? "text-accent" : ""
    }`}
  >
    <span>{children}</span>
    <span
      className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent transition-all duration-300 transform -translate-x-1/2 group-hover:w-full ${
        isActive ? "w-full" : ""
      }`}
    ></span>
  </Link>
)

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header
      className={`bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 shadow-md" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center">
              {isMounted ? (
                <AnimatedLogo />
              ) : (
                <div className="w-full h-full flex items-center justify-center rounded-md">
                  <Cube className="text-accent" />
                </div>
              )}
            </div>
            <span className="font-title text-xl md:text-2xl text-accent tracking-wider">Netherious</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" isActive={pathname === "/"}>
              Inicio
            </NavLink>
            <NavLink href="/modpack" isActive={pathname === "/modpack"}>
              Modpack
            </NavLink>
            <NavLink href="/resource-packs" isActive={pathname === "/resource-packs"}>
              Resource Packs
            </NavLink>
            <NavLink href="/server-info" isActive={pathname === "/server-info"}>
              Server Info
            </NavLink>
            <NavLink href="/gallery" isActive={pathname === "/gallery"}>
              Galería
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground hover:text-accent transition-colors"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border/30 animate-in slide-in-from-top">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col">
              <NavLink href="/" isActive={pathname === "/"}>
                Inicio
              </NavLink>
              <NavLink href="/modpack" isActive={pathname === "/modpack"}>
                Modpack
              </NavLink>
              <NavLink href="/resource-packs" isActive={pathname === "/resource-packs"}>
                Resource Packs
              </NavLink>
              <NavLink href="/server-info" isActive={pathname === "/server-info"}>
                Server Info
              </NavLink>
              <NavLink href="/gallery" isActive={pathname === "/gallery"}>
                Galería
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

