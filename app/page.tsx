"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Server, Package } from "lucide-react"
import { DiscordLogo } from "@/components/icons/discord-logo"
import { NetheriousLogo } from "@/components/icons/netherious-logo"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Carousel } from "@/components/ui/carousel"

/**
 * Datos de mods destacados
 */
const featuredMods = [
  {
    title: "Create",
    description: "Automatización estética con máquinas de procesamiento y trenes funcionales.",
    imageSrc: "/images/mods/create-banner.png",
    logoSrc: "/images/mods/createlogo.png",
  },
  {
    title: "Terralith",
    description: "Terrenos hermosos con generación mejorada y muchos nuevos biomas.",
    imageSrc: "/images/mods/terralith-banner.png",
    logoSrc: "/images/mods/terralithlogo.png",
  },
  {
    title: "Oh The Biomes We'll Go",
    description: "Añade una gran variedad de biomas nuevos y únicos al mundo de Minecraft.",
    imageSrc: "/images/mods/biomes-banner.png",
    logoSrc: "/images/mods/biomeslogo.png",
  },
  {
    title: "Blue Skies",
    description: "Nuevas dimensiones con biomas, mazmorras y jefes únicos para explorar.",
    imageSrc: "/images/mods/blueskyes-banner.png",
    logoSrc: "/images/mods/blueskyeslogo.png",
  },
  {
    title: "Cataclysm",
    description: "Añade estructuras peligrosas y jefes desafiantes al mundo de Minecraft.",
    imageSrc: "/images/mods/cataclysm-banner.png",
    logoSrc: "/images/mods/cataclysmlogo.png",
  },
  {
    title: "Grim",
    description: "Una experiencia de supervivencia más oscura y desafiante.",
    imageSrc: "/images/mods/grim-banner.png",
    logoSrc: "/images/mods/grimlogo.png",
  },
]

/**
 * Página principal
 */
export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section with Video Background */}
      <div className="relative min-h-[60vh] rounded-xl overflow-hidden">
        {/* Video Background */}
        <video
          src="/images/landscape/landscape_video"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <audio src="/images/landscape/landscape_audio" autoPlay loop className="hidden" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-1"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 max-w-3xl mx-auto">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NetheriousLogo showText={true} size={80} className="h-20" />
            </motion.div>

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
        </div>
      </div>

      {/* Featured Mods Section with Carousel */}
      <ScrollReveal>
        <SectionHeader
          title="Mods Destacados"
          subtitle="Nuestro servidor cuenta con una selección de los mejores mods para mejorar tu experiencia de juego."
        />

        <div className="mt-8">
          <Carousel>
            {featuredMods.map((mod, index) => (
              <div key={index} className="p-4">
                <GameCard className="h-full">
                  <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={mod.imageSrc || "/placeholder.svg"}
                      alt={`${mod.title} banner`}
                      fill
                      className="object-contain transition-transform duration-500 hover:scale-105 bg-secondary/50"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative h-12 w-12">
                      <Image
                        src={mod.logoSrc || "/placeholder.svg"}
                        alt={`${mod.title} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-title text-xl text-accent">{mod.title}</h3>
                  </div>
                  <p className="text-sm text-foreground">{mod.description}</p>
                </GameCard>
              </div>
            ))}
          </Carousel>
        </div>
      </ScrollReveal>

      {/* Server Promo Section */}
      <ScrollReveal direction="up" delay={0.2}>
        <GameCard className="p-0 overflow-hidden" borderGlow>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-6 md:p-8 relative z-10">
              <SectionHeader
                title="Únete a Nuestra Comunidad"
                subtitle="Explora, construye y sobrevive en un mundo lleno de aventuras y posibilidades."
                accent
              />
              <p className="text-foreground mb-6">
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
            <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Minecraft Server Landscape"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent md:from-transparent md:via-transparent md:to-background z-[1]"></div>
            </div>
          </div>
        </GameCard>
      </ScrollReveal>
    </div>
  )
}
