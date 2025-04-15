"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Download, Info } from "lucide-react"
import { GameButton } from "@/components/ui/button"
import { GameCard } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ResourcePackCardProps {
  id: string
  name: string
  description: string
  image_url: string
  logo_url?: string
  special_note?: string
  available: boolean
  index: number
}

export function ResourcePackCard({
  id,
  name,
  description,
  image_url,
  logo_url,
  special_note,
  available,
  index,
}: ResourcePackCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <GameCard className="h-full overflow-hidden">
        <div className="relative h-48 rounded-md overflow-hidden mb-4">
          <Image
            src={image_url || "/placeholder.svg?height=400&width=600"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />

          {/* Logo cuadrado con contorno */}
          {logo_url && (
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-md overflow-hidden border-2 border-accent shadow-lg">
              <Image
                src={logo_url || "/placeholder.svg?height=100&width=100"}
                alt={`${name} logo`}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Título con espacio para el logo */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-minecraft text-xl text-accent pl-0">{name}</h3>

          {special_note && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{special_note}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="mt-auto">
          <GameButton
            variant={available ? "primary" : "outline"}
            size="sm"
            className="w-full"
            disabled={!available}
            icon={<Download className="h-4 w-4" />}
          >
            {available ? "Descargar Resource Pack" : "No Disponible"}
          </GameButton>
        </div>
      </GameCard>
    </motion.div>
  )
}
