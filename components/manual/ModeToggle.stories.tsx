import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { ModeToggle } from "./ModeToggle"

const meta: Meta<typeof ModeToggle> = {
  title: "Manual/ModeToggle",
  component: ModeToggle,
}
export default meta

type Story = StoryObj<typeof ModeToggle>

export const Interactive: Story = {
  render: () => {
    const Demo = () => {
      const [mode, setMode] = useState<"dark" | "paper">("dark")
      return (
        <div data-mode={mode} className="manual" style={{ padding: 64, minHeight: "60vh" }}>
          <ModeToggle mode={mode} onChange={setMode} />
          <p className="t-body max-w-[50ch]">
            Click the toggle in the corner. Tokens swap instantly with no animation.
            Current mode: <span className="t-mono-label">{mode.toUpperCase()}</span>
          </p>
        </div>
      )
    }
    return <Demo />
  },
}
