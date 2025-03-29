"use client"

import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ExternalLink } from "lucide-react"

// Required mods data
const requiredMods = [
  { name: "Create", version: "0.5.1", description: "Automatización y maquinaria" },
  { name: "Terralith", version: "2.3.0", description: "Generación de terreno mejorada" },
  { name: "Oh The Biomes You'll Go", version: "1.4.0", description: "Nuevos biomas" },
  { name: "Immersive Aircraft", version: "0.5.0", description: "Aeronaves para volar" },
  { name: "Blue Skies", version: "1.3.2", description: "Nuevas dimensiones" },
  { name: "Aether", version: "1.2.0", description: "Dimensión celestial" },
  { name: "Grim & Bleak", version: "0.8.5", description: "Mazmorras y estructuras" },
]

// Optional mods by category
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

export default function ModpackPage() {
  return (
    <div className="space-y-12 py-6">
      <SectionHeader
        title="Modpack Oficial"
        subtitle="Descarga y juega con el mismo modpack que utilizamos en nuestro servidor."
        accent
      />

      <div className="max-w-3xl mx-auto">
        <Card className="bg-secondary/70 border-border">
          <CardHeader>
            <CardTitle className="minecraft-style text-2xl text-accent">Cómo Instalar</CardTitle>
            <CardDescription>Sigue estos pasos para instalar nuestro modpack</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-minecraft text-lg text-primary">1. Descarga CurseForge</h3>
              <p className="text-sm text-muted-foreground">
                CurseForge te permitirá instalar el modpack con un solo clic.
                <a
                  href="https://download.curseforge.com/"
                  className="text-primary hover:text-accent ml-2 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Descargar CurseForge
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-minecraft text-lg text-primary">2. Descarga el Modpack</h3>
              <p className="text-sm text-muted-foreground">
                Descarga el archivo ZIP del modpack completo desde nuestro Google Drive.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-minecraft text-lg text-primary">3. Instala el Modpack</h3>
              <p className="text-sm text-muted-foreground">
                Abre CurseForge, haz clic en &quot;Minecraft&quot; y luego en &quot;Crear Perfil Personalizado&quot;.
                Importa el archivo ZIP descargado.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-minecraft text-lg text-primary">4. ¡Juega!</h3>
              <p className="text-sm text-muted-foreground">
                Una vez instalado, inicia el juego desde CurseForge y conéctate a nuestro servidor.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            {/* Botones corregidos */}
            <Button size="lg" className="w-full minecraft-style button-glow">
              <a
                href="https://drive.google.com/uc?export=download&id=MODPACK_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                <span>Descargar Modpack Completo</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full minecraft-style">
              <a
                href="https://drive.google.com/drive/folders/MODPACK_FOLDER_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Ver en Google Drive</span>
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <SectionHeader title="Mods Incluidos" />

      <div className="max-w-4xl mx-auto">
        <h3 className="font-minecraft text-xl text-accent mb-4">Mods Requeridos</h3>
        <div className="grid gap-4 mb-8">
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 divide-y divide-border">
                {requiredMods.map((mod, index) => (
                  <div
                    key={index}
                    className="p-4 flex justify-between items-center hover:bg-secondary/80 transition-all duration-300"
                  >
                    <div>
                      <h4 className="font-minecraft text-lg text-primary">{mod.name}</h4>
                      <p className="text-sm text-muted-foreground">{mod.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                      v{mod.version}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

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
              <Card className="bg-secondary/50 border-border">
                <CardHeader>
                  <CardTitle className="font-minecraft text-lg text-primary">
                    Mods de{" "}
                    {category === "particles"
                      ? "Partículas"
                      : category === "animations"
                        ? "Animaciones"
                        : category === "sounds"
                          ? "Sonidos"
                          : "Shaders"}
                  </CardTitle>
                  <CardDescription>
                    {/* Botón corregido */}
                    <Button variant="outline" size="sm" className="minecraft-style">
                      <a
                        href={`https://drive.google.com/drive/folders/${category.toUpperCase()}_FOLDER_ID`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        <span>Descargar Todos</span>
                      </a>
                    </Button>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 divide-y divide-border">
                    {mods.map((mod, index) => (
                      <div
                        key={index}
                        className="p-4 flex justify-between items-center hover:bg-secondary/80 transition-all duration-300"
                      >
                        <div>
                          <h4 className="font-minecraft text-lg text-primary">{mod.name}</h4>
                          <p className="text-sm text-muted-foreground">{mod.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                            v{mod.version}
                          </span>
                          {/* Botón corregido */}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <a
                              href={`https://drive.google.com/uc?export=download&id=${mod.name.replace(/\s+/g, "_").toUpperCase()}_ID`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-full h-full"
                            >
                              <span className="sr-only">Descargar {mod.name}</span>
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

