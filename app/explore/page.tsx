import Link from "next/link"
import { DIRECTIONS, caseHref, homeHref } from "@/lib/explore/content"

export default function ExploreIndex() {
  return (
    <main id="main" className="xp-index">
      <header className="xp-index-head">
        <p className="xp-mono">Portfolio explorations · review only</p>
        <h1 className="xp-h1">Three ways to move through the same work</h1>
        <p className="xp-body xp-measure">
          Each direction rebuilds the home page and the Agents in Windows case study from identical copy and assets.
          They differ in structure, motion and interaction only. Recall and Teams link to the published case studies.
        </p>
      </header>
      <ol className="xp-index-list">
        {DIRECTIONS.map((d) => (
          <li key={d.id} className="xp-index-item">
            <span className="xp-index-letter" aria-hidden="true">{d.letter}</span>
            <div>
              <h2 className="xp-h2">
                <span className="sr-only">Direction {d.letter}: </span>
                {d.name}
              </h2>
              <p className="xp-body xp-measure">{d.idea}</p>
            </div>
            <ul className="xp-index-links" aria-label={`${d.name} pages`}>
              <li><Link className="xp-btn" href={homeHref(d.id)}>Home</Link></li>
              <li><Link className="xp-btn" href={caseHref(d.id)}>Agents in Windows</Link></li>
            </ul>
          </li>
        ))}
      </ol>
      <p className="xp-caption xp-index-foot">
        Not linked from the published site and excluded from indexing. <Link className="xp-link" href="/">Published home</Link>
      </p>
    </main>
  )
}
