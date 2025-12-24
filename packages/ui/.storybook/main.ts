import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  previewHead: (head) => `
    ${head}
    <style>
      body {
        background-color: var(--background-primary) !important;
        color: var(--text-primary) !important;
        transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
      }
    </style>
  `,
};

export default config;
