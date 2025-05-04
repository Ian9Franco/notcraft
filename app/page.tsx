"use client"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Server } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Carousel } from "@/components/ui/carousel"
import { DiscIcon as DiscordLogo } from "lucide-react"

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

export default function Home() {
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const [overlayHidden, setOverlayHidden] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Efecto para activar el video de fondo cuando se carga la página
  useEffect(() => {
    // Disparar un evento para activar el video de fondo
    const event = new CustomEvent("toggleBackgroundVideo", {
      detail: { action: "play" },
    })
    document.dispatchEvent(event)

    // Escuchar cambios en el estado del video
    const handleVideoStateChange = (e: CustomEvent) => {
      if (e.detail.state === "playing") {
        setIsVideoPlaying(true)
      } else if (e.detail.state === "paused") {
        setIsVideoPlaying(false)
      }
    }

    document.addEventListener("backgroundVideoStateChange", handleVideoStateChange as EventListener)
    return () => {
      document.removeEventListener("backgroundVideoStateChange", handleVideoStateChange as EventListener)
    }
  }, [])

  // Función para manejar el click en el hero
  const handlePlay = () => {
    setOverlayHidden(true)

    // Intenta reproducir el video del hero
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch((err) => console.warn("Error al reproducir el video del hero:", err))
    }

    // Dispara un evento para activar el audio del video de fondo
    const event = new CustomEvent("toggleBackgroundAudio", {
      detail: { action: "unmute" },
    })
    document.dispatchEvent(event)
  }

  return (
    <div className="relative z-10 space-y-24 py-8">
    {/* Hero con imagen estática */}
    <div
      onClick={handlePlay}
      className="relative min-h-[60vh] rounded-xl overflow-hidden cursor-pointer border border-border/40 bg-background/50 backdrop-blur-sm shadow-xl"
    >
     {/* Imagen */}
      <Image
        src="/images/landscape/home.png"
        alt="Paisaje Netherious"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Capa negra encima para oscurecer */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {!overlayHidden && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 transition-opacity duration-500" />
      )}

      <div className="relative z-20 flex items-center justify-center min-h-[60vh] p-8">
        <div className="max-w-4xl w-full text-center md:text-left">
          <h1 className="font-title text-4xl lg:text-5xl mb-3 text-accent high-contrast-text">Unite</h1>

          {/* Mobile */}
          <p className="text-lg font-body font-light text-foreground high-contrast-text md:hidden">
            Acá no venís a plantar zanahorias. Hay armas, bestias, máquinas y terrores esperando. ¿Te la bancás o sos
            decorado de cueva?
          </p>

          {/* Desktop */}
          <p className="text-lg font-body font-light text-foreground high-contrast-text hidden md:block">
            Este mundo no perdona. Explorar no es un paseo: hay monstruos marinos que te comen sin avisar, jefes que
            pegan como camión, y máquinas que exigen seso, no suerte. Vas a necesitar armas, reflejos, estrategia y
            huevos. Automatizá o morí, peleá o escapá... pero no digas que no te avisamos.
          </p>

          {/* Mobile 2 */}
          <p className="text-foreground mt-4 high-contrast-text md:hidden">
            Terror, tecnología y sangre. Este server no tiene compasión ni respawn piadoso. ¿Vas a construir imperios...
            o a mendigar en el spawn?
          </p>

          {/* Desktop 2 */}
          <p className="text-foreground mt-4 high-contrast-text hidden md:block">
            Esto no es un server para los que se esconden en cuevas haciendo granjas de pollos. Es un infierno diseñado
            para los que la tienen grande: exploradores, ingenieros del caos, y soldados del fin del mundo. Acá, los
            jefes no te saludan, te pegan como padrastro borracho. Hay tiburones bajo el agua, bestias en los bosques, y
            máquinas que explotan si sos un burro. Las armas no son adorno, son tu única chance. La automatización es la
            diferencia entre dominar el terreno o ser carne para las sombras.
            <br />
            <br />
            Porque en este mundo, o aprendés a sobrevivir, o te convertís en otra historia olvidada. Nadie va a cantar
            tus hazañas si morís en tu primer amanecer. Nadie va a rescatar tu loot si te enterrás solo. Acá, o dejás
            marca… o te borran como si nunca hubieras existido.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8">
            <Link href="/server-info">
              <GameButton variant="primary" size="lg" icon={<Server className="h-5 w-5" />}>
                Unite a Netherious
              </GameButton>
            </Link>
            <Link href="https://discord.gg/VgHGz5RJ" target="_blank" rel="noopener noreferrer">
              <GameButton variant="secondary" size="lg" icon={<DiscordLogo className="h-5 w-5" />}>
                Conéctate en Discord
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

        <div className="mt-8 bg-background/50 backdrop-blur-sm rounded-xl border border-border/30 shadow-md">
          <Carousel>
            {featuredMods.map((mod, index) => (
              <div key={index} className="p-4">
                <GameCard className="h-full hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/30">
                  <div className="relative h-64 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={mod.imageSrc || "/placeholder.svg"}
                      alt={`${mod.title} banner`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-accent flex items-center justify-center bg-card/50">
                      <Image
                        src={mod.logoSrc || "/placeholder.svg"}
                        alt={`${mod.title} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-title text-xl text-accent high-contrast-text">{mod.title}</h3>
                  </div>
                  <div className="p-3 rounded-md bg-background/60 backdrop-blur border border-border/50">
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
