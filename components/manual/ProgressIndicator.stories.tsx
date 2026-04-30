import type { Meta, StoryObj } from "@storybook/react"
import { ProgressIndicator } from "./ProgressIndicator"

const meta: Meta<typeof ProgressIndicator> = {
  title: "Manual/ProgressIndicator",
  component: ProgressIndicator,
}
export default meta

type Story = StoryObj<typeof ProgressIndicator>

export const Default: Story = {
  render: () => (
    <div>
      <ProgressIndicator />
      {Array.from({ length: 4 }, (_, i) => (
        <section
          key={i}
          data-section
          style={{ minHeight: "100vh", padding: 32, borderBottom: "1px solid var(--rule)" }}
        >
          <p className="t-mono-label">§ {String(i + 1).padStart(2, "0")} / SECTION</p>
          <h2 className="t-h1 mt-3">Section {i + 1}</h2>
        </section>
      ))}
    </div>
  ),
}
