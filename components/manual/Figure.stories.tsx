import type { Meta, StoryObj } from "@storybook/react"
import { Figure } from "./Figure"

const meta: Meta<typeof Figure> = {
  title: "Manual/Figure",
  component: Figure,
}
export default meta

type Story = StoryObj<typeof Figure>

const PlaceholderSVG = () => (
  <svg viewBox="0 0 1600 900" width="100%" fill="none" stroke="var(--rule-strong)" strokeWidth={1}>
    <rect x="40" y="40" width="1520" height="820" />
    <line x1="40" y1="40" x2="1560" y2="860" />
    <line x1="1560" y1="40" x2="40" y2="860" />
  </svg>
)

export const Default: Story = {
  args: {
    number: "2.1",
    caption: "Research synthesis across five inputs",
    children: <PlaceholderSVG />,
  },
}

export const WithCrossref: Story = {
  args: {
    number: "2.2",
    caption: "Rejected concepts",
    cf: { section: "1.4", href: "#problem" },
    children: <PlaceholderSVG />,
  },
}

export const NoCaption: Story = {
  args: {
    number: "0.1",
    children: <PlaceholderSVG />,
  },
}
