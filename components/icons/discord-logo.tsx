"use client"

import type { SVGProps } from "react"

interface DiscordLogoProps extends SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

export function DiscordLogo({ size = 24, className = "", ...props }: DiscordLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      <path d="M15 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      <path d="M8.5 17c0 1-1.356 1-1.5 1-2.485 0-4.5-2.239-4.5-5 0-2.761 2.015-5 4.5-5 .144 0 1.5 0 1.5 1" />
      <path d="M15.5 17c0 1 1.356 1 1.5 1 2.485 0 4.5-2.239 4.5-5 0-2.761-2.015-5-4.5-5-.144 0-1.5 0-1.5 1" />
      <path d="M7 16.5c3.333 1 6.667 1 10 0" />
    </svg>
  )
}
