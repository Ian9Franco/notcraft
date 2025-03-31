"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { CuboidIcon as Cube } from "lucide-react"

// Dynamically import Three.js components with no SSR
const AnimatedCube = dynamic(() => import("./animated-cube"), { ssr: false })

export default function AnimatedLogo() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="w-full h-full min-h-[120px]" style={{ aspectRatio: "1/1" }}>
      {isMounted ? (
        <AnimatedCube />
      ) : (
        // Fallback for SSR
        <div className="w-full h-full flex items-center justify-center">
          <Cube className="text-accent" />
        </div>
      )}
    </div>
  )
}

