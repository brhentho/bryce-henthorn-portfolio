import type { Meta, StoryObj } from "@storybook/react"
import { CaseBrief } from "./CaseBrief"

const meta: Meta<typeof CaseBrief> = { title: "Manual/CaseBrief", component: CaseBrief }
export default meta
type Story = StoryObj<typeof CaseBrief>
export const Default: Story = { args: {
  lede: "Agent work was scattered across apps, chats and notifications.",
  call: "We anchored it to the taskbar with one shared set of states.",
  ledger: [
    { label: "ROLE", value: "Lead designer, agent visibility" },
    { label: "TEAM", value: "3 engineering partner teams" },
    { label: "YEARS", value: "2025–present" },
    { label: "STATUS", value: "Illustrative story" },
  ],
  links: [{ href: "#decision", label: "The decision" }],
} }
