"use client"

import { createContext, useContext, useRef } from "react"
import type { ReactNode, RefObject } from "react"

interface VideoContextProps {
  videoRef: RefObject<HTMLVideoElement>
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined)

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <VideoContext.Provider value={{ videoRef }}>
      {children}
    </VideoContext.Provider>
  )
}

export const useVideo = () => {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error("useVideo debe usarse dentro de un VideoProvider")
  }
  return context
}
