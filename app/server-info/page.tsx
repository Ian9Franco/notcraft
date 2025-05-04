"use client"

import { motion } from "framer-motion"
import { useState } from "react";
import { Server, Calendar, AlertTriangle, Info, Download, Users, Clock } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/interactive"
import { CopyButton } from "@/components/ui/form-elements"
import DiscordWidget from "@/components/widgets/discord-widget"




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
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="space-y-12 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionHeader
          title="Información del Servidor"
          subtitle="Todo lo que necesitas saber para conectarte y jugar en nuestro servidor."
          accent
        />
      </motion.div>

      {/* Aviso de servidor no dedicado */}
      <ScrollReveal>
        <GameCard className="border-2 border-accent/30 bg-accent/5 max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-accent shrink-0 mt-1" />
            <div>
              <h3 className="font-minecraft text-xl text-accent mb-2">Servidor No Dedicado</h3>
              <p className="text-muted-foreground mb-3">
                Actualmente, el servidor se ejecuta de forma local (LAN) y genera una nueva IP cada vez que se inicia.
                Para jugar, debes solicitar que se abra el servidor.
              </p>
              <div className="flex flex-wrap gap-3">
                <GameButton variant="outline" size="sm" icon={<Users className="h-4 w-4" />}>
                  Solicitar Acceso
                </GameButton>
                <GameButton variant="ghost" size="sm" icon={<Info className="h-4 w-4" />}>
                  Más Información
                </GameButton>
              </div>
            </div>
          </div>
        </GameCard>
      </ScrollReveal>

      {/* Información del servidor - Rediseñada */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <GameCard hoverEffect borderGlow className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Server className="h-5 w-5 text-accent" />
                <h3 className="font-title text-xl text-accent">IP del Servidor</h3>
              </div>
              <div className="bg-background/50 p-3 rounded-md font-minecraft text-center flex items-center justify-between mb-4">
                <span>play.netherious.com</span>
                <CopyButton text="play.netherious.com" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              La IP puede cambiar. Consulta Discord para obtener la IP actual.
            </p>
          </GameCard>

          <GameCard hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Download className="h-5 w-5 text-accent" />
                <h3 className="font-minecraft text-xl text-accent">Versión</h3>
              </div>
              <div className="text-center mb-4">
                <span className="block text-lg font-bold">Minecraft 1.20.1</span>
                <span className="text-sm text-muted-foreground">Requiere el modpack oficial</span>
              </div>
            </div>
            <GameButton variant="outline" size="sm" icon={<Download className="h-4 w-4" />} className="w-full">
              Descargar Modpack
            </GameButton>
          </GameCard>

          <GameCard hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-accent" />
                <h3 className="font-minecraft text-xl text-accent">Estado</h3>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                <span>Online - 1/10 jugadores</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Si la idea gusta, pasaremos a servidor dedicado (24/7)
            </p>
          </GameCard>
        </div>
      </ScrollReveal>

      {/* Sección de mantenimiento y Discord */}
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
                El servidor estará en mantenimiento el 21 de mayo de 10:00 a 14:00 (GMT-3) para realizar actualizaciones
                importantes. Durante este período, el servidor no estará disponible.
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

      {/* Sección de recursos y configuración */}
        <ScrollReveal>
              <GameCard className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Download className="h-5 w-5 text-accent" />
                  <h3 className="font-minecraft text-xl text-accent">Recursos y Configuración</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-background/50 p-4 rounded-md border border-border/50">
                    <h4 className="font-minecraft text-lg mb-3">Archivo de Opciones</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Descarga este archivo para tener los packs de recursos organizados y las teclas configuradas
                      correctamente.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="https://drive.google.com/uc?export=download&id=1Alur-e5wsAEdE8h1hbwxyhqC_492Crhl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <GameButton
                          variant="outline"
                          size="sm"
                          icon={<Download className="h-4 w-4" />}
                          className="w-full"
                        >
                          Descargar Options
                        </GameButton>
                      </a>
                      <GameButton
                        variant="ghost"
                        size="sm"
                        icon={<Info className="h-4 w-4" />}
                        className="flex-1"
                        onClick={() => setShowInstructions(prev => !prev)}
                      >
                        {showInstructions ? "Ocultar Instrucciones" : "Ver Instrucciones"}
                      </GameButton>
                    </div>
                  </div>

                  {showInstructions && (
                    <div className="bg-background/50 p-4 rounded-md border border-border/50">
                      <h4 className="font-minecraft text-lg mb-3">Instrucciones de Instalación</h4>
                      <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
                        <li>
                          Localiza la carpeta <code className="bg-background/70 px-1 rounded">.minecraft</code> en tu computadora
                        </li>
                        <li>Coloca el archivo descargado en esta carpeta</li>
                        <li>Reemplaza el archivo existente si se te solicita</li>
                        <li>Reinicia Minecraft para aplicar los cambios</li>
                      </ol>
                    </div>
                  )}
                </div>
              </GameCard>
            </ScrollReveal>

      {/* Temporadas */}
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

                <p className="text-muted-foreground whitespace-pre-line">{season.description}</p>
              </GameCard>
            </TabsContent>
          ))}
        </Tabs>
      </ScrollReveal>
    </div>
  )
}
