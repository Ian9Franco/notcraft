"use client"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import {
  Server,
  Globe,
  Castle,
  Sparkles,
  Wrench,
  Zap,
  Map,
  Volume2,
  Cog,
  Settings,
  LinkIcon,
  Mountain,
  Hammer,
  Ghost,
  Skull,
  Heart,
  Sword,
  Apple,
  PlugIcon as Portal,
  Star,
  Hexagon,
  Circle,
} from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { Carousel } from "@/components/ui/carousel" // ✅ Importar el Carousel mejorado desde la ruta correcta
import { DiscIcon as DiscordLogo } from "lucide-react"
import CategoryModal from "@/components/modals/category-modal"
import "@/app/premium/modal-premium.css"
import "@/app/premium/homepage-premium.css"
import { NetheriousLogo } from "@/components/icons/netherious-logo"

/**
 * Componente para contador animado
 */
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Usar easing para una animación más suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

/**
 * Categorías de mods para el carrusel
 */
const modCategories = [
  {
    title: "Servidor (Mundo Servidor)",
    description:
      "Mejora y embellece el mundo principal donde juegan todos. Biomas redefinidos, paisajes variados, cuevas enriquecidas y comportamientos más realistas.",
    icon: <Globe className="h-8 w-8" />,
    gradient: "from-blue-500/30 via-cyan-400/20 to-blue-600/30",
    borderColor: "border-blue-500/40",
    glowColor: "shadow-blue-500/30",
    accentColor: "text-blue-400",
    slug: "servidor",
  },
  {
    title: "Estructuras",
    description:
      "Añaden y renuevan estructuras emblemáticas. Minas mejoradas, fortalezas renovadas, ruinas, templos y construcciones para explorar en todas las dimensiones.",
    icon: <Castle className="h-8 w-8" />,
    gradient: "from-stone-500/30 via-gray-400/20 to-stone-600/30",
    borderColor: "border-stone-500/40",
    glowColor: "shadow-stone-500/30",
    accentColor: "text-stone-400",
    slug: "estructuras",
  },
  {
    title: "Visual",
    description:
      "Animaciones suaves, partículas detalladas, auroras, oleaje realista y mejoras ambientales que embellecen la experiencia sin alterar la jugabilidad.",
    icon: <Sparkles className="h-8 w-8" />,
    gradient: "from-violet-500/30 via-purple-400/20 to-pink-500/30",
    borderColor: "border-violet-500/40",
    glowColor: "shadow-violet-500/30",
    accentColor: "text-violet-400",
    slug: "visual",
  },
  {
    title: "Utilidad",
    description:
      "Herramientas de calidad de vida: información nutricional, detalles contextuales, organización de inventarios y mejoras en menús y notificaciones.",
    icon: <Wrench className="h-8 w-8" />,
    gradient: "from-orange-500/30 via-amber-400/20 to-red-500/30",
    borderColor: "border-orange-500/40",
    glowColor: "shadow-orange-500/30",
    accentColor: "text-orange-400",
    slug: "utilidad",
  },
  {
    title: "Rendimiento",
    description:
      "Optimización del motor de juego, mejor carga de chunks, gestión de texturas y reducción de lag para un rendimiento estable con muchos mods.",
    icon: <Zap className="h-8 w-8" />,
    gradient: "from-yellow-500/30 via-amber-400/20 to-orange-500/30",
    borderColor: "border-yellow-500/40",
    glowColor: "shadow-yellow-500/30",
    accentColor: "text-yellow-400",
    slug: "rendimiento",
  },
  {
    title: "Mapa",
    description:
      "Combina Antique Atlas con estilo de diario de exploración y Xaero's Minimap moderno para navegación práctica y registro visual del terreno.",
    icon: <Map className="h-8 w-8" />,
    gradient: "from-emerald-500/30 via-green-400/20 to-teal-500/30",
    borderColor: "border-emerald-500/40",
    glowColor: "shadow-emerald-500/30",
    accentColor: "text-emerald-400",
    slug: "mapa",
  },
  {
    title: "Audio",
    description:
      "Mejora la inmersión sonora con efectos de lluvia, truenos realistas y paisajes sonoros ambientales únicos para cada bioma y clima.",
    icon: <Volume2 className="h-8 w-8" />,
    gradient: "from-purple-500/30 via-indigo-400/20 to-blue-500/30",
    borderColor: "border-purple-500/40",
    glowColor: "shadow-purple-500/30",
    accentColor: "text-purple-400",
    slug: "audio",
  },
  {
    title: "Create",
    description:
      "El corazón de la automatización avanzada. Sistemas mecánicos, fábricas, granjas integradas, redes logísticas y decoraciones industriales.",
    icon: <Cog className="h-8 w-8" />,
    gradient: "from-amber-500/30 via-yellow-400/20 to-orange-500/30",
    borderColor: "border-amber-500/40",
    glowColor: "shadow-amber-500/30",
    accentColor: "text-amber-400",
    slug: "create",
  },
  {
    title: "Decoración",
    description:
      "Bloques decorativos, muebles funcionales y detalles arquitectónicos para construir interiores y exteriores más realistas y detallados.",
    icon: <Heart className="h-8 w-8" />,
    gradient: "from-rose-500/30 via-pink-400/20 to-red-500/30",
    borderColor: "border-rose-500/40",
    glowColor: "shadow-rose-500/30",
    accentColor: "text-rose-400",
    slug: "decoracion",
  },
  {
    title: "Mecánicas",
    description:
      "Sistemas nuevos: temperaturas corporales, seguridad, minería avanzada, metales únicos, viaje rápido y ecosistemas más vivos.",
    icon: <Settings className="h-8 w-8" />,
    gradient: "from-teal-500/30 via-cyan-400/20 to-blue-500/30",
    borderColor: "border-teal-500/40",
    glowColor: "shadow-teal-500/30",
    accentColor: "text-teal-400",
    slug: "mecanicas",
  },
  {
    title: "Vanilla+",
    description:
      "Mejora funciones básicas sin romper la esencia original. Utilidades, mejoras a mobs vanilla y ajustes de calidad de vida.",
    icon: <LinkIcon className="h-8 w-8" />,
    gradient: "from-green-500/30 via-emerald-400/20 to-lime-500/30",
    borderColor: "border-green-500/40",
    glowColor: "shadow-green-500/30",
    accentColor: "text-green-400",
    slug: "vanilla-plus",
  },
  {
    title: "Mundo",
    description:
      "Estaciones dinámicas, detalles climáticos y nuevas capas subterráneas que hacen la exploración dependiente de ciclos y biomas variados.",
    icon: <Mountain className="h-8 w-8" />,
    gradient: "from-slate-500/30 via-gray-400/20 to-zinc-500/30",
    borderColor: "border-slate-500/40",
    glowColor: "shadow-slate-500/30",
    accentColor: "text-slate-400",
    slug: "mundo",
  },
  {
    title: "Herramientas y Equipamiento",
    description:
      "Amplía tu arsenal con arcos, mochilas, armas, maquinaria, aeronaves y equipo especializado para aventureros y exploradores.",
    icon: <Hammer className="h-8 w-8" />,
    gradient: "from-zinc-500/30 via-stone-400/20 to-gray-500/30",
    borderColor: "border-zinc-500/40",
    glowColor: "shadow-zinc-500/30",
    accentColor: "text-zinc-400",
    slug: "herramientas-equipamiento",
  },
  {
    title: "Mobs",
    description:
      "Criaturas misteriosas, legendarias e inspiradas en mitología con mecánicas especiales y comportamientos únicos que enriquecen la exploración.",
    icon: <Ghost className="h-8 w-8" />,
    gradient: "from-indigo-500/30 via-purple-400/20 to-violet-500/30",
    borderColor: "border-indigo-500/40",
    glowColor: "shadow-indigo-500/30",
    accentColor: "text-indigo-400",
    slug: "mobs",
  },
  {
    title: "Enemigos",
    description:
      "Enemigos más variados y peligrosos. Creepers y Enderman renovados, Illagers mejorados y oleadas nocturnas de alto nivel.",
    icon: <Skull className="h-8 w-8" />,
    gradient: "from-red-500/30 via-orange-400/20 to-yellow-500/30",
    borderColor: "border-red-500/40",
    glowColor: "shadow-red-500/30",
    accentColor: "text-red-400",
    slug: "enemigos",
  },
  {
    title: "Animales",
    description:
      "Variedad de fauna y compañeros: mascotas adorables, criaturas exóticas, animales silvestres y mobs únicos que hacen el mundo más vivo.",
    icon: <Heart className="h-8 w-8" />,
    gradient: "from-pink-500/30 via-rose-400/20 to-red-500/30",
    borderColor: "border-pink-500/40",
    glowColor: "shadow-pink-500/30",
    accentColor: "text-pink-400",
    slug: "animales",
  },
  {
    title: "Jefes",
    description:
      "Jefes desafiantes con mecánicas únicas, habilidades especiales y recompensas exclusivas para combates épicos en distintas dimensiones.",
    icon: <Sword className="h-8 w-8" />,
    gradient: "from-red-600/30 via-orange-500/20 to-yellow-500/30",
    borderColor: "border-red-600/40",
    glowColor: "shadow-red-600/30",
    accentColor: "text-red-400",
    slug: "jefes",
  },
  {
    title: "Comida",
    description:
      "Expande el sistema de cultivo y cocina con nuevos ingredientes, herramientas, estaciones de trabajo y recetas para una mecánica más profunda.",
    icon: <Apple className="h-8 w-8" />,
    gradient: "from-lime-500/30 via-green-400/20 to-emerald-500/30",
    borderColor: "border-lime-500/40",
    glowColor: "shadow-lime-500/30",
    accentColor: "text-lime-400",
    slug: "comida",
  },
  {
    title: "Dimensiones",
    description:
      "Amplía las dimensiones clásicas con nuevas zonas, biomas únicos, estructuras adicionales y mobs exclusivos para exploración desafiante.",
    icon: <Portal className="h-8 w-8" />,
    gradient: "from-purple-600/30 via-indigo-500/20 to-blue-600/30",
    borderColor: "border-purple-600/40",
    glowColor: "shadow-purple-600/30",
    accentColor: "text-purple-400",
    slug: "dimensiones",
  },
]

