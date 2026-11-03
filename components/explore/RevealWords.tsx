import type { CSSProperties, ElementType } from "react"

type Props = {
  text: string
  as?: ElementType
  className?: string
  /** ms before the first word resolves */
  delay?: number
  id?: string
  style?: CSSProperties
}

/**
 * Stable words resolving left-to-right behind a clip, using the production
 * hero keyframes (`.hero-intro-word` in globals.css). Never scrambles glyphs.
 */
export function RevealWords({ text, as: Tag = "h1", className, delay = 0, id, style }: Props) {
  const words = text.split(" ")
  return (
    <Tag className={className} id={id} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span
              className="hero-intro-word"
              style={{ "--hero-enter-delay": `${delay + i * 32}ms` } as CSSProperties}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  )
}
