import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarNavigation, MobileNavigation } from "@/components/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import BackgroundVideo from "@/components/layout/BackgroundVideo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Netherious - Minecraft Server & Modpack",
  description: "Servidor de Minecraft personalizado con modpack y comunidad activa",
  keywords: "minecraft, server, modpack, forge, fabric, neoforged, gaming",
  authors: [{ name: "Netherious Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
  icons: {
    icon: "/netherious.ico",
    apple: "/netherious.ico",
  },
}

/**
 * Layout principal de la aplicación
 *
 * Estructura la aplicación con:
 * - Barra lateral para navegación en desktop
 * - Encabezado con controles de tema y audio
 * - Contenido principal
 * - Pie de página
 * - Navegación móvil
 * - Video de fondo
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Asegurarse de que children sea un elemento válido
  const validChildren = children || null

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/netherious.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            {/* Background video, detrás de todo */}
            <BackgroundVideo audioEnabled={true} blurAmount={8} />

            <div className="flex min-h-screen relative z-10">
              <SidebarNavigation />
              <div className="flex-1 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 container mx-auto p-4 md:p-6 pb-20 md:pb-6">{validChildren}</main>
                <Footer />
                <MobileNavigation />
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
