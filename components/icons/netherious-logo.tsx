import Image from "next/image"

interface NetheriousLogoProps {
  showText?: boolean
  className?: string
  size?: number
}

export function NetheriousLogo({ showText = false, className = "", size = 40 }: NetheriousLogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: showText ? "auto" : size, height: size }}>
      {showText ? (
        <Image src="/logos/netherious.png" alt="Netherious Logo" width={240} height={80} className="object-contain" />
      ) : (
        <div className="relative w-full h-full">
          <Image
            src="/logos/netherious.png"
            alt="Netherious Logo"
            width={size}
            height={size}
            className="object-contain"
            style={{ objectPosition: "0 50%" }}
          />
        </div>
      )}
    </div>
  )
}

