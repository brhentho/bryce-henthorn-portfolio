import { FinalHome } from "../explore/final/FinalHome"
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio/home"

export function PortfolioHome() {
  return <FinalHome concept="synthesis" publicMode projects={PORTFOLIO_PROJECTS} />
}
