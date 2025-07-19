"use client"

import * as React from "react"
import { Check, Copy } from 'lucide-react'
import { cn } from "@/lib/utils"

/**
 * Props para el componente Input
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

/**
 * Componente de entrada de texto mejorado con soporte para iconos
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-10",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = "Input"

/**
 * Props para el componente Textarea
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Componente de área de texto mejorado
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

/**
 * Props para el componente CopyButton
 */
export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  successDuration?: number
  variant?: "icon" | "button"
  successMessage?: string
}

/**
 * Componente de botón para copiar texto mejorado
 */
export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ text, className = "", successDuration = 2000, variant = "icon", successMessage = "Copiado", ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), successDuration)
    }

    if (variant === "icon") {
      return (
        <button
          ref={ref}
          className={cn(
            "h-8 w-8 p-0 rounded-md flex items-center justify-center transition-colors hover:bg-accent/20",
            className,
          )}
          onClick={handleCopy}
          aria-label={copied ? successMessage : "Copiar al portapapeles"}
          {...props}
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-background border border-input hover:bg-accent/20",
          className,
        )}
        onClick={handleCopy}
        {...props}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        <span>{copied ? successMessage : "Copiar"}</span>
      </button>
    )
  },
)
CopyButton.displayName = "CopyButton"