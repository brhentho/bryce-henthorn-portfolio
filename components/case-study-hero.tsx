import Image from "next/image"
import { Container } from "@/components/container"
import { AnimateIn } from "@/components/animate-in"

interface CaseStudyHeroProps {
  heroImage?: string
  heroImageAlt?: string
  productName: string
  title: string
  tags?: string[]
}

export function CaseStudyHero({
  heroImage,
  heroImageAlt,
  productName,
  title,
  tags,
}: CaseStudyHeroProps) {
  return (
    <section
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(49.77% 45.01% at 57.6% 43.06%, #1C1C21 0%, #0B0B0D 100%)",
        borderRadius: "14px",
      }}
    >
      {/* Grid SVG — full-bleed, 10% opacity, mask-faded at top and bottom */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/grid-bg-neon.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          opacity: 0.1,
          maskImage:
            "linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 160px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 160px), transparent 100%)",
        }}
      />

      {/* Bottom fade — blends into spec panel */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0D] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Centered content */}
      <Container className="relative z-10 pt-24 pb-16 flex flex-col items-center text-center">
        {/* Hero image — omitted when not provided */}
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
        <AnimateIn delay={heroImage ? 0.1 : 0.05}>
          <p className="text-sm font-sans font-medium text-accent tracking-[0.15em] uppercase mb-3">
            {productName}
          </p>
        </AnimateIn>

        {/* Title */}
        <AnimateIn delay={heroImage ? 0.15 : 0.1}>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-foreground text-balance max-w-2xl mx-auto">
            {title}
          </h1>
        </AnimateIn>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <AnimateIn delay={heroImage ? 0.2 : 0.15}>
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
