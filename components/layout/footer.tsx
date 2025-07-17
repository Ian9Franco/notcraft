"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Heart, ExternalLink } from "lucide-react"
import { DiscordLogo } from "../icons/discord-logo"
import { NetheriousLogo } from "../icons/netherious-logo"
import { useTheme } from "next-themes"
import { FloatingElement } from "../animations"

/**
 * Componente de pie de página
 *
 * Características:
 * - Logo con efecto hover
 * - Enlaces a secciones principales
 * - Enlaces a redes sociales
 * - Información de copyright
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { resolvedTheme } = useTheme()

  // Animación para los enlaces
  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -3, transition: { duration: 0.2 } },
  }

  // Animación para los iconos
  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 15, scale: 1.2, transition: { duration: 0.3 } },
  }

  // Animación para las secciones
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  // Enlaces del pie de página
  const footerLinks = [
    { href: "/", label: "Inicio" },
    { href: "/modpack", label: "Modpack" },
    { href: "/appearance", label: "Apariencia" },
    { href: "/server-info", label: "Información del Servidor" },
    { href: "/gallery", label: "Galería" },
  ]

  return (
    <footer className="relative bg-card pt-8 pb-20 md:pb-6 border-t border-border">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Información del sitio */}
          <motion.div
            custom={0}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Link href="/" className="inline-block">
                <FloatingElement amplitude={5} duration={4}>
                  <NetheriousLogo size={80} location="footer" />
                </FloatingElement>
              </Link>
            </div>
            <p className="text-sm text-foreground font-body font-light">
              Un servidor personalizado de Minecraft con mods increíbles para una experiencia única.
            </p>
            <div className="mt-4 flex space-x-4">
              <motion.a
                href="https://discord.gg/KWMXbgvc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                aria-label="Discord"
              >
                <DiscordLogo size={20} />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Columna 2: Enlaces */}
          <motion.div
            custom={1}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="font-title text-lg mb-4 text-accent border-b border-accent/30 pb-2 inline-block">Enlaces</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li key={index} variants={linkVariants} initial="initial" whileHover="hover">
                  <Link
                    href={link.href}
                    className="text-sm text-foreground hover:text-accent transition-colors font-body flex items-center"
                  >
                    <motion.span
                      className="w-1 h-1 bg-accent/50 rounded-full mr-2"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 2, backgroundColor: "rgba(var(--accent), 0.8)" }}
                      transition={{ duration: 0.2 }}
                    ></motion.span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 3: Comunidad */}
          <motion.div
            custom={2}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="font-title text-lg mb-4 text-accent border-b border-accent/30 pb-2 inline-block">
              Comunidad
            </h3>
            <p className="text-sm text-foreground mb-2 font-body font-light">
              ¡Únete a nuestro Discord para estar al día!
            </p>
            <motion.a
              href="https://discord.gg/VgHGz5RJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-accent/20 hover:bg-accent/30 text-accent-foreground py-2 px-4 rounded-md inline-flex items-center transition-all duration-300 border border-accent/30"
              whileHover={{ scale: 1.03, boxShadow: "0 0 8px rgba(var(--accent), 0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              <DiscordLogo className="mr-2 h-4 w-4" />
              Unirse al Discord
              <motion.span
                className="ml-1"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                <ExternalLink size={12} />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* Pie de página */}
        <motion.div
          className="mt-8 pt-6 border-t border-border/30 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="text-sm text-foreground font-body">
            &copy; {currentYear} Netherious. Todos los derechos reservados.
          </p>
          <p className="text-xs text-foreground/70 mt-1 font-body font-light">
            Minecraft es una marca registrada de Mojang Studios. Este sitio no está afiliado con Mojang.
          </p>
          <p className="text-xs mt-3 font-body flex items-center justify-center">
            Creado con <Heart className="h-3 w-3 mx-1 text-red-500 animate-pulse" /> por{" "}
            <motion.a
              href="https://ian9franco.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 hover:underline ml-1 font-semibold bg-background/30 px-2 py-0.5 rounded"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(var(--accent), 0.2)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              Notorious
            </motion.a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
