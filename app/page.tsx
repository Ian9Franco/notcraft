"use client"
import { useRef } from "react"
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
      <div
        onClick={handlePlay}
        className="relative min-h-[60vh] rounded-xl overflow-hidden cursor-pointer"
      >
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
                <GameCard className="h-full">
                  <div className="relative h-64 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={mod.imageSrc}
                      alt={`${mod.title} banner`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative h-12 w-12">
                      <Image
                        src={mod.logoSrc}
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
