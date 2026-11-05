// Pure color and scroll-band math for the finalist page environment.
// Colors are sRGB channel triples in 0..255; interpolation happens in OKLab.

export type RGB = readonly [number, number, number]
export type Atmosphere = { base: RGB; glow: RGB; strength: number; x: number; y: number }
export type Ground = { ground: "dark" | "light"; crossing: boolean; fg: RGB; contrast: number; glowFactor: number }

export const WHITE: RGB = [255, 255, 255]
export const BLACK: RGB = [0, 0, 0]
/**
 * Below this contrast between the ground and its palette text, text switches to pure black/white and stops
 * attenuating. 12 leaves room for 67% tertiary text on 6% raised surfaces (simulator, image frames) and for
 * residual glow just outside the crossing. In the crossing, raised surfaces fall back to the ground itself.
 */
export const CROSSING_CONTRAST = 12

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export function parseHex(value: string): RGB {
  const hex = value.trim().replace(/^#/, "")
  const full = hex.length === 3 ? [...hex].map(c => c + c).join("") : hex.slice(0, 6)
  if (!/^[0-9a-f]{6}$/i.test(full)) throw new Error(`Expected a hex color, received "${value}"`)
  return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16)) as unknown as RGB
}

export function toHex(color: RGB) {
  return `#${color.map(c => Math.round(clamp(c, 0, 255)).toString(16).padStart(2, "0")).join("")}`
}

const toLinear = (c: number) => { const v = c / 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4 }
const fromLinear = (v: number) => 255 * (v <= .0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - .055)

export function toOklab([r8, g8, b8]: RGB): RGB {
  const r = toLinear(r8), g = toLinear(g8), b = toLinear(b8)
  const l = Math.cbrt(.4122214708 * r + .5363325363 * g + .0514459929 * b)
  const m = Math.cbrt(.2119034982 * r + .6806995451 * g + .1073969566 * b)
  const s = Math.cbrt(.0883024619 * r + .2817188376 * g + .6299787005 * b)
  return [.2104542553 * l + .793617785 * m - .0040720468 * s, 1.9779984951 * l - 2.428592205 * m + .4505937099 * s, .0259040371 * l + .7827717662 * m - .808675766 * s]
}

export function fromOklab([L, A, B]: RGB): RGB {
  const l = (L + .3963377774 * A + .2158037573 * B) ** 3
  const m = (L - .1055613458 * A - .0638541728 * B) ** 3
  const s = (L - .0894841775 * A - 1.291485548 * B) ** 3
  // Gamut-safe: clamp linear channels before encoding.
  return [
    fromLinear(clamp(4.0767416621 * l - 3.3077115913 * m + .2309699292 * s)),
    fromLinear(clamp(-1.2684380046 * l + 2.6097574011 * m - .3413193965 * s)),
    fromLinear(clamp(-.0041960863 * l - .7034186147 * m + 1.707614701 * s)),
  ]
}

export function mixOklab(from: RGB, to: RGB, t: number): RGB {
  const p = clamp(t)
  if (p === 0) return from
  if (p === 1) return to
  const a = toOklab(from), b = toOklab(to)
  return fromOklab([a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p])
}

export function mixAtmosphere(from: Atmosphere, to: Atmosphere, t: number): Atmosphere {
  const p = clamp(t)
  const lerp = (a: number, b: number) => a + (b - a) * p
  return { base: mixOklab(from.base, to.base, p), glow: mixOklab(from.glow, to.glow, p), strength: lerp(from.strength, to.strength), x: lerp(from.x, to.x), y: lerp(from.y, to.y) }
}

export function relativeLuminance(color: RGB) {
  const [r, g, b] = color.map(toLinear)
  return .2126 * r + .7152 * g + .0722 * b
}

export function contrastRatio(a: RGB, b: RGB) {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x)
  return (hi + .05) / (lo + .05)
}

/**
 * Text mode for a uniform ground. Settled grounds use the palette's own text color; through the
 * mid-luminance crossing, text snaps to pure white/black (never gray) and the radial glow fades out.
 */
export function resolveGround(base: RGB, lightText: RGB, darkText: RGB): Ground {
  const onWhite = contrastRatio(base, WHITE), onBlack = contrastRatio(base, BLACK)
  const ground = onWhite >= onBlack ? "dark" : "light"
  const palette = ground === "dark" ? lightText : darkText
  const crossing = contrastRatio(base, palette) < CROSSING_CONTRAST
  const fg = crossing ? (ground === "dark" ? WHITE : BLACK) : palette
  const best = Math.max(onWhite, onBlack)
  return { ground, crossing, fg, contrast: contrastRatio(base, fg), glowFactor: clamp((best - 4.6) / (CROSSING_CONTRAST - 4.6)) }
}

/** Progress of a chapter anchor whose top sits at `top` (fraction of viewport) through the band start → end. */
export function bandProgress(top: number, start: number, end: number) {
  if (start === end) return top <= end ? 1 : 0
  return clamp((start - top) / (start - end))
}
