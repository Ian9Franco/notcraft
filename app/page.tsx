"use client"
import Image from "next/image"
import Link from "next/link"
import { Server } from "lucide-react"
import { DiscordLogo } from "@/components/icons/discord-logo"
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
      {/* Server Promo Section as Hero */}
        <div className="relative min-h-[60vh] rounded-xl overflow-hidden">
          {/* Video Background */}
          <video
            src="/images/landscape/landscape_final.mp4"  // Asegúrate de que el video esté en esta ruta
            autoPlay
            loop
            muted={false}  // Puedes quitar muted si el video ya tiene el sonido
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-1"></div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center min-h-[60vh] p-8">
            <div className="max-w-4xl w-full">
              <SectionHeader
                title="Únete a Nuestra Comunidad"
                subtitle="Explora, construye y sobrevive en un mundo lleno de aventuras y posibilidades."
                accent
              />
              <p className="text-foreground mb-6 text-center md:text-left">
                Nuestro servidor ofrece una experiencia única con temporadas temáticas, mods cuidadosamente seleccionados
                y una comunidad amigable.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8">
                <Link href="/server-info">
                  <GameButton variant="primary" size="lg" icon={<Server />}>
                    Conectarse al Servidor
                  </GameButton>
                </Link>
                <Link href="https://discord.gg/VgHGz5RJ" target="_blank" rel="noopener noreferrer">
                  <GameButton variant="secondary" size="lg" icon={<DiscordLogo />}>
                    Discord
                  </GameButton>
                </Link>
              </div>
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
                  <div className="relative h-64 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={mod.imageSrc || "/placeholder.svg"}
                      alt={`${mod.title} banner`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
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
    </div>
  )
}
