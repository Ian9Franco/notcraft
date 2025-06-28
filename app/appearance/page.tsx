"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Palette, Settings, Download, ExternalLink, Info, List, AlertTriangle, Users } from "lucide-react"
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
    name: "GUI Revision",
    description:
      "Aportando un diseño fresco manteniendo la simplicidad de la GUI predeterminada",
    image_url: "/images/texturas/guirevision.png",
    logo_url: "/images/texturas/guirevisionlogo.png",
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
  { name: "Whimscape: Fresh Animations Patch", description: "Animaciones nuevas adaptadas a Whimscape" },
  { name: "Fresh Animations", description: "Criaturas que se mueven con más vida que nunca" },
  { name: "Whimscape: Leaves Patch", description: "Hojas reimaginadas, más densas y creíbles" },
  { name: "Whimscape: EMI Patch", description: "Compatibilidad visual con EMI" },
  { name: "Whimscape: Exploration Patch", description: "Mejoras visuales para entornos lejanos y estructuras" },
  { name: "Whimscape", description: "El alma visual del servidor" },
]

/**
 * Página de resource packs
 *
 * Esta página muestra:
 * - Resource packs recomendados para el servidor
 * - Shaders compatibles
 * - Instrucciones de instalación y orden correcto
 * - Enlaces de descarga
 */
