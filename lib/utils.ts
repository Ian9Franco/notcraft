/**
 * Utilidades generales para la aplicación
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases CSS con soporte para Tailwind
 * Utiliza clsx para combinar clases condicionales y twMerge para resolver conflictos de Tailwind
 *
 * @param inputs - Clases CSS a combinar (strings, objetos, arrays)
 * @returns String de clases CSS combinadas y optimizadas
 *
 * @example
 * // Resultado: "text-red-500 p-4 bg-blue-500"
 * cn("text-red-500", { "p-4": true }, ["bg-blue-500"])
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea una fecha en formato legible
 *
 * @param date - Fecha a formatear
 * @param locale - Configuración regional (por defecto: 'es-ES')
 * @returns Fecha formateada como string
 */
export function formatDate(date: Date, locale = "es-ES"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

/**
 * Genera un ID único basado en timestamp y número aleatorio
 *
 * @returns String con ID único
 */
export function generateUniqueId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

