import Image from "next/image"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  imageSrc: string
  className?: string
}

export function FeatureCard({ title, description, imageSrc, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group bg-secondary/80 border border-border rounded-md overflow-hidden transition-all duration-300",
        className,
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-title text-xl text-accent mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground font-body">{description}</p>
      </div>
    </div>
  )
}

