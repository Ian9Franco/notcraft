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

/**
 * Datos de mods destacados para el carrusel
 */
const featuredMods = [
  {
    title: "Eternal Starlight",
    description: "Un mod de dimensión que agrega la dimensión mágica y misteriosa de la luz de las estrellas.",
    imageSrc: "/images/mods/eternal-banner.png",
    logoSrc: "/images/mods/eternal-logo.png",
  },
  {
    title: "Creeper Overhaul",
    description: "¡Un mod que mejora los Creepers vainilla!",
    imageSrc: "/images/mods/creeper-banner.png",
    logoSrc: "/images/mods/creeper-logo.png",
  },
  {
    title: "L_Ender's Cataclysm",
    description:
      "Cataclysm es un mod que agrega mazmorras difíciles, peleas contra jefes desafiantes y elementos poderosos.",
    imageSrc: "/images/mods/cataclysm-banner.png",
    logoSrc: "/images/mods/cataclysm-logo.png",
  },
  {
    title: "Enderman Overhaul",
    description:
      "Enderman Overhaul agrega más de 20 nuevas variantes de Enderman, ¡cada una con sus propios sonidos, modelos y animaciones!",
    imageSrc: "/images/mods/enderman-banner.png",
    logoSrc: "/images/mods/enderman-logo.png",
  },
  {
    title: "Immersive Aircraft",
    description: "¡Un montón de aviones rústicos para viajar, transportar y explorar!",
    imageSrc: "/images/mods/aircraft-banner.png",
    logoSrc: "/images/mods/aircraft-logo.png",
  },
  {
    title: "Oritech",
    description:
      "Un mod centrado en la tecnología, con maquinaria animada, diversas opciones de procesamiento y muchas mecánicas y equipos nuevos.",
    imageSrc: "/images/mods/oritech-banner.png",
    logoSrc: "/images/mods/oritech-logo.png",
  },
  {
    title: "Supplementaries",
    description:
      "Complementos Vanilla+: Jarrones, señalizaciones, grifos, veletas, lanzadores de resortes, apliques, jardineras, luces, decoración y automatización.",
    imageSrc: "/images/mods/supplementaries-banner.png",
    logoSrc: "/images/mods/supplementaries-logo.png",
  },
  {
    title: "Deeper and Darker",
    description:
      "Un mod de Minecraft que presenta más bloques, elementos, armaduras y misterios ocultos para complementar el bioma Deep Dark.",
    imageSrc: "/images/mods/deeper-banner.png",
    logoSrc: "/images/mods/deeper-logo.png",
  },
  {
    title: "Golem Overhaul",
    description: "¡Golem Overhaul agrega 9 nuevos tipos de gólem, todos con sus propias mecánicas únicas!",
    imageSrc: "/images/mods/golem-banner.png",
    logoSrc: "/images/mods/golem-logo.png",
  },
]

/**
 * Página de inicio
 *
 * Muestra:
 * - Hero con imagen de fondo y llamada a la acción
 * - Carrusel de mods destacados
 */
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
    <div className="relative z-10 space-y-12 sm:space-y-24 py-4 sm:py-8 px-4 sm:px-6">
      {/* Hero con imagen estática - Mejorado para responsividad */}
      <div
        onClick={handlePlay}
        className="relative min-h-[50vh] sm:min-h-[60vh] rounded-xl overflow-hidden cursor-pointer border border-border/40 bg-background/50 backdrop-blur-sm shadow-xl"
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

        <div className="relative z-20 flex items-center justify-center min-h-[50vh] sm:min-h-[60vh] p-4 sm:p-8">
          <div className="max-w-4xl w-full text-center md:text-left">
            <h1 className="font-title text-3xl sm:text-4xl lg:text-5xl mb-3 text-accent high-contrast-text">Unite</h1>
            {/* Mobile */}
            <p className="text-base sm:text-lg font-body font-light text-foreground high-contrast-text md:hidden">
              Acá levantás tu base, expandís tus tierras y descubrís secretos bajo cada bloque. Desde cuevas vivas hasta ruinas
              perdidas: si cavás, encontrás. Si explorás, sobrevivís. Si dormís... te comen.
            </p>

            {/* Desktop */}
            <p className="text-lg font-body font-light text-foreground high-contrast-text hidden md:block">
              Este mundo es para el que construye y para el que se anima. Podés fundar tu pueblo, automatizar con máquinas,
              cultivar estaciones, criar animales raros y comerciar. Pero todo lo que hagas, lo vas a defender. Porque bajo tierra
              hay pasajes que no quieren ser abiertos, biomas salvajes que no dan segundas chances, templos olvidados y artefactos
              que no todos deberían tocar. Si buscás aventura, la vas a encontrar. Si querés paz, construíla.
            </p>

            {/* Mobile 2 */}
            <p className="text-sm sm:text-base text-foreground mt-4 high-contrast-text md:hidden">
              Granjas, máquinas, ruinas y criaturas que no viste. Vos elegís: crecer tranquilo o perderte buscando tesoros que tal
              vez no quieras despertar.
            </p>

            {/* Desktop 2 */}
            <p className="text-base text-foreground mt-4 high-contrast-text hidden md:block">
              Acá nadie te obliga a pelear, pero todo te invita a explorar. Con nuevos minerales, bosses, biomas extremos y un
              clima que no perdona, cada paso es decisión tuya: expandís tu granja con Create y Oritech, domás la naturaleza o la
              despertás. Hay civilizaciones bajo la piedra, secretos en la nieve, reliquias en la arena y monstruos que duermen en
              cuevas que no figuran en mapas. Jugalo como vanilla... pero nunca creas que es solo vanilla.
            </p>


            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-6 sm:mt-8">
              <Link href="/server-info">
                <GameButton variant="accent" size="lg" icon={<Server className="h-5 w-5" />}>
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

      {/* Sección de Mods Destacados - Mejorado para responsividad */}
      <ScrollReveal>
        <SectionHeader
          title="Mods Destacados"
          subtitle="Nuestro servidor cuenta con una selección de los mejores mods para mejorar tu experiencia de juego."
        />

        <div className="mt-6 sm:mt-8 bg-background/50 backdrop-blur-sm rounded-xl border border-border/30 shadow-md p-2 sm:p-4">
          <Carousel>
            {featuredMods.map((mod, index) => (
              <div key={index} className="p-2 sm:p-4">
                <GameCard className="h-full hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/30">
                  <div className="relative h-48 sm:h-56 md:h-64 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={mod.imageSrc || "/placeholder.svg"}
                      alt={`${mod.title} banner`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=256&width=400"
                      }}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                    <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-accent flex items-center justify-center bg-card/50 mx-auto sm:mx-0 flex-shrink-0">
                      <Image
                        src={mod.logoSrc || "/placeholder.svg"}
                        alt={`${mod.title} logo`}
                        fill
                        className="object-contain p-1"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=64&width=64"
                        }}
                      />
                    </div>
                    <h3 className="font-title text-lg sm:text-xl text-accent high-contrast-text text-center sm:text-left">
                      {mod.title}
                    </h3>
                  </div>
                  <div className="p-2 sm:p-3 rounded-md bg-background/60 backdrop-blur border border-border/50">
                    <p className="text-xs sm:text-sm text-foreground high-contrast-text">{mod.description}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href={`/mods/${mod.title.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "")}`}>
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
