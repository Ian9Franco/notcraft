import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-raisin/80 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-minecraft text-forest mb-4">MC Server</h3>
            <p className="text-gray-400 text-sm">
              Un servidor de Minecraft con mods increíbles para una experiencia única.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-avant text-gray-200 mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/modpack" className="text-gray-400 hover:text-forest text-sm transition-colors">
                  Modpack
                </Link>
              </li>
              <li>
                <Link href="/server-info" className="text-gray-400 hover:text-forest text-sm transition-colors">
                  Información del Servidor
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-forest text-sm transition-colors">
                  Galería
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-avant text-gray-200 mb-4">Contacto</h4>
            <p className="text-gray-400 text-sm mb-2">Discord: mcserver</p>
            <p className="text-gray-400 text-sm">Email: info@mcserver.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MC Server. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Minecraft es una marca registrada de Mojang Studios. Este sitio no está afiliado con Mojang.
          </p>
        </div>
      </div>
    </footer>
  )
}

