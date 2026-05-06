import sharp from "sharp"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..", "public", "images", "cards")

const files = ["agents-art.png", "recall-art.png", "teams-art.png"]
const ALPHA_THRESHOLD = 100 // anything softer than this is shadow / glow

async function trimByAlpha(name) {
  const input = path.join(root, name)
  const output = input // overwrite in place
  const buf = await sharp(input).raw().toBuffer({ resolveWithObject: true })
  const { data, info } = buf
  const { width, height, channels } = info
  if (channels < 4) {
    console.log(`${name}: no alpha, skipping`)
    return
  }
  let top = height
  let bottom = -1
  let left = width
  let right = -1
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * channels + 3]
      if (a >= ALPHA_THRESHOLD) {
        if (y < top) top = y
        if (y > bottom) bottom = y
        if (x < left) left = x
        if (x > right) right = x
      }
    }
  }
  if (right < 0) {
    console.log(`${name}: no opaque pixels found`)
    return
  }
  const newW = right - left + 1
  const newH = bottom - top + 1
  await sharp(input)
    .extract({ left, top, width: newW, height: newH })
    .toFile(output + ".tmp")
  // atomic replace
  const fs = await import("node:fs/promises")
  await fs.rename(output + ".tmp", output)
  console.log(`${name}: ${width}×${height} → ${newW}×${newH}`)
}

for (const f of files) {
  await trimByAlpha(f)
}
