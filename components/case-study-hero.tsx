import Image from "next/image"
import { Container } from "@/components/container"
import { AnimateIn } from "@/components/animate-in"

interface CaseStudyHeroProps {
  /** Floating wide image above text (Teams pattern) */
  heroImage?: string
  heroImageAlt?: string
  /** Small icon displayed centered above the title (Recall pattern) */
  heroIcon?: string
  heroIconAlt?: string
  /** Full-bleed background image behind grid and content */
  backgroundImage?: string
  /** Opacity for the background image. Default: 0.6 */
  backgroundImageOpacity?: number
  /** Grid SVG path. Default: "/grid-bg-neon.svg" */
  gridSvg?: string
  /** Grid opacity. Default: 0.1 */
  gridOpacity?: number
  productName: string
  title: string
  tags?: string[]
  /** Optional overlay layer rendered between background and content */
  overlay?: React.ReactNode
}

export function CaseStudyHero({
  heroImage,
  heroImageAlt,
  heroIcon,
  heroIconAlt,
  backgroundImage,
  backgroundImageOpacity = 0.6,
  gridSvg = "/grid-bg-neon.svg",
  gridOpacity = 0.1,
  productName,
  title,
  tags,
  overlay,
}: CaseStudyHeroProps) {
  const hasTopSlot = !!(heroIcon || heroImage)
  const baseDelay = hasTopSlot ? 0.15 : 0.05

  return (
    <section
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(49.77% 45.01% at 57.6% 43.06%, #1C1C21 0%, #0B0B0D 100%)",
        borderRadius: "14px",
      }}
    >
      {/* Background image — full-bleed, behind grid */}
      {backgroundImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: backgroundImageOpacity }}
        />
      )}

      {/* Grid SVG — full-bleed, configurable opacity, mask-faded at top and bottom */}
      {gridSvg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={gridSvg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            opacity: gridOpacity,
            maskImage:
              "linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 160px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 160px), transparent 100%)",
          }}
        />
      )}

      {/* Animation overlay layer */}
      {overlay}

      {/* Bottom fade — blends into spec panel */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0D] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Centered content */}
      <Container className="relative z-10 pt-24 pb-16 flex flex-col items-center text-center">
        {/* Hero icon — small centered icon above title (Recall pattern) */}
        {heroIcon && (
          <AnimateIn delay={0.05} className="mb-6">
            <Image
              src={heroIcon}
              alt={heroIconAlt ?? ""}
              width={64}
              height={64}
              className="w-16 h-16 object-contain mx-auto"
              priority
            />
          </AnimateIn>
        )}

        {/* Hero image — wide floating image above text (Teams pattern) */}
        {heroImage && (
          <AnimateIn delay={0.05} className="w-full max-w-[640px] mb-10 md:mb-12">
            <Image
              src={heroImage}
              alt={heroImageAlt ?? ""}
              width={1280}
              height={720}
              className="w-full h-auto rounded-2xl"
              style={{
                filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.6))",
              }}
              sizes="(max-width: 768px) 100vw, 640px"
              priority
            />
          </AnimateIn>
        )}

        {/* Product name */}
        <AnimateIn delay={baseDelay}>
          <p className="text-sm font-sans font-medium text-accent tracking-[0.15em] uppercase mb-3">
            {productName}
          </p>
        </AnimateIn>

        {/* Title */}
        <AnimateIn delay={baseDelay + 0.05}>
          <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.15] tracking-tight text-foreground text-balance max-w-2xl mx-auto">
            {title}
          </h1>
        </AnimateIn>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <AnimateIn delay={baseDelay + 0.1}>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-sans font-medium text-foreground-tertiary bg-surface-raised px-3 py-1.5 rounded-lg border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimateIn>
        )}
      </Container>
    </section>
  )
}
