"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Server, Package } from "lucide-react"
import { DiscordLogo } from "@/components/icons/discord-logo"
import { ParallaxSection, ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"

/**
 * Datos de mods destacados
 */
const featuredMods = [
  {
    title: "Create",
    description: "Automatización estética con máquinas de procesamiento y trenes funcionales.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Terralith",
    description: "Terrenos hermosos con generación mejorada y muchos nuevos biomas.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Oh The Biomes We'll Go",
    description: "Añade una gran variedad de biomas nuevos y únicos al mundo de Minecraft.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Blue Skies",
    description: "Nuevas dimensiones con biomas, mazmorras y jefes únicos para explorar.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
]

/**
 * Página principal
 */
export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section with Parallax */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=800&width=1600"
        className="min-h-[60vh] flex items-center justify-center rounded-xl overflow-hidden"
      >
        <div className="text-center p-8 bg-background/60 backdrop-blur-md rounded-xl max-w-3xl mx-auto">
          <motion.h1
            className="minecraft-style text-4xl md:text-5xl lg:text-6xl text-accent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Netherious
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Una experiencia de Minecraft con mods increíbles, terrenos épicos y comunidad amigable.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/modpack">
              <GameButton variant="accent" size="lg" icon={<Package />}>
                Descargar Modpack
              </GameButton>
            </Link>
            <Link href="https://discord.gg/VgHGz5RJ" target="_blank" rel="noopener noreferrer">
              <GameButton variant="outline" size="lg" icon={<DiscordLogo />}>
                Unirse al Discord
              </GameButton>
            </Link>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Featured Mods Section */}
      <ScrollReveal>
        <SectionHeader
          title="Mods Destacados"
          subtitle="Nuestro servidor cuenta con una selección de los mejores mods para mejorar tu experiencia de juego."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMods.map((mod, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GameCard>
                <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={mod.imageSrc || "/placeholder.svg"}
                    alt={mod.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h3 className="font-title text-xl text-accent mb-2">{mod.title}</h3>
                <p className="text-sm text-muted-foreground">{mod.description}</p>
              </GameCard>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* Server Promo Section */}
      <ScrollReveal direction="up" delay={0.2}>
        <GameCard className="p-0 overflow-hidden" borderGlow>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-6 md:p-8">
              <SectionHeader
                title="Únete a Nuestra Comunidad"
                subtitle="Explora, construye y sobrevive en un mundo lleno de aventuras y posibilidades."
                accent
              />
              <p className="text-muted-foreground mb-6">
                Nuestro servidor ofrece una experiencia única con temporadas temáticas, mods cuidadosamente
                seleccionados y una comunidad amigable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/server-info">
                  <GameButton variant="primary" icon={<Server />}>
                    Conectarse al Servidor
                  </GameButton>
                </Link>
                <Link href="https://discord.gg/VgHGz5RJ" target="_blank" rel="noopener noreferrer">
                  <GameButton variant="secondary" icon={<DiscordLogo />}>
                    Discord
                  </GameButton>
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-full min-h-[300px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Minecraft Server Landscape"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent md:from-transparent md:via-transparent md:to-background"></div>
            </div>
          </div>
        </GameCard>
      </ScrollReveal>
    </div>
  )
}

