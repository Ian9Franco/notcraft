"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Palette, Settings, Download, ExternalLink, Info, List, AlertTriangle } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { ResourcePackCard } from "@/components/resource-pack-card" // Importamos el componente ResourcePackCard
import { GameButton } from "@/components/ui/button"
import { useTheme } from "next-themes"

/**
 * Interfaz para resource packs
 */
interface ResourcePack {
  id: string
  name: string
  description: string
  image_url: string
  logo_url?: string
  special_note?: string
  files: ResourceFile[]
}

/**
 * Interfaz para archivos de resource packs
 */
interface ResourceFile {
  id: string
  name: string
}

/**
 * Interfaz para shaders
 */
interface Shader {
  name: string
  version: string
  description: string
  file_url?: string
  link?: string
}

// Datos estáticos para resource packs
const staticResourcePacks: ResourcePack[] = [
  {
    id: "1",
    name: "Whimscape",
    description: "Un pack de texturas que mejora la estética del juego manteniendo el estilo vanilla",
    image_url: "/images/texturas/whim.png",
    logo_url: "/images/texturas/whimlogo.png",
    special_note: "Compatible con la mayoría de mods",
    files: [{ id: "file1", name: "Whimscape-1.0.zip" }],
  },
  {
    id: "2",
    name: "Fresh Animations",
    description: "Añade animaciones fluidas y realistas a todos los mobs del juego",
    image_url: "/images/texturas/fresh.png",
    logo_url: "/images/texturas/freshlogo.png",
    special_note: "Requiere Optifine o Entity Model Features",
    files: [{ id: "file2", name: "Fresh-Animations-1.2.zip" }],
  },
  {
    id: "3",
    name: "Enhanced Boss Bars",
    description: "Nuevas barras de jefes mejoradas!",
    image_url: "/images/texturas/bossbar.png",
    logo_url: "/images/texturas/bossbarlogo.png",
    special_note: "Compatible con la mayoría de mods",
    files: [{ id: "file1", name: "ejemplo.zip" }],
  },
  {
    id: "4",
    name: "Shrimp's Immersive Interfaces",
    description:
      "Una renovación gráfica completa de la interfaz gráfica de usuario de Minecraft, aporta variedad y encanto a las cajas anteriormente grises",
    image_url: "/images/texturas/interface.png",
    logo_url: "/images/texturas/interfacelogo.png",
    special_note: "Compatible con la mayoría de mods",
    files: [{ id: "file1", name: "ejemplo.zip" }],
  },
]

// Datos estáticos para shaders
const staticShaders: Shader[] = [
  {
    name: "MakeUp - Ultra Fast",
    version: "v1.0",
    description: "Shaders livianos y rápidos, ideales para PCs de bajos recursos.",
    link: "https://modrinth.com/shader/makeup-ultra-fast-shaders/gallery",
  },
  {
    name: "Complementary Shaders - Reimagined",
    version: "v1.0",
    description: "Un rework visual con iluminación realista y excelente compatibilidad.",
    link: "https://modrinth.com/shader/complementary-reimagined/versions",
  },
  {
    name: "Complementary Shaders - Unbound",
    version: "v1.0",
    description: "Calidad cinematográfica con sombras suaves y efectos avanzados.",
    link: "https://modrinth.com/shader/complementary-unbound/versions",
  },
  {
    name: "Photon Shaders",
    version: "v1.0",
    description: "Inspirado en el trazado de rayos, con reflejos intensos y luces dinámicas.",
    link: "https://modrinth.com/shader/photon-shader/gallery",
  },
  {
    name: "Super Duper Vanilla",
    version: "v1.0",
    description: "Mantiene el estilo vanilla con mejoras sutiles de iluminación y agua.",
    link: "https://modrinth.com/shader/super-duper-vanilla/gallery",
  },
  {
    name: "Hysteria Shaders",
    version: "v1.0",
    description: "Colores vibrantes y un toque surrealista para experiencias únicas.",
    link: "https://modrinth.com/shader/hysteria-shaders/gallery",
  },
  {
    name: "RedHat Shaders",
    version: "v1.0",
    description: "Ideal para aventuras oscuras, con contrastes profundos y niebla densa.",
    link: "https://modrinth.com/shader/redhat-shaders/gallery",
  },
  {
    name: "Soft Voxels Lite",
    version: "v1.0",
    description: "Iluminación suave y elegante, estilo voxel con rendimiento optimizado.",
    link: "https://modrinth.com/shader/soft-voxels-lite/gallery",
  },
]

