import Image from "next/image"
import { ViewTransitionLink } from "./ViewTransitionLink"

type Props = {
  href: string
  /** Project name, uppercased by the mono label style. */
  eyebrow: string
  title: string
  /** Concise role and strongest outcome proof. */
  proof: string
  imgSrc: string
  imgAlt: string
}

/**
 * Homepage project card — "full takeover" (design 2C). The case-study's own
 * hero screenshot fills the whole 1120×496 frame at full colour; a hard
 * left-to-right scrim carries a compact product / title / proof stack.
 *
 * Hover is a four-part move: the card lifts, its border warms to
 * --rule-strong, the screenshot pushes in 3%, and a 2px accent trace wipes
 * across the top edge. All of it is gated behind motion-safe.
 */
export function ProjectCard({
  href,
  eyebrow,
  title,
  proof,
  imgSrc,
  imgAlt,
}: Props) {
  return (
    <ViewTransitionLink
      href={href}
      aria-label={`${eyebrow}: ${title} ${proof}`}
      className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent-trace)]"
    >
      <article
        className={[
          "relative min-h-[360px] overflow-hidden border border-[color:var(--rule)] bg-[#121213] sm:min-h-[400px]",
          "lg:aspect-[1120/496]",
          "transition-[border-color,transform,box-shadow] duration-[400ms] ease-[cubic-bezier(0.2,0.65,0.3,1)]",
          "group-hover:border-[color:var(--rule-strong)]",
          "motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:shadow-[0_32px_64px_rgba(0,0,0,0.5)]",
        ].join(" ")}
      >
        {/* Layer 1 — the case study's own hero screenshot, full colour. */}
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(min-width: 1280px) 1120px, 100vw"
          className="object-cover object-bottom motion-safe:transition-transform motion-safe:duration-[800ms] motion-safe:ease-[cubic-bezier(0.2,0.65,0.3,1)] motion-safe:group-hover:scale-[1.03]"
        />

        {/* Layer 2 — scrim. Deep enough on the left that the text block clears
            4.5:1 over any frame of the screenshot beneath it. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, var(--ink) 30%, rgba(15,15,16,0.88) 52%, rgba(15,15,16,0.12) 80%)",
          }}
        />

        {/* Layer 3 — accent trace, wipes left→right on hover. */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-[color:var(--accent-trace)] shadow-[0_0_8px_rgba(184,85,30,0.6)] motion-safe:transition-transform motion-safe:duration-[480ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-x-100"
        />

        <div className="relative flex h-full flex-col">
          <div className="flex min-h-[360px] flex-1 flex-col justify-center gap-5 p-6 sm:min-h-[400px] sm:p-8 lg:min-h-0 lg:max-w-[52%] lg:px-12 lg:py-12">
            <p className="t-mono-label pcard-label">{eyebrow}</p>
            <h3 className="t-h1 pcard-title text-balance text-[color:var(--text-primary)]">
              {title}
            </h3>
            <p className="t-mono-colophon pcard-proof max-w-[52ch]">
              {proof}
            </p>
          </div>
        </div>
      </article>
    </ViewTransitionLink>
  )
}
