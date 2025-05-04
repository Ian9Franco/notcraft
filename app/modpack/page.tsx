"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Download, ExternalLink, HelpCircle, Package, Wrench, Cog, Zap, Server } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, InteractiveAccordion } from "@/components/ui/interactive"
import { useTheme } from "next-themes"
import { ModloaderIcon } from "@/components/modloader-icon"

/**
 * Interfaces
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

interface Mod {
  name: string
  version: string
  description: string
  category?: string
  file_url?: string
}

/**
 * Datos estáticos
 */
// Datos estáticos para modpacks por modloader
const staticModpacks: Record<string, Modpack[]> = {
  forge: [
    {
      id: "1",
      name: "Netherious Forge",
      version: "1.0.5",
      description: "Modpack oficial con Forge",
      file_url: "https://drive.google.com/uc?export=download&id=1sLVxzKPOczuSLT7bIYvpclpkF-_AG6la",
      logo_url: "/images/logos/forge-logo.png",
      available: true,
    },
  ],
  fabric: [
    {
      id: "2",
      name: "Netherious Fabric",
      version: "1.0.0",
      description: "Versión con Fabric (próximamente)",
      file_url: "#",
      logo_url: "/images/logos/fabric-logo.png",
      available: false,
    },
  ],
  neoforged: [
    {
      id: "3",
      name: "Netherious NeoForged",
      version: "Beta",
      description: "Versión experimental con NeoForged",
      file_url: "#",
      logo_url: "/images/logos/neoforged-logo.png",
      available: false,
    },
  ],
}

// Datos estáticos para mods destacados
const staticFeaturedMods: Mod[] = [
  { name: "Create", version: "0.5.1", description: "Añade máquinas y mecanismos complejos para automatización" },
  {
    name: "Deeper and Darker",
    version: "1.0.0",
    description: "Expande el Deep Dark con nuevas estructuras y enemigos",
  },
  {
    name: "Sweet Calamity",
    version: "1.0.0",
    description: "Explora las Sweetlands, una nueva dimensión llena de diversión y azúcar(mod argentino)",
  },
  { name: "Blue Skies", version: "1.1.3", description: "Dos nuevas dimensiones llenas de aventuras y jefes" },
  { name: "The Bumblezone", version: "5.0.2", description: "Dimensión basada en abejas y colmenas gigantes" },
  {
    name: "Grim and Bleak",
    version: "1.0.0",
    description: "Añade una atmósfera oscura con enemigos y objetos sombríos",
  },
  { name: "Macabre", version: "1.0.0", description: "Terror y estética gótica en nuevas entidades y estructuras" },
  { name: "Hamsters", version: "1.0.0", description: "Añade adorables hámsters domesticables" },
  { name: "Naturalist", version: "2.1.1", description: "Nuevos animales salvajes y comportamientos realistas" },
  { name: "Unusual Prehistory", version: "1.0.0", description: "Criaturas prehistóricas" },
  { name: "Thalassophobia", version: "1.0.0", description: "Exploración acuática con criaturas marinas aterradoras" },
  { name: "L_Ender's Cataclysm", version: "1.32", description: "Jefes poderosos y estructuras desafiantes en el End" },
  { name: "Dweller Dweller", version: "1.0.0", description: "Presencias siniestras en cuevas profundas" },
  {
    name: "There is Something in the Caves",
    version: "1.0.0",
    description: "Misterios y horrores acechan en la oscuridad",
  },
  {
    name: "Tacz",
    version: "1.0.0",
    description: "La experiencia FPS moderna más inmersiva y personalizable de Minecraft",
  },
  { name: "Ad Astra", version: "1.12.3", description: "Exploración espacial con planetas, cohetes y estaciones" },
  { name: "Unusual End", version: "1.0.0", description: "Transforma el End en una dimensión extraña y peligrosa" },
  { name: "Outher End", version: "1.0.0", description: "Expande el End con biomas y criaturas alienígenas" },
  { name: "IDAS", version: "1.0.0", description: "Un mod que agrega estructuras muy detalladas usando bloques y mobs" },
  { name: "Butcher", version: "1.0.0", description: "Sistema de caza, despiece y cocina sangrienta" },
  {
    name: "Cognition",
    version: "1.0.0",
    description:
      "Cognition tiene como objetivo revisar la XP del jugador, proporcionando nuevas formas de almacenarla, transportarla y usarla de formas extrañas y maravillosas",
  },
  {
    name: "Incapacited",
    version: "1.0.0",
    description: "Estado de incapacitación antes de morir, como en juegos cooperativos",
  },
  { name: "Parcool", version: "1.0.0", description: "Parkour fluido con animaciones y mejoras de movimiento" },
  {
    name: "Randomium",
    version: "1.0.0",
    description: "Un nuevo mineral que se comporta de forma aleatoria y puede soltar cualquier objeto",
  },
  {
    name: "Overenchanted",
    version: "1.0.0",
    description: "Un mod simple que agrega más niveles a los encantamientos de vainilla",
  },
  {
    name: "Passive Skill Tree",
    version: "1.0.0",
    description: "Árbol de habilidades pasivas para personalización de personajes",
  },
]

