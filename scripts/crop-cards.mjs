import sharp from "sharp"
import { fileURLToPath } from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cardsDir = path.resolve(__dirname, "..", "public", "images", "cards")

const sources = ["agents-full-card.png", "recall-full-card.png", "teams-full-card.png"]

for (const file of sources) {
  const src = path.join(cardsDir, file)
  const out = path.join(cardsDir, file.replace("-full-card.png", "-art.png"))
  const meta = await sharp(src).metadata()
  const w = meta.width ?? 1024
  const h = meta.height ?? 454
  // Keep the right ~46% of the image — the gradient + bespoke art, dropping
  // the duplicated headline text on the left half.
  const left = Math.round(w * 0.54)
  const cropWidth = w - left
  await sharp(src).extract({ left, top: 0, width: cropWidth, height: h }).toFile(out)
  console.log(`${file}  ${w}x${h}  →  ${path.basename(out)}  ${cropWidth}x${h}`)
}
