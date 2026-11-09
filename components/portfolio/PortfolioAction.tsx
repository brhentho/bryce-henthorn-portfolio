"use client"

import type { ComponentProps } from "react"
import { ShinyLink } from "../explore/final/ShinyLink"

export function PortfolioAction({ variant = "primary", className = "", ...props }: ComponentProps<typeof ShinyLink> & {
  variant?: "primary" | "quiet"
}) {
  return <ShinyLink {...props} publicMode className={`pf-action pf-action-${variant} ${className}`} />
}
