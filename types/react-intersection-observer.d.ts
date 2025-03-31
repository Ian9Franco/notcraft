import type React from "react"
declare module "react-intersection-observer" {
  export function useInView(options?: {
    triggerOnce?: boolean
    threshold?: number
    rootMargin?: string
    root?: Element | null
  }): [React.RefObject<any>, boolean, IntersectionObserverEntry | undefined]
}

