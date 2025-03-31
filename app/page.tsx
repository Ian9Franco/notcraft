"use client"

import Image from "next/image"
import Link from "next/link"
import { SectionHeader } from "@/components/ui/section-header"
import { FeatureCard } from "@/components/ui/feature-card"
import { Button } from "@/components/ui/button"

// Featured mods data
const featuredMods = [
  {
    title: "Create",
    description: "Automatización estética con máquinas de procesamiento y trenes funcionales.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Terralith",
    description: "Terrenos hermosos con generación mejorada y muchos nuevos biomas.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Oh The Biomes We'll Go",
    description: "Añade una gran variedad de biomas nuevos y únicos al mundo de Minecraft.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Blue Skies",
    description: "Nuevas dimensiones con biomas, mazmorras y jefes únicos para explorar.",
    imageSrc: "/placeholder.svg?height=300&width=400",
  },
]

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="fade-in-section">
        <h1 className="minecraft-style text-4xl md:text-5xl lg:text-6xl text-accent text-center text-glow mb-4">
          Minecraft Server
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 text-center">
          Una experiencia de Minecraft con mods increíbles, terrenos épicos y comunidad amigable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          {/* Botones corregidos */}
          <Button size="lg" className="minecraft-style button-glow">
            <Link href="/modpack">Descargar Modpack</Link>
          </Button>
          <Button variant="outline" size="lg" className="minecraft-style hover-effect">
            <Link href="/server-info">Info del Servidor</Link>
          </Button>
        </div>
      </section>

      {/* Featured Mods Section */}
      <section className="fade-in-section">
        <SectionHeader
          title="Mods Destacados"
          subtitle="Nuestro servidor cuenta con una selección de los mejores mods para mejorar tu experiencia de juego."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMods.map((mod, index) => (
            <FeatureCard key={index} title={mod.title} description={mod.description} imageSrc={mod.imageSrc} />
          ))}
        </div>
      </section>

      {/* Server Promo Section */}
      <section className="bg-secondary/50 border border-border rounded-lg p-6 md:p-8 fade-in-section hover-effect glass-effect">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <SectionHeader
              title="Únete a Nuestra Comunidad"
              subtitle="Explora, construye y sobrevive en un mundo lleno de aventuras y posibilidades."
              accent
            />
            <p className="text-muted-foreground mb-6">
              Nuestro servidor ofrece una experiencia única con temporadas temáticas, mods cuidadosamente seleccionados
              y una comunidad amigable.
            </p>
            {/* Botón corregido */}
            <Button className="minecraft-style button-glow">
              <Link href="/server-info">Conectarse al Servidor</Link>
            </Button>
          </div>
          <div className="relative h-64 md:h-80 rounded-md overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Minecraft Server Landscape"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

