"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, ExternalLink, HelpCircle, Package, Wrench, Cog, Zap, Server } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, InteractiveAccordion } from "@/components/ui/interactive"
import { useTheme } from "next-themes"
import { ModloaderIcon } from "@/components/modloader-icon" // Importamos el componente ModloaderIcon

/**
 * Interfaz para modpacks
 */
interface Modpack {
  id: string
  name: string
  version: string
  description: string
  file_url: string
  logo_url?: string
  available: boolean
}

/**
 * Interfaz para mods
 */
interface Mod {
  name: string
  version: string
  description: string
  category?: string
  file_url?: string
}

// Datos estáticos para modpacks por modloader
const staticModpacks: { [key: string]: Modpack[] } = {
  forge: [
    {
      id: "1",
      name: "Netherious Forge",
      version: "1.20.1",
      description: "Modpack oficial con Forge",
      file_url: "#",
      logo_url: "/images/logos/forge-logo.png",
      available: false,
    },
  ],
  fabric: [
    {
      id: "2",
      name: "Netherious Fabric",
      version: "Beta",
      description: "Versión con Fabric (próximamente)",
      file_url: "#",
      logo_url: "/images/logos/fabric-logo.png",
      available: false,
    },
  ],
  neoforge: [
    {
      id: "3",
      name: "Netherious NeoForge",
      version: "1.21.1",
      description: "Versión con NeoForge",
      file_url: "#",
      logo_url: "/images/logos/neoforge-logo.png",
      available: true,
    },
  ],
}

// Datos estáticos para mods destacados por modloader
const staticFeaturedMods: { [key: string]: Mod[] } = {
  forge: [
    { name: "Create", version: "0.5.1", description: "Añade máquinas y mecanismos complejos para automatización" },
    {
      name: "Sweet Calamity",
      version: "0.5.1",
      description: "Explora las Sweetlands, una nueva dimensión llena de diversión y azúcar(mod argentino)",
    },
  ],
  fabric: [
    // TODO: Add Fabric featured mods here
    // Example: { name: "Sodium", version: "0.5.8", description: "Optimización de renderizado para mejor rendimiento" },
    // Example: { name: "Iris", version: "1.6.17", description: "Soporte para shaders con compatibilidad Optifine" },
  ],
  neoforge: [
  {
    name: "Confluence",
    version: "1.21.1",
    description: "Mod de aventura a gran escala que fusiona Minecraft y Terraria, con nuevos biomas, armas, bloques y mecánicas clásicas como Shimmer y Secret Seeds.",
  },
  {
    name: "Create",
    version: "1.21.1",
    description: "Sistema avanzado de ingeniería y automatización con máquinas, transportadores y procesos visuales impresionantes.",
  },
  {
    name: "Farmers Delight",
    version: "1.21.1",
    description: "Expande la cocina, cultivo y decoración rural con nuevas recetas, bloques y mecánicas agrícolas.",
  },
  {
    name: "Irons Spells & Spellbooks",
    version: "1.21.1",
    description: "Sistema de magia avanzado con hechizos, jefes y progresión por libros encantados.",
  },
  {
    name: "Gobber",
    version: "1.21.1",
    description: "Introduce recursos y equipamiento de alto nivel con habilidades especiales y mejoras mágicas.",
  },
  {
    name: "Enchanting Innovation",
    version: "1.21.1",
    description: "Mejora el sistema de encantamientos con nuevas mecánicas, personalización y eficiencia.",
  },
  {
    name: "Supplementaries",
    version: "1.21.1",
    description: "Añade una amplia variedad de bloques decorativos y funcionales para construcciones inmersivas.",
  },
  {
    name: "Even Better Nether",
    version: "1.21.1",
    description: "Renueva el Nether con biomas únicos, estructuras y nuevos materiales.",
  },
  {
    name: "Eternal Nether",
    version: "1.21.1",
    description: "Expande el Nether con enemigos desafiantes, loot raro y eventos especiales.",
  },
  {
    name: "Bosses Rise",
    version: "1.21.1",
    description: "Agrega nuevos jefes con mecánicas avanzadas y recompensas poderosas.",
  },
  {
    name: "Weather 2",
    version: "1.21.1",
    description: "Sistema climático realista con tormentas, tornados y efectos atmosféricos.",
  },
  {
    name: "Better Combat",
    version: "1.21.1",
    description: "Mejora el combate cuerpo a cuerpo con nuevas animaciones, combos y dinamismo.",
  },
  {
    name: "Revamped Phantoms",
    version: "1.21.1",
    description: "Rework completo de los phantoms, haciéndolos más desafiantes e interesantes.",
  },
  {
    name: "Wraith Waystones",
    version: "1.21.1",
    description: "Sistema de teletransporte rápido mediante waystones personalizables.",
  },
  {
    name: "Sophisticated Backpacks",
    version: "1.21.1",
    description: "Mochilas modulares con gran capacidad y opciones de personalización.",
  },
  {
    name: "Visual Workbench",
    version: "1.21.1",
    description: "Mesas de crafteo persistentes que muestran visualmente las recetas en progreso.",
  },
  {
    name: "Tome’s Storage",
    version: "1.21.1",
    description: "Sistema de almacenamiento avanzado, rápido y ordenado.",
  },
  {
    name: "Small Ships",
    version: "1.21.1",
    description: "Añade barcos grandes y funcionales para explorar océanos.",
  },
  {
    name: "Immersive Aircraft",
    version: "1.21.1",
    description: "Introduce aviones y aeronaves para exploración aérea.",
  },
  {
    name: "Underground Worlds",
    version: "1.21.1",
    description: "Genera cuevas y biomas subterráneos únicos con contenido para exploración profunda.",
  },
],
}




