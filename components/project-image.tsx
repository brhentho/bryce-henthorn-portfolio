"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

/**
 * Clean image frame matching the industrial theme.
 * Thin border, subtle radius, no heavy shadow.
 * Replace src with real product screenshots when available.
 */
export function ProjectImage({ src, alt, className, priority = false }: ProjectImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-surface",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        priority={priority}
      />
    </div>
  )
}
