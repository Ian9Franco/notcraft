import Image from "next/image"

interface ModloaderIconProps {
  type: "forge" | "fabric" | "neoforge"
  size?: number
  className?: string
  animated?: boolean
}

const bgColors = {
  forge: "bg-orange-500/10 border-orange-500/30",
  fabric: "bg-blue-500/10 border-blue-500/30",
  neoforge: "bg-purple-500/10 border-purple-500/30",
}

export function ModloaderIcon({ type, size = 24, className }: ModloaderIconProps) {
  let src = ""
  let alt = ""

  switch (type) {
    case "forge":
      src = "/images/logos/forge-logo.png"
      alt = "Forge Logo"
      break
    case "fabric":
      src = "/images/logos/fabric-logo.png"
      alt = "Fabric Logo"
      break
    case "neoforge":
      src = "/images/logos/neoforge-logo.png"
      alt = "NeoForge Logo"
      break
    default:
      src = "/placeholder.svg" // Fallback en caso de tipo desconocido
      alt = "Unknown Modloader Logo"
  }

  return <Image src={src || "/placeholder.svg"} alt={alt} width={size} height={size} className={className} />
}
