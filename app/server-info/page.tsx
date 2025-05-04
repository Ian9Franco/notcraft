"use client"

import { motion } from "framer-motion"
import { Server, Calendar } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/interactive"
import { CopyButton } from "@/components/ui/form-elements"
import DiscordWidget from "@/components/widgets/discord-widget"
import { ExternalLink } from "lucide-react";  // Asegúrate de que esta importación esté presente


/**
 * Datos de temporadas
 */
const seasons = [
  {
    number: 1,
    title: "Primera Ruptura",
    date: "Mayo 2025 - Presente",
    description:
    "Los primeros en llegar pensaron que era solo otro mundo por conquistar. Construyeron máquinas, exploraron los cielos y perforaron las profundidades___ hasta que algo respondió. Las cuevas comenzaron a susurrar, los bosques a observar, y los portales a abrirse por sí solos. Criaturas prehistóricas despertaron, dioses olvidados reclamaron sus dominios, y dimensiones enteras comenzaron a colapsar sobre la realidad. Hoy, los sobrevivientes vagan entre mundos rotos, enfrentan horrores que escapan a la razón, y confían en engranajes y hechizos para mantenerse con vida. Aquí, cada paso puede ser el último… y cada amanecer, un milagro.",
   playerCount: 3,
  },
  {
    number: 2,
    title: "Próximamente",
    date: "Por determinar",
    description: "Detalles de la próxima temporada serán revelados pronto. ¡Mantente atento!",
    playerCount: 0,
  },
]

/**
 * Página de información del servidor
 */
export default function ServerInfoPage() {
  return (
    <div className="space-y-12 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionHeader
          title="Información del Servidor"
          subtitle="Todo lo que necesitas saber para conectarte y jugar en nuestro servidor."
          accent
        />
      </motion.div>

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <GameCard hoverEffect borderGlow>
            <h3 className="font-title text-xl text-accent mb-4">IP del Servidor</h3>
            <div className="bg-background p-3 rounded-md font-minecraft text-center flex items-center justify-between">
              <span></span>
              <CopyButton text="play.netherious.com" />
            </div>
          </GameCard>

          <GameCard hoverEffect>
            <h3 className="font-minecraft text-xl text-accent mb-4">Versión</h3>
            <div className="text-center">
              <span className="block text-lg font-bold">Minecraft 1.20.1</span>
              <span className="text-sm text-muted-foreground">Requiere el modpack oficial</span>
            </div>
          </GameCard>

          <GameCard hoverEffect>
            <h3 className="font-minecraft text-xl text-accent mb-4">Estado</h3>
            <div className="flex items-center justify-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 pulse"></div>
              <span>Online - 1/10 jugadores</span>
              <span className="text-sm text-muted-foreground">Si la idea gusta, pasaremos a servidor dedicado (24/7)</span>
            </div>
          </GameCard>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="md:col-span-2">
          <ScrollReveal direction="left">
            <GameCard borderGlow>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-accent" />
                <h3 className="font-minecraft text-xl text-accent">Mantenimiento Programado</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">3 de Mayo, 2025</p>
              <p className="text-muted-foreground">
                El servidor estará en mantenimiento el 21 de mayo de 10:00 a 14:00 (GMT-3) para realizar
                actualizaciones importantes. Durante este período, el servidor no estará disponible.
              </p>
            </GameCard>
          </ScrollReveal>
        </div>

        <div className="md:col-span-1">
          <ScrollReveal direction="right">
            <DiscordWidget serverId="1234567890" />
          </ScrollReveal>
        </div>
      </div>

      {/* Botón de descarga */}
      <a 
          href="https://drive.google.com/uc?export=download&id=1Alur-e5wsAEdE8h1hbwxyhqC_492Crhl" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full max-w-[600px] mx-auto px-4"
        >
          <GameButton 
            variant="outline" 
            size="sm" 
            icon={<ExternalLink className="h-4 w-4" />}
            className="w-full"
          >
            Descargar archivo Options para tener los packs de recursos organizados y las teclas configuradas (la mayoría).
          </GameButton>
        </a>


      {/* Instrucciones de instalación con separación */}
      <GameCard hoverEffect className="mt-8">
        <h3 className="font-minecraft text-xl text-accent mb-4">Instrucciones de instalación</h3>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            El archivo debe colocarse en la carpeta <strong>.minecraft</strong> de tu computadora. 
            Asegúrate de reemplazar el archivo existente para que se apliquen los cambios correctamente.
          </p>
        </div>
      </GameCard>

      <ScrollReveal direction="up">
        <SectionHeader
          title="Temporadas de Netherious"
          subtitle="Nuestro servidor está dividido en temporadas, cada una con su propia historia y temática."
        />

        <Tabs defaultValue="season1" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 mb-6">
            {seasons.map((season) => (
              <TabsTrigger
                key={season.number}
                value={`season${season.number}`}
                className="minecraft-style"
                disabled={season.playerCount === 0}
              >
                Temporada {season.number}
              </TabsTrigger>
            ))}
          </TabsList>

          {seasons.map((season) => (
            <TabsContent key={season.number} value={`season${season.number}`}>
              <GameCard borderGlow={season.playerCount > 0}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-minecraft text-2xl text-accent">
                      Temporada {season.number}: {season.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {season.date} • {season.playerCount} jugadores
                    </p>
                  </div>

                  {season.playerCount > 0 && (
                    <GameButton variant="accent" icon={<Server className="h-5 w-5" />}>
                      Unirse a Temporada {season.number}
                    </GameButton>
                  )}
                </div>

                <p className="text-muted-foreground">{season.description}</p>
              </GameCard>
            </TabsContent>
          ))}
        </Tabs>
      </ScrollReveal>
    </div>
  );
}