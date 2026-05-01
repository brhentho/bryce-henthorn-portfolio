import type { Meta, StoryObj } from "@storybook/react"
import { ModeToggle } from "./ModeToggle"

const meta: Meta<typeof ModeToggle> = {
  title: "Manual/ModeToggle",
  component: ModeToggle,
}
export default meta

type Story = StoryObj<typeof ModeToggle>

export const Default: Story = {
  render: () => (
    <div style={{ padding: 64, minHeight: "60vh" }}>
      <ModeToggle />
      <p className="t-body max-w-[50ch]">
        ModeToggle reads from <code>next-themes</code>. Click the toolbar Mode toggle
        in the top bar to flip between dark and paper, or click the toggle here.
      </p>
    </div>
  ),
}
