"use client"

import {
  CaseStudyLayout,
  CaseStudySection,
  CaseStudyParagraph,
  CaseStudyHeading,
  CaseStudyCallout,
} from "@/components/case-study-layout"
import { FigurePanel, DiagramPlaceholder } from "@/components/figure-panel"
import { CaseStudyHero } from "@/components/case-study-hero"

const specs = [
  { label: "Role", value: "Senior UX Designer" },
  { label: "Platform", value: "Windows / Copilot+ PCs" },
  { label: "Focus", value: "Semantic search and memory retrieval" },
  { label: "Challenge", value: "How people remember doesn't match how search works" },
  { label: "Solution", value: "Memory cards that show why results appeared" },
  { label: "Impact", value: "Higher relevance comprehension, stronger trust, better task recovery" },
]

const navItems = [
  { id: "context", label: "Context" },
  { id: "problem", label: "Problem" },
  { id: "card-design", label: "Card Design" },
  { id: "card-relevance", label: "Why It Appeared" },
  { id: "early-iteration", label: "Early Iteration" },
  { id: "performance", label: "Performance" },
  { id: "trust", label: "Trust" },
  { id: "constraints", label: "Constraints & Tradeoffs" },
  { id: "impact", label: "Impact" },
]

const recallHero = (
  <CaseStudyHero
    backgroundImage="/images/projects/Recall hero.png"
    backgroundImageOpacity={0.55}
    heroIcon="/images/projects/Recall icon.png"
    heroIconAlt="Windows Recall"
    gridSvg="/dot-grid-bg.svg"
    gridOpacity={0.3}
    productName="Windows Recall"
    title="Designing Semantic Search for Everything You've Seen."
    tags={["Trust + privacy", "Systems thinking", "Windows", "Senior Designer", "2024"]}
  />
)

