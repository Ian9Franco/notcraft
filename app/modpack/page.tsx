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
      version: "1.0.5",
      description: "Modpack oficial con Forge",
      file_url: "#",
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
  { name: "Create", version: "0.5.1", description: "Añade máquinas y mecanismos complejos" },
  { name: "Biomes O' Plenty", version: "1.20.1-18.0.0.598", description: "Añade nuevos biomas al mundo" },
  { name: "JEI", version: "15.2.0.27", description: "Interfaz mejorada para recetas e items" },
  { name: "Waystones", version: "14.0.2", description: "Sistema de teletransporte entre puntos" },
  { name: "Sophisticated Backpacks", version: "3.18.65", description: "Mochilas avanzadas con mejoras" },
  { name: "Farmer's Delight", version: "1.2.3", description: "Expansión de comidas y agricultura" },
  { name: "Supplementaries", version: "2.6.30", description: "Bloques y mecánicas complementarias" },
]

// Datos estáticos para mods opcionales
const staticOptionalMods: { [key: string]: Mod[] } = {
  particles: [
    { name: "Particle Mod", version: "1.0.0", description: "Efectos de partículas mejorados" },
    { name: "Enhanced Visuals", version: "2.1.5", description: "Mejora visual de efectos y partículas" },
    { name: "Ambient Particles", version: "1.3.2", description: "Partículas ambientales en biomas" },
  ],
  animations: [
    { name: "Better Animations", version: "2.0.0", description: "Animaciones mejoradas para jugadores" },
    { name: "Smooth Animations", version: "1.5.3", description: "Animaciones más fluidas para mobs" },
    { name: "First Person Model", version: "2.2.1", description: "Modelo en primera persona mejorado" },
  ],
  sounds: [
    { name: "Sound Physics", version: "1.1.0", description: "Física de sonido realista" },
    { name: "Enhanced Sounds", version: "2.0.5", description: "Sonidos ambientales mejorados" },
    { name: "Music Expansion", version: "1.3.2", description: "Más música para el juego" },
  ],
  shaders: [
    { name: "BSL Shaders", version: "1.0.0", description: "Shaders de calidad media-alta" },
    { name: "Complementary", version: "2.1.5", description: "Shaders equilibrados y personalizables" },
    { name: "Sildur's Vibrant", version: "1.3.2", description: "Shaders vibrantes con buen rendimiento" },
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
                      <img
                        src={modpack.logo_url || "/placeholder.svg?height=32&width=32"}
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
                <p className="text-xs text-muted-foreground mb-4">{modpack.version}</p>
                <GameButton
                  variant={modpack.available ? "primary" : "outline"}
                  fullWidth
                  disabled={!modpack.available}
                  icon={<Download className="h-4 w-4" />}
                >
                  {modpack.available ? "Descargar" : "Próximamente"}
                </GameButton>
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
 * Página del modpack
 */
export default function ModpackPage() {
  // Usamos useTheme para detectar el tema actual
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Estados para datos estáticos
  const [modpacks, setModpacks] = useState<{ [key: string]: Modpack[] }>({})
  const [featuredMods, setFeaturedMods] = useState<Mod[]>([])
  const [optionalMods, setOptionalMods] = useState<{ [key: string]: Mod[] }>({
    particles: [],
    animations: [],
    sounds: [],
    shaders: [],
  })
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

  // TITULOS: Determinamos el color del texto según el tema
  const titleTextColor = mounted ? (theme === "dark" ? "text-white" : "text-black") : "text-primary"

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
                    {/* Usamos el componente ModloaderIcon en lugar de Image */}
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
                            {/* Usamos el componente ModloaderIcon para el logo del modpack */}
                            <ModloaderIcon
                              type={modloader as "forge" | "fabric" | "neoforged"}
                              size={48}
                              className="absolute inset-0 m-auto"
                            />
                          </div>
                          <div>
                            <h4 className="font-minecraft text-lg text-accent">{modpack.name}</h4>
                            <p className="text-xs text-muted-foreground">Versión {modpack.version}</p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">{modpack.description}</p>

                        <GameButton
                          variant={modpack.available ? "accent" : "outline"}
                          fullWidth
                          disabled={!modpack.available}
                          icon={<Download className="h-4 w-4" />}
                        >
                          {modpack.available ? "Descargar Modpack" : "Próximamente"}
                        </GameButton>
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
              Mods Destacados
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
          <h3 className="font-minecraft text-xl text-accent mb-4">Mods Opcionales</h3>
          <Tabs defaultValue="particles" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="particles" className="minecraft-style">
                Partículas
              </TabsTrigger>
              <TabsTrigger value="animations" className="minecraft-style">
                Animaciones
              </TabsTrigger>
              <TabsTrigger value="sounds" className="minecraft-style">
                Sonidos
              </TabsTrigger>
              <TabsTrigger value="shaders" className="minecraft-style">
                Shaders
              </TabsTrigger>
            </TabsList>

            {Object.entries(optionalMods).map(([category, mods]) => (
              <TabsContent key={category} value={category}>
                <GameCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-minecraft text-lg font-semibold ${titleTextColor}`}>
                      Mods de{" "}
                      {category === "particles"
                        ? "Partículas"
                        : category === "animations"
                          ? "Animaciones"
                          : category === "sounds"
                            ? "Sonidos"
                            : "Shaders"}
                    </h3>
                    <GameButton
                      variant="outline"
                      size="sm"
                      icon={<Download className="h-4 w-4" />}
                      onClick={() => {
                        alert("La funcionalidad de descarga ha sido desactivada en esta versión")
                      }}
                    >
                      Descargar Todos
                    </GameButton>
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
