import type { Meta, StoryObj } from "@storybook/react"
import { StateDiagram } from "./StateDiagram"

const meta: Meta<typeof StateDiagram> = {
  title: "Manual/StateDiagram",
  component: StateDiagram,
}
export default meta

type Story = StoryObj<typeof StateDiagram>

export const Default: Story = {
  args: {
    states: [
      { label: "CAPTURE" },
      { label: "OCR" },
      { label: "INDEX" },
      { label: "QUERY" },
      { label: "RESULT" },
    ],
    duration: 6000,
  },
}

export const Fast: Story = {
  args: {
    states: [
      { label: "INPUT" },
      { label: "PARSE" },
      { label: "EMIT" },
    ],
    duration: 2500,
  },
}
