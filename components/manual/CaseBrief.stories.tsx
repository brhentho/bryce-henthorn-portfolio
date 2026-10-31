import type { Meta, StoryObj } from "@storybook/react"
import { CaseBrief } from "./CaseBrief"

const meta: Meta<typeof CaseBrief> = { title: "Manual/CaseBrief", component: CaseBrief }
export default meta
type Story = StoryObj<typeof CaseBrief>
export const Default: Story = { args: {
  problem: "Agent progress is scattered across apps.",
  ownership: "Visibility and orchestration across partner teams.",
  decision: "Use a familiar taskbar anchor with a shared state language.",
  outcome: "A five-state visual lexicon and interaction prototypes.",
  status: "Illustrative story; not a release claim.",
  links: [{ href: "#decision", label: "The decision" }],
} }
