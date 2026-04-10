import { put } from "@vercel/blob"
import { readFileSync } from "fs"
import { basename } from "path"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const filePath = process.argv[2]
if (!filePath) {
  console.error("Usage: npx tsx scripts/upload-video.ts <path-to-video>")
  process.exit(1)
}

const file = readFileSync(filePath)
const name = basename(filePath)

const { url } = await put(`portfolio/${name}`, file, { access: "public" })
console.log("\nUploaded successfully!")
console.log("URL:", url)
console.log('\nPaste this into videoSrc="..." on your FigurePanel')
