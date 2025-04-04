"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GameCard } from "../ui/card"
import { Loader2 } from "lucide-react"

/**
 * Interfaz para un miembro de Discord
 */
interface DiscordMember {
  id: string
  username: string
  avatar_url: string
  status: string
  game?: {
    name: string
  }
}

/**
 * Interfaz para los datos del widget de Discord
 */
interface DiscordWidgetData {
  id: string
  name: string
  instant_invite: string
  presence_count: number
  members: DiscordMember[]
}

/**
 * Props para el widget de Discord
 */
interface DiscordWidgetProps {
  serverId?: string
  className?: string
}

/**
 * Componente que muestra información de un servidor de Discord
 */
export default function DiscordWidget({ serverId = "1234567890", className = "" }: DiscordWidgetProps) {
  const [widgetData, setWidgetData] = useState<DiscordWidgetData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`)

        if (!response.ok) {
          throw new Error("No se pudo cargar el widget de Discord")
        }

        const data = await response.json()
        setWidgetData(data)
      } catch (err) {
        console.error("Error fetching Discord widget:", err)
        setError("No se pudo cargar la información de Discord")
      } finally {
        setLoading(false)
      }
    }

    fetchDiscordData()
  }, [serverId])

  /**
   * Función para obtener el color según el estado del usuario
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <GameCard className={`min-h-[200px] flex items-center justify-center ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </GameCard>
    )
  }

  if (error || !widgetData) {
    return (
      <GameCard className={`min-h-[200px] flex items-center justify-center ${className}`}>
        <p className="text-muted-foreground">{error || "No se pudo cargar la información de Discord"}</p>
      </GameCard>
    )
  }

  return (
    <GameCard className={`p-0 overflow-hidden ${className}`}>
      <div className="bg-[#36393f] text-white">
        <div className="p-4 bg-[#2f3136] flex items-center justify-between">
          <h3 className="font-minecraft text-lg">{widgetData.name}</h3>
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {widgetData.presence_count} online
          </span>
        </div>

        <div className="p-4">
          {widgetData.members.length > 0 ? (
            <div className="space-y-3">
              {widgetData.members.map((member) => (
                <motion.div
                  key={member.id}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <img
                      src={member.avatar_url || "/placeholder.svg"}
                      alt={member.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#36393f] ${getStatusColor(member.status)}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{member.username}</p>
                    {member.game && <p className="text-xs text-gray-400">Jugando a {member.game.name}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No hay miembros en línea</p>
          )}
        </div>

        <div className="p-4 bg-[#2f3136] flex justify-center">
          <a
            href={widgetData.instant_invite}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Unirse al servidor
          </a>
        </div>
      </div>
    </GameCard>
  )
}

