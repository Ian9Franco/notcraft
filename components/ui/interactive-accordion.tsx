"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItem {
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
}

interface InteractiveAccordionProps {
  items: AccordionItem[]
  className?: string
}

export function InteractiveAccordion({ items, className = "" }: InteractiveAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => {
        const isActive = activeIndex === index

        return (
          <div key={index} className="rounded-md overflow-hidden">
            <motion.button
              className={cn(
                "w-full flex items-center justify-between p-4 text-left transition-colors",
                isActive ? "bg-accent/20 text-accent" : "bg-secondary/50 text-foreground hover:bg-secondary/80",
              )}
              onClick={() => setActiveIndex(isActive ? null : index)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                {item.icon && <span>{item.icon}</span>}
                <span className="font-minecraft text-sm">{item.title}</span>
              </div>
              <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-background/50 backdrop-blur-sm border-x border-b border-border">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

