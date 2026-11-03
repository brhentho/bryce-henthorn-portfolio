import type { Metadata } from "next"
import { BHome } from "@/components/explore/b/BHome"

export const metadata: Metadata = { title: "Direction B · Project destinations" }

export default function Page() {
  return <BHome />
}

