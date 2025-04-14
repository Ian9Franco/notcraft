import Image from "next/image"
import { cn } from "@/lib/utils"

interface ModloaderIconProps {
  type: "forge" | "fabric" | "neoforged"
  size?: number
  className?: string
}

export function ModloaderIcon({ type, size = 24, className }: ModloaderIconProps) {
  const logoPath = `/images/logos/${type}-logo.png`

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <Image
        src={logoPath || "/placeholder.svg"}
        alt={`${type} logo`}
        width={size}
        height={size}
        className="pixelated object-contain"
      />
    </div>
  )
}
