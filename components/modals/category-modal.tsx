"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { X, Star, Hexagon, Circle } from "lucide-react"
// No necesitamos GameButton para el botón de cerrar redundante

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category: {
    title: string
    description: string
    icon: React.ReactNode
    gradient: string
    borderColor: string
    glowColor: string
    accentColor: string
    slug: string
  } | null
}

// Descripciones completas desde el JSON
const categoryDescriptions: Record<string, string> = {
  servidor:
    "Esta categoría mejora y embellece el mundo principal donde juegan todos. Mods como Nullscape y William Wythers' Overhauled Overworld redefinen la generación de biomas y paisajes, añadiendo montañas, costas y zonas más variadas. Better Lush Caves enriquece las cuevas frondosas, Clear Drop Items optimiza la limpieza de objetos, mientras Thief y Smarter Farmers ajustan la IA de aldeanos y mobs para comportamientos más realistas y dinámicos.",
  estructuras:
    "Añaden y renuevan estructuras emblemáticas del juego base y suman construcciones nuevas en todos los biomas y dimensiones. Mods como YUNG's Better Mineshafts, Better Nether Fortress y Better Strongholds mejoran minas, fortalezas del Nether y bastiones del End, mientras Dungeons Arise, Seven Seas y Structory expanden ruinas, barcos, templos y fortalezas para explorar. También se incluyen estructuras adicionales específicas para el End y el Nether, fomentando la exploración y el saqueo.",
  visual:
    "Los mods visuales, como Item Interaction, Eating Animation y Visuality, añaden animaciones más suaves, partículas detalladas, auroras, oleaje realista y mejoras ambientales como lluvia estética o explosiones más vistosas. Todo enfocado en embellecer la experiencia sin alterar la jugabilidad base.",
  utilidad:
    "Incluye herramientas de calidad de vida como AppleSkin, Jade y InventorySorter, que muestran información nutricional, detalles contextuales de bloques y permiten organizar inventarios más rápido. Otros como DragableList o BetterToolTips mejoran menús y notificaciones para facilitar la gestión diaria de objetos y recursos.",
  rendimiento:
    "Mods como Sodium, Iris, Lithium y Ferrite Core optimizan el motor de juego, mejoran la carga de chunks, gestionan texturas y entidades, y reducen el consumo de recursos. Complementos como Clumps y No See No Tick reducen lag visual y de simulación, garantizando un rendimiento más estable, incluso con muchos mods activos.",
  mapa: "Se combina Antique Atlas, que ofrece un mapa dibujado a mano con estilo de diario de exploración, con Xaero's Minimap, un minimapa moderno y detallado. Juntos brindan navegación práctica y un registro visual del terreno descubierto.",
  audio:
    "Esta categoría mejora la inmersión sonora del juego con mods como Ambient Sounds, Dynamic Surroundings o Immersive Thunder. Se añaden efectos de lluvia, truenos realistas, gotas, botones más satisfactorios y paisajes sonoros ambientales que hacen que cada bioma y clima tengan su propia identidad acústica.",
  create:
    "Create es el corazón de la automatización avanzada del servidor. Con su última versión y múltiples addons —como Create Dreams and Desires, Create The Factory Must Grow, Create Design and Decor, Create Enchantment Industry y más— se pueden diseñar sistemas mecánicos, fábricas, granjas integradas, redes logísticas, decoraciones industriales y compatibilidades con otras mecánicas como Cold Sweat y Oritech.",
  decoracion:
    "Supplementaries, Shutter, Refurbished Furniture y Chimneys ofrecen bloques decorativos, muebles funcionales y detalles arquitectónicos que permiten construir interiores y exteriores más realistas y detallados. Esta categoría apunta a quienes disfrutan de diseñar construcciones estéticas y ambientes personalizados.",
  mecanicas:
    "Mods como Cold Sweat, Oritech, Security Craft, Better Combat Stellaris, Tree Chop, Snow Real Magic, Mythic Metals, Wraith Waystones, Boids y Birdboids agregan sistemas nuevos y ajustes a la jugabilidad: desde temperaturas corporales y sistemas de seguridad, hasta minería avanzada, metales únicos, puntos de viaje rápido y ecosistemas más vivos con peces y aves realistas. Todos estos elementos amplían la profundidad técnica y la interacción con el entorno.",
  "vanilla-plus":
    "Esta categoría mejora y expande funciones básicas del juego sin romper la esencia original. Incluye utilidades como ranuras de basura, bancos de trabajo visuales, almacenamiento de XP en botellas, mecánicas de encantamientos simplificadas, accesorios, mejoras a mobs vanilla como los Phantoms y pequeños ajustes de calidad de vida. Todo pensado para que la experiencia base sea más práctica, fluida y cómoda.",
  mundo:
    "Mods como Serene Seasons, Spelunker's Charm y Underground Worlds transforman la generación de mundo, añadiendo estaciones dinámicas, detalles climáticos y nuevas capas subterráneas. Esto hace que la exploración y la recolección de recursos dependan de ciclos estacionales y de biomas más ricos y variados.",
  "herramientas-equipamiento":
    "Amplía tu arsenal y tus medios de transporte con herramientas y utilidades especializadas. Mods como Craftman's Bows, Immersive Aircraft o Traveler's Backpack suman arcos, mochilas, armas de pólvora, maquinaria, aeronaves y equipo temático para aventureros. En conjunto, permiten explorar, combatir y organizar recursos con más opciones y estilo.",
  mobs: "Esta selección añade criaturas misteriosas, legendarias o inspiradas en mitología. Mods como Mobs of Mythology y Weeping Angels introducen mobs con mecánicas especiales, comportamientos únicos y habilidades sobrenaturales. Estos enemigos u entes enriquecen cuevas, ruinas y biomas específicos, aportando atmósfera y sorpresas al explorar.",
  enemigos:
    "Los enemigos se vuelven más variados y peligrosos. Mods como Creeper Overhaul y Enderman Overhaul renuevan mobs clásicos con variantes biológicas y estéticas, mientras que otros como Illager's Invasion suman asaltos, armaduras y tácticas mejoradas para los Illagers. Además, la noche y ciertas estructuras traerán oleadas de muertos vivientes y criaturas de alto nivel, elevando la dificultad del juego.",
  animales:
    "Esta categoría suma variedad de fauna y compañeros, desde mascotas adorables y roedores pequeños hasta criaturas exóticas o fantásticas. Mods como Adorable o Hamster Pets permiten domesticar y criar nuevos animales, mientras otros como Critters and Companions o Choco Mobs aportan animales silvestres, golems y mobs únicos. Algunos incluyen armaduras, mejoras o comportamientos nuevos, haciendo que el mundo se sienta más vivo y diverso.",
  jefes:
    "Con Bosses of Mass Destruction, Ender Cataclysm, Qliphoth Awakening y Mowzie's Mobs, se suman jefes desafiantes con mecánicas únicas, habilidades especiales y recompensas exclusivas. Estos mods están diseñados para jugadores que buscan combates épicos, botín raro y nuevas amenazas para explorar en distintos biomas y dimensiones.",
  comida:
    "ButcherCraft, ChefDelights, Farmer's Delight, MyNetherDelight y StorageDelight expanden el sistema de cultivo, cocina y almacenamiento de alimentos. Estos mods agregan nuevos ingredientes, herramientas de cocina, estaciones de trabajo, recetas y mejoras para organizar provisiones. En conjunto, convierten la producción de comida en una mecánica más profunda y variada.",
  dimensiones:
    "Los mods Deeper and Darker, Eternal Nether y End Phantasm amplían las dimensiones clásicas de Minecraft con nuevas zonas de exploración, biomas únicos, estructuras adicionales y mobs exclusivos. Permiten profundizar el Overworld con cuevas más peligrosas, renovar el Nether con regiones extendidas y transformar el End en un dominio más desafiante y variado.",
}

