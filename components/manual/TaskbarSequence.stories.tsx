import type { Meta, StoryObj } from "@storybook/react"
import { TaskbarSequence } from "./TaskbarSequence"

const meta: Meta<typeof TaskbarSequence> = {
  title: "Manual/TaskbarSequence",
  component: TaskbarSequence,
  decorators: [(Story) => <div className="manual"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof TaskbarSequence>
export const Default: Story = {}
