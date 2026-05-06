import type { Meta, StoryObj } from "@storybook/react"
import { CoverPlate } from "./CoverPlate"

const meta: Meta<typeof CoverPlate> = {
  title: "Manual/CoverPlate",
  component: CoverPlate,
  args: {
    number: "07",
    total: "09",
    title: "Trust",
  },
}
export default meta

type Story = StoryObj<typeof CoverPlate>

export const Default: Story = {}

export const SystemTransition: Story = {
  args: {
    number: "02",
    total: "09",
    title: "System",
  },
}
