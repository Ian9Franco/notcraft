import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary pt-8 pb-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-title text-lg mb-4 text-accent">Netherious</h3>
            <p className="text-sm text-muted-foreground font-body font-light">
              Un servidor personalizado de Minecraft con mods increíbles para una experiencia única.
            </p>
          </div>

          <div>
            <h3 className="font-title text-lg mb-4 text-accent">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors font-body">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/modpack"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors font-body"
                >
                  Modpack
                </Link>
              </li>
              <li>
                <Link
                  href="/server-info"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors font-body"
                >
                  Información del Servidor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-title text-lg mb-4 text-accent">Contacto</h3>
            <p className="text-sm text-muted-foreground mb-2 font-body font-light">
              ¿Preguntas o sugerencias? ¡Contáctanos!
            </p>
            <a
              href="mailto:contacto@minecraftserver.com"
              className="text-sm text-primary hover:text-accent transition-colors font-body"
            >
              contacto@minecraftserver.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground font-body">
            &copy; {currentYear} Netherious. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1 font-body font-light">
            Minecraft es una marca registrada de Mojang Studios. Este sitio no está afiliado con Mojang.
          </p>
          <p className="text-xs text-muted-foreground mt-3 font-body">
            Creado por{" "}
            <a
              href="https://ian9franco.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Notorious
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

