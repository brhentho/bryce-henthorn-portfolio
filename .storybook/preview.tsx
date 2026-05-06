import type { Preview } from "@storybook/react"
import React from "react"
import "../app/globals.css"
import "../app/recall/recall.css"

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="manual" style={{ padding: 32, minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
}

export default preview
