import type { Meta, StoryObj } from "@storybook/react"
import { DecisionTable } from "./DecisionTable"

const meta: Meta<typeof DecisionTable> = { title: "Manual/DecisionTable", component: DecisionTable }
export default meta
type Story = StoryObj<typeof DecisionTable>
export const Default: Story = { args: {
  label: "Comparing directions",
  options: [
    { option: "App-bound", tradeoff: "Work stays fragmented.", disposition: "Move visibility to the OS." },
    { option: "Taskbar", tradeoff: "Needs shared progress states.", disposition: "Selected foundation." },
  ],
} }
