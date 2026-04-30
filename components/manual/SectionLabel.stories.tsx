import type { Meta, StoryObj } from "@storybook/react"
import { SectionLabel } from "./SectionLabel"

const meta: Meta<typeof SectionLabel> = {
  title: "Manual/SectionLabel",
  component: SectionLabel,
  args: {
    number: "02",
    label: "Methodology",
    title: "How we got there",
  },
}
export default meta

type Story = StoryObj<typeof SectionLabel>

export const Default: Story = {}