// Datos estáticos para mods opcionales
const staticOptionalMods: Record<string, Mod[]> = {
  particles: [
    { name: "Particular", version: "1.0.0", description: "Efectos de partículas mejorados" },
    { name: "Explosive Enhancement", version: "2.1.5", description: "Mejora visual de efectos y explosiones" },
    { name: "Pretty Rain", version: "1.3.2", description: "Partículas de lluvia mejoradas" },
    { name: "Wakes", version: "1.0.0", description: "Efectos de agua mejorados" },
    { name: "Perception", version: "1.1.0", description: "Efectos visuales ambientales" },
    { name: "Visuality", version: "2.0.0", description: "Partículas visuales mejoradas" },
    { name: "Cosy Critters", version: "1.0.0", description: "Partículas para criaturas" },
    { name: "Biome Particle Weather", version: "1.2.0", description: "Partículas específicas por bioma" },
  ],
  animations: [
    { name: "Eating Animation", version: "2.0.0", description: "Animaciones mejoradas al comer" },
    { name: "Entity Model & Texture Features", version: "1.5.3", description: "Mejoras en modelos y texturas" },
    { name: "Weapon Master", version: "1.2.1", description: "Animaciones de armas mejoradas" },
    { name: "Let Sleeping Dogs Lie", version: "1.0.0", description: "Animaciones para mascotas durmiendo" },
  ],
  sounds: [
    { name: "Sound Physics Remastered", version: "1.1.0", description: "Física de sonido realista" },
    { name: "Presence Footsteps", version: "2.0.5", description: "Sonidos de pasos mejorados" },
    { name: "Sounds of the Forest", version: "1.3.2", description: "Sonidos ambientales de bosque" },
  ],
  performance: [
    { name: "Farsight", version: "1.0.0", description: "Mejora la distancia de renderizado" },
    { name: "Fog", version: "1.2.0", description: "Efectos de niebla optimizados" },
    { name: "Embeddium", version: "0.2.5", description: "Optimización general del juego" },
    { name: "Oculus", version: "1.5.0", description: "Mejoras de renderizado" },
  ],
  qol: [
    { name: "Keybind Bundles", version: "1.0.0", description: "Mejoras en atajos de teclado" },
    { name: "Modern UI", version: "2.0.0", description: "Interfaz de usuario moderna" },
    { name: "Enchantment Info", version: "1.1.0", description: "Información detallada de encantamientos" },
    { name: "Hold My Items", version: "1.0.0", description: "Mejoras en el inventario" },
    { name: "Immersive Armor HUD", version: "1.2.0", description: "HUD de armadura mejorado" },
    { name: "Item Zoom", version: "1.0.0", description: "Zoom en items" },
    { name: "Mouse Tweaks", version: "2.0.0", description: "Mejoras en el uso del ratón" },
    { name: "Xaero Minimap", version: "1.5.0", description: "Minimapa avanzado" },
    { name: "JEI/EMI/Jade", version: "2.0.0", description: "Información de items y bloques" },
    { name: "Pickup Notifier", version: "1.0.0", description: "Notificaciones de recogida de items" },
    { name: "Appleskin", version: "1.2.0", description: "Información de comida mejorada" },
    { name: "Bridgin Mod", version: "1.0.0", description: "Mejoras para construir puentes" },
  ],
}

/**
 * Pasos del tutorial de instalación
 */
