import type { Preview } from '@storybook/react';
import '../src/styles/global.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Storybookのデフォルト背景を無効化（CSS変数で管理）
    backgrounds: {
      disable: true,
    },
    // ドキュメントページのスタイル設定
    docs: {},
  },
  globalTypes: {
    theme: {
      description: 'テーマモード',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'ライトモード' },
          { value: 'dark', icon: 'moon', title: 'ダークモード' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

// ツールバーのテーマ切り替えに応じてdata-theme属性を変更
export const decorators = [
  (Story: any, context: any) => {
    const theme = context.globals.theme || 'light';
    
    // useEffect的な処理をReact外で実行
    if (typeof window !== 'undefined') {
      // data-theme属性を設定
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      
      // 背景色を直接設定（Storybookのデフォルトスタイルを上書き）
      const root = document.getElementById('storybook-root');
      const docsRoot = document.getElementById('storybook-docs');
      const mainContainer = document.querySelector('.sb-show-main') as HTMLElement;
      
      if (root) {
        root.style.backgroundColor = 'var(--background-primary)';
        root.style.color = 'var(--text-primary)';
      }
      
      if (docsRoot) {
        docsRoot.style.backgroundColor = 'var(--background-primary)';
        docsRoot.style.color = 'var(--text-primary)';
      }
      
      if (mainContainer) {
        mainContainer.style.backgroundColor = 'var(--background-primary)';
      }
    }

    return Story();
  },
];

export default preview;
