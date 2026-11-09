import { CaseLayout } from "./CaseLayout"
import { CaseSection, Pair, Prose, ShinyLink, Split } from "./Blocks"
import { PortfolioMedia } from "./PortfolioMedia"
import { RecallModel, RecallProvenance } from "./RecallModel"
import { RecallIdentity } from "./RecallIdentity"

const chapters = [
  { id: "context", label: "Memory starts with fragments" },
  { id: "system", label: "Capture to searchable moments" },
  { id: "moments", label: "Cards as moments" },
  { id: "cards", label: "Merged results killed clarity" },
  { id: "transparency", label: "Judge the match" },
  { id: "performance", label: "Fast enough to feel alive" },
  { id: "constraints", label: "Why we cut RAG" },
  { id: "trust", label: "Privacy and recovery" },
  { id: "impact", label: "Learning and milestones" },
] as const

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
      src: "/images/recall/hero-text-matches.png", width: 2000, height: 1165,
      alt: "Recall text-match results for a presentation with a red barn on a Windows desktop",
      caption: "Recall search design: results presented as captured moments with source context.",
    }}
    chapters={chapters}
  >
    <CaseSection id="context" title="Memory starts with fragments." tone="ink">
      <div className="pf-recall-introduction">
        <RecallIdentity />
        <Prose>
          <p>People could remember a presentation, a snippet of code or something in an email without remembering the words needed to find it. Traditional file search was a poor fit for that starting point.</p>
          <p>Recall aimed to make eligible captured content searchable by meaning. But retrieving something plausible was not enough. We needed to help people distinguish the moment they wanted from an interesting-looking false positive.</p>
          <p>Relevance depended on the task: a visual resemblance might matter more than a textual match. The interface needed to make room for both.</p>
        </Prose>
      </div>
    </CaseSection>

    <CaseSection id="system">
      <RecallModel>
        <h2 data-pf-reveal="reading">From captured content to searchable moments.</h2>
        <p className="pf-caption">Four layers turn eligible snapshots into searchable moments. Capture eligibility and behavior depend on the product version and settings.</p>
      </RecallModel>
    </CaseSection>

    <CaseSection id="moments" title="Cards as moments, not documents.">
      <Split>
        <Prose>
          <p>A Recall card needed to hold several pieces of information: a screenshot, app name, timestamp, extracted text, and relevance signals.</p>
          <p>We built around the screenshot as the primary anchor. Not a cropped asset preview, but the actual desktop as it appeared. That context is what lodges in memory.</p>
          <p>App name, timestamp, and extracted text stayed visible but secondary. The hierarchy pushed away from “found document” and toward “revisited moment.”</p>
          <p>The result is something between a timeline and a search interface: visual enough to scan like memory works, structured enough to act predictably.</p>
        </Prose>
        <PortfolioMedia id="recall-card-anatomy" number="03.1" sizes="(max-width: 850px) 92vw, 50vw" />
      </Split>
    </CaseSection>

    <CaseSection id="cards" title="Merged results killed clarity." tone="graphite">
      <Split>
        <PortfolioMedia id="recall-separated-results" number="04" sizes="(max-width: 850px) 92vw, 40vw" />
        <Prose>
          <p>AI-powered search has a trust problem: technically plausible results can feel wrong. Search for “blue chart spreadsheet,” for example, and a result might come from an unrelated app that simply had a blue element.</p>
          <p>Our first version blended text and visual matches into one ranked list. It looked clean and simple, but testing revealed a problem: text matches dominated, visual matches got buried, and people struggled to understand why something appeared.</p>
          <p>The problem was not just whether a result was correct. It was whether someone could understand the match well enough to judge it.</p>
        </Prose>
      </Split>
      <PortfolioMedia id="RECALL-M01" />
    </CaseSection>

    <CaseSection id="transparency" title="Let people judge the match.">
      <Prose>
        <p>We split text and visual matches into separate sections. Text matches were labeled as text matches; visual matches were labeled as visual matches. People could scan the kind of match their memory offered, rather than decode one blended ranking.</p>
        <p>Match type explained why something appeared. The source app and timestamp located the moment, while the screenshot supplied the surrounding context. Together, these cues let people judge relevance themselves.</p>
        <p>We did not try to eliminate every false positive at the model layer. Perfection wasn’t the goal. Legibility was.</p>
      </Prose>
      <RecallProvenance />
    </CaseSection>

    <CaseSection id="performance" title="Fast enough to feel alive.">
      <Prose>
        <p>Embedding indexing and local retrieval are computationally heavy. Response times varied, and some queries left people waiting.</p>
        <p>We made waiting feel like progress. Results refined as people typed, rather than requiring a finished query before anything could appear. The interaction kept moving toward the moment they remembered.</p>
        <p>Design and engineering iterated on how often to send queries, using actual typing patterns to balance result refinement with responsiveness. We wanted to avoid expensive retriggering without making the interface feel stalled.</p>
      </Prose>
      <PortfolioMedia id="recall-search" number="06" />
    </CaseSection>

    <CaseSection id="constraints" title="We killed RAG to keep search fast.">
      <Prose>
        <p>Early on, we explored synthesis across memories. Retrieval-augmented generation could answer higher-level questions by stitching together context from many screenshots.</p>
        <p>Latency killed it for this search experience. Retrieving and generating across large memory sets created delays that broke the core expectation: search should feel instantaneous.</p>
        <p>We abandoned synthesis and focused on speed and legibility instead. Surface relevant moments. Let people interpret them.</p>
        <p>And honestly, it was the right call design-wise. The system helps people rediscover what they saw. It doesn’t rewrite their history for them.</p>
      </Prose>
      <PortfolioMedia id="recall-retrieval" number="07" />
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
      <Pair>
        <PortfolioMedia id="recall-delete-snapshot" number="08.1" sizes="(max-width: 850px) 92vw, 45vw" />
        <PortfolioMedia id="recall-capture-settings" number="08.2" sizes="(max-width: 850px) 92vw, 45vw" />
      </Pair>
      <p className="pf-caption">Privacy recovery design: confirm deletion, then review future capture settings. These are separate decisions, not a claim about a specific release or retention behavior.</p>
      <dl className="pf-principles">
        <div><dt>Local processing</dt><dd>On-device capture, indexing and retrieval were central to the architecture described in this work. Exact product guarantees require version-specific documentation.</dd></div>
        <div><dt>User control</dt><dd>Make capture choice, pause and exclusions understandable rather than leave people to infer what the system will retain.</dd></div>
        <div><dt>Provenance</dt><dd>Expose source and time in the result hierarchy so a match can be questioned.</dd></div>
        <div><dt>Deletion</dt><dd>Explain the action’s scope and connect recovery to future capture controls without treating them as the same operation.</dd></div>
      </dl>
    </CaseSection>

    <CaseSection id="impact" title="What we learned, and what was announced." className="pf-recall-impact">
      <PortfolioMedia id="recall-announcement" number="09" sizes="(min-width: 1600px) calc(100vw - 24rem), (min-width: 1101px) calc(100vw - 20rem), 92vw" />
      <Prose>
        <p>The testing described in this work included people explaining why results appeared, rejecting mismatches and recovering information they had struggled to find. Those observations supported visible provenance and separated match types; they are not a quantified claim about all users or all queries.</p>
        <p>Recall was announced at Build 2024. Relevance transparency and privacy patterns also informed related design discussions across Windows Search and File Explorer. That is a connection between design efforts, not proof of adoption or a claim that the privacy questions were solved.</p>
      </Prose>
      <nav className="pf-next" aria-label="Next case"><ShinyLink href="/teams-for-education">Teams for Education</ShinyLink></nav>
    </CaseSection>
  </CaseLayout>
}
