import Image from "next/image"
import { Download, Palette } from "lucide-react"
import { GameButton } from "@/components/ui/button"
import { GameCard } from "@/components/ui/card"
import { ScrollReveal } from "@/components/animations"

interface ResourcePackProps {
  id: string
  name: string
  description: string
  image_url: string
  logo_url?: string
  special_note?: string
  available?: boolean
  index: number
}

export function ResourcePackCard({
  name,
  description,
  image_url,
  logo_url,
  special_note,
  available = true,
  index,
}: ResourcePackProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <GameCard className="p-0 overflow-hidden h-full" hoverEffect borderGlow>
        {/* Banner con logo superpuesto */}
        <div className="relative h-48">
          {/* Banner de fondo */}
          <Image
            src={image_url || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Logo superpuesto (si existe) */}
          {logo_url && (
            <div className="absolute left-4 bottom-4 z-10">
              <div className="relative w-16 h-16 transform transition-transform hover:scale-110">
                {/* Sombra para efecto 3D */}
                <div
                  className="absolute -right-2 -bottom-2 w-16 h-16 bg-black/30 rounded-md blur-sm z-0"
                  style={{ transform: "perspective(500px) rotateX(10deg) rotateY(-10deg)" }}
                ></div>

                {/* Logo con efecto de elevación */}
                <div
                  className="relative z-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-md p-1 border border-white/20"
                  style={{ transform: "perspective(500px) rotateX(-5deg) rotateY(5deg)" }}
                >
                  <Image
                    src={logo_url || "/placeholder.svg"}
                    alt={`${name} logo`}
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-minecraft text-xl text-accent mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>

          {/* Nota especial si existe */}
          {special_note && (
            <div className="bg-accent/10 border border-accent/30 rounded-md p-2 mb-4 text-xs">
              <p className="flex items-start gap-2">
                <Palette className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>{special_note}</span>
              </p>
            </div>
          )}

          {/* Botón de descarga */}
          <GameButton
            variant={available ? "accent" : "outline"}
            fullWidth
            disabled={!available}
            icon={<Download className="h-4 w-4" />}
          >
            {available ? "Descargar Pack" : "Próximamente"}
          </GameButton>
        </div>
      </GameCard>
    </ScrollReveal>
  )
}
