import type { StorybookConfig } from "@storybook/nextjs"

const config: StorybookConfig = {
  framework: { name: "@storybook/nextjs", options: {} },
  stories: ["../components/manual/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  docs: { autodocs: false },
  staticDirs: ["../public"],
}

export default config
