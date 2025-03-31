"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { GameButton } from "@/components/ui/game-button"
import { GameCard } from "@/components/ui/game-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/client-tabs"
import ClientCopyButton from "@/components/client-copy-button"
import ScrollReveal from "@/components/scroll-reveal"
import DiscordWidget from "@/components/discord-widget"
import { Server, Calendar } from "lucide-react"

// Seasons data
const seasons = [
  {
    number: 1,
    title: "El Comienzo",
    date: "Enero 2025 - Presente",
    description:
      "En un futuro distante, la búsqueda de tecnología avanzada por parte de la humanidad desencadena un evento catastrófico que condena al planeta, obligándolos a escapar. Su nave espacial, dañada por escombros durante la huida, se desvía y aterriza forzosamente en un planeta desconocido, dejándolos para sobrevivir y reconstruir la civilización que perdieron.",
    playerCount: 15,
  },
  {
    number: 2,
    title: "Próximamente",
    date: "Por determinar",
    description: "Detalles de la próxima temporada serán revelados pronto. ¡Mantente atento!",
    playerCount: 0,
  },
]

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
              <span>play.netherious.com</span>
              <ClientCopyButton text="play.netherious.com" />
            </div>
          </GameCard>

          <GameCard hoverEffect>
            <h3 className="font-minecraft text-xl text-accent mb-4">Versión</h3>
            <div className="text-center">
              <span className="block text-lg font-bold">Minecraft 1.20.4</span>
              <span className="text-sm text-muted-foreground">Requiere el modpack oficial</span>
            </div>
          </GameCard>

          <GameCard hoverEffect>
            <h3 className="font-minecraft text-xl text-accent mb-4">Estado</h3>
            <div className="flex items-center justify-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 pulse"></div>
              <span>Online - 8/20 jugadores</span>
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
              <p className="text-sm text-muted-foreground mb-2">28 de Marzo, 2025</p>
              <p className="text-muted-foreground">
                El servidor estará en mantenimiento el 30 de Marzo de 10:00 a 14:00 (GMT-3) para realizar
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
  )
}

