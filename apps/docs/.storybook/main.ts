import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/*.stories.tsx", "../stories/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },

  core: {},

  docs: {
    autodocs: true,
  },
};

export default config;
