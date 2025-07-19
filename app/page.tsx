"use client"
import { useState, useEffect } from "react"
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
import { Carousel } from "@/components/ui/carousel"
import { DiscIcon as DiscordLogo } from "lucide-react"
// import CategoryDetailsSection from "@/components/sections/category-details-section" // Removed
// import { AnimatePresence, motion } from "framer-motion" // Removed AnimatePresence as it's not needed for the details section anymore
import { NetheriousLogo } from "@/components/icons/netherious-logo"

/**
 * Componente para contador animado
 */
function AnimatedCounter({ end, duration = 9000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
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

// Descripciones completas desde el JSON (movidas aquí)
const categoryDescriptions: Record<string, string> = {
  servidor:
    "Esta categoría mejora y embellece el mundo principal donde juegan todos. Mods como Nullscape y William Wythers' Overhauled Overworld redefinen la generación de biomas y paisajes, añadiendo montañas imponentes, costas realistas y zonas mucho más variadas y naturales. Better Lush Caves convierte las cuevas frondosas en ecosistemas ricos y vivos, Clear Drop Items optimiza la limpieza de objetos para mantener el servidor ordenado, mientras Thief y Smarter Farmers ajustan la IA de aldeanos y mobs, dotándolos de comportamientos más realistas, dinámicos e interesantes para la interacción diaria.",
  estructuras:
    "Estos mods añaden y renuevan estructuras icónicas del juego base y suman construcciones nuevas repartidas en todos los biomas y dimensiones. Con YUNG's Better Mineshafts, Better Nether Fortress y Better Strongholds, minas abandonadas, fortalezas del Nether y bastiones del End se vuelven más desafiantes y complejos. Dungeons Arise, Seven Seas y Structory expanden ruinas, barcos, templos y fortalezas, llenando el mundo de sorpresas y tesoros. También encontrarás estructuras únicas que incentivan la exploración, el saqueo y la aventura.",
  visual:
    "Animaciones suaves, partículas detalladas, auroras boreales, oleaje realista y múltiples mejoras ambientales que elevan la atmósfera sin alterar la jugabilidad base. Todo pensado para que cada bioma se sienta más inmersivo y visualmente impresionante.",
  utilidad:
    "Herramientas de calidad de vida que facilitan el día a día: desde información nutricional detallada, menús contextuales mejorados, organización de inventarios intuitiva, hasta notificaciones claras que optimizan la experiencia sin complicaciones.",
  rendimiento:
    "Conjunto de mods que optimizan el motor de juego, mejoran la carga de chunks, gestionan texturas de forma eficiente y reducen el lag. Ideales para mantener un rendimiento estable y fluido incluso con una gran cantidad de mods activos.",
  mapa: "Se combina Antique Atlas con estilo de diario de exploración y Xaero's Minimap moderno para navegación práctica y registro visual del terreno.",
  audio:
    "Enriquecen la inmersión sonora del juego: efectos de lluvia más realistas, truenos que estremecen y paisajes sonoros dinámicos adaptados a cada bioma y condición climática, para sentir que cada lugar tiene su propia personalidad acústica.",
  create:
    "El corazón de la automatización avanzada. Sistemas mecánicos, fábricas, granjas integradas, redes logísticas y decoraciones industriales.",
  decoracion:
    "Bloques decorativos, muebles funcionales y detalles arquitectónicos que permiten construir interiores y exteriores más realistas y detallados.",
  mecanicas:
    "Nuevas capas de jugabilidad: Confluence Otherworld expande la exploración con portales y dimensiones alternativas llenas de misterios. A esto se suman sistemas como temperatura corporal, seguridad personal, minería avanzada, metales únicos, viaje rápido y ecosistemas vivos que cambian según tu interacción. Todo diseñado para que cada partida tenga retos frescos y mecánicas innovadoras.",
  "vanilla-plus":
    "Esta categoría mejora y expande funciones básicas del juego sin romper la esencia original. Incluye utilidades como ranuras de basura, bancos de trabajo visuales, almacenamiento de XP en botellas, mecánicas de encantamientos simplificadas, accesorios, mejoras a mobs vanilla como los Phantoms y pequeños ajustes de calidad de vida. Todo pensado para que la experiencia base sea más práctica, fluida y cómoda.",
  mundo:
    "Sistemas de estaciones dinámicas, fenómenos climáticos detallados y nuevas capas subterráneas. Cada bioma se siente único y la exploración se adapta a ciclos que afectan fauna, flora y recursos.",
  herramientas:
    "Expande tu arsenal con arcos, mochilas, armas avanzadas, maquinaria, aeronaves y equipo especializado. Perfecto para aventureros, exploradores y constructores que buscan superar cualquier reto.",
  mobs: "Esta selección añade criaturas misteriosas, legendarias o inspiradas en mitología. Mods como Mobs of Mythology y Weeping Angels introducen mobs con mecánicas especiales, comportamientos únicos y habilidades sobrenaturales. Estos enemigos u entes enriquecen cuevas, ruinas y biomas específicos, aportando atmósfera y sorpresas al explorar.",
  enemigos:
    "Los enemigos comunes evolucionan. Con Zombie Variants, los zombis adquieren versiones únicas y mecánicas especiales, mientras Creepers, Enderman e Illagers reciben mejoras que los hacen más impredecibles y peligrosos. Prepárate para oleadas nocturnas y emboscadas mucho más intensas.",
  animales:
    "Variedad de fauna y compañeros: mascotas adorables, criaturas exóticas, animales silvestres y mobs únicos que hacen el mundo más vivo.",
  jefes:
    "Con Bosses of Mass Destruction, Ender Cataclysm, Qliphoth Awakening y Mowzie's Mobs, se suman jefes desafiantes con mecánicas únicas, habilidades especiales y recompensas exclusivas. Estos mods están diseñados para jugadores que buscan combates épicos, botín raro y nuevas amenazas para explorar en distintos biomas y dimensiones.",
  comida:
    "ButcherCraft, ChefDelights, Farmer's Delight, MyNetherDelight y StorageDelight amplían la producción, preparación y almacenamiento de alimentos. Nuevos ingredientes, recetas, estaciones de cocina y sistemas para organizar provisiones convierten la gastronomía en una parte clave de tu aventura.",
  dimensiones:
    "Deeper and Darker, Eternal Nether y End Phantasm reinventan y expanden las dimensiones clásicas de Minecraft. Explora zonas desconocidas, biomas únicos y estructuras misteriosas en cuevas profundas, regiones extendidas del Nether y un End transformado en un dominio más desafiante y hostil.",
}

/**
 * Categorías de mods para el carrusel (ahora con descripción completa)
 */
const modCategories = [
  {
    title: "Servidor (Mundo Servidor)",
    description: categoryDescriptions.servidor, // Full description
    icon: <Globe className="h-8 w-8" />,
    gradient: "from-blue-500/30 via-cyan-400/20 to-blue-600/30",
    borderColor: "border-blue-500/40",
    glowColor: "shadow-blue-500/30",
    accentColor: "text-blue-400",
    slug: "servidor",
  },
  {
    title: "Estructuras",
    description: categoryDescriptions.estructuras, // Full description
    icon: <Castle className="h-8 w-8" />,
    gradient: "from-stone-500/30 via-gray-400/20 to-stone-600/30",
    borderColor: "border-stone-500/40",
    glowColor: "shadow-stone-500/30",
    accentColor: "text-stone-400",
    slug: "estructuras",
  },
  {
    title: "Visual",
    description: categoryDescriptions.visual, // Full description
    icon: <Sparkles className="h-8 w-8" />,
    gradient: "from-violet-500/30 via-purple-400/20 to-pink-500/30",
    borderColor: "border-violet-500/40",
    glowColor: "shadow-violet-500/30",
    accentColor: "text-violet-400",
    slug: "visual",
  },
  {
    title: "Utilidad",
    description: categoryDescriptions.utilidad, // Full description
    icon: <Wrench className="h-8 w-8" />,
    gradient: "from-orange-500/30 via-amber-400/20 to-red-500/30",
    borderColor: "border-orange-500/40",
    glowColor: "shadow-orange-500/30",
    accentColor: "text-orange-400",
    slug: "utilidad",
  },
  {
    title: "Rendimiento",
    description: categoryDescriptions.rendimiento, // Full description
    icon: <Zap className="h-8 w-8" />,
    gradient: "from-yellow-500/30 via-amber-400/20 to-orange-500/30",
    borderColor: "border-yellow-500/40",
    glowColor: "shadow-yellow-500/30",
    accentColor: "text-yellow-400",
    slug: "rendimiento",
  },
  {
    title: "Mapa",
    description: categoryDescriptions.mapa, // Full description
    icon: <Map className="h-8 w-8" />,
    gradient: "from-emerald-500/30 via-green-400/20 to-teal-500/30",
    borderColor: "border-emerald-500/40",
    glowColor: "shadow-emerald-500/30",
    accentColor: "text-emerald-400",
    slug: "mapa",
  },
  {
    title: "Audio",
    description: categoryDescriptions.audio, // Full description
    icon: <Volume2 className="h-8 w-8" />,
    gradient: "from-purple-500/30 via-indigo-400/20 to-blue-500/30",
    borderColor: "border-purple-500/40",
    glowColor: "shadow-purple-500/30",
    accentColor: "text-purple-400",
    slug: "audio",
  },
  {
    title: "Create",
    description: categoryDescriptions.create, // Full description
    icon: <Cog className="h-8 w-8" />,
    gradient: "from-amber-500/30 via-yellow-400/20 to-orange-500/30",
    borderColor: "border-amber-500/40",
    glowColor: "shadow-amber-500/30",
    accentColor: "text-amber-400",
    slug: "create",
  },
  {
    title: "Decoración",
    description: categoryDescriptions.decoracion, // Full description
    icon: <Heart className="h-8 w-8" />,
    gradient: "from-rose-500/30 via-pink-400/20 to-red-500/30",
    borderColor: "border-rose-500/40",
    glowColor: "shadow-rose-500/30",
    accentColor: "text-rose-400",
    slug: "decoracion",
  },
  {
    title: "Mecánicas",
    description: categoryDescriptions.mecanicas, // Full description
    icon: <Settings className="h-8 w-8" />,
    gradient: "from-teal-500/30 via-cyan-400/20 to-blue-500/30",
    borderColor: "border-teal-500/40",
    glowColor: "shadow-teal-500/30",
    accentColor: "text-teal-400",
    slug: "mecanicas",
  },
  {
    title: "Vanilla+",
    description: categoryDescriptions["vanilla-plus"], // Full description
    icon: <LinkIcon className="h-8 w-8" />,
    gradient: "from-green-500/30 via-emerald-400/20 to-lime-500/30",
    borderColor: "border-green-500/40",
    glowColor: "shadow-green-500/30",
    accentColor: "text-green-400",
    slug: "vanilla-plus",
  },
  {
    title: "Mundo",
    description: categoryDescriptions.mundo, // Full description
    icon: <Mountain className="h-8 w-8" />,
    gradient: "from-slate-500/30 via-gray-400/20 to-zinc-500/30",
    borderColor: "border-slate-500/40",
    glowColor: "shadow-slate-500/30",
    accentColor: "text-slate-400",
    slug: "mundo",
  },
  {
    title: "Herramientas y Equipamiento",
    description: categoryDescriptions["herramientas-equipamiento"], // Full description
    icon: <Hammer className="h-8 w-8" />,
    gradient: "from-zinc-500/30 via-stone-400/20 to-gray-500/30",
    borderColor: "border-zinc-500/40",
    glowColor: "shadow-zinc-500/30",
    accentColor: "text-zinc-400",
    slug: "herramientas-equipamiento",
  },
  {
    title: "Mobs",
    description: categoryDescriptions.mobs, // Full description
    icon: <Ghost className="h-8 w-8" />,
    gradient: "from-indigo-500/30 via-purple-400/20 to-violet-500/30",
    borderColor: "border-indigo-500/40",
    glowColor: "shadow-indigo-500/30",
    accentColor: "text-indigo-400",
    slug: "mobs",
  },
  {
    title: "Enemigos",
    description: categoryDescriptions.enemigos, // Full description
    icon: <Skull className="h-8 w-8" />,
    gradient: "from-red-500/30 via-orange-400/20 to-yellow-500/30",
    borderColor: "border-red-500/40",
    glowColor: "shadow-red-500/30",
    accentColor: "text-red-400",
    slug: "enemigos",
  },
  {
    title: "Animales",
    description: categoryDescriptions.animales, // Full description
    icon: <Heart className="h-8 w-8" />,
    gradient: "from-pink-500/30 via-rose-400/20 to-red-500/30",
    borderColor: "border-pink-500/40",
    glowColor: "shadow-pink-500/30",
    accentColor: "text-pink-400",
    slug: "animales",
  },
  {
    title: "Jefes",
    description: categoryDescriptions.jefes, // Full description
    icon: <Sword className="h-8 w-8" />,
    gradient: "from-red-600/30 via-orange-500/20 to-yellow-500/30",
    borderColor: "border-red-600/40",
    glowColor: "shadow-red-600/30",
    accentColor: "text-red-400",
    slug: "jefes",
  },
  {
    title: "Comida",
    description: categoryDescriptions.comida, // Full description
    icon: <Apple className="h-8 w-8" />,
    gradient: "from-lime-500/30 via-green-400/20 to-emerald-500/30",
    borderColor: "border-lime-500/40",
    glowColor: "shadow-lime-500/30",
    accentColor: "text-lime-400",
    slug: "comida",
  },
  {
    title: "Dimensiones",
    description: categoryDescriptions.dimensiones, // Full description
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
  // Efecto para activar el video de fondo y audio cuando se carga la página
  useEffect(() => {
    // Dispatch event to play background video
    const videoPlayEvent = new CustomEvent("toggleBackgroundVideo", {
      detail: { action: "play" },
    })
    document.dispatchEvent(videoPlayEvent)

    // Dispatch event to unmute background audio
    const audioUnmuteEvent = new CustomEvent("toggleBackgroundAudio", {
      detail: { action: "unmute" },
    })
    document.dispatchEvent(audioUnmuteEvent)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animation-delay-2000 animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-green-500/10 rounded-full mix-blend-multiply filter blur-3xl animation-delay-4000 animate-blob"></div>
      </div>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] md:min-h-screen
                   text-center px-4 py-16 md:py-24 lg:py-32 overflow-hidden"
      >
        {/* Overlays mejorados - now always visible */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.png')] opacity-10 mix-blend-overlay"></div>

        {/* Contenido del hero */}
        <div className="relative z-20 max-w-5xl mx-auto space-y-8 md:space-y-12">
          {/* Título con efectos avanzados */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Hexagon className="h-5 w-5" />
              <div className="h-px w-10 bg-muted-foreground"></div>
              <Star className="h-5 w-5 text-accent animate-pulse" />
              <div className="h-px w-10 bg-muted-foreground"></div>
              <Circle className="h-5 w-5" />
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

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-title leading-tight">
              <span className="text-foreground">Descubrí</span>{" "}
              <span className="text-accent text-glow">Netherious</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-body">El universo moddeado definitivo</p>
          </div>

          {/* Descripción unificada y responsiva */}
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-border/50 max-w-3xl mx-auto">
            <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
              Netherious no es solo un servidor: es un universo completo donde{" "}
              <span className="text-accent font-bold">22 categorías únicas</span> de experiencia te esperan. Podés ser
              el ingeniero que automatiza civilizaciones con Create, el explorador que descubre estructuras legendarias,
              el chef que domina sistemas culinarios complejos, o el guerrero que enfrenta jefes épicos en dimensiones
              renovadas.
            </p>

            <div className="flex flex-col sm:flex-row justify-around items-center gap-4 text-foreground">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-accent">
                  <AnimatedCounter end={162} suffix=" " />
                </span>
                <span className="text-sm md:text-base text-muted-foreground">Mods Esenciales</span>
              </div>

              <div className="h-10 w-px bg-border hidden sm:block"></div>

              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-accent">
                  <AnimatedCounter end={61} suffix=" " />
                </span>
                <span className="text-sm md:text-base text-muted-foreground">Mods en Server</span>
              </div>

  <div className="h-10 w-px bg-border hidden sm:block"></div>

  <div className="flex flex-col items-center">
    <span className="text-3xl md:text-4xl font-bold text-accent">
      <AnimatedCounter end={85} suffix=" " />
    </span>
    <span className="text-sm md:text-base text-muted-foreground">Mods Locales</span>
  </div>

  <div className="h-10 w-px bg-border hidden sm:block"></div>

  <div className="flex flex-col items-center">
    <span className="text-3xl md:text-4xl font-bold text-accent">
      <AnimatedCounter end={22} />
    </span>
    <span className="text-sm md:text-base text-muted-foreground">Categorías</span>
  </div>

  <div className="h-10 w-px bg-border hidden sm:block"></div>

  <div className="flex flex-col items-center">
    <span className="text-3xl md:text-4xl font-bold text-accent">∞</span>
    <span className="text-sm md:text-base text-muted-foreground">Aventuras</span>
  </div>
</div>



          </div>

          {/* Botones CTA mejorados */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Link href="/server-info">
              <GameButton variant="accent" size="lg" icon={<Server className="h-5 w-5" />}>
                <span>Unite a Netherious</span>
              </GameButton>
            </Link>
            <Link href="https://discord.gg/VgHGz5RJ" target="_blank" rel="noopener noreferrer">
              <GameButton variant="secondary" size="lg" icon={<DiscordLogo className="h-5 w-5" />}>
                <span>Conéctate en Discord</span>
              </GameButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Categorías Completamente Renovada */}
      <ScrollReveal>
        <section className="py-16 md:py-24 px-4">
          {/* Header de sección premium */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 text-muted-foreground mb-4">
              <div className="h-px w-10 bg-muted-foreground"></div>
              <Star className="h-5 w-5 text-accent animate-pulse" />
              <div className="h-px w-10 bg-muted-foreground"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-title text-foreground mb-4">
              Categorías de Experiencia
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explorá las 19 facetas únicas de Netherious. Cada categoría ofrece una experiencia especializada que se
              complementa perfectamente con las demás.
            </p>
          </div>

          {/* Carrusel premium */}
          <div className="w-full max-w-6xl mx-auto">
            <Carousel
              transitionEffect="slide"
              className="w-full h-[480px] sm:h-[520px] md:h-[580px] lg:h-[620px] rounded-2xl overflow-hidden shadow-2xl" // Adjusted height for smaller cards
              showControls={true}
              showIndicators={true}
              autoPlay={true}
              interval={6000}
            >
              {modCategories.map((category, index) => (
                <div key={index} className="w-full h-full p-2">
                  <div
                    className="relative w-full h-full rounded-xl overflow-hidden flex flex-col justify-between
                               bg-card/70 backdrop-blur-sm border border-border/50
                               transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
                  >
                    {/* Efectos de fondo de la card (ahora con todos los estilos del modal) */}
                    <div className={`absolute inset-0 ${category.gradient} opacity-30`}></div>
                    <div className="absolute inset-0 bg-[url('/images/mesh-pattern.png')] opacity-10 mix-blend-overlay"></div>
                    <div className={`absolute inset-0 border-2 ${category.borderColor} opacity-50 rounded-xl`}></div>
                    <div className={`absolute inset-0 ${category.glowColor} opacity-20 blur-xl`}></div>
                    <div className={`absolute inset-0 ${category.glowColor} opacity-10 blur-3xl`}></div>{" "}
                    {/* Added additional glow */}
                    {/* Header de categoría */}
                    <div className="relative z-10 p-6 pb-4 flex items-center gap-4 border-b border-border/50">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-accent/20 blur-md animate-pulse-glow"></div>
                        <div className={`relative p-3 rounded-full ${category.accentColor} bg-primary/20`}>
                          {category.icon}
                        </div>
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-bold font-title ${category.accentColor}`}>
                        {category.title}
                      </h3>
                    </div>
                    {/* Contenido (ahora con la descripción completa) */}
                    <div className="relative z-10 p-6 flex-grow overflow-y-auto custom-scrollbar">
                      <p className="text-base md:text-lg text-foreground leading-relaxed">{category.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Sección de contexto premium */}
          <div className="max-w-4xl mx-auto text-center mt-16 md:mt-24">
            <div className="relative bg-card/80 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-lg border border-border/50 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/pattern-dark.png')] opacity-5 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-20"></div>
              <div className="absolute inset-0 bg-accent/10 blur-3xl opacity-10 animate-pulse-glow"></div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold font-title text-foreground mb-4">
                  Tu Aventura, Tu Estilo
                </h3>
                <div className="flex items-center justify-center gap-3 text-muted-foreground mb-6">
                  <div className="h-px w-10 bg-muted-foreground"></div>
                  <Star className="h-5 w-5 text-accent" />
                  <div className="h-px w-10 bg-muted-foreground"></div>
                </div>

                <p className="text-base md:text-lg text-foreground leading-relaxed mb-4">
                  Cada categoría se conecta con las demás de formas inesperadas.{" "}
                  <span className="text-accent font-bold">Create</span> potencia la automatización, las{" "}
                  <span className="text-accent font-bold">estructuras</span> revelan recursos únicos, los{" "}
                  <span className="text-accent font-bold">jefes</span> otorgan materiales legendarios, y las{" "}
                  <span className="text-accent font-bold">dimensiones</span> renovadas abren mundos completamente
                  nuevos.
                </p>
                <p className="text-base md:text-lg text-muted-foreground">
                  En Netherious, no hay límites para combinar experiencias y crear tu propia historia épica.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
