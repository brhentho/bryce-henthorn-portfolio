import type { Meta, StoryObj } from "@storybook/react"
import { Crossref } from "./Crossref"

const meta: Meta<typeof Crossref> = {
  title: "Manual/Crossref",
  component: Crossref,
  args: { section: "1.4", href: "#problem" },
}
export default meta

type Story = StoryObj<typeof Crossref>

export const Default: Story = {}
export const WithLabel: Story = {
  args: { label: "Original framing assumption" },
}
