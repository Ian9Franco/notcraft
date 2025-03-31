"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SectionHeader } from "@/components/ui/section-header"
import { GameButton } from "@/components/ui/game-button"
import { GameCard } from "@/components/ui/game-card"
import ScrollReveal from "@/components/scroll-reveal"
import { Download, Palette, Settings } from "lucide-react"

// Resource packs data
const resourcePacks = [
  {
    name: "Faithful 32x",
    description: "Una versión mejorada de las texturas vanilla con resolución 32x32.",
    imageSrc: "/placeholder.svg?height=200&width=400",
    downloadUrl: "#",
  },
  {
    name: "Stay True",
    description: "Mantiene el estilo vanilla mientras mejora los detalles y la atmósfera.",
    imageSrc: "/placeholder.svg?height=200&width=400",
    downloadUrl: "#",
  },
  {
    name: "Jicklus",
    description: "Texturas con estilo cartoon que mantienen la esencia de Minecraft.",
    imageSrc: "/placeholder.svg?height=200&width=400",
    downloadUrl: "#",
  },
  {
    name: "Compliance 32x",
    description: "Texturas fieles al estilo vanilla pero con mayor resolución y detalles.",
    imageSrc: "/placeholder.svg?height=200&width=400",
    downloadUrl: "#",
  },
]

export default function ResourcePacksPage() {
  return (
    <div className="space-y-12 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionHeader
          title="Resource Packs"
          subtitle="Estos resource packs están recomendados para mejorar tu experiencia visual en nuestro servidor."
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resourcePacks.map((pack, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <GameCard className="p-0 overflow-hidden h-full" hoverEffect>
              <div className="relative h-48">
                <Image
                  src={pack.imageSrc || "/placeholder.svg"}
                  alt={pack.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-minecraft text-xl text-accent mb-2">{pack.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pack.description}</p>
                <a href={pack.downloadUrl} target="_blank" rel="noopener noreferrer">
                  <GameButton variant="outline" fullWidth icon={<Download className="h-5 w-5" />}>
                    Descargar
                  </GameButton>
                </a>
              </div>
            </GameCard>
          </ScrollReveal>
        ))}
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

