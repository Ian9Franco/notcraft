"use client"

import { motion } from "framer-motion"

/**
 * Componente que muestra el logo animado simple
 */
export default function AnimatedLogo() {
  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rotate-45"
    >
      <motion.rect
        x="10"
        width="20"
        height="40"
        fill="currentColor"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          type: "spring",
          stiffness: 100,
        }}
      />
      <motion.rect
        y="10"
        width="40"
        height="20"
        fill="currentColor"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
        }}
      />
    </motion.svg>
  )
}