// Orden recomendado de resource packs
const resourcePackOrder = [
  { name: "Fresh Animations", description: "Animaciones mejoradas para mobs" },
  { name: "Enhanced Boss Bars", description: "Barras de jefes mejoradas" },
  { name: "Shrimp's Immersive Interfaces", description: "Mejoras de interfaz" },
  { name: "Whimscape", description: "Pack de texturas principal" },
]

/**
 * Página de resource packs
 */
export default function ResourcePacksPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [resourcePacks, setResourcePacks] = useState<ResourcePack[]>([])
  const [shaders, setShaders] = useState<Shader[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar resource packs estáticos
  useEffect(() => {
    setMounted(true)

    // Simular carga de datos
    const timer = setTimeout(() => {
      setResourcePacks(staticResourcePacks)
      setShaders(staticShaders)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Determinamos el color del texto según el tema
  const titleTextColor = mounted ? (theme === "dark" ? "text-white" : "text-black") : "text-primary"

  return (
    <div className="space-y-12 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionHeader
          title="Apariencia"
          subtitle="Estos resource packs están recomendados para mejorar tu experiencia visual en nuestro servidor."
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Mostrar placeholders mientras carga
          [...Array(3)].map((_, index) => (
            <GameCard key={index} className="h-80 animate-pulse">
              <div className="h-48 bg-secondary/30 rounded-md mb-4"></div>
              <div className="h-4 bg-secondary/30 rounded-md w-3/4 mb-2"></div>
              <div className="h-3 bg-secondary/30 rounded-md w-full mb-4"></div>
              <div className="h-10 bg-secondary/30 rounded-md w-full"></div>
            </GameCard>
          ))
        ) : resourcePacks.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No hay resource packs disponibles actualmente.</p>
          </div>
        ) : (
          // Renderizar los resource packs usando el componente ResourcePackCard
          resourcePacks.map((pack, index) => (
            <ResourcePackCard
              key={pack.id}
              id={pack.id}
              name={pack.name}
              description={pack.description}
              image_url={pack.image_url}
              logo_url={pack.logo_url}
              special_note={pack.special_note}
              available={pack.files && pack.files.length > 0}
              index={index}
            />
          ))
        )}
      </div>

      {!isLoading && resourcePacks.length > 0 && (
        <div className="flex justify-center mt-6">
          <a
            href="https://drive.google.com/uc?export=download&id=1kAgamex2FVbgV1ZQjKsfEwvxS3zbL-g8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <GameButton variant="accent" size="lg" icon={<Download className="h-5 w-5" />}>
              Descargar Todos los Resource Packs
            </GameButton>
          </a>
        </div>
      )}

      {/* Nueva sección: Orden de Resource Packs */}
      <ScrollReveal direction="up">
        <SectionHeader
          title="Orden Correcto de Resource Packs"
          subtitle="Para obtener la mejor experiencia visual, coloca los resource packs en este orden específico (de arriba hacia abajo)."
        />

        <GameCard className="border-glow">
          <div className="flex items-center gap-2 mb-6">
            <List className="h-5 w-5 text-accent" />
            <h3 className="font-minecraft text-xl text-accent">Orden Recomendado</h3>
          </div>

          <div className="resource-pack-order">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-accent" />
              <p className="text-sm font-medium">
                El orden es importante: los packs en la parte superior tienen prioridad sobre los que están debajo.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {resourcePackOrder.map((pack, index) => (
                <div key={index} className="resource-pack-item">
                  <div className="resource-pack-number">{index + 1}</div>
                  <div>
                    <h4 className="font-minecraft text-base">{pack.name}</h4>
                    <p className="text-xs text-muted-foreground">{pack.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-background/50 rounded-md border border-border/50">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="mb-2">
                    <span className="font-medium">Consejo:</span> Para cambiar el orden de los resource packs en
                    Minecraft:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                    <li>Ve a Opciones → Resource Packs</li>
                    <li>Arrastra los packs activados hacia arriba o abajo para cambiar su prioridad</li>
                    <li>Los packs en la parte superior tienen prioridad sobre los que están debajo</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen de ejemplo del orden correcto */}
          <div className="mt-6">
            <h4 className="font-minecraft text-lg text-accent mb-3">Ejemplo Visual</h4>
            <div className="relative w-full h-64 md:h-80 bg-background/30 rounded-md overflow-hidden border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Imagen de ejemplo del orden correcto de resource packs</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Captura de pantalla del menú de Resource Packs con el orden correcto
            </p>
          </div>
        </GameCard>
      </ScrollReveal>

      <ScrollReveal direction="up">
        <SectionHeader title="Shaders" subtitle="Mejora la iluminación y efectos visuales de tu juego" />

        <GameCard className="border-glow">
          <h3 className={`font-minecraft text-xl text-accent mb-6`}>Shaders Recomendados</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isLoading ? (
              // Mostrar placeholders mientras carga
              [...Array(3)].map((_, index) => (
                <div key={index} className="p-4 flex justify-between items-center">
                  <div>
                    <div className="h-5 bg-secondary/30 rounded-md w-32 mb-2"></div>
                    <div className="h-3 bg-secondary/30 rounded-md w-48"></div>
                  </div>
                  <div className="h-8 bg-secondary/30 rounded-md w-24"></div>
                </div>
              ))
            ) : shaders.length === 0 ? (
              <div className="col-span-full p-4 text-center">
                <p className="text-muted-foreground">No hay shaders disponibles actualmente.</p>
              </div>
            ) : (
              shaders.map((shader, index) => (
                <GameCard key={index} className="flex flex-col h-full">
                  <div className="flex-grow">
                    <h4 className={`font-minecraft text-lg font-semibold ${titleTextColor} title-hover mb-2`}>
                      {shader.name}
                    </h4>
                    <p className="text-sm text-shader font-medium leading-snug mb-4">{shader.description}</p>
                    <div className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded inline-block mb-4">
                      {shader.version}
                    </div>
                  </div>
                  <a href={shader.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
                    <GameButton variant="outline" fullWidth icon={<ExternalLink className="h-4 w-4" />}>
                      Ver en Modrinth
                    </GameButton>
                  </a>
                </GameCard>
              ))
            )}
          </div>
        </GameCard>
      </ScrollReveal>

      <ScrollReveal direction="up">
        <GameCard borderGlow>
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-accent" />
            <h3 className="font-minecraft text-xl text-accent">Cómo Instalar Resource Packs</h3>
          </div>

          <ol className="space-y-4 text-muted-foreground">
            <motion.li
              className="flex gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="font-minecraft text-accent">1.</span>
              <span>Descarga el resource pack que prefieras.</span>
            </motion.li>
            <motion.li
              className="flex gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <span className="font-minecraft text-accent">2.</span>
              <span>
                Coloca el archivo .zip en la carpeta{" "}
                <code className="bg-background/70 px-2 py-1 rounded">.minecraft/resourcepacks</code>.
              </span>
            </motion.li>
            <motion.li
              className="flex gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <span className="font-minecraft text-accent">3.</span>
              <span>Inicia Minecraft, ve a Opciones → Resource Packs y activa el pack descargado.</span>
            </motion.li>
            <motion.li
              className="flex gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <span className="font-minecraft text-accent">4.</span>
              <span>¡Disfruta de tu experiencia visual mejorada en nuestro servidor!</span>
            </motion.li>
          </ol>

          <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-md">
            <div className="flex items-start gap-2">
              <Palette className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm">
                <span className="font-medium">Consejo:</span> Algunos resource packs pueden requerir más recursos de tu
                computadora. Si experimentas problemas de rendimiento, prueba con un pack de menor resolución o
                desactívalo.
              </p>
            </div>
          </div>
        </GameCard>
      </ScrollReveal>
    </div>
  )
}
