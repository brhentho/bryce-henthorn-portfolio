import sharp from "sharp"
import { fileURLToPath } from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.resolve(__dirname, "..", "public", "images", "agents")
const src = path.join(dir, "_full-hero.png")
const out = path.join(dir, "hero-demo.png")

const meta = await sharp(src).metadata()
const w = meta.width ?? 1024
const h = meta.height ?? 628
// Drop the top ~32% of the image — that's the h1 "Making AI agents visible…"
// rendered in the Figma frame. We render the h1 ourselves; keep only the
// Demo + Taskbar composition below.
const top = Math.round(h * 0.32)
const cropHeight = h - top
await sharp(src).extract({ left: 0, top, width: w, height: cropHeight }).toFile(out)
console.log(`${path.basename(src)}  ${w}x${h}  →  ${path.basename(out)}  ${w}x${cropHeight}`)
