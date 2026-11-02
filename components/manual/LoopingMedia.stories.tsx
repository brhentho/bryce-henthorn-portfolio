import type { Meta, StoryObj } from "@storybook/react"
import { LoopingMedia } from "./LoopingMedia"

const meta: Meta<typeof LoopingMedia> = {
  title: "Manual/LoopingMedia",
  component: LoopingMedia,
  decorators: [
    (Story) => (
      <div className="manual max-w-3xl bg-[color:var(--ink)] p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof LoopingMedia>

export const Default: Story = {
  args: {
    src: "https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/Composer.mp4",
    label: "Ask Copilot composer invoking an agent",
    poster: "/images/agents/composer-poster.jpg",
  },
}

export const Unavailable: Story = {
  args: {
    src: "/media/intentionally-missing.mp4",
    className: "aspect-[16/9] max-h-[520px] overflow-hidden",
    label: "Unavailable agent demonstration",
    poster: "/images/agents/taskbar-poster.jpg",
    description: "The hover card exposes agent progress above the taskbar. The still frame preserves the interaction context when playback is unavailable.",
  },
}
