"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

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
        <div className="w-full h-full bg-background/50 rounded-md flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

