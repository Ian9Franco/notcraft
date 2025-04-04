"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Download, ExternalLink, Check, HelpCircle, Package, Wrench, Cog, Zap, Server } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, InteractiveAccordion } from "@/components/ui/interactive"

/**
 * Datos de mods destacados - Marcado con ID para facilitar actualizaciones por temporada
 */
const FEATURED_MODS_ID = "featured-mods-season-1"
const featuredMods = [
  { name: "Create", version: "0.5.1", description: "Automatización y maquinaria" },
  { name: "Terralith", version: "2.3.0", description: "Generación de terreno mejorada" },
  { name: "Oh The Biomes You'll Go", version: "1.4.0", description: "Nuevos biomas" },
  { name: "Immersive Aircraft", version: "0.5.0", description: "Aeronaves para volar" },
  { name: "Blue Skies", version: "1.3.2", description: "Nuevas dimensiones" },
  { name: "Aether", version: "1.2.0", description: "Dimensión celestial" },
  { name: "Grim & Bleak", version: "0.8.5", description: "Mazmorras y estructuras" },
]

/**
 * Mods opcionales por categoría
 */
const optionalMods = {
  particles: [
    { name: "Enhanced Visuals", version: "1.2.0", description: "Efectos visuales mejorados" },
    { name: "Ambient Sounds", version: "5.0.3", description: "Sonidos ambientales" },
  ],
  animations: [
    { name: "Better Animations", version: "2.1.0", description: "Animaciones mejoradas" },
    { name: "First Person Model", version: "2.1.2", description: "Modelo en primera persona" },
  ],
  sounds: [
    { name: "Sound Physics", version: "1.0.4", description: "Física de sonido realista" },
    { name: "Music Loader", version: "0.3.1", description: "Música personalizada" },
  ],
  shaders: [
    { name: "Complementary", version: "4.7.1", description: "Shaders equilibrados" },
    { name: "BSL", version: "8.1.02", description: "Shaders populares" },
  ],
}

/**
 * Versiones del modpack - Marcado con ID para facilitar actualizaciones
 */
const MODPACK_VERSIONS_ID = "modpack-versions-season-1"
const modpackVersions = [
  { name: "Forge", version: "1.20.1", available: true, logo: "/images/logos/forge-logo.png" },
  { name: "Fabric", version: "1.20.1", available: false, logo: "/images/logos/fabric-logo.png" },
  { name: "NeoForge", version: "1.20.1", available: false, logo: "/images/logos/neoforge-logo.png" },
]

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
          {modpackVersions.map((version, index) => (
            <GameCard
              key={index}
              className={`${version.available ? "" : "opacity-60"}`}
              hoverEffect={version.available}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8">
                    <Image
                      src={version.logo || "/placeholder.svg?height=32&width=32"}
                      alt={version.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-minecraft text-lg text-accent">{version.name}</h3>
                </div>
                {version.available && <Check className="h-4 w-4 text-green-500" />}
              </div>
              <p className="text-xs text-muted-foreground mb-4">{version.version}</p>
              <a
                href={
                  version.available
                    ? `https://drive.google.com/uc?export=download&id=${version.name.toUpperCase()}_MODPACK_ID`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className={!version.available ? "pointer-events-none" : ""}
              >
                <GameButton
                  variant={version.available ? "accent" : "outline"}
                  size="sm"
                  fullWidth
                  disabled={!version.available}
                  icon={<Download className="h-4 w-4" />}
                >
                  Descargar
                </GameButton>
              </a>
            </GameCard>
          ))}
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
            <a
              href="https://drive.google.com/uc?export=download&id=FORGE_MODPACK_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <GameButton variant="accent" fullWidth icon={<Download className="h-5 w-5" />}>
                Descargar Modpack Completo
              </GameButton>
            </a>
            <a
              href="https://drive.google.com/drive/folders/MODPACK_FOLDER_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <GameButton variant="outline" fullWidth icon={<ExternalLink className="h-5 w-5" />}>
                Ver en Google Drive
              </GameButton>
            </a>
          </div>
        </GameCard>
      </ScrollReveal>

      <ScrollReveal direction="up">
        <SectionHeader title="Mods Incluidos" />

        <div className="max-w-4xl mx-auto">
          {/* Contenedor de Mods Destacados con ID para facilitar actualizaciones */}
          <div id={FEATURED_MODS_ID}>
            <h3 className="font-minecraft text-xl text-accent mb-4 flex items-center">
              <span className="inline-block w-3 h-3 bg-accent rounded-full mr-2 animate-pulse"></span>
              Mods Destacados
            </h3>
            <GameCard className="border-2 border-accent/30">
              <div className="grid grid-cols-1 divide-y divide-border">
                {featuredMods.map((mod, index) => (
                  <motion.div
                    key={index}
                    className="p-4 flex justify-between items-center hover:bg-secondary/80 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div>
                      <h4 className="font-minecraft text-lg text-primary">{mod.name}</h4>
                      <p className="text-sm text-muted-foreground">{mod.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                      v{mod.version}
                    </span>
                  </motion.div>
                ))}
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
                    <h3 className="font-minecraft text-lg text-primary">
                      Mods de{" "}
                      {category === "particles"
                        ? "Partículas"
                        : category === "animations"
                          ? "Animaciones"
                          : category === "sounds"
                            ? "Sonidos"
                            : "Shaders"}
                    </h3>
                    <a
                      href={`https://drive.google.com/drive/folders/${category.toUpperCase()}_FOLDER_ID`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GameButton variant="outline" size="sm" icon={<Download className="h-4 w-4" />}>
                        Descargar Todos
                      </GameButton>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 divide-y divide-border">
                    {mods.map((mod, index) => (
                      <motion.div
                        key={index}
                        className="p-4 flex justify-between items-center hover:bg-secondary/80 transition-all duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div>
                          <h4 className="font-minecraft text-lg text-primary">{mod.name}</h4>
                          <p className="text-sm text-muted-foreground">{mod.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                            v{mod.version}
                          </span>
                          <a
                            href={`https://drive.google.com/uc?export=download&id=${mod.name.replace(/\s+/g, "_").toUpperCase()}_ID`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GameButton variant="outline" size="sm" icon={<Download className="h-4 w-4" />}>
                              Descargar
                            </GameButton>
                          </a>
                        </div>
                      </motion.div>
                    ))}
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

