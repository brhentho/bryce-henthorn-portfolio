"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeroFigurePanelProps {
  src: string
  alt: string
  caption: string
  className?: string
  /** Background blur color - defaults to a subtle purple/blue */
  blurColor?: string
}

/**
 * A Dribbble-style hero figure with a large blurred background behind the image.
 * Creates a professional "floating" presentation effect.
 */
export function HeroFigurePanel({ 
  src, 
  alt, 
  caption, 
  className,
  blurColor = "rgba(45, 226, 210, 0.15)"
}: HeroFigurePanelProps) {
  return (
    <figure className={cn("mt-8 mb-4", className)}>
      <div className="relative">
        {/* Blurred background glow */}
        <div 
          className="absolute inset-0 scale-[1.15] blur-3xl opacity-60 rounded-3xl"
          style={{ 
            background: `radial-gradient(ellipse at center, ${blurColor} 0%, transparent 70%)`,
          }}
        />
        
        {/* Image container with subtle shadow */}
        <div className="relative rounded-[var(--radius-card)] overflow-hidden shadow-2xl shadow-black/30 border border-border/50">
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={900}
            className="w-full h-auto block"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
      </div>
      <figcaption className="mt-4 text-sm font-sans text-foreground-tertiary text-center">
        {caption}
      </figcaption>
    </figure>
  )
}
