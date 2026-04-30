import type { Preview } from "@storybook/react"
import React from "react"
import "../app/globals.css"
import "../app/recall/recall.css"

const preview: Preview = {
  globalTypes: {
    mode: {
      name: "Mode",
      defaultValue: "dark",
      toolbar: {
        title: "Mode",
        items: [
          { value: "dark",  title: "Dark" },
          { value: "paper", title: "Paper" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      const mode = (ctx.globals.mode as "dark" | "paper") ?? "dark"
      return (
        <div className="manual" data-mode={mode} style={{ padding: 32, minHeight: "100vh" }}>
          <Story />
        </div>
      )
    },
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
}

export default preview
