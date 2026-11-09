import "../round-two.css"
import "../round-three.css"
import "./d.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="xr x3 xd">{children}</div>
}
