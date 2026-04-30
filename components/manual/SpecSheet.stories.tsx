import type { Meta, StoryObj } from "@storybook/react"
import { SpecSheet } from "./SpecSheet"

const meta: Meta<typeof SpecSheet> = {
  title: "Manual/SpecSheet",
  component: SpecSheet,
}
export default meta

type Story = StoryObj<typeof SpecSheet>

export const Default: Story = {
  args: {
    rows: [
      { label: "ROLE",     value: "Senior UX/Product Designer" },
      { label: "PLATFORM", value: "Windows 11 (Copilot+ PCs)" },
      { label: "TIMELINE", value: "2023 – 2024" },
      { label: "TEAM",     value: "12 designers, 60 engineers" },
      { label: "MY FOCUS", value: "Semantic search experience" },
      { label: "STATUS",   value: "Shipped (Windows 11, 2024)" },
    ],
  },
}