/**
 * Página de inicio
 */
export default function Home() {
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const [overlayHidden, setOverlayHidden] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<(typeof modCategories)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Efecto para activar el video de fondo cuando se carga la página
  useEffect(() => {
    const event = new CustomEvent("toggleBackgroundVideo", {
      detail: { action: "play" },
    })
    document.dispatchEvent(event)

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

    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch((err) => console.warn("Error al reproducir el video del hero:", err))
    }

    const event = new CustomEvent("toggleBackgroundAudio", {
      detail: { action: "unmute" },
    })
    document.dispatchEvent(event)
  }

  const handleCategoryClick = (category: (typeof modCategories)[0]) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
  }

  return (
    <div className="netherious-homepage">
      {/* Elementos decorativos de fondo */}
      <div className="homepage-bg-elements">
        <div className="homepage-bg-orb homepage-bg-orb-1"></div>
        <div className="homepage-bg-orb homepage-bg-orb-2"></div>
        <div className="homepage-bg-orb homepage-bg-orb-3"></div>
      </div>

      {/* Hero Section - SIN imagen de fondo */}
      <div onClick={handlePlay} className="netherious-hero">
        {/* Overlays mejorados */}
        <div className="hero-overlay-primary"></div>
        <div className="hero-overlay-gradient"></div>
        <div className="hero-overlay-pattern"></div>

        {!overlayHidden && <div className="hero-blur-overlay" />}

        {/* Contenido del hero */}
        <div className="hero-content">
          <div className="hero-inner">
            {/* Título con efectos avanzados */}
            <div className="hero-title-section">
              <div className="hero-title-decorations">
                <Hexagon className="hero-decoration-icon" />
                <div className="hero-decoration-line"></div>
                <Star className="hero-decoration-icon animate-pulse" />
                <div className="hero-decoration-line"></div>
                <Circle className="hero-decoration-icon" />
              </div>

              {/* Logo de Netherious */}
              <div className="flex justify-center mb-6">
                <NetheriousLogo
                  size={120}
                  animate={true}
                  intensity="medium"
                  location="hero"
                  className="drop-shadow-2xl"
                />
              </div>

              <h1 className="hero-title">
                <span className="hero-title-primary">Descubrí</span>
                <span className="hero-title-accent">Netherious</span>
              </h1>

              <div className="hero-subtitle">
                <span className="hero-subtitle-text">El universo moddeado definitivo</span>
              </div>
            </div>

            {/* Descripción mobile */}
            <div className="hero-description-mobile">
              <p className="hero-text">
                Un mundo donde cada categoría de mods cuenta una historia diferente. Desde automatización avanzada hasta
                criaturas legendarias, cada paso abre nuevas posibilidades.
              </p>
            </div>

            {/* Descripción desktop */}
            <div className="hero-description-desktop">
              <div className="hero-description-card">
                <p className="hero-text-main">
                  Netherious no es solo un servidor: es un universo completo donde{" "}
                  <span className="text-accent font-bold">19 categorías únicas</span> de experiencia te esperan. Podés
                  ser el ingeniero que automatiza civilizaciones con Create, el explorador que descubre estructuras
                  legendarias, el chef que domina sistemas culinarios complejos, o el guerrero que enfrenta jefes épicos
                  en dimensiones renovadas.
                </p>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-number">
                      <AnimatedCounter end={200} suffix="+" />
                    </span>
                    <span className="hero-stat-label">Mods</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat">
                    <span className="hero-stat-number">
                      <AnimatedCounter end={19} />
                    </span>
                    <span className="hero-stat-label">Categorías</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat">
                    <span className="hero-stat-number">∞</span>
                    <span className="hero-stat-label">Aventuras</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones CTA mejorados */}
            <div className="hero-cta-section">
              <Link href="/server-info" className="hero-cta-primary">
                <GameButton variant="accent" size="lg" icon={<Server className="h-5 w-5" />}>
                  <span>Unite a Netherious</span>
                </GameButton>
              </Link>
              <Link
                href="https://discord.gg/VgHGz5RJ"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-secondary"
              >
                <GameButton variant="secondary" size="lg" icon={<DiscordLogo className="h-5 w-5" />}>
                  <span>Conéctate en Discord</span>
                </GameButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Categorías Completamente Renovada */}
      <ScrollReveal>
        <section className="categories-section">
          {/* Header de sección premium */}
          <div className="section-header">
            <div className="section-title-container">
              <div className="section-decorations">
                <div className="section-decoration-orb"></div>
                <div className="section-decoration-line"></div>
                <Star className="section-decoration-star" />
                <div className="section-decoration-line"></div>
                <div className="section-decoration-orb"></div>
              </div>

              <h2 className="section-title">Categorías de Experiencia</h2>

              <div className="section-subtitle-container">
                <p className="section-subtitle">
                  Explorá las 19 facetas únicas de Netherious. Cada categoría ofrece una experiencia especializada que
                  se complementa perfectamente con las demás.
                </p>
              </div>
            </div>
          </div>

          {/* Carrusel premium */}
          <div className="categories-carousel">
            {/* ✅ Carrusel sin contenedor extra */}
            <Carousel
              transitionEffect="slide"
              className="w-full max-w-6xl mx-auto h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
              showControls={true}
              showIndicators={true}
              autoPlay={true}
              interval={6000}
            >
              {modCategories.map((category, index) => (
                <div key={index} className="category-slide w-full h-full">
                  <div
                    className="category-card w-full h-full overflow-hidden flex flex-col justify-between cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {/* Efectos de fondo de la card */}
                    <div className={`category-bg bg-gradient-to-br ${category.gradient}`}></div>
                    <div className="category-mesh"></div>
                    <div className={`category-border ${category.borderColor}`}></div>
                    <div className="category-glow"></div>

                    {/* Header de categoría */}
                    <div className="category-header">
                      <div className="category-icon-section">
                        <div className="category-icon-bg"></div>
                        <div className={`category-icon ${category.accentColor}`}>{category.icon}</div>
                        <div className="category-icon-pulse"></div>
                      </div>
                      <h3 className={`category-title ${category.accentColor}`}>{category.title}</h3>
                    </div>

                    {/* Contenido */}
                    <div className="category-content p-4 md:p-6 flex-grow overflow-y-auto">
                      <p className="category-description text-sm md:text-base">{category.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Sección de contexto premium */}
          <div className="context-section">
            <div className="context-container">
              <div className="context-background">
                <div className="context-bg-pattern"></div>
                <div className="context-bg-glow"></div>
              </div>

              <div className="context-content">
                <div className="context-header">
                  <h3 className="context-title">Tu Aventura, Tu Estilo</h3>
                  <div className="context-decorations">
                    <div className="context-decoration-line"></div>
                    <Star className="context-decoration-star" />
                    <div className="context-decoration-line"></div>
                  </div>
                </div>

                <div className="context-text-container">
                  <p className="context-text">
                    Cada categoría se conecta con las demás de formas inesperadas.{" "}
                    <span className="context-highlight">Create</span> potencia la automatización, las{" "}
                    <span className="context-highlight">estructuras</span> revelan recursos únicos, los{" "}
                    <span className="context-highlight">jefes</span> otorgan materiales legendarios, y las{" "}
                    <span className="context-highlight">dimensiones</span> renovadas abren mundos completamente nuevos.
                  </p>
                  <p className="context-text-secondary">
                    En Netherious, no hay límites para combinar experiencias y crear tu propia historia épica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
      {/* Category Modal */}
      <CategoryModal isOpen={isModalOpen} onClose={handleCloseModal} category={selectedCategory} />
    </div>
  )
}
