"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Server, Calendar, AlertTriangle, Info, Download, Users, Clock } from "lucide-react"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/interactive"
import { CopyButton } from "@/components/ui/form-elements"
import DiscordWidget from "@/components/widgets/discord-widget"

/**
 * Datos de temporadas del servidor
 * Contiene información sobre cada temporada, su estado y descripción
 */
const seasons = [
  {
    number: 1,
    title: "Primera Ruptura",
    date: "Julio 2025 - Presente",
    description:
      "No recordás en qué momento pasaste el umbral. El portal te tiró acá sin aviso, y la primera respiración te raspó los pulmones como polvo viejo. Todo está roto: las torres mecánicas susurran engranajes oxidados, los rieles de fábricas abandonadas se pierden en túneles sin fin. Hay puertas selladas que prometen mundos lejanos, pero ningún acceso es gratis. Cada dimensión guarda su llave detrás de criaturas que no saben morir. A lo lejos, golems patrullan ruinas de imperios que intentaron controlar lo que no entendían. De noche, enjambres de zombis salen de la tierra, y si no escuchás bien, hasta los aldeanos pueden traicionarte: algunos protegen lo poco que les queda con dientes y garras. Si una mascota muere, tal vez puedas traerla de vuelta… pero nada regresa igual. Los árboles te observan. Las cuevas respiran. El cielo se retuerce cuando parpadeás. Si querés moverte, necesitás máquinas, aeronaves y portales prestados por dioses que ya se aburrieron de esperar. Cada paso adelante desbloquea otro infierno: más profundo, más alto, más imposible.No hay guía. No hay mapa que muestre el camino. Tenés herramientas, recetas, planos y un skill tree que marca lo que podés llegar a ser, pero no quién vas a ser cuando cruces cada portal. Cada dimensión te exige algo a cambio: tu tiempo, tu sangre o tu cordura. El End ya no es un final. Es apenas un descanso antes de la siguiente puerta. Y cuando creas que terminaste, la tierra podrida va a recordarte que todavía respira. Y que todavía tiene hambre. No confíes en nada. No te detengas. No vuelvas atrás. Porque acá, incluso el amanecer puede ser una mentira.",
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
 *
 * Muestra detalles sobre el servidor de Minecraft:
 * - Estado actual y dirección IP
 * - Información sobre el host
 * - Recursos y configuración
 * - Temporadas disponibles
 */
export default function ServerInfoPage() {
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <div className="space-y-12 py-6 px-4 sm:px-6">
      {/* Encabezado con animación */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionHeader
          title="Información del Servidor"
          subtitle="Todo lo que necesitas saber para conectarte y jugar en nuestro servidor."
          accent
        />
      </motion.div>

      {/* Aviso de servidor ahora hosteado - Texto y funcionalidad actualizados */}
      <ScrollReveal>
        <GameCard className="border-2 border-accent/30 bg-accent/5 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-accent shrink-0 mt-1" />
            <div>
              <h3 className="font-minecraft text-xl text-accent mb-2">¡Servidor Hosteado!</h3>{" "}
              {/* Título actualizado */}
              <p className="text-muted-foreground mb-3">
                ¡Listo! El servidor funciona 24/7, solo entra y juega, sin andar bajando mods.
                 La IP es:{" "}
                <code className="bg-background/70 px-1 rounded">netherious.minehost.pro</code>. ¡Solo conéctate y juega!
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://discord.gg/NhpPc2C2" target="_blank" rel="noopener noreferrer">
                  <GameButton variant="outline" size="sm" icon={<Users className="h-4 w-4" />}>
                    Unirse a Discord
                  </GameButton>
                </a>
                {/* Se eliminó el botón de descarga de E4MC según la solicitud */}
              </div>
            </div>
          </div>
        </GameCard>
      </ScrollReveal>

      {/* Información del servidor - Mejorado para responsividad */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <GameCard hoverEffect borderGlow className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Server className="h-5 w-5 text-accent" />
                <h3 className="font-title text-xl text-accent">IP del Servidor</h3>
              </div>
              <div className="bg-background/50 p-3 rounded-md font-minecraft text-center flex items-center justify-between mb-4">
                <span className="break-all">netherious.minehost.pro</span> {/* IP actualizada */}
                <CopyButton text="netherious.minehost.pro" /> {/* IP actualizada para copiar */}
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Conéctate directamente a nuestro servidor hosteado.
            </p>
          </GameCard>

          <GameCard hoverEffect className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Download className="h-5 w-5 text-accent" />
                <h3 className="font-minecraft text-xl text-accent">Versión</h3>
              </div>
              <div className="text-center mb-4">
                <span className="block text-lg font-bold">Minecraft 1.21.1</span>
                <span className="text-sm text-muted-foreground">Requiere el modpack oficial</span>
              </div>
            </div>
            <a href="/modpack" className="w-full">
              <GameButton
                variant="outline"
                size="sm"
                icon={<Download className="h-4 w-4" />}
                className="w-full button-with-particles"
              >
                Descargar Modpack
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
                <Clock className="h-5 w-5 text-accent" />
                <h3 className="font-minecraft text-xl text-accent">Estado</h3>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">Servidor dedicado 24/7</p>
          </GameCard>
        </div>
      </ScrollReveal>

      {/* Sección de información del host y Discord - Mejorado para responsividad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
        <div className="md:col-span-2">
          <ScrollReveal direction="left">
            <GameCard borderGlow>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-accent" />
                <h3 className="font-minecraft text-xl text-accent">Info del Host</h3> {/* Título actualizado */}
              </div>
              <p className="text-sm text-muted-foreground mb-2">Día 1: 19 de Julio, 2025</p> {/* Fecha actualizada */}
              <p className="text-muted-foreground">
               Nuestro server tiene 5GB de RAM para que juegues sin tirones ni cortes.
                La temporada arranca el 19 de julio. 
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

      {/* Sección de recursos y configuración - Mejorado para responsividad */}
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
                  href="https://drive.google.com/drive/folders/11UOoL6yHUWNwIJzRXLcUT3CmhIt0xxm4?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <GameButton variant="outline" size="sm" icon={<Download className="h-4 w-4" />} className="w-full">
                    Descargar Options
                  </GameButton>
                </a>
                <GameButton
                  variant="ghost"
                  size="sm"
                  icon={<Info className="h-4 w-4" />}
                  className="flex-1"
                  onClick={() => setShowInstructions((prev) => !prev)}
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
                    Localiza la carpeta <code className="bg-background/70 px-1 rounded">.minecraft</code> en tu
                    computadora
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

      {/* Temporadas - Mejorado para responsividad */}
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
                    <h3 className="font-minecraft text-xl sm:text-2xl text-accent">
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

                <p className="text-muted-foreground whitespace-pre-line text-sm sm:text-base">{season.description}</p>
              </GameCard>
            </TabsContent>
          ))}
        </Tabs>
      </ScrollReveal>
    </div>
  )
}
