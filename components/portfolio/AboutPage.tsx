import { EvidenceReveal, Prose, ShinyLink } from "./Blocks"
import { PortfolioShell } from "./PortfolioShell"
import { PortfolioMedia } from "./PortfolioMedia"
import { RevealWords } from "../explore/RevealWords"

const experience = [
  {
    year: "2025–present", title: "Windows Agent Platform", concurrent: true,
    description: "Agent visibility and orchestration across Shell, Copilot and M365 integration surfaces, with three engineering partner teams.",
  },
  { year: "2025–present", title: "Copilot Actions", concurrent: true },
  {
    year: "2023–2025", title: "Windows Recall",
    description: "Semantic search for Copilot+ PCs and subsequent privacy information architecture. Recall was announced at Build 2024.",
  },
  { year: "2022–2023", title: "File Explorer Modernization (Windows 11)" },
  {
    year: "2020–2021", title: "Teams for Education",
    description: "Virtual-classroom interaction design and research. Reframed a retention brief around participation and stable groups.",
  },
  { year: "2018–2020", title: "Microsoft Education" },
]

export function AboutPage() {
  return <PortfolioShell page="about">
    <main id="main" className="pf-about-main">
      <header className="pf-about-hero" data-env="ink" data-env-start="1" data-env-end=".4">
        <div>
          <p className="fn-label">Bryce Henthorn / About</p>
          <h1><RevealWords as="span" text="A systems thinker." /><br /><RevealWords as="span" text="A hands-on designer." delay={96} /></h1>
          <p className="pf-about-role">Product Designer, Windows AI at Microsoft.</p>
          <Prose><p>I work where operating-system constraints, agent behavior and human expectations meet. I like unclear terrain—and turning it into something people can understand and use.</p></Prose>
        </div>
        <EvidenceReveal><PortfolioMedia id="about-portrait" number="01" className="pf-portrait" /></EvidenceReveal>
      </header>

      <section id="bio" className="pf-about-section">
        <h2>How I work through ambiguity.</h2>
        <div className="pf-working-examples">
          <article>
            <span className="fn-label">Test the behavior in context</span>
            <h3>Put the prototype in the shell.</h3>
            <p>On Agents in Windows, I prototyped with engineering and product partners in the actual shell, checking multiple agents and state changes. The hard part was keeping one predictable surface while different teams supplied different progress signals.</p>
            <ShinyLink href="/agents-in-windows#constraints">Platform tradeoffs</ShinyLink>
          </article>
          <article>
            <span className="fn-label">Question the starting brief</span>
            <h3>Find the classroom inside the retention problem.</h3>
            <p>On Teams for Education, I led research sessions with educators and students. That work moved the brief from retaining pandemic growth toward the structure people were missing: stable groups, peer conversation and teacher awareness.</p>
            <ShinyLink href="/teams-for-education#research">Research in practice</ShinyLink>
          </article>
        </div>
      </section>

      <section id="experience" className="pf-about-section">
        <div><p className="fn-label">Microsoft / 2018–present</p><h2>Work across systems.</h2></div>
        <p className="pf-caption">Project areas and dates. Overlapping entries represent concurrent work, not a sequence of promotions.</p>
        <dl className="pf-experience">
          {experience.map(item => <div key={item.title}>
            <dt className="fn-label">{item.year}{item.concurrent && <span className="pf-concurrent">Concurrent work</span>}</dt>
            <dd><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</dd>
          </div>)}
        </dl>
        <div className="pf-prior-work">
          <h3>Prior contract work</h3>
          <dl><div><dt>Amazon</dt><dd>Contract</dd></div><div><dt>Nordstrom</dt><dd>Contract</dd></div></dl>
        </div>
      </section>

      <section id="philosophy" className="pf-about-section">
        <h2>Design the behavior, not just the feature.</h2>
        <div className="pf-about-philosophy">
          <p>I care about progressive disclosure, removing noise and making systems understandable over time. An agent interrupting at the wrong moment or automation behaving unpredictably is a structural problem, not simply a styling problem.</p>
          <p>Technical ambition and craft belong together. Alignment, hierarchy, edge cases and empty states are where the larger idea becomes usable. I’m most energized where new software capabilities meet real workflows—and where the details decide whether the system holds together.</p>
        </div>
      </section>
    </main>
  </PortfolioShell>
}