// Datos estáticos para mods opcionales por modloader
const staticOptionalMods: { [key: string]: { [category: string]: Mod[] } } = {
  forge: {
    sound: [
      // TODO: Add Forge sound mods here
      // Example: { name: "Sound Physics Remastered", version: "1.4.5", description: "Física de sonido realista con reverberación" },
      // Example: { name: "Ambient Sounds", version: "5.3.9", description: "Sonidos ambientales inmersivos" },
    ],
    visual: [
      // TODO: Add Forge visual mods here
      // Example: { name: "Optifine", version: "HD_U_I5", description: "Mejoras visuales y optimización" },
      // Example: { name: "Dynamic Lights", version: "1.8.1", description: "Iluminación dinámica en tiempo real" },
    ],
    performance: [
      // TODO: Add Forge performance mods here
      // Example: { name: "Rubidium", version: "0.7.1", description: "Optimización de renderizado" },
      // Example: { name: "Canary", version: "0.3.3", description: "Optimizaciones generales del servidor" },
    ],
    utility: [
      // TODO: Add Forge utility mods here
      // Example: { name: "JEI", version: "15.2.0", description: "Información de items y recetas" },
      // Example: { name: "WAILA", version: "1.15.0", description: "Información de bloques al apuntar" },
    ],
    maps: [
      // TODO: Add Forge maps here
      // Example: { name: "JourneyMap", version: "5.9.7", description: "Mapa en tiempo real con waypoints" },
      // Example: { name: "Antique Atlas", version: "2.9.7", description: "Mapa estilo antiguo dibujado a mano" },
    ],
  },
  fabric: {
    sound: [
      // TODO: Add Fabric sound mods here
      // Example: { name: "Sound Physics Fabric", version: "1.1.2", description: "Física de sonido realista" },
      // Example: { name: "Presence Footsteps", version: "1.9.1", description: "Sonidos de pasos mejorados" },
    ],
    visual: [
      // TODO: Add Fabric visual mods here
      // Example: { name: "Iris Shaders", version: "1.6.17", description: "Soporte completo para shaders" },
      // Example: { name: "LambDynamicLights", version: "2.3.2", description: "Iluminación dinámica" },
    ],
    performance: [
      // TODO: Add Fabric performance mods here
      // Example: { name: "Sodium", version: "0.5.8", description: "Optimización de renderizado extrema" },
      // Example: { name: "Lithium", version: "0.11.2", description: "Optimizaciones del servidor" },
    ],
    utility: [
      // TODO: Add Fabric utility mods here
      // Example: { name: "REI", version: "12.0.684", description: "Información de items y recetas" },
      // Example: { name: "Mod Menu", version: "7.2.2", description: "Menú de configuración de mods" },
    ],
    maps: [
      // TODO: Add Fabric maps here
      // Example: { name: "Xaero's Minimap", version: "23.9.7", description: "Minimapa avanzado" },
      // Example: { name: "VoxelMap", version: "1.12.13", description: "Mapa y minimapa completo" },
    ],
  },
  neoforge: {
    sound: [
      { name: "Atmosfera", version: "1.21.1", description: "Sonidos ambientales dinámicos para mayor inmersión" },
      {
        name: "Dynamic Surroundings",
        version: "1.21.1",
        description: "Mejora efectos climáticos y sonidos ambientales",
      },
      { name: "Satisfying Buttons", version: "1.21.1", description: "Sonidos y animaciones al pulsar botones" },
      { name: "Timm", version: "1.21.1", description: "¡118 canciones nuevas que dependen del bioma!" },
    ],
    visual: [
      { name: "Waves", version: "1.21.1", description: "Simulación de olas realistas en agua y líquidos" },
      { name: "Wakes", version: "1.21.1", description: "Genera estelas en el agua al nadar o navegar" },
      { name: "Auroras", version: "1.21.1", description: "Añade auroras boreales dinámicas al cielo" },
      { name: "Perception", version: "1.21.1", description: "Mejoras visuales de profundidad y atmósfera" },
    ],
    performance: [
      { name: "Sodium", version: "1.21.1", description: "Optimización de renderizado para mayor rendimiento" },
      { name: "Lithium", version: "1.21.1", description: "Optimizaciones de física y lógica del mundo" },
      { name: "Iris", version: "1.21.1", description: "Soporte para shaders con compatibilidad moderna" },
      { name: "Not Enough Recipe Book", version: "1.21.1", description: "Recetario mejorado y optimizado" },
    ],
    utility: [
      {
        name: "Simple Sorter",
        version: "1.21.1",
        description: "Organiza y gestiona tu inventario fácilmente",
      },
      { name: "EMI", version: "1.21.1", description: "Muestra información de items y recetas en pantalla" },
      { name: "Jade", version: "1.21.1", description: "Información contextual de bloques y entidades" },
      { name: "Mouse Tweaks", version: "1.21.1", description: "Mejora la gestión de items con el ratón" },
    ],
    maps: [
      { name: "JourneyMap", version: "1.21.1", description: "Mapeo en tiempo real en el juego o en un navegador web mientras exploras." },
    ],
  },
}

