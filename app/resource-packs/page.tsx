"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Palette, Settings } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameCard, SectionHeader } from "@/components/ui/card"
import DownloadButton from "@/components/resource-packs/download-button"

/**
 * Datos de resource packs
 * Para agregar nuevos packs, simplemente añade un nuevo objeto a este array
 * con los campos: name, description, imageSrc, logoSrc, files y specialNote (opcional)
 */
const resourcePacks = [
  {
    name: "Fresh Animations",
    description: "Añade animaciones fluidas y realistas a todos los mobs y entidades del juego.",
    imageSrc: "/images/fresh.png", // Banner
    logoSrc: "/images/freshlogo.png", // Logo
    files: [
      {
        id: "142AdH8Bm0JyV-8awTmyidOsi__UfIJlv",
        name: "Fresh Animations",
      },
    ],
    specialNote: "Requiere la descarga del pack de animaciones de los mods no esenciales.",
  },
  {
    name: "Whimscape Combo",
    description: "Un combo de texturas que mejora la experiencia visual manteniendo el estilo vanilla.",
    imageSrc: "/images/whim.png", // Banner
    logoSrc: "/images/whimlogo.png", // Logo
    files: [
      {
        id: "1EFpr2xuYh94EjSg8WjqGhFuAcWKhywD5",
        name: "Whimscape Combo",
      },
    ],
    specialNote: "Combo completo de texturas para una experiencia visual mejorada.",
  },
  {
    name: "Faithful 32x",
    description: "Una versión mejorada de las texturas vanilla con resolución 32x32.",
    imageSrc: "/placeholder.svg?height=200&width=400",
    files: [], // Pack no disponible aún
  },
  {
    name: "Stay True",
    description: "Mantiene el estilo vanilla mientras mejora los detalles y la atmósfera.",
    imageSrc: "/placeholder.svg?height=200&width=400",
    files: [], // Pack no disponible aún
  },
  // Ejemplo de pack con múltiples archivos
  // {
  //   name: "Ultimate Texture Pack",
  //   description: "Colección completa de texturas para una experiencia inmersiva.",
  //   imageSrc: "/placeholder.svg?height=200&width=400",
  //   logoSrc: "/placeholder.svg?height=64&width=64",
  //   files: [
  //     { id: "ID_ARCHIVO_1", name: "Base Textures" },
  //     { id: "ID_ARCHIVO_2", name: "HD Models" },
  //     { id: "ID_ARCHIVO_3", name: "Environment Pack" }
  //   ],
  //   specialNote: "Incluye 3 archivos que deben instalarse juntos."
  // }
]

/**
 * Componente para mostrar un resource pack con logo superpuesto
 * ESTILOS: El logo se posiciona en la esquina inferior izquierda con efecto 3D
 */
function ResourcePackCard({ pack, index }: { pack: (typeof resourcePacks)[0]; index: number }) {
  const isAvailable = pack.files && pack.files.length > 0

  return (
    <ScrollReveal key={index} delay={index * 0.1}>
      <GameCard className="p-0 overflow-hidden h-full" hoverEffect>
        {/* Banner con logo superpuesto */}
        <div className="relative h-48">
          {/* Banner de fondo */}
          <Image
            src={pack.imageSrc || "/placeholder.svg"}
            alt={pack.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Logo superpuesto (si existe) - Posicionado en esquina inferior izquierda con efecto 3D */}
          {pack.logoSrc && (
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
                    src={pack.logoSrc || "/placeholder.svg"}
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
          {pack.specialNote && (
            <div className="bg-accent/10 border border-accent/30 rounded-md p-2 mb-4 text-xs">
              <p className="flex items-start gap-2">
                <Palette className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>{pack.specialNote}</span>
              </p>
            </div>
          )}

          {/* Botón de descarga con nuevo componente */}
          {isAvailable ? (
            <DownloadButton files={pack.files} variant="outline" fullWidth />
          ) : (
            <DownloadButton
              files={{ id: "", name: "" }}
              variant="outline"
              fullWidth
              className="opacity-50 cursor-not-allowed"
              onComplete={() => {}}
            />
          )}
        </div>
      </GameCard>
    </ScrollReveal>
  )
}

/**
 * Página de resource packs
 */
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
        {/* Renderizamos los resource packs usando el componente ResourcePackCard */}
        {resourcePacks.map((pack, index) => (
          <ResourcePackCard key={index} pack={pack} index={index} />
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