export default function RecallPage() {
  return (
    <CaseStudyLayout
      productName="Windows Recall"
      title="Search by memory, not by filename"
      tags={["Trust + privacy", "Systems thinking", "Windows", "Senior Designer", "2024"]}
      heroContent={recallHero}
      specs={specs}
      navItems={navItems}
      nextProject={{ name: "Agents in Windows", href: "/agents-in-windows" }}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>Where was that thing I saw last week?</CaseStudyHeading>
        <CaseStudyParagraph>
          The problem was simple and unsolved. You{"'"}d seen something on your computer: a presentation, a snippet of code, a reference in an email. But you couldn{"'"}t find it. You{"'"}d try different search terms, retrace your steps, open files one by one. Minutes wasted. Information you knew existed but couldn{"'"}t retrieve.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Recall aimed to capture everything appearing on screen and make it searchable through meaning rather than filenames. But solving that technically wasn{"'"}t the real challenge. We had to build something users actually trusted. On-device processing was non-negotiable from day one, privacy concerns were real and legitimate, and if people didn{"'"}t understand how the system worked, they wouldn{"'"}t use it no matter how smart it was.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          I owned the search experience: the part where people describe what they remember, however incompletely, and the system shows them the right moment.
        </CaseStudyParagraph>
        <FigurePanel caption="Building a memory graph from everything you've seen on screen" src="/images/projects/Intro - 127.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>Search wants precision. Memory offers fragments.</CaseStudyHeading>
        <CaseStudyParagraph>
          File search is built on certainty. You give it a filename or keyword. It matches exactly. Done.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          But that{"'"}s not how memory works. You remember a chart, maybe the color was blue, maybe it was from an email or a browser. You remember reading a specific sentence but not where. A layout. A screenshot from last month. Nothing precise enough for traditional search to grab hold of. So users cycle through guesses, opening files, clicking through folders, retracing steps they barely remember. The retrieval process becomes longer than whatever they{"'"}re trying to find.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Recall flipped this. Instead of requiring exact queries, it indexed everything the system could see and made it searchable through semantic understanding. The backend processed screenshots with OCR and text extraction to build a searchable layer across visual and textual content. That solved the technical problem. But it created a design one.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          If you{"'"}re indexing everything, how do you let people search without overwhelming them? How do you surface the right moments without forcing users to articulate their memory like a database query? The system needed to think like a person, not force people to think like the system.
        </CaseStudyParagraph>
        <FigurePanel caption="Metadata extracted from Screen Understanding" src="/images/projects/0-2.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="card-design" label="Card Design">
        <CaseStudyHeading>Cards as moments, not documents</CaseStudyHeading>
        <CaseStudyParagraph>
          A Recall card needed to hold several pieces of information: a screenshot, app name, timestamp, extracted text, and relevance signals. The information architecture part was straightforward. The subtle part was what the card communicated about what Recall actually was.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This is memory search, not file search.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We built around the screenshot as the primary anchor. Not a cropped asset preview, but the actual desktop as it appeared, often with surrounding applications, open browser tabs, other windows in the background. That context is what lodges in memory. You remember the presentation was on the left side. The spreadsheet was behind it. The email client was open in the corner. These details are what orient you in time and make the memory feel like something that actually happened, not a generic document result.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          App name, timestamp, and extracted text stayed visible but secondary. The hierarchy pushed away from "found document" and toward "revisited moment."
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Click behavior mattered equally. A card could open the Recall viewer for closer inspection or restore the original application window from that moment. But if those outcomes felt ambiguous or switched unexpectedly, users would lose trust fast. Every interaction had to feel intentional.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The result is something between a timeline and a search interface: visual enough to scan like memory works, structured enough to act predictably.
        </CaseStudyParagraph>
        <FigurePanel caption="Separating match results and contextual clues of match type" src="/images/projects/recall-fig04.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>


      <CaseStudySection id="card-relevance" label="Why It Appeared">
        <CaseStudyHeading>AI-powered search has a trust problem</CaseStudyHeading>
        <CaseStudyParagraph>
          Technically correct results can feel wrong. Search for "blue chart spreadsheet" and the system might return something from an unrelated app that simply had a blue element. Visually similar, semantically off. That's not a model failure. It's an inherent limitation of retrieval systems at scale.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We didn't try to eliminate every false positive at the model layer. Instead, we made results understandable.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Every card explained how it matched. Text matches were labeled as text matches. Visual matches were labeled as visual matches. Separating and showing these signals let users judge relevance themselves rather than trusting an opaque ranking.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          A result that looked wrong stopped feeling mysterious once users understood the match type. "This appeared because the system found similar colors" is dismissable. "The system returned this and I don't know why" erodes trust. The interface had to close that gap between what the model sees and what the user intended.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Perfection wasn't the goal. Legibility was.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Relevance transparency: visual vs. text match signal design" />
      </CaseStudySection>

      <CaseStudySection id="early-iteration" label="Early Iteration">
        <CaseStudyHeading>Merged results killed clarity</CaseStudyHeading>
        <CaseStudyParagraph>
          First version blended everything. Text matches and visual matches went into one ranked list. The system would find the strongest result and surface it. Clean, elegant, simple.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Testing proved it didn{"'"}t work. Text matches were generally more precise, so they dominated the ranking. Visual matches, often closer to what people actually remembered, got buried lower. Users stared at results and couldn{"'"}t figure out why something appeared. Even correct results felt questionable.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Users needed to understand the {"'"}why.{"'"} Not just the {"'"}what.{"'"}
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We split text and visual matches into separate sections. That single structural change (giving each match type its own space) made the system's logic transparent. Cognitive load dropped. Trust went up. No opaque ranking competing against itself. Each result type had a clear place and a clear explanation.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The AI was technically correct even in the first version. But opaque correctness erodes trust faster than transparent mistakes. The problem wasn{"'"}t the ranking. It was legibility.
        </CaseStudyParagraph>
        <FigurePanel caption="Recall search with merged results" src="/images/projects/recall-fig03.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>


      <CaseStudySection id="performance" label="Performance">
        <CaseStudyHeading>Semantic search is expensive</CaseStudyHeading>
        <CaseStudyParagraph>
          Embedding indexing and local retrieval are computationally heavy. Most queries came back fast. Some didn't, especially during initial indexing or under load. Users had to wait.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We made waiting feel like progress. Results evolved live as users typed, each keystroke refining the results in real time. No waiting for a full query. Constant forward motion. That momentum, even if latency existed underneath, made the interface feel responsive.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          When latency did show up, we signaled that work was happening. Subtle motion. Lightweight progress indicators. The interface stayed calm and composed instead of looking stuck or broken.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Design and engineering iterated constantly. We tuned how aggressively the system sent queries based on actual typing patterns, found a balance that avoided expensive retriggering without sacrificing responsiveness. As models improved, we expanded what was possible. When constraints hit, we adapted. The final experience was pure negotiation between what we wanted and what the hardware could do.
        </CaseStudyParagraph>
        <FigurePanel caption="Live search performance and loading states" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recall_fig05-JAHG0aeAytDorw718qnZiWG2n09om9.mp4" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="trust" label="Trust">
        <CaseStudyHeading>Privacy was the whole product</CaseStudyHeading>
        <CaseStudyParagraph>
          Recall captures everything. Everything. That only works if people trust where the data sits, who can see it, and what control they actually have.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          On-device processing wasn{"'"}t optional. All capture, all indexing, all retrieval happened locally. Nothing left the machine. That constraint shaped everything downstream. It limited how much computation we could do in real time. It influenced ranking. It forced the interface to be clear about what the system did and didn{"'"}t know about the user.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          After public scrutiny, things changed. Recall flipped from opt-out to opt-in. Users got the ability to exclude apps and pause indexing. Those shifts created new design problems. If someone excludes an app, its absence in results can{"'"}t look like a system failure. When indexing pauses, the UI has to signal incompleteness without alarm. Boundaries need to be visible.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We made those boundaries tangible. Cards showed where results came from and when. Excluded content got explicit explanation instead of silent gaps. Sensitive data triggered blurring and Windows Hello. Users could always understand what they were looking at and why Recall chose to show or hide it.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          I translated privacy policy into interface patterns. The search box, the cards, the relevance labels, all designed to answer: Why am I seeing this, and what{"'"}s Recall hiding from me? Trust wasn{"'"}t a single setting. It lived in every interaction, every label, every moment the interface made a choice transparent.
        </CaseStudyParagraph>
        <FigurePanel caption="Recall privacy and trust controls" src="/images/projects/Windows Commercial_16x9_1920_1080.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="constraints" label="Constraints & Tradeoffs">
        <CaseStudyHeading>We killed RAG to keep search fast</CaseStudyHeading>
        <CaseStudyParagraph>
          Early on, we explored synthesis across memories. Retrieval-augmented generation could answer higher-level questions by stitching together context from many screenshots. Users could ask {"'"}What was I working on last Tuesday?{"'"} and the system would synthesize an answer instead of dumping screenshots at them.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Latency killed it. Retrieving and generating across large memory sets created delays that broke the core expectation: search should feel instantaneous. A few seconds of waiting for the system to {"'"}think{"'"} and the whole thing felt slow and alien. That{"'"}s not how Windows Search behaves. That{"'"}s not how people expect system features to respond.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We abandoned synthesis and focused on speed and legibility instead. Surface relevant moments. Let people interpret them. Prioritizing responsive retrieval over deeper reasoning meant Recall stayed a native capability instead of becoming a slow AI graft.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          And honestly, it was the right call design-wise. The system helps people rediscover what they saw. It doesn{"'"}t rewrite their history for them.
        </CaseStudyParagraph>
        <FigurePanel caption="RAG synthesis vs. fast retrieval: latency and tradeoff" videoSrc="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/shilpa_0603_03%201.mp4" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <FigurePanel caption="Recall keynote presentation and system architecture" src="/images/projects/recall-fig06.png" className="mb-8 max-w-2xl" />
        <CaseStudyParagraph>
          Separating visual and text matches proved it wasn{"'"}t just philosophy. In testing, users could explain why each result appeared and quickly reject things that didn{"'"}t fit. Mysterious AI behavior became rational. That shift changed how people talked about the system. They stopped saying {"'"}I don{"'"}t understand why this happened{"'"} and started saying {"'"}This doesn{"'"}t match my intent.{"'"} The difference is control.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          People recovered information they{"'"}d written off as lost. A code snippet they saw once in documentation. Files from months ago they{"'"}d forgotten existed. The underlying tech enabled that. The interface made it usable. Users could scan results and jump directly to the moment they needed without clicking through irrelevant noise.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The work rippled further. Privacy and trust patterns from Recall became reference points across Windows teams. How do you show provenance in an AI context? How do you let people understand and control AI-powered systems? How do you communicate system boundaries without alarming users? Those questions got answered in Recall{"'"}s design and stayed relevant as other features shipped.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The search approach itself became foundational. Principles of relevance transparency and match-type separation showed up in Windows Search and File Explorer updates. That consistency meant users didn't have to learn different models for different surfaces.
        </CaseStudyParagraph>
        <CaseStudyCallout>
          Recall proved that AI in core OS features doesn{"'"}t require opacity or experimental disclaimers. Clear transparency, visible provenance, predictable interactions. That combination is what lets people trust and use powerful capabilities without fear.
        </CaseStudyCallout>
      </CaseStudySection>
    </CaseStudyLayout>
  )
}