export default function CategoryModal({ isOpen, onClose, category }: CategoryModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!mounted || !category) return null

  const fullDescription = categoryDescriptions[category.slug] || category.description

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop mejorado - ahora cierra el modal */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="category-modal-content" // ✅ Clase corregida para coincidir con el CSS
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Efectos de fondo mejorados */}
              <div className={`category-modal-bg bg-gradient-to-br ${category.gradient}`}></div>
              <div className="category-modal-mesh"></div>
              <div className={`category-modal-border ${category.borderColor}`}></div>
              <div className="category-modal-glow"></div>

              {/* Glow adicional para más premium */}
              <div className="category-modal-premium-glow"></div>

              {/* Header mejorado */}
              <div className="category-modal-header">
                <div className="category-modal-header-content">
                  <div className="category-modal-icon-section">
                    <div className="category-modal-icon-bg"></div>
                    <div className={`category-modal-icon ${category.accentColor}`}>{category.icon}</div>
                    <div className="category-modal-icon-pulse"></div>
                    <div className="category-modal-icon-ring"></div>
                  </div>

                  <div className="category-modal-title-section">
                    <div className="category-modal-decorations">
                      <Hexagon className="category-modal-decoration-icon" />
                      <div className="category-modal-decoration-line"></div>
                      <Star className="category-modal-decoration-icon animate-pulse" />
                      <div className="category-modal-decoration-line"></div>
                      <Circle className="category-modal-decoration-icon" />
                    </div>
                    <h2 className={`category-modal-title ${category.accentColor}`}>{category.title}</h2>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className="category-modal-close"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Cerrar modal"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Content mejorado */}
              <div className="category-modal-body">
                {" "}
                {/* ✅ Usamos la clase body para el scroll */}
                <div className="category-modal-text-container">
                  <div className="category-modal-text-wrapper">
                    <p className="category-modal-text">{fullDescription}</p>
                  </div>
                </div>
              </div>

              {/* Footer - Eliminado el botón de cerrar redundante */}
              {/* <div className="category-modal-footer">
                <div className="category-modal-footer-content">
                  <GameButton variant="outline" onClick={onClose} className="category-modal-button">
                    <span>Cerrar</span>
                  </GameButton>
                </div>
              </div> */}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
