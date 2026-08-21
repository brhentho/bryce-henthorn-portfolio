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
  },
}
