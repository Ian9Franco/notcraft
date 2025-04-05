"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Heart } from "lucide-react"
import { DiscordLogo } from "../icons/discord-logo"

/**
 * Componente de pie de página
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

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

  // Enlaces del pie de página
  const footerLinks = [
    { href: "/", label: "Inicio" },
    { href: "/modpack", label: "Modpack" },
    { href: "/resource-packs", label: "Resource Packs" },
    { href: "/server-info", label: "Información del Servidor" },
    { href: "/gallery", label: "Galería" },
  ]

  return (
    <footer className="relative bg-card pt-8 pb-20 md:pb-6 border-t border-border">
      {/* Partículas de fondo - Eliminamos el overflow-hidden para evitar el punto en la esquina */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            initial={{
              x: `${Math.random() * 80 + 10}%`, // Evitar completamente las esquinas
              y: `${Math.random() * 80 + 10}%`, // Evitar completamente las esquinas
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [null, `${Math.random() * 80 + 10}%`], // Evitar completamente las esquinas
              opacity: [null, Math.random() * 0.3 + 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Información del sitio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="font-title text-lg mb-4 text-accent border-b border-accent/30 pb-2 inline-block">
              Netherious
            </h3>
            <p className="text-sm text-foreground font-body font-light">
              Un servidor personalizado de Minecraft con mods increíbles para una experiencia única.
            </p>
            <div className="mt-4 flex space-x-4">
              <motion.a
                href="https://discord.gg/VgHGz5RJ"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-title text-lg mb-4 text-accent border-b border-accent/30 pb-2 inline-block">Enlaces</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li key={index} variants={linkVariants} initial="initial" whileHover="hover">
                  <Link
                    href={link.href}
                    className="text-sm text-foreground hover:text-accent transition-colors font-body flex items-center"
                  >
                    <span className="w-1 h-1 bg-accent/50 rounded-full mr-2"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 3: Comunidad */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
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
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <DiscordLogo className="mr-2 h-4 w-4" />
              Unirse al Discord
            </motion.a>
          </motion.div>
        </div>

        {/* Pie de página */}
        <motion.div
          className="mt-8 pt-6 border-t border-border/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-foreground font-body">
            &copy; {currentYear} Netherious. Todos los derechos reservados.
          </p>
          <p className="text-xs text-foreground/70 mt-1 font-body font-light">
            Minecraft es una marca registrada de Mojang Studios. Este sitio no está afiliado con Mojang.
          </p>
          <p className="text-xs text-foreground mt-3 font-body flex items-center justify-center">
            Creado con <Heart className="h-3 w-3 mx-1 text-red-500" /> por{" "}
            <a
              href="https://ian9franco.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1 font-semibold"
            >
              Notorious
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

