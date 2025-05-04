"use client"

import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/interactive"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

/**
 * Datos de las temporadas
 */
const SEASONS_DATA = [
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

/**
 * Componente principal de pestañas de temporadas
 */
function SeasonsTabsContent() {
  return (
    <Tabs defaultValue="season1" className="max-w-4xl mx-auto">
      <TabsList className="grid grid-cols-2 mb-6">
        {SEASONS_DATA.map((season) => (
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

      {SEASONS_DATA.map((season) => (
        <TabsContent key={season.number} value={`season${season.number}`} className="fade-in">
          <Card className="bg-secondary/70 border-border hover-effect">
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
  )
}

/**
 * Componente wrapper que carga perezosamente el componente de pestañas
 * para mejorar el rendimiento inicial de la página
 */
export default function SeasonsTabs() {
  return (
    <Suspense fallback={<div className="h-64 bg-secondary/30 rounded-md animate-pulse"></div>}>
      <SeasonsTabsContent />
    </Suspense>
  )
}

