import { Inter_Tight } from "next/font/google"
import "../round-two.css"
import "../round-three.css"
import "./e.css"

const indexFont = Inter_Tight({ subsets: ["latin"], variable: "--font-index-variable" })

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`xr x3 xe ${indexFont.variable}`}>{children}</div>
}
