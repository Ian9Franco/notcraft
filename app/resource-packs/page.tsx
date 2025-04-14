"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Palette, Settings } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { ResourcePackCard } from "@/components/resource-pack-card" // Importamos el componente ResourcePackCard

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
          [...Array(2)].map((_, index) => (
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
