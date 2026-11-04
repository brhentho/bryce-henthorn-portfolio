import Link from "next/link"
import { FINALISTS, finalistHref } from "@/lib/explore/finalists"

export default function ExploreIndex() {
  return <main className="xp-index" id="main">
    <header className="xp-index-head"><p className="xp-mono">Portfolio consolidation / Review only</p>
      <h1 className="xp-h1">One point of view.<br />Three ways to experience it.</h1>
      <p className="xp-body xp-measure">A direct consolidation and two finalists. Each has a homepage and a complete Agents in Windows case study. Compare the journey, not only the opening.</p>
    </header>
    <ol className="xp-index-list">{FINALISTS.map(item => <li key={item.id} className="xp-index-item">
      <span className="xp-index-letter" aria-hidden="true">{item.number}</span>
      <div><h2 className="xp-h2">{item.name}</h2><p className="xp-body xp-measure">{item.description}</p></div>
      <ul className="xp-index-links" aria-label={`${item.name} pages`}>
        <li><Link className="xp-btn" href={finalistHref(item.id)}>Home</Link></li>
        <li><Link className="xp-btn" href={finalistHref(item.id, true)}>Agents case</Link></li>
      </ul>
    </li>)}</ol>
    <p className="xp-caption xp-index-foot"><Link className="xp-btn" href="/explore/archive">Browse archived A–F ↗</Link></p>
  </main>
}
