import type { Meta, StoryObj } from "@storybook/react"
import { RegistrationMark } from "./RegistrationMark"

const meta: Meta<typeof RegistrationMark> = {
  title: "Manual/RegistrationMark",
  component: RegistrationMark,
}
export default meta

type Story = StoryObj<typeof RegistrationMark>

export const Default: Story = {}
export const Large: Story = { args: { size: 32 } }
