"use client"

import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/client-tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ClientCopyButton from "@/components/client-copy-button"

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
      <section className="fade-in-section">
        <SectionHeader
          title="Información del Servidor"
          subtitle="Todo lo que necesitas saber para conectarte y jugar en nuestro servidor."
          accent
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-secondary/70 border-border hover-effect glass-effect">
            <CardHeader>
              <CardTitle className="font-title text-xl text-accent">IP del Servidor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-background p-3 rounded-md font-minecraft text-center flex items-center justify-between">
                <span>play.netherious.com</span>
                <ClientCopyButton text="play.netherious.com" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/70 border-border hover-effect glass-effect">
            <CardHeader>
              <CardTitle className="font-minecraft text-xl text-accent">Versión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                <span className="block text-lg font-bold">Minecraft 1.20.4</span>
                <span className="text-sm text-muted-foreground">Requiere el modpack oficial</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/70 border-border hover-effect glass-effect">
            <CardHeader>
              <CardTitle className="font-minecraft text-xl text-accent">Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 pulse"></div>
                <span>Online - 8/20 jugadores</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="fade-in-section">
        <SectionHeader title="Anuncios" />

        <Card className="bg-secondary/70 border-border max-w-4xl mx-auto hover-effect glass-effect">
          <CardHeader>
            <CardTitle className="font-minecraft text-xl text-accent">Mantenimiento Programado</CardTitle>
            <CardDescription>28 de Marzo, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              El servidor estará en mantenimiento el 30 de Marzo de 10:00 a 14:00 (GMT-3) para realizar actualizaciones
              importantes. Durante este período, el servidor no estará disponible.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="fade-in-section">
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
            <TabsContent key={season.number} value={`season${season.number}`} className="fade-in">
              <Card className="bg-secondary/70 border-border hover-effect glass-effect">
                <CardHeader>
                  <CardTitle className="font-minecraft text-2xl text-accent">
                    Temporada {season.number}: {season.title}
                  </CardTitle>
                  <CardDescription>
                    {season.date} • {season.playerCount} jugadores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{season.description}</p>
                  {season.playerCount > 0 && (
                    <Button className="font-minecraft button-glow">Unirse a Temporada {season.number}</Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  )
}

