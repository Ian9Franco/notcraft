"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, ExternalLink, HelpCircle, Package, Wrench, Cog, Zap, Server } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, InteractiveAccordion } from "@/components/ui/interactive"
import { useTheme } from "next-themes"
import { supabase } from "@/lib/supabase"

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
        <div id="modpack-versions-container" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Este contenedor se llenará dinámicamente con los modpacks */}
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

  // Estados para datos de Supabase
  const [modpacks, setModpacks] = useState<Modpack[]>([])
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

    // Cargar datos desde Supabase
    async function fetchData() {
      try {
        // Cargar modpacks
        const { data: modpacksData, error: modpacksError } = await supabase
          .from("modpacks")
          .select("*")
          .order("created_at", { ascending: false })

        if (modpacksError) throw modpacksError
        setModpacks(modpacksData)

        // Cargar mods destacados
        const { data: modsData, error: modsError } = await supabase
          .from("mods")
          .select("*")
          .eq("featured", true)
          .order("name")

        if (modsError) throw modsError
        setFeaturedMods(modsData)

        // Cargar mods opcionales por categoría
        const categories = ["particles", "animations", "sounds", "shaders"]
        const optionalModsData: { [key: string]: Mod[] } = {}

        for (const category of categories) {
          const { data, error } = await supabase
            .from("mods")
            .select("*")
            .eq("category", category)
            .eq("featured", false)
            .order("name")

          if (error) throw error
          optionalModsData[category] = data
        }

        setOptionalMods(optionalModsData)

        // Actualizar el contenedor de versiones de modpack dinámicamente
        setTimeout(() => {
          const container = document.getElementById("modpack-versions-container")
          if (container && modpacksData.length > 0) {
            container.innerHTML = ""
            modpacksData.forEach((modpack) => {
              const modpackCard = document.createElement("div")
              modpackCard.className = `${modpack.available ? "" : "opacity-60"}`
              modpackCard.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-2">
                    <div class="relative w-8 h-8">
                      <img src="${modpack.logo_url || "/placeholder.svg?height=32&width=32"}" alt="${modpack.name}" class="object-contain absolute inset-0" />
                    </div>
                    <h3 class="font-minecraft text-lg text-accent">${modpack.name}</h3>
                  </div>
                  ${modpack.available ? '<svg class="h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ""}
                </div>
                <p class="text-xs text-muted-foreground mb-4">${modpack.version}</p>
                <a href="${modpack.available ? modpack.file_url : "#"}" target="_blank" rel="noopener noreferrer" class="${!modpack.available ? "pointer-events-none" : ""}">
                  <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${modpack.available ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"} h-10 px-4 py-2 w-full">
                    <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Descargar
                  </button>
                </a>
              `
              container.appendChild(modpackCard)
            })
          }
        }, 500)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
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

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {isLoading ? (
              <>
                <div className="flex-1 h-10 bg-secondary/30 rounded-md animate-pulse"></div>
                <div className="flex-1 h-10 bg-secondary/30 rounded-md animate-pulse"></div>
              </>
            ) : modpacks.length > 0 ? (
              <>
                <a href={modpacks[0].file_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <GameButton variant="accent" fullWidth icon={<Download className="h-5 w-5" />}>
                    Descargar Modpack Completo
                  </GameButton>
                </a>
                <a href="/modpack/files" className="flex-1">
                  <GameButton variant="outline" fullWidth icon={<ExternalLink className="h-5 w-5" />}>
                    Ver Todos los Archivos
                  </GameButton>
                </a>
              </>
            ) : (
              <p className="text-muted-foreground">No hay modpacks disponibles actualmente.</p>
            )}
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
                        // Crear un enlace para descargar todos los mods de esta categoría
                        const downloadAllUrl = `/api/download-category?category=${category}`
                        window.open(downloadAllUrl, "_blank")
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

