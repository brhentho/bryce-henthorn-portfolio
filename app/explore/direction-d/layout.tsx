import { Instrument_Serif } from "next/font/google"
import "../round-two.css"
import "./d.css"

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"], style: ["normal", "italic"], variable: "--font-cinema" })

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`xr xd ${serif.variable}`}>{children}</div>
}