const tutorialSteps = [
  {
    title: "Instalar Forge",
    icon: <Wrench className="h-5 w-5" />,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Primero necesitas instalar Forge 1.20.1 en tu Minecraft. Sigue estos pasos:
        </p>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>Descarga el instalador de Forge 1.20.1 desde el sitio oficial</li>
          <li>Ejecuta el instalador y selecciona "Install client"</li>
          <li>Haz clic en "OK" para instalar Forge</li>
          <li>Abre el launcher de Minecraft y asegúrate de seleccionar el perfil de Forge 1.20.1</li>
        </ol>
        <div className="flex justify-center mt-4">
          <a
            href="https://files.minecraftforge.net/net/minecraftforge/forge/index_1.20.1.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <GameButton variant="outline" size="sm" icon={<ExternalLink className="h-4 w-4" />}>
              Descargar Forge
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
                    <div className="relative w-8 h-8">
                      <ModloaderIcon
                        type={modloader as "forge" | "fabric" | "neoforged"}
                        size={32}
                        className="absolute inset-0"
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
                <p className="text-xs text-primary">Versión {modpack.version}</p>
                <a
                  href={modpack.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={modpack.available ? "" : "pointer-events-none"}
                >
                  <GameButton
                    variant={modpack.available ? "primary" : "outline"}
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
              Si no sabes dónde está la carpeta .minecraft, puedes abrirla desde el launcher: Instalaciones → Perfil de
              Forge → Ver carpeta del juego
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
          <li>Selecciona el perfil de Forge 1.20.1</li>
          <li>Inicia el juego</li>
          <li>
            Conéctate a nuestro servidor:{" "}
            <code className="bg-background/70 px-2 py-1 rounded">play.netherious.com</code>
          </li>
        </ol>
        <div className="flex justify-center mt-4">
          <a href="/server-info" className="inline-flex">
            <GameButton variant="primary" size="sm" icon={<Server className="h-4 w-4" />}>
              Ver Info del Servidor
            </GameButton>
          </a>
        </div>
      </div>
    ),
  },
]

/**
 * Mapeo de categorías a nombres en español
 */
const categoryNames: Record<string, string> = {
  particles: "Partículas",
  sounds: "Sonidos",
  animations: "Animaciones",
  performance: "Rendimiento",
  qol: "Calidad de Vida",
}

/**
 * Mapeo de categorías a enlaces de descarga
 */
const categoryDownloadLinks: Record<string, string> = {
  particles: "https://drive.google.com/uc?export=download&id=1KuQL_oxuUdu4MTDzUVuiX1PmPMFcyoqi",
  sounds: "https://drive.google.com/uc?export=download&id=1ZKtSam_uWcwPt3IRlmuu_vu1AtqOe8y1",
  animations: "https://drive.google.com/uc?export=download&id=11npWwiUQZvc1bw3pk0qtun6XX8syxUGs",
  performance: "https://drive.google.com/uc?export=download&id=1IEeH5m16jxClrMi16u33UKM-3NblPZtO",
  qol: "https://drive.google.com/uc?export=download&id=1PsFWmXt3AkQGbW6mCAuXZH-8Vg9bejG7",
}

/**
 * Página del modpack
 */
