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
              Acá no te rompen el orto de entrada… salvo que lo vayas a buscar. Si te quedás en tu campito, podés vivir
              bien. Pero pisá una cueva de noche, y te convertís en comida. ¿Explorás... o te quedás regando nabos?
            </p>

            {/* Desktop */}
            <p className="text-lg font-body font-light text-foreground high-contrast-text hidden md:block">
              Este mundo tiene dos caras. Si te armás tu base, farmeás de día y no te metés donde no debés, podés tener
              una vida tranqui. Pero si entrás al bosque de noche, bajás muy hondo, o cruzás portales raros... ahí
              cambia todo. Te van a correr, te van a gritar, te van a romper. Hay bestias que no preguntan, lugares que
              no quieren visitas, y cosas que no podés matar ni con diez pociones. No es injusto, es salvaje. Y el que
              muere es porque fue a buscar quilombo.
            </p>

            {/* Mobile 2 */}
            <p className="text-sm sm:text-base text-foreground mt-4 high-contrast-text md:hidden">
              Paz si la cuidás. Terror si la desafiás. Este mundo es una balanza, y vos decidís si la rompés o la
              respetás. Pero no llores cuando venga la cuenta.
            </p>

            {/* Desktop 2 */}
            <p className="text-base text-foreground mt-4 high-contrast-text hidden md:block">
              Este server no es un infierno constante. Te podés armar tu granjita, automatizar, decorar, pasarla piola.
              Pero no es un parque de diversiones: si te metés donde no te llaman, lo vas a pagar. El bosque no perdona.
              Las profundidades no tienen reglas. Las dimensiones raras no conocen la lógica. Y si entrás pensando que
              todo es Minecraft vanilla, te van a dejar en bolas más rápido que un creeper con lag.
              <br />
              <br />
              Acá podés vivir como un rey… o morir como un boludo. Tu camino depende de cuán cerca querés mirar al
              abismo. Porque en este mundo, si no provocás, tal vez vivís. Pero si provocás… más vale que estés listo
              para bancártela.
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
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                    <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-accent flex items-center justify-center bg-card/50 mx-auto sm:mx-0">
                      <Image
                        src={mod.logoSrc || "/placeholder.svg"}
                        alt={`${mod.title} logo`}
                        fill
                        className="object-cover"
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
