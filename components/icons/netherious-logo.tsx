import type React from "react"

interface NetheriousLogoProps {
  showText?: boolean
  size?: number
  className?: string
}

export const NetheriousLogo: React.FC<NetheriousLogoProps> = ({ showText = false, size = 40, className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* SVG Logo */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* This is a placeholder Minecraft-style logo */}
        <rect x="2" y="2" width="8" height="8" fill="#8B5D33" />
        <rect x="14" y="2" width="8" height="8" fill="#8B5D33" />
        <rect x="2" y="14" width="20" height="8" fill="#8B5D33" />
        <rect x="4" y="4" width="4" height="4" fill="#3D8B37" />
        <rect x="16" y="4" width="4" height="4" fill="#3D8B37" />
        <rect x="4" y="16" width="16" height="4" fill="#3D8B37" />
      </svg>

      {/* Text part of the logo */}
      {showText && <span className="ml-2 font-title text-xl md:text-2xl text-accent">Netherious</span>}
    </div>
  )
}