export default function ModpackPage() {
  // Estados
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [modpacks, setModpacks] = useState<Record<string, Modpack[]>>({})
  const [featuredMods, setFeaturedMods] = useState<Mod[]>([])
  const [optionalMods, setOptionalMods] = useState<Record<string, Mod[]>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Efecto para manejar el montaje del componente
  useEffect(() => {
    setMounted(true)

    // Simular carga de datos
    const timer = setTimeout(() => {
      setModpacks(staticModpacks)
      setFeaturedMods(staticFeaturedMods)
      setOptionalMods(staticOptionalMods)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Determinamos el color del texto según el tema
  const titleTextColor = useMemo(
    () => (mounted ? (theme === "dark" ? "text-white" : "text-black") : "text-primary"),
    [mounted, theme],
  )

  // Renderizado de placeholders mientras carga
  const renderPlaceholders = (count = 7) =>
    [...Array(count)].map((_, index) => (
      <div key={index} className="p-4 flex justify-between items-center">
        <div>
          <div className="h-5 bg-secondary/30 rounded-md w-32 mb-2"></div>
          <div className="h-3 bg-secondary/30 rounded-md w-48"></div>
        </div>
        <div className="h-5 bg-secondary/30 rounded-md w-12"></div>
      </div>
    ))

  // Renderizado de mods
  const renderMods = (mods: Mod[]) =>
    mods.length === 0 ? (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">No hay mods disponibles.</p>
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
            <h4 className={`font-minecraft text-lg font-semibold ${titleTextColor} title-hover`}>{mod.name}</h4>
            <p className="text-sm text-muted-foreground">{mod.description}</p>
          </div>
          <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">v{mod.version}</span>
        </motion.div>
      ))
    )

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
          <InteractiveAccordion items={tutorialSteps} />

          <div className="mt-8">
            <h3 className="font-minecraft text-xl text-accent mb-4">Descargar por Modloader</h3>

            <Tabs defaultValue="forge" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="forge" className="minecraft-style">
                  <div className="flex items-center gap-2">
                    <ModloaderIcon type="forge" size={20} />
                    Forge
                  </div>
                </TabsTrigger>
                <TabsTrigger value="fabric" className="minecraft-style" disabled>
                  <div className="flex items-center gap-2">
                    <ModloaderIcon type="fabric" size={20} />
                    Fabric
                  </div>
                </TabsTrigger>
                <TabsTrigger value="neoforged" className="minecraft-style" disabled>
                  <div className="flex items-center gap-2">
                    <ModloaderIcon type="neoforged" size={20} />
                    NeoForged
                  </div>
                </TabsTrigger>
              </TabsList>

              {Object.entries(staticModpacks).map(([modloader, packs]) => (
                <TabsContent key={modloader} value={modloader}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packs.map((modpack, index) => (
                      <GameCard key={index} className={`${modpack.available ? "border-glow" : "opacity-70"}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="relative w-12 h-12 bg-background/30 rounded-md p-1">
                            <ModloaderIcon
                              type={modloader as "forge" | "fabric" | "neoforged"}
                              size={48}
                              className="absolute inset-0 m-auto"
                            />
                          </div>
                          <div>
                            <h4 className="font-minecraft text-lg text-accent">{modpack.name}</h4>
                            <p className="text-xs modpack-version">Versión {modpack.version}</p>
                          </div>
                        </div>

                        <p className="text-sm modpack-text mb-4">{modpack.description}</p>

                        <a
                          href={modpack.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-minecraft text-xl text-accent flex items-center">
                <span className="inline-block w-3 h-3 bg-accent rounded-full mr-2 animate-pulse"></span>
                Mods Destacados
              </h3>
            </div>

            <GameCard className="border-2 border-accent/30">
              <div className="grid grid-cols-1 divide-y divide-border">
                {isLoading ? renderPlaceholders() : renderMods(featuredMods)}
              </div>
            </GameCard>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <div className="max-w-4xl mx-auto">
          <h3 className="font-minecraft text-xl text-accent mb-4">Mods Opcionales</h3>
          <Tabs defaultValue="particles" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              {Object.keys(staticOptionalMods).map((category) => (
                <TabsTrigger key={category} value={category} className="minecraft-style">
                  <span className="hidden sm:inline">{categoryNames[category]}</span>
                  <span className="inline sm:hidden">
                    {category === "particles"
                      ? "Partíc."
                      : category === "animations"
                        ? "Anim."
                        : category === "sounds"
                          ? "Sonidos"
                          : category === "performance"
                            ? "Rend."
                            : "QoL"}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(optionalMods).map(([category, mods]) => (
              <TabsContent key={category} value={category}>
                <GameCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-minecraft text-lg font-semibold ${titleTextColor}`}>
                      Mods de <span className="hidden sm:inline">{categoryNames[category]}</span>
                      <span className="inline sm:hidden">
                        {category === "particles"
                          ? "Partíc."
                          : category === "animations"
                            ? "Anim."
                            : category === "sounds"
                              ? "Sonidos"
                              : category === "performance"
                                ? "Rend."
                                : "QoL"}
                      </span>
                    </h3>
                    <a href={categoryDownloadLinks[category]}>
                      <GameButton variant="outline" size="sm" icon={<Download className="h-4 w-4" />}>
                        <span className="hidden sm:inline">Descargar Todos</span>
                        <span className="inline sm:hidden">Descargar</span>
                      </GameButton>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 divide-y divide-border">
                    {isLoading ? renderPlaceholders(3) : renderMods(mods)}
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
