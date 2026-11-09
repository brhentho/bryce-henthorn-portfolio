import Link from "next/link"
import { DIRECTIONS, caseHref, homeHref } from "@/lib/explore/content"

const ROUNDS = [
  { title: "A–C / Original and enhanced", directions: DIRECTIONS.slice(0, 3) },
  { title: "D–F / Archived alternatives", directions: DIRECTIONS.slice(3) },
]

export default function ExploreIndex() {
  return (
    <main id="main" className="xp-index">
      <header className="xp-index-head">
        <p className="xp-mono">Portfolio explorations · review only</p>
        <h1 className="xp-h1">Exploration archive</h1>
        <p className="xp-body xp-measure">
          These six earlier directions are preserved for reference. Each includes a homepage and an Agents in Windows case study.
          A–C retain their original and enhanced treatments. Recall and Teams link to their published cases.
          The current consolidation and finalists are on the comparison page.
        </p>
        <Link href="/explore" className="xp-btn">Compare current finalists ↗</Link>
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
