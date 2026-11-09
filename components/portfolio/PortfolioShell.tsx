"use client"

import type { ReactNode } from "react"
import { Environment } from "./Environment"
import { PortfolioHeader, PortfolioFooter } from "./Navigation"
import type { PortfolioPage } from "./types"

export function PortfolioShell({ page, children }: { page: PortfolioPage; children: ReactNode }) {
  return <Environment className={`fn-concept fn-synthesis pf-${page}`}>
    <a className="xp-skip" href="#main">Skip to content</a>
    <PortfolioHeader route={page === "agents" ? "/agents-in-windows" : page === "teams" ? "/teams-for-education" : `/${page}`} />
    {children}
    <PortfolioFooter />
  </Environment>
}
