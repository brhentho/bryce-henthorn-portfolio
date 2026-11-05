import { CaseLayout } from "./CaseLayout"
import { CaseSection, Decisions, Pair, Prose, ShinyLink, Split } from "./Blocks"
import { PortfolioMedia } from "./PortfolioMedia"

const chapters = [
  { id: "context", label: "Memory starts with fragments" },
  { id: "system", label: "Capture to searchable moments" },
  { id: "cards", label: "The ranking decision" },
  { id: "transparency", label: "Judge the match" },
  { id: "constraints", label: "Retrieval over synthesis" },
  { id: "trust", label: "Privacy and recovery" },
  { id: "impact", label: "Learning and milestones" },
] as const

const stages = [
  { title: "Screenshot capture", detail: "When capture is enabled and content is eligible, screen snapshots provide the visual source material." },
  { title: "OCR processing", detail: "Image processing and optical character recognition extract text from the snapshot." },
  { title: "Meaning analysis", detail: "Extracted content is interpreted and represented as semantic vectors for matching." },
  { title: "Search and index service", detail: "An index makes captured content retrievable by similarity to a query, rather than exact words alone." },
]

export function RecallPage() {
  return <CaseLayout
    page="recall"
    title="Finding remembered moments, not exact filenames."
    deck="A chart, a conversation, a half-remembered page. Recall’s search experience had to work with fragments—and make its matches understandable."
    call="We separated text and visual matches, kept source context visible, and connected snapshot recovery to capture controls."
    status="Semantic search & privacy design"
    ledger={[
      { label: "Role", value: "Semantic search design & privacy information architecture" },
      { label: "Team", value: "Design, research & ML engineering" },
      { label: "Platform", value: "Windows 11, Copilot+ PCs" },
      { label: "Years", value: "2023–2025" },
    ]}
    hero={{
      src: "/images/recall/hero-demo.png", width: 1120, height: 442,
      alt: "Recall on a Windows desktop with a grid of search result cards",
      caption: "Recall search design: results presented as captured moments with source context.",
    }}
    chapters={chapters}
  >
    <CaseSection id="context" title="Memory starts with fragments." tone="ink">
      <div className="pf-recall-fragments">
        <p className="pf-pull-line">The chart was blue.<br />The page was from last week.<br />The filename is gone.</p>
        <Prose>
          <p>People could remember a presentation, a snippet of code or something in an email without remembering the words needed to find it. Traditional file search was a poor fit for that starting point.</p>
          <p>Recall aimed to make eligible captured content searchable by meaning. But retrieving something plausible was not enough. We needed to help people distinguish the moment they wanted from an interesting-looking false positive.</p>
          <p>Relevance depended on the task: a visual resemblance might matter more than a textual match. The interface needed to make room for both.</p>
        </Prose>
      </div>
    </CaseSection>

    <CaseSection id="system" title="From captured content to searchable moments.">
      <p className="pf-caption">Simplified capture and indexing model—not a measured query-time sequence. Capture eligibility and behavior depend on the product version and settings.</p>
      <div className="pf-recall-model">
        <ol className="pf-model-stages">
          {stages.map((stage, index) => <li key={stage.title}>
            <span className="fn-label">0{index + 1}</span>
            <div><h3>{stage.title}</h3><p>{stage.detail}</p></div>
          </li>)}
        </ol>
        <PortfolioMedia id="recall-model" number="02" />
      </div>
    </CaseSection>

    <CaseSection id="cards" title="One ranking hid the result people needed." tone="graphite">
      <Prose>
        <p>In the design testing described in this work, one merged ranking buried visual matches. A result could be useful because of what it looked like, yet lose visibility to textually similar content.</p>
        <p>We separated text and visual results so people could scan the kind of match their memory offered. Within each card, the screenshot became the primary anchor; source app, time and extracted text remained visible but secondary.</p>
      </Prose>
      <Pair>
        <PortfolioMedia id="recall-card-anatomy" number="03.1" />
        <PortfolioMedia id="recall-separated-results" number="03.2" />
      </Pair>
      <p className="pf-caption">Card anatomy and separated-result layout explain different decisions. They are not the same query in two versions.</p>
      <PortfolioMedia id="RECALL-M01" />
    </CaseSection>

    <CaseSection id="transparency" title="Let people judge the match.">
      <Split>
        <Prose>
          <p>Technically plausible results can still feel wrong. Instead of treating the relevance score as a verdict, we exposed the cues a person could use to disagree with it.</p>
          <p>Text and visual labels explain the kind of match. The source app and timestamp locate it. The screenshot supplies the surrounding context. Together they let someone inspect a candidate without pretending the model cannot make mistakes.</p>
        </Prose>
        <PortfolioMedia id="recall-provenance" number="04.1" />
      </Split>
      <PortfolioMedia id="recall-search" number="04.2" />
    </CaseSection>

    <CaseSection id="constraints" title="Choose retrieval over synthesis.">
      <Prose>
        <p>We explored retrieval-augmented generation across screenshots. Synthesis could offer an answer, but its latency conflicted with the search interaction we were designing. We chose to surface relevant moments and let people interpret the source material themselves.</p>
        <p id="performance">The retrieval experience still required tuning. Indexing and semantic matching are computational work; query retriggering had to balance result refinement with responsive input. The recordings illustrate the direction, not a benchmark or a guaranteed response time.</p>
      </Prose>
      <Decisions items={[
        { title: "Synthesize an answer", tradeoff: "Early RAG exploration added latency and another interpretation layer between the query and its source moments.", disposition: "Cut from this search experience." },
        { title: "Retrieve relevant moments", tradeoff: "People interpret the evidence themselves, so match type and provenance must remain legible.", disposition: "Prioritize direct retrieval with inspectable sources.", chosen: true },
      ]} />
      <details className="pf-supporting-recording">
        <summary>Inspect the exploratory answer-preview concept</summary>
        <PortfolioMedia id="recall-retrieval" number="05" />
      </details>
    </CaseSection>

    <CaseSection id="trust" title="Remove a moment. Control future capture." tone="ink">
      <Prose>
        <p>Recovering from an unwanted snapshot is different from controlling what can be captured next. We brought those decisions together in the privacy information architecture, while keeping the scope of each action explicit.</p>
        <p>This work spanned privacy revisions. The story here describes the control model and design intent—not a blanket claim about every release, every capture condition or underlying retention behavior.</p>
      </Prose>
      <div className="pf-recovery-pair">
        <article><span className="fn-label">The captured moment</span><h3>Remove the snapshot.</h3><p>Make deletion discoverable and explain the scope of the confirmation. A recovery action should not imply that future capture settings have also changed.</p></article>
        <article><span className="fn-label">What happens next</span><h3>Review capture settings.</h3><p>Offer a path to pause capture or manage app and website exclusions where supported. Make the difference between removing and preventing understandable.</p></article>
      </div>
      <PortfolioMedia id="RECALL-M02" />
      <dl className="pf-principles">
        <div><dt>Local processing</dt><dd>On-device capture, indexing and retrieval were central to the architecture described in this work. Exact product guarantees require version-specific documentation.</dd></div>
        <div><dt>User control</dt><dd>Make capture choice, pause and exclusions understandable rather than leave people to infer what the system will retain.</dd></div>
        <div><dt>Provenance</dt><dd>Expose source and time in the result hierarchy so a match can be questioned.</dd></div>
        <div><dt>Deletion</dt><dd>Explain the action’s scope and connect recovery to future capture controls without treating them as the same operation.</dd></div>
      </dl>
    </CaseSection>

    <CaseSection id="impact" title="What we learned, and what was announced.">
      <Split>
        <Prose>
          <p>The testing described in this work included people explaining why results appeared, rejecting mismatches and recovering information they had struggled to find. Those observations supported visible provenance and separated match types; they are not a quantified claim about all users or all queries.</p>
          <p>Recall was announced at Build 2024. Relevance transparency and privacy patterns also informed related design discussions across Windows Search and File Explorer. That is a connection between design efforts, not proof of adoption or a claim that the privacy questions were solved.</p>
        </Prose>
        <PortfolioMedia id="recall-announcement" number="06" className="pf-small-artifact" />
      </Split>
      <nav className="pf-next" aria-label="Next case"><ShinyLink href="/teams-for-education">Teams for Education</ShinyLink></nav>
    </CaseSection>
  </CaseLayout>
}
