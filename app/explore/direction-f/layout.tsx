import "../round-two.css"
import "../round-three.css"
import "./f.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="xr x3 xf">{children}</div>
}
