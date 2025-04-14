"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Palette, Settings } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameCard, SectionHeader } from "@/components/ui/card"



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

// Datos estáticos para resource packs
const staticResourcePacks: ResourcePack[] = [
  {
    id: "1",
    name: "Netherious HD",
    description: "Pack de texturas HD optimizado para nuestro servidor",
    image_url: "/placeholder.svg?height=400&width=600",
    logo_url: "/placeholder.svg?height=64&width=64",
    special_note: "Recomendado para equipos de gama media-alta",
    files: [{ id: "file1", name: "Netherious-HD-1.0.zip" }],
  },
  {
    id: "2",
    name: "Netherious Medieval",
    description: "Texturas medievales para construcciones épicas",
    image_url: "/placeholder.svg?height=400&width=600",
    logo_url: "/placeholder.svg?height=64&width=64",
    files: [{ id: "file2", name: "Netherious-Medieval-1.2.zip" }],
  },
  {
    id: "3",
    name: "Netherious Lite",
    description: "Versión ligera con texturas de 16x para mejor rendimiento",
    image_url: "/placeholder.svg?height=400&width=600",
    logo_url: "/placeholder.svg?height=64&width=64",
    special_note: "Perfecto para equipos de gama baja",
    files: [{ id: "file3", name: "Netherious-Lite-1.1.zip" }],
  },
  {
    id: "4",
    name: "Netherious Fantasy",
    description: "Texturas de fantasía con colores vibrantes",
    image_url: "/placeholder.svg?height=400&width=600",
    logo_url: "/placeholder.svg?height=64&width=64",
    files: [{ id: "file4", name: "Netherious-Fantasy-0.9.zip" }],
  },
]

/**
 * Página de resource packs
 */
export default function ResourcePacksPage() {
  const [resourcePacks, setResourcePacks] = useState<ResourcePack[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar resource packs estáticos
  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setResourcePacks(staticResourcePacks)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  /**
   * Componente para mostrar un resource pack con logo superpuesto
   */
  function ResourcePackCard({ pack, index }: { pack: ResourcePack; index: number }) {
    const isAvailable = pack.files && pack.files.length > 0

    return (
      <ScrollReveal key={index} delay={index * 0.1}>
        <GameCard className="p-0 overflow-hidden h-full" hoverEffect>
          {/* Banner con logo superpuesto */}
          <div className="relative h-48">
            {/* Banner de fondo */}
            <Image
              src={pack.image_url || "/placeholder.svg"}
              alt={pack.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Logo superpuesto (si existe) */}
            {pack.logo_url && (
              <div className="absolute left-4 bottom-4 z-10">
                <div className="relative w-16 h-16 transform transition-transform hover:scale-110">
                  {/* Sombra para efecto 3D */}
                  <div
                    className="absolute -right-2 -bottom-2 w-16 h-16 bg-black/30 rounded-md blur-sm z-0"
                    style={{ transform: "perspective(500px) rotateX(10deg) rotateY(-10deg)" }}
                  ></div>

                  {/* Logo con efecto de elevación */}
                  <div
                    className="relative z-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-md p-1 border border-white/20"
                    style={{ transform: "perspective(500px) rotateX(-5deg) rotateY(5deg)" }}
                  >
                    <Image
                      src={pack.logo_url || "/placeholder.svg"}
                      alt={`${pack.name} logo`}
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-minecraft text-xl text-accent mb-2">{pack.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{pack.description}</p>

            {/* Nota especial si existe */}
            {pack.special_note && (
              <div className="bg-accent/10 border border-accent/30 rounded-md p-2 mb-4 text-xs">
                <p className="flex items-start gap-2">
                  <Palette className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{pack.special_note}</span>
                </p>
              </div>
            )}

            {/* Botón de descarga */}


          </div>
        </GameCard>
      </ScrollReveal>
    )
  }

  return (
    <div className="space-y-12 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionHeader
          title="Resource Packs"
          subtitle="Estos resource packs están recomendados para mejorar tu experiencia visual en nuestro servidor."
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          // Mostrar placeholders mientras carga
          [...Array(4)].map((_, index) => (
            <GameCard key={index} className="h-80 animate-pulse">
              <div className="h-48 bg-secondary/30 rounded-md mb-4"></div>
              <div className="h-4 bg-secondary/30 rounded-md w-3/4 mb-2"></div>
              <div className="h-3 bg-secondary/30 rounded-md w-full mb-4"></div>
              <div className="h-10 bg-secondary/30 rounded-md w-full"></div>
            </GameCard>
          ))
        ) : resourcePacks.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <p className="text-muted-foreground">No hay resource packs disponibles actualmente.</p>
          </div>
        ) : (
          // Renderizar los resource packs
          resourcePacks.map((pack, index) => <ResourcePackCard key={pack.id} pack={pack} index={index} />)
        )}
      </div>

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
