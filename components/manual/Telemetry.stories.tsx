import type { Meta, StoryObj } from "@storybook/react"
import { Telemetry } from "./Telemetry"

const meta: Meta<typeof Telemetry> = {
  title: "Manual/Telemetry",
  component: Telemetry,
}
export default meta

type Story = StoryObj<typeof Telemetry>

export const Default: Story = {
  args: {
    items: [
      { value: "1.4M", unit: "DEVICES", label: "Windows 11 24H2" },
      { value: "8",    unit: "TEAMS",   label: "Building on the pattern" },
      { value: "2",    unit: "YEARS",   label: "Shipping cycle" },
    ],
  },
}
