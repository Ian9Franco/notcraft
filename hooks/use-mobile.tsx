"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Set initial value
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [breakpoint])

  return isMobile
}