/**
 * Pasos del tutorial de instalación
 */
const getTutorialSteps = (selectedModloader: string) => [
  {
    title: `Instalar ${selectedModloader.charAt(0).toUpperCase() + selectedModloader.slice(1)}`,
    icon: <Wrench className="h-5 w-5" />,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Primero necesitas instalar {selectedModloader.charAt(0).toUpperCase() + selectedModloader.slice(1)} en tu
          Minecraft. Sigue estos pasos:
        </p>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Descarga el instalador de {selectedModloader.charAt(0).toUpperCase() + selectedModloader.slice(1)} desde el sitio oficial.  
            Asegúrate de elegir una versión **superior a 21.1.195**, aunque **siempre se recomienda descargar la última versión disponible**.
          </li>
          <li>Ejecuta el instalador y selecciona "Install client"</li>
          <li>Haz clic en "OK" para instalar</li>
          <li>Abre el launcher de Minecraft y asegúrate de seleccionar el perfil correspondiente</li>
        </ol>

        <div className="flex justify-center mt-4">
          <a
            href={
              selectedModloader === "forge"
                ? "https://files.minecraftforge.net/net/minecraftforge/forge/index_1.20.1.html"
                : selectedModloader === "fabric"
                  ? "https://fabricmc.net/use/installer/"
                  : "https://neoforged.net/"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <GameButton variant="outline" size="sm" icon={<ExternalLink className="h-4 w-4" />}>
              Descargar {selectedModloader.charAt(0).toUpperCase() + selectedModloader.slice(1)}
            </GameButton>
          </a>
        </div>
      </div>
    ),
  },
  {
    title: "Descargar el Modpack",
    icon: <Package className="h-5 w-5" />,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Descarga el archivo ZIP del modpack completo desde nuestro servidor:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {Object.entries(staticModpacks).map(([modloader, packs]) =>
            packs.map((modpack, index) => (
              <div key={index} className={`${modpack.available ? "" : "opacity-60"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10">
                      <img
                        src={modpack.logo_url || "/placeholder.svg?height=40&width=40"}
                        alt={modpack.name}
                        className="object-contain absolute inset-0"
                      />
                    </div>
                    <h3 className="font-minecraft text-lg text-accent">{modpack.name}</h3>
                  </div>
                  {modpack.available && (
                    <svg
                      className="h-4 w-4 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <p className="text-xs text-accent [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
                  Última versión disponible: {modpack.version}
                </p>
                <a
                  href="https://drive.google.com/drive/folders/18d8fgpPIPQ7NPhI3BO2rgvK-nFUAa2NO" 
                  className={modpack.available ? "" : "pointer-events-none"}
                >
                  <GameButton
                    variant={modpack.available ? "accent" : "outline"}
                    fullWidth
                    disabled={!modpack.available}
                    icon={<Download className="h-4 w-4" />}
                  >
                    {modpack.available ? "Descargar" : "Próximamente"}
                  </GameButton>
                </a>
              </div>
            )),
          )}
        </div>
      </div>
    ),
  },
  {
    title: "Instalar los Mods",
    icon: <Cog className="h-5 w-5" />,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Sigue estos pasos para instalar correctamente los mods:</p>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Localiza la carpeta <code className="bg-background/70 px-2 py-1 rounded">.minecraft</code> en tu computadora
          </li>
          <li>
            Crea una carpeta llamada <code className="bg-background/70 px-2 py-1 rounded">mods</code> si no existe
          </li>
          <li>Descomprime el archivo ZIP del modpack</li>
          <li>
            Copia todos los archivos .jar a la carpeta{" "}
            <code className="bg-background/70 px-2 py-1 rounded">.minecraft/mods</code>
          </li>
          <li>Asegúrate de eliminar mods antiguos para evitar conflictos</li>
        </ol>
        <div className="bg-accent/10 border border-accent/30 rounded-md p-3 mt-2">
          <p className="text-sm flex items-start gap-2">
            <HelpCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <span>
              Si no sabes dónde está la carpeta .minecraft, puedes abrirla desde el launcher: Instalaciones → Perfil
              correspondiente → Ver carpeta del juego
            </span>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "¡Juega!",
    icon: <Zap className="h-5 w-5" />,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Ya estás listo para jugar con nuestro modpack:</p>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>Abre el launcher de Minecraft</li>
          <li>Selecciona el perfil de {selectedModloader.charAt(0).toUpperCase() + selectedModloader.slice(1)}</li>
          <li>Inicia el juego</li>
          <li>
            Conéctate a nuestro servidor:{" "}
            <code className="bg-background/70 px-2 py-1 rounded">play.netherious.com</code>
          </li>
        </ol>
        <div className="flex justify-center mt-4">
          <a href="/server-info" className="inline-flex">
            <GameButton variant="accent" size="sm" icon={<Server className="h-4 w-4" />}>
              Ver Info del Servidor
            </GameButton>
          </a>
        </div>
      </div>
    ),
  },
]

/**
 * Página del modpack
 */
export default function ModpackPage() {
  // Usamos useTheme para detectar el tema actual
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Estados para datos estáticos
  const [selectedModloader, setSelectedModloader] = useState<string>("neoforge")
  const [modpacks, setModpacks] = useState<{ [key: string]: Modpack[] }>({})
  const [featuredMods, setFeaturedMods] = useState<Mod[]>([])
  const [optionalMods, setOptionalMods] = useState<{ [key: string]: Mod[] }>({
    sound: [],
    visual: [],
    performance: [],
    utility: [],
    maps: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isModsExpanded, setIsModsExpanded] = useState(false)

  // Efecto para manejar el montaje del componente
  useEffect(() => {
    setMounted(true)

    // Simular carga de datos
    const timer = setTimeout(() => {
      setModpacks(staticModpacks)
      setFeaturedMods(staticFeaturedMods[selectedModloader] || [])
      setOptionalMods(
        staticOptionalMods[selectedModloader] || {
          sound: [],
          visual: [],
          performance: [],
          utility: [],
          maps: [],
        },
      )
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [selectedModloader])

  // TITULOS: Determinamos el color del texto según el tema
  const titleTextColor = mounted ? (theme === "dark" ? "text-white" : "text-black") : "text-primary"

  // Función para obtener el enlace de descarga según la categoría
  const getCategoryDownloadLink = (category: string) => {
    // TODO: Add modloader-specific download links for category packs
    switch (selectedModloader) {
      case "forge":
        switch (category) {
          case "sound":
            return "https://drive.google.com/uc?export=download&id=FORGE_SOUND_PACK_ID" // TODO: Replace with actual Forge sound pack ID
          case "visual":
            return "https://drive.google.com/uc?export=download&id=FORGE_VISUAL_PACK_ID" // TODO: Replace with actual Forge visual pack ID
          case "performance":
            return "https://drive.google.com/uc?export=download&id=FORGE_PERFORMANCE_PACK_ID" // TODO: Replace with actual Forge performance pack ID
          case "utility":
            return "https://drive.google.com/uc?export=download&id=FORGE_UTILITY_PACK_ID" // TODO: Replace with actual Forge utility pack ID
          case "maps":
            return "https://drive.google.com/uc?export=download&id=FORGE_MAPS_PACK_ID" // TODO: Replace with actual Forge maps pack ID
          default:
            return "#"
        }
      case "fabric":
        switch (category) {
          case "sound":
            return "https://drive.google.com/uc?export=download&id=FABRIC_SOUND_PACK_ID" // TODO: Replace with actual Fabric sound pack ID
          case "visual":
            return "https://drive.google.com/uc?export=download&id=FABRIC_VISUAL_PACK_ID" // TODO: Replace with actual Fabric visual pack ID
          case "performance":
            return "https://drive.google.com/uc?export=download&id=FABRIC_PERFORMANCE_PACK_ID" // TODO: Replace with actual Fabric performance pack ID
          case "utility":
            return "https://drive.google.com/uc?export=download&id=FABRIC_UTILITY_PACK_ID" // TODO: Replace with actual Fabric utility pack ID
          case "maps":
            return "https://drive.google.com/uc?export=download&id=FABRIC_MAPS_PACK_ID" // TODO: Replace with actual Fabric maps pack ID
          default:
            return "#"
        }
      case "neoforge":
        switch (category) {
          case "sound":
            return "https://drive.google.com/drive/folders/1xxckBpbM0kcH-ZfI1AmnfC8P5CP8gKYn?usp=drive_link" 
          case "visual":
            return "https://drive.google.com/drive/folders/18PeBu1EPjgSuXWj12j94I24bP6EPIEoW?usp=drive_link" 
          case "performance":
            return "https://drive.google.com/drive/folders/1DzRAccsnz2Svi7UUwvVWJS0FUVujIVAT?usp=drive_link" 
          case "utility":
            return "https://drive.google.com/drive/folders/19cs5wky_tr1WDCiRtuj6yelJL57rzxvE?usp=drive_link" 
          case "maps":
            return "https://drive.google.com/drive/folders/1BNvS9ZwyNrMHos85XlGDm2ypbyRz5UE8?usp=drive_link" 
          default:
            return "#"
        }
      default:
        return "#"
    }
  }

  // Función para obtener el nombre de la categoría en español
  const getCategoryName = (category: string) => {
    switch (category) {
      case "sound":
        return "Sonido"
      case "visual":
        return "Visual"
      case "performance":
        return "Rendimiento"
      case "utility":
        return "Utilidad"
      case "maps":
        return "Mapas"
      default:
        return category
    }
  }

  return (
    <div className="space-y-12 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionHeader
          title="Modpack Oficial"
          subtitle="Descarga y juega con el mismo modpack que utilizamos en nuestro servidor."
          accent
        />
      </motion.div>

      <ScrollReveal>
        <GameCard className="border-glow" borderGlow>
          <h2 className="minecraft-style text-2xl text-accent mb-6">Tutorial de Instalación</h2>
          <InteractiveAccordion items={getTutorialSteps(selectedModloader)} />

          <div className="mt-8">
            <h3 className="font-minecraft text-xl text-accent mb-4">Descargar por Modloader</h3>

            <Tabs defaultValue="neoforge" className="w-full" onValueChange={setSelectedModloader}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="forge" className="minecraft-style">
                  <div className="flex items-center gap-2">
                    {/* Usamos el componente ModloaderIcon en lugar de Image */}
                    <ModloaderIcon type="forge" size={24} />
                    Forge
                  </div>
                </TabsTrigger>
                <TabsTrigger value="fabric" className="minecraft-style">
                  <div className="flex items-center gap-2">
                    <ModloaderIcon type="fabric" size={24} />
                    Fabric
                  </div>
                </TabsTrigger>
                <TabsTrigger value="neoforge" className="minecraft-style">
                  <div className="flex items-center gap-2">
                    <ModloaderIcon type="neoforge" size={24} />
                    NeoForge
                  </div>
                </TabsTrigger>
              </TabsList>

              {Object.entries(staticModpacks).map(([modloader, packs]) => (
                <TabsContent key={modloader} value={modloader}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packs.map((modpack, index) => (
                      <GameCard key={index} className={`${modpack.available ? "border-glow" : "opacity-70"}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="relative w-16 h-16 bg-background/30 rounded-md p-2 flex items-center justify-center">
                            {/* Usamos el componente ModloaderIcon para el logo del modpack */}
                            <ModloaderIcon
                              type={modloader === "neoforge" ? "neoforge" : (modloader as "forge" | "fabric")}
                              size={40}
                              className="flex-shrink-0"
                            />
                          </div>
                          <div>
                            <h4 className="font-minecraft text-lg text-accent">{modpack.name}</h4>
                            <p className="text-xs text-accent [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
                              Última versión disponible: {modpack.version}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-accent mb-4 [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
                          {modpack.description}
                        </p>

                        <a
                          href="https://drive.google.com/drive/folders/18d8fgpPIPQ7NPhI3BO2rgvK-nFUAa2NO?usp=drive_link" // TODO: Add your Google Drive link here for main modpack
                          className={modpack.available ? "" : "pointer-events-none"}
                        >
                          <GameButton
                            variant={modpack.available ? "accent" : "outline"}
                            fullWidth
                            disabled={!modpack.available}
                            icon={<Download className="h-4 w-4" />}
                          >
                            {modpack.available ? "Descargar Modpack" : "Próximamente"}
                          </GameButton>
                        </a>
                      </GameCard>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </GameCard>
      </ScrollReveal>

      <ScrollReveal direction="up">
        <SectionHeader title="Mods Incluidos" />

        <div className="max-w-4xl mx-auto">
          {/* Contenedor de Mods Destacados */}
          <div id="featured-mods-season-1">
            <h3 className="font-minecraft text-xl text-accent mb-4 flex items-center">
              <span className="inline-block w-3 h-3 bg-accent rounded-full mr-2 animate-pulse"></span>
              Mods Destacados - {selectedModloader.charAt(0).toUpperCase() + selectedModloader.slice(1)}
            </h3>
            <GameCard className="border-2 border-accent/30">
              <div className="grid grid-cols-1 divide-y divide-border">
                {isLoading ? (
                  // Mostrar placeholders mientras carga
                  [...Array(7)].map((_, index) => (
                    <div key={index} className="p-4 flex justify-between items-center">
                      <div>
                        <div className="h-5 bg-secondary/30 rounded-md w-32 mb-2"></div>
                        <div className="h-3 bg-secondary/30 rounded-md w-48"></div>
                      </div>
                      <div className="h-5 bg-secondary/30 rounded-md w-12"></div>
                    </div>
                  ))
                ) : featuredMods.length === 0 ? (
                  <div className="p-4 text-center">
                    <p className="text-muted-foreground">No hay mods destacados disponibles.</p>
                  </div>
                ) : (
                  featuredMods.map((mod, index) => (
                    <motion.div
                      key={index}
                      className="p-4 flex justify-between items-center hover:bg-secondary/80 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div>
                        <h4 className={`font-minecraft text-lg font-semibold ${titleTextColor} title-hover`}>
                          {mod.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{mod.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                        v{mod.version}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
            </GameCard>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <div className="max-w-4xl mx-auto">
          <h3 className="font-minecraft text-xl text-accent mb-4">
            Mods Opcionales - {selectedModloader.charAt(0).toUpperCase() + selectedModloader.slice(1)}
          </h3>
          <Tabs defaultValue="sound" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="sound" className="minecraft-style">
                <span className="hidden sm:inline">Sonido</span>
                <span className="inline sm:hidden">Sonido</span>
              </TabsTrigger>
              <TabsTrigger value="visual" className="minecraft-style">
                <span className="hidden sm:inline">Visual</span>
                <span className="inline sm:hidden">Visual</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="minecraft-style">
                <span className="hidden sm:inline">Rendimiento</span>
                <span className="inline sm:hidden">Rend.</span>
              </TabsTrigger>
              <TabsTrigger value="utility" className="minecraft-style">
                <span className="hidden sm:inline">Utilidad</span>
                <span className="inline sm:hidden">Util.</span>
              </TabsTrigger>
              <TabsTrigger value="maps" className="minecraft-style">
                <span className="hidden sm:inline">Mapas</span>
                <span className="inline sm:hidden">Mapas</span>
              </TabsTrigger>
            </TabsList>

            {Object.entries(optionalMods).map(([category, mods]) => (
              <TabsContent key={category} value={category}>
                <GameCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-minecraft text-lg font-semibold ${titleTextColor}`}>
                      Mods de <span className="hidden sm:inline">{getCategoryName(category)}</span>
                      <span className="inline sm:hidden">
                        {category === "sound"
                          ? "Sonido"
                          : category === "visual"
                            ? "Visual"
                            : category === "performance"
                              ? "Rend."
                              : category === "utility"
                                ? "Util."
                                : "Mapas"}
                      </span>
                    </h3>
                    <a href={getCategoryDownloadLink(category)}>
                      <GameButton variant="outline" size="sm" icon={<Download className="h-4 w-4" />}>
                        <span className="hidden sm:inline">Descargar Todos</span>
                        <span className="inline sm:hidden">Descargar</span>
                      </GameButton>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 divide-y divide-border">
                    {isLoading ? (
                      // Mostrar placeholders mientras carga
                      [...Array(3)].map((_, index) => (
                        <div key={index} className="p-4 flex justify-between items-center">
                          <div>
                            <div className="h-5 bg-secondary/30 rounded-md w-32 mb-2"></div>
                            <div className="h-3 bg-secondary/30 rounded-md w-48"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-5 bg-secondary/30 rounded-md w-12"></div>
                            <div className="h-8 bg-secondary/30 rounded-md w-24"></div>
                          </div>
                        </div>
                      ))
                    ) : mods.length === 0 ? (
                      <div className="p-4 text-center">
                        <p className="text-muted-foreground">No hay mods disponibles para esta categoría.</p>
                      </div>
                    ) : (
                      mods.map((mod, index) => (
                        <motion.div
                          key={index}
                          className="p-4 flex justify-between items-center hover:bg-secondary/80 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div>
                            <h4 className={`font-minecraft text-lg font-semibold ${titleTextColor} title-hover`}>
                              {mod.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">{mod.description}</p>
                          </div>
                          <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                            v{mod.version}
                          </span>
                        </motion.div>
                      ))
                    )}
                  </div>
                </GameCard>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </ScrollReveal>
    </div>
  )
}