export default function ResourcePacksPage() {
  // Estado y hooks
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [resourcePacks, setResourcePacks] = useState<ResourcePack[]>([])
  const [shaders, setShaders] = useState<Shader[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Efecto para cargar datos y marcar componente como montado
  useEffect(() => {
    setMounted(true)

    // Simular carga de datos (en producción, esto podría ser una llamada API)
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
    <div className="space-y-12 py-6 px-4 sm:px-6">
      {/* Encabezado de la página con animación */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionHeader
          title="Apariencia"
          subtitle="Estos resource packs están recomendados para mejorar tu experiencia visual en nuestro servidor."
          accent
        />
      </motion.div>

      {/* Aviso de compatibilidad - Mejorado para responsividad */}
      <ScrollReveal>
        <GameCard className="border-2 border-accent/30 bg-accent/5 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-accent shrink-0 mt-1" />
            <div>
              <h3 className="font-minecraft text-xl text-accent mb-2">Compatibilidad</h3>
              <p className="text-muted-foreground mb-3">
                Estos resource packs están optimizados para funcionar con nuestro modpack oficial. Para una mejor
                experiencia, asegúrate de tener instalado el modpack antes de aplicar estos packs.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/modpack" className="inline-flex">
                  <GameButton variant="outline" size="sm" icon={<Download className="h-4 w-4" />}>
                    Descargar Modpack
                  </GameButton>
                </a>
                <a href="https://discord.gg/NhpPc2C2" target="_blank" rel="noopener noreferrer">
                  <GameButton variant="ghost" size="sm" icon={<Users className="h-4 w-4" />}>
                    Soporte en Discord
                  </GameButton>
                </a>
              </div>
            </div>
          </div>
        </GameCard>
      </ScrollReveal>

      {/* Información de Resource Packs - Mejorado para pantallas pequeñas */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <GameCard hoverEffect borderGlow className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-5 w-5 text-accent" />
                <h3 className="font-title text-xl text-accent">Resource Packs</h3>
              </div>
              <div className="bg-background/50 p-3 rounded-md font-minecraft text-center mb-4">
                <span>{resourcePacks.length} core packs</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              20 Packs de recursos en total. Actualizados para Minecraft 1.20.1
            </p>
          </GameCard>

          <GameCard hoverEffect className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-accent" />
                <h3 className="font-minecraft text-xl text-accent">Shaders</h3>
              </div>
              <div className="text-center mb-4">
                <span className="block text-lg font-bold">{shaders.length} opciones recomendadas </span>
                <span className="text-sm text-muted-foreground">Para diferentes tipos de PC</span>
              </div>
            </div>
            <a href="#shaders" className="w-full">
              <GameButton
                variant="outline"
                size="sm"
                icon={<ExternalLink className="h-4 w-4" />}
                className="w-full button-with-particles"
              >
                Ver Shaders
                <span className="button-particle button-particle-1"></span>
                <span className="button-particle button-particle-2"></span>
                <span className="button-particle button-particle-3"></span>
                <span className="button-particle button-particle-4"></span>
              </GameButton>
            </a>
          </GameCard>

          <GameCard hoverEffect className="flex flex-col justify-between h-full sm:col-span-2 md:col-span-1">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Download className="h-5 w-5 text-accent" />
                <h3 className="font-minecraft text-xl text-accent">Descarga Todo</h3>
              </div>
              <div className="text-center mb-4">
                <span className="text-sm text-muted-foreground">
                  Descarga todos los resource packs en un solo archivo
                </span>
              </div>
            </div>
            <a
              href="https://drive.google.com/uc?export=download&id=1Evy3Lnka7Y_LNkkzvzewjtfEPZb0cQtJ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <GameButton variant="accent" size="sm" icon={<Download className="h-4 w-4" />} className="w-full">
                Descargar Todo
              </GameButton>
            </a>
          </GameCard>
        </div>
      </ScrollReveal>

      {/* Grid de Resource Packs - Mejorado para responsividad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoading ? (
          // Mostrar placeholders mientras carga - Adaptados para responsividad
          [...Array(3)].map((_, index) => (
            <GameCard key={index} className="h-auto sm:h-80 animate-pulse">
              <div className="h-36 sm:h-48 bg-secondary/30 rounded-md mb-4"></div>
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

      {/* Sección: Orden de Resource Packs - Mejorado para responsividad */}
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
            <div className="flex items-start sm:items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-1 sm:mt-0" />
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

          {/* Imagen de ejemplo del orden correcto - Mejorado para responsividad */}
          <div className="mt-6">
            <h4 className="font-minecraft text-lg text-accent mb-3">Ejemplo Visual</h4>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-background/30 rounded-md overflow-hidden border border-border">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/images/landscape/resource.png"
                    alt="Imagen de ejemplo 1 del orden correcto de resource packs"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Captura de pantalla del menú de Resource Packs con el orden correcto
            </p>
          </div>
        </GameCard>
      </ScrollReveal>

      {/* Sección de Shaders - Mejorado para responsividad */}
      <div id="shaders">
        <ScrollReveal direction="up">
          <SectionHeader title="Shaders" subtitle="Mejora la iluminación y efectos visuales de tu juego" />

          <GameCard className="border-glow">
            <h3 className={`font-minecraft text-xl text-accent mb-6`}>Shaders Recomendados</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                // Mostrar placeholders mientras carga - Adaptados para responsividad
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
      </div>

      {/* Instrucciones de instalación - Mejorado para responsividad */}
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
              <span className="font-minecraft text-accent shrink-0">1.</span>
              <span>Descarga el resource pack que prefieras.</span>
            </motion.li>
            <motion.li
              className="flex gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <span className="font-minecraft text-accent shrink-0">2.</span>
              <div>
                <span>Coloca el archivo .zip en la carpeta </span>
                <code className="bg-background/70 px-2 py-1 rounded break-words">.minecraft/resourcepacks</code>
              </div>
            </motion.li>
            <motion.li
              className="flex gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <span className="font-minecraft text-accent shrink-0">3.</span>
              <span>Inicia Minecraft, ve a Opciones → Resource Packs y activa el pack descargado.</span>
            </motion.li>
            <motion.li
              className="flex gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <span className="font-minecraft text-accent shrink-0">4.</span>
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

/**
 * Estilos CSS adicionales para la página
 *
 * Estos estilos deben agregarse a tu archivo globals.css o a un módulo CSS
 */
/*
.resource-pack-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: rgba(var(--background), 0.5);
  border: 1px solid rgba(var(--border), 0.2);
}

.resource-pack-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: rgba(var(--accent), 0.2);
  color: hsl(var(--accent));
  font-family: 'Minecraft', sans-serif;
  font-weight: bold;
}

.text-shader {
  color: hsl(var(--foreground));
  opacity: 0.8;
}

.title-hover:hover {
  color: hsl(var(--accent));
  transition: color 0.2s ease;
}

.button-with-particles {
  position: relative;
  overflow: hidden;
}

.button-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: hsl(var(--accent));
  opacity: 0;
  pointer-events: none;
}

.button-with-particles:hover .button-particle {
  animation: particle-float 2s infinite ease-in-out;
}

@keyframes particle-float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0;
  }
}

.button-particle-1 {
  bottom: 10%;
  left: 10%;
  animation-delay: 0s !important;
}

.button-particle-2 {
  bottom: 20%;
  left: 30%;
  animation-delay: 0.5s !important;
}

.button-particle-3 {
  bottom: 30%;
  left: 50%;
  animation-delay: 1s !important;
}

.button-particle-4 {
  bottom: 10%;
  left: 70%;
  animation-delay: 1.5s !important;
}
*/
