import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { UserProvider } from "@/context/user-context"
import SidebarNavigation from "@/components/sidebar-navigation"
import MobileNavigation from "@/components/mobile-navigation"
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Netherious - Minecraft Server & Modpack",
  description: "Custom Minecraft server and modpack website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Asegurarse de que children sea un elemento válido
  const validChildren = children || null

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <UserProvider>
            <TooltipProvider>
              <div className="flex min-h-screen">
                <SidebarNavigation />
                <div className="flex-1 flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1 container mx-auto p-4 md:p-6 pb-20 md:pb-6">{validChildren}</main>
                  <Footer />
                  <MobileNavigation />
                </div>
              </div>
            </TooltipProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

