import Link from "next/link"
import { DIRECTIONS, caseHref, homeHref } from "@/lib/explore/content"

const ROUNDS = [
  { title: "The originals, with optional enhancements", directions: DIRECTIONS.slice(0, 3) },
  { title: "Three new explorations", directions: DIRECTIONS.slice(3) },
]

export default function ExploreIndex() {
  return (
    <main id="main" className="xp-index">
      <header className="xp-index-head">
        <p className="xp-mono">Portfolio explorations · review only</p>
        <h1 className="xp-h1">Six perspectives on the same work</h1>
        <p className="xp-body xp-measure">
          Each direction rebuilds the home page and the Agents in Windows case study from the same source material.
          Compare the original A–C against their enhanced treatments, or explore three new directions.
          Each includes a homepage and an Agents in Windows case study. Recall and Teams link to their published cases.
          Abstract artwork sets the atmosphere; the product images remain the evidence.
        </p>
      </header>
      {ROUNDS.map((round) => (
        <section key={round.title} className="xp-index-round" aria-label={round.title}>
          <h2 className="xp-mono">{round.title}</h2>
          <ol className="xp-index-list">
            {round.directions.map((d) => (
              <li key={d.id} className="xp-index-item">
                <span className="xp-index-letter" aria-hidden="true">{d.letter}</span>
                <div>
                  <h3 className="xp-h2">
                    <span className="sr-only">Direction {d.letter}: </span>
                    {d.name}
                  </h3>
                  <p className="xp-body xp-measure">{d.idea}</p>
                </div>
                <ul className="xp-index-links" aria-label={`${d.name} pages`}>
                  <li><Link className="xp-btn" href={homeHref(d.id)}>Home</Link></li>
                  <li><Link className="xp-btn" href={caseHref(d.id)}>Agents in Windows</Link></li>
                  {/direction-[abc]$/.test(d.id) && <>
                    <li><Link className="xp-btn" href={`${homeHref(d.id)}?treatment=enhanced`}>Enhanced home</Link></li>
                    <li><Link className="xp-btn" href={`${caseHref(d.id)}?treatment=enhanced`}>Enhanced case</Link></li>
                  </>}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      ))}
      <p className="xp-caption xp-index-foot">
        Not linked from the published site and excluded from indexing. <Link className="xp-link" href="/">Published home</Link>
      </p>
    </main>
  )
}
