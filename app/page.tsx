"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Server } from "lucide-react"
import { DiscordLogo } from "@/components/icons/discord-logo"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Carousel } from "@/components/ui/carousel"

const featuredMods = [
  {
    title: "Create",
    description: "Automatización estética con máquinas de procesamiento y trenes funcionales.",
    imageSrc: "/images/mods/create-banner.png",
    logoSrc: "/images/mods/createlogo.png",
  },
  {
    title: "Blue Skies",
    description:
      "Blue Skies es un mod de supervivencia que añade aspectos como dimensiones, mazmorras y más en un escenario claro y oscuro.",
    imageSrc: "/images/mods/blueskyes-banner.png",
    logoSrc: "/images/mods/blueskyeslogo.png",
  },
  {
    title: "L_Ender's Cataclysm",
    description:
      "Cataclysm es un mod que agrega mazmorras difíciles, peleas contra jefes desafiantes y elementos poderosos.",
    imageSrc: "/images/mods/cataclysm-banner.png",
    logoSrc: "/images/mods/cataclysmlogo.png",
  },
  {
    title: "Grim & Bleak",
    description:
      "Un mod de terror centrado en el ambiente que añade toda una dimensión al juego y mezcla el terror con la jugabilidad.",
    imageSrc: "/images/mods/grim-banner.png",
    logoSrc: "/images/mods/grimlogo.png",
  },
]

/**
 * Página principal
 */
export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [overlayHidden, setOverlayHidden] = useState(false)

  const handlePlay = () => {
    const video = videoRef.current
    if (video) {
      video.muted = false // activar sonido
      video.play().catch((err) => console.warn("Error al reproducir:", err))
      setOverlayHidden(true) // ocultar overlay
    }
  }

  return (
    <div className="space-y-16 py-8">
      {/* Hero con video */}
      <div onClick={handlePlay} className="relative min-h-[60vh] rounded-xl overflow-hidden cursor-pointer">
        <video
          ref={videoRef}
          src="/images/landscape/landscape_final.mp4"
          autoPlay
          loop
          muted // se activa el autoplay con muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay solo si no fue clickeado */}
        {!overlayHidden && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 transition-opacity duration-500" />
        )}

        {/* Contenido */}
        <div className="relative z-20 flex items-center justify-center min-h-[60vh] p-8">
          <div className="max-w-4xl w-full">
            <div className="text-center md:text-left mb-8">
              <h1 className="font-title text-3xl md:text-4xl lg:text-5xl mb-3 text-accent high-contrast-text">
                Únete a Nuestra Comunidad
              </h1>
              <p className="text-lg max-w-3xl mx-auto md:mx-0 font-body font-light text-foreground high-contrast-text">
                Explora, construye y sobrevive en un mundo lleno de aventuras y posibilidades.
              </p>
            </div>
            <p className="text-foreground mb-6 text-center md:text-left high-contrast-text">
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
      
      {/* Sección de Mods Destacados */}
      <ScrollReveal>
        <SectionHeader
          title="Mods Destacados"
          subtitle="Nuestro servidor cuenta con una selección de los mejores mods para mejorar tu experiencia de juego."
        />

        <div className="mt-8">
          <Carousel>
            {featuredMods.map((mod, index) => (
              <div key={index} className="p-4">
                <GameCard className="h-full hover:shadow-lg transition-all duration-300">
                  <div className="mod-banner relative h-64 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={mod.imageSrc || "/placeholder.svg"}
                      alt={`${mod.title} banner`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="mod-info flex items-center gap-4 mb-4">
                    <div className="mod-logo-container relative h-16 w-16 rounded-full overflow-hidden border-2 border-accent flex items-center justify-center bg-card/50">
                      <Image
                        src={mod.logoSrc || "/placeholder.svg"}
                        alt={`${mod.title} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-title text-xl text-accent high-contrast-text">{mod.title}</h3>
                  </div>
                  <div className="mod-description p-3 rounded-md bg-background/50 backdrop-blur-sm border border-border/50">
                    <p className="text-sm text-foreground high-contrast-text">{mod.description}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href={`/mods/${mod.title.toLowerCase().replace(/\s+/g, "-")}`}>
                      <GameButton variant="outline" size="sm">
                        Ver detalles
                      </GameButton>
                    </Link>
                  </div>
                </GameCard>
              </div>
            ))}
          </Carousel>
        </div>
      </ScrollReveal>
    </div>
  )
}
