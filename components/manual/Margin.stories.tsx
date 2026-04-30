import type { Meta, StoryObj } from "@storybook/react"
import { Margin } from "./Margin"

const meta: Meta<typeof Margin> = {
  title: "Manual/Margin",
  component: Margin,
}
export default meta

type Story = StoryObj<typeof Margin>

export const Default: Story = {
  args: {
    children:
      "Designer's note: this is what marginalia looks like — quiet, mono, a beat apart from the body copy.",
  },
}

export const InGridContext: Story = {
  render: (args) => (
    <div className="section-grid">
      <p className="t-body max-w-[60ch]">
        On desktop, the margin column hosts asides without breaking the flow of body
        copy. On mobile, the same content reflows inline as a left-bordered block.
      </p>
      <Margin {...args} />
    </div>
  ),
  args: {
    children: "I argued for a flatter taxonomy here, but the team chose nesting for navigability.",
  },
}
