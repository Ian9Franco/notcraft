"use client"

import Image from "next/image"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"

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
      <SectionHeader
        title="Resource Packs"
        subtitle="Estos resource packs están recomendados para mejorar tu experiencia visual en nuestro servidor."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-section">
        {resourcePacks.map((pack, index) => (
          <Card
            key={index}
            className="bg-secondary/70 overflow-hidden border-border hover:border-accent transition-colors duration-300 glass-effect hover-effect"
          >
            <div className="relative h-48">
              <Image
                src={pack.imageSrc || "/placeholder.svg"}
                alt={pack.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle className="font-minecraft text-xl text-accent">{pack.name}</CardTitle>
              <CardDescription>{pack.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full minecraft-style">
                <a
                  href={pack.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>Descargar</span>
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-secondary/50 border border-border rounded-lg fade-in-section glass-effect">
        <h3 className="font-minecraft text-xl text-primary mb-4">Cómo Instalar Resource Packs</h3>
        <ol className="space-y-4 text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-minecraft text-accent">1.</span>
            <span>Descarga el resource pack que prefieras.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-minecraft text-accent">2.</span>
            <span>
              Coloca el archivo .zip en la carpeta{" "}
              <code className="bg-background/70 px-2 py-1 rounded">.minecraft/resourcepacks</code>.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-minecraft text-accent">3.</span>
            <span>Inicia Minecraft, ve a Opciones → Resource Packs y activa el pack descargado.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-minecraft text-accent">4.</span>
            <span>¡Disfruta de tu experiencia visual mejorada en nuestro servidor!</span>
          </li>
        </ol>
      </div>
    </div>
  )
}

