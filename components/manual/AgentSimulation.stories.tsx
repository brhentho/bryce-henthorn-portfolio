import type { Meta, StoryObj } from "@storybook/react"
import { AgentSimulation } from "./AgentSimulation"

const meta: Meta<typeof AgentSimulation> = {
  title: "Manual/AgentSimulation",
  component: AgentSimulation,
  decorators: [(Story) => <div className="manual"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof AgentSimulation>
export const Default: Story = {}
