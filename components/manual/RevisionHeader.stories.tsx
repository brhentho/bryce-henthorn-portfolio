import type { Meta, StoryObj } from "@storybook/react"
import { RevisionHeader } from "./RevisionHeader"

const meta: Meta<typeof RevisionHeader> = {
  title: "Manual/RevisionHeader",
  component: RevisionHeader,
  args: {
    rev: "2.3",
    date: "April 2026",
    name: "Bryce Henthorn",
    doc: "Recall",
  },
  parameters: { layout: "padded" },
}
export default meta

type Story = StoryObj<typeof RevisionHeader>

export const Default: Story = {}
