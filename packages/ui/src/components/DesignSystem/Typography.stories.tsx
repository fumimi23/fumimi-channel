import type {Meta, StoryObj} from '@storybook/react';
import '../../styles/global.css';

/**
 * デジタル庁デザインシステム準拠のタイポグラフィ
 *
 * デジタル庁デザインシステムで定義されたテキストスタイルを採用しています。
 *
 * 参考: https://design.digital.go.jp/dads/foundations/typography/
 *
 * ## フォントファミリー
 * - **本文・見出し**: Noto Sans JP
 * - **コード**: Noto Sans Mono
 *
 * ## フォントウェイト
 * - **Normal (N)**: 400
 * - **Bold (B)**: 700
 *
 * ## テキストスタイルの種類
 * - **Display (Dsp)**: ヘッドコピー等、視覚的インパクト重視
 * - **Standard (Std)**: 見出し・本文等、最も一般的なスタイル
 * - **Dense (Dns)**: 管理画面等、情報量優先
 * - **Oneline (Oln)**: ボタン等、UI要素用の1行スタイル
 * - **Mono**: コード表示用の等幅フォント
 */
const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'デジタル庁デザインシステムで定義されたタイポグラフィスタイル。各テキストスタイルは用途に応じて使い分けます。',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const TextStyleExample = ({
  styleName,
  cssVar,
  text = 'あのイーハトーヴォのすきとおった風 The quick brown fox',
  description,
}: {
  styleName: string;
  cssVar: string;
  text?: string;
  description?: string;
}) => (
  <div style={{marginBottom: '24px', borderBottom: '1px solid var(--border-default)', paddingBottom: '16px'}}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '8px',
      fontSize: '14px',
      color: 'var(--text-secondary)',
    }}>
      <code style={{
        fontFamily: 'var(--font-family-mono)',
        backgroundColor: 'var(--surface-active)',
        padding: '2px 8px',
        borderRadius: '4px',
      }}>
        {styleName}
      </code>
      {description && <span style={{fontSize: '12px'}}>{description}</span>}
    </div>
    <div style={{font: `var(${cssVar})`}}>
      {text}
    </div>
  </div>
);

/**
 * ## Display (Dsp) - ヘッドコピー用
 *
 * ページトップのメッセージやヘッドコピーなど、視覚的なインパクトを与えたい場合に使用。
 * 行高は全て140%、文字間隔は0に設定されています。
 */
export const DisplayStyles: Story = {
  render: () => (
    <div style={{padding: '20px'}}>
      <h2 style={{
        marginBottom: '32px',
        font: 'var(--text-std-28b-150)',
        color: 'var(--text-primary)',
      }}>
        Display Styles (Dsp)
      </h2>

      <h3 style={{
        marginTop: '24px',
        marginBottom: '16px',
        font: 'var(--text-std-20b-150)',
        color: 'var(--text-primary)',
      }}>
        Bold
      </h3>
      <TextStyleExample styleName='Dsp-64B-140' cssVar='--text-dsp-64b-140' description='64px / Bold / 140%' />
      <TextStyleExample styleName='Dsp-57B-140' cssVar='--text-dsp-57b-140' description='57px / Bold / 140%' />
      <TextStyleExample styleName='Dsp-48B-140' cssVar='--text-dsp-48b-140' description='48px / Bold / 140%' />

      <h3 style={{
        marginTop: '24px',
        marginBottom: '16px',
        font: 'var(--text-std-20b-150)',
        color: 'var(--text-primary)',
      }}>
        Normal
      </h3>
      <TextStyleExample styleName='Dsp-64N-140' cssVar='--text-dsp-64n-140' description='64px / Normal / 140%' />
      <TextStyleExample styleName='Dsp-57N-140' cssVar='--text-dsp-57n-140' description='57px / Normal / 140%' />
      <TextStyleExample styleName='Dsp-48N-140' cssVar='--text-dsp-48n-140' description='48px / Normal / 140%' />
    </div>
  ),
};

/**
 * ## Standard (Std) - 見出し・本文用
 *
 * ページの文書構造を形成する見出しや本文など、最も使用頻度が高い普遍的なスタイル。
 * 基本的にフォントサイズは16px以上で使用します。
 */
export const StandardStyles: Story = {
  render: () => (
    <div style={{padding: '20px'}}>
      <h2 style={{
        marginBottom: '32px',
        font: 'var(--text-std-28b-150)',
        color: 'var(--text-primary)',
      }}>
        Standard Styles (Std)
      </h2>

      <h3 style={{
        marginTop: '24px',
        marginBottom: '16px',
        font: 'var(--text-std-20b-150)',
        color: 'var(--text-primary)',
      }}>
        Bold - 見出し用
      </h3>
      <TextStyleExample styleName='Std-45B-140' cssVar='--text-std-45b-140' description='45px / Bold / 140% / 0' />
      <TextStyleExample styleName='Std-36B-140' cssVar='--text-std-36b-140' description='36px / Bold / 140% / 1%' />
      <TextStyleExample styleName='Std-32B-150' cssVar='--text-std-32b-150' description='32px / Bold / 150% / 1%' />
      <TextStyleExample styleName='Std-28B-150' cssVar='--text-std-28b-150' description='28px / Bold / 150% / 1%' />
      <TextStyleExample styleName='Std-26B-150' cssVar='--text-std-26b-150' description='26px / Bold / 150% / 2%' />
      <TextStyleExample styleName='Std-24B-150' cssVar='--text-std-24b-150' description='24px / Bold / 150% / 2%' />
      <TextStyleExample styleName='Std-22B-150' cssVar='--text-std-22b-150' description='22px / Bold / 150% / 2%' />
      <TextStyleExample styleName='Std-20B-150' cssVar='--text-std-20b-150' description='20px / Bold / 150% / 2%' />
      <TextStyleExample styleName='Std-18B-160' cssVar='--text-std-18b-160' description='18px / Bold / 160% / 2%' />
      <TextStyleExample styleName='Std-17B-170' cssVar='--text-std-17b-170' description='17px / Bold / 170% / 2%' />
      <TextStyleExample styleName='Std-16B-170' cssVar='--text-std-16b-170' description='16px / Bold / 170% / 2%' />
      <TextStyleExample styleName='Std-16B-175' cssVar='--text-std-16b-175' description='16px / Bold / 175% / 2%' />

      <h3 style={{
        marginTop: '32px',
        marginBottom: '16px',
        font: 'var(--text-std-20b-150)',
        color: 'var(--text-primary)',
      }}>
        Normal - 本文用
      </h3>
      <TextStyleExample
        styleName='Std-17N-170'
        cssVar='--text-std-17n-170'
        description='17px / Normal / 170% / 2% (推奨本文)'
        text='宮沢賢治の作品には、イーハトーヴォという架空の理想郷が登場します。これは作者の故郷である岩手県をモデルにした、心象世界です。透き通った風、きらめく草原、そして優しい人々が暮らす世界として描かれています。The quick brown fox jumps over the lazy dog.'
      />
      <TextStyleExample
        styleName='Std-16N-170'
        cssVar='--text-std-16n-170'
        description='16px / Normal / 170% / 2% (標準本文)'
        text='デジタル庁デザインシステムでは、可読性と視認性を重視し、本文には16px以上のフォントサイズを推奨しています。行間は少なくとも1.5倍（150%）を維持することで、テキストが読みやすくなります。Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      />
      <TextStyleExample
        styleName='Std-16N-175'
        cssVar='--text-std-16n-175'
        description='16px / Normal / 175% / 2% (ゆとりある本文)'
        text='さらに行間を広げることで、心理的負荷を軽減し、より快適な読書体験を提供できます。特に長文コンテンツでは、このような配慮が重要です。Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      />
    </div>
  ),
};

/**
 * ## Dense (Dns) - 情報量優先
 *
 * 管理画面や業務システムなど、限られた画面領域での表示情報量を優先したスタイル。
 * データテーブルなど、領域的制約がある場合に使用します。
 */
export const DenseStyles: Story = {
  render: () => (
    <div style={{padding: '20px'}}>
      <h2 style={{
        marginBottom: '32px',
        font: 'var(--text-std-28b-150)',
        color: 'var(--text-primary)',
      }}>
        Dense Styles (Dns)
      </h2>

      <p style={{
        marginBottom: '24px',
        font: 'var(--text-std-16n-170)',
        color: 'var(--text-secondary)',
      }}>
        表示情報量を優先し、行間を狭めたスタイル。管理画面やデータテーブルに適しています。
      </p>

      <h3 style={{
        marginTop: '24px',
        marginBottom: '16px',
        font: 'var(--text-std-20b-150)',
        color: 'var(--text-primary)',
      }}>
        Bold
      </h3>
      <TextStyleExample styleName='Dns-17B-130' cssVar='--text-dns-17b-130' description='17px / Bold / 130% / 0' />
      <TextStyleExample styleName='Dns-17B-120' cssVar='--text-dns-17b-120' description='17px / Bold / 120% / 0' />
      <TextStyleExample styleName='Dns-16B-130' cssVar='--text-dns-16b-130' description='16px / Bold / 130% / 0' />
      <TextStyleExample styleName='Dns-16B-120' cssVar='--text-dns-16b-120' description='16px / Bold / 120% / 0' />
      <TextStyleExample styleName='Dns-14B-130' cssVar='--text-dns-14b-130' description='14px / Bold / 130% / 0' />
      <TextStyleExample styleName='Dns-14B-120' cssVar='--text-dns-14b-120' description='14px / Bold / 120% / 0' />

      <h3 style={{
        marginTop: '32px',
        marginBottom: '16px',
        font: 'var(--text-std-20b-150)',
        color: 'var(--text-primary)',
      }}>
        Normal
      </h3>
      <TextStyleExample styleName='Dns-17N-130' cssVar='--text-dns-17n-130' description='17px / Normal / 130% / 0' />
      <TextStyleExample styleName='Dns-17N-120' cssVar='--text-dns-17n-120' description='17px / Normal / 120% / 0' />
      <TextStyleExample styleName='Dns-16N-130' cssVar='--text-dns-16n-130' description='16px / Normal / 130% / 0' />
      <TextStyleExample styleName='Dns-16N-120' cssVar='--text-dns-16n-120' description='16px / Normal / 120% / 0' />
      <TextStyleExample styleName='Dns-14N-130' cssVar='--text-dns-14n-130' description='14px / Normal / 130% / 0' />
      <TextStyleExample styleName='Dns-14N-120' cssVar='--text-dns-14n-120' description='14px / Normal / 120% / 0' />
    </div>
  ),
};

/**
 * ## Oneline (Oln) - UI要素用
 *
 * ボタンなど、1行展開を前提としたUI要素に適用するスタイル。
 * 行間は100%で、上下の余白を最小限にしています。
 */
export const OnelineStyles: Story = {
  render: () => (
    <div style={{padding: '20px'}}>
      <h2 style={{
        marginBottom: '32px',
        font: 'var(--text-std-28b-150)',
        color: 'var(--text-primary)',
      }}>
        Oneline Styles (Oln)
      </h2>

      <p style={{
        marginBottom: '24px',
        font: 'var(--text-std-16n-170)',
        color: 'var(--text-secondary)',
      }}>
        ボタンなどのUI要素用。行高100%、文字間隔2%で、コンパクトな1行表示を実現します。
      </p>

      <h3 style={{
        marginTop: '24px',
        marginBottom: '16px',
        font: 'var(--text-std-20b-150)',
        color: 'var(--text-primary)',
      }}>
        Bold
      </h3>
      <div style={{
 display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap',
}}>
        <button style={{
          font: 'var(--text-oln-17b-100)',
          letterSpacing: 'var(--letter-spacing-2)',
          padding: '12px 24px',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          ボタン 17px Bold
        </button>
        <button style={{
          font: 'var(--text-oln-16b-100)',
          letterSpacing: 'var(--letter-spacing-2)',
          padding: '10px 20px',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          ボタン 16px Bold
        </button>
        <button style={{
          font: 'var(--text-oln-14b-100)',
          letterSpacing: 'var(--letter-spacing-2)',
          padding: '8px 16px',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          ボタン 14px Bold
        </button>
      </div>

      <h3 style={{
        marginTop: '32px',
        marginBottom: '16px',
        font: 'var(--text-std-20b-150)',
        color: 'var(--text-primary)',
      }}>
        Normal
      </h3>
      <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
        <button style={{
          font: 'var(--text-oln-17n-100)',
          letterSpacing: 'var(--letter-spacing-2)',
          padding: '12px 24px',
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',
          border: '2px solid var(--color-primary)',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          ボタン 17px Normal
        </button>
        <button style={{
          font: 'var(--text-oln-16n-100)',
          letterSpacing: 'var(--letter-spacing-2)',
          padding: '10px 20px',
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',
          border: '2px solid var(--color-primary)',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          ボタン 16px Normal
        </button>
        <button style={{
          font: 'var(--text-oln-14n-100)',
          letterSpacing: 'var(--letter-spacing-2)',
          padding: '8px 16px',
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',
          border: '2px solid var(--color-primary)',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          ボタン 14px Normal
        </button>
      </div>
    </div>
  ),
};

/**
 * ## Mono - コード表示用
 *
 * コード系コンテンツへの適用を想定した等幅フォントのスタイル。
 * Noto Sans Monoを使用し、文字・単語レベルの可読性を優先しています。
 */
export const MonoStyles: Story = {
  render: () => (
    <div style={{padding: '20px'}}>
      <h2 style={{
        marginBottom: '32px',
        font: 'var(--text-std-28b-150)',
        color: 'var(--text-primary)',
      }}>
        Mono Styles
      </h2>

      <p style={{
        marginBottom: '24px',
        font: 'var(--text-std-16n-170)',
        color: 'var(--text-secondary)',
      }}>
        コード表示用の等幅フォント。行高150%、文字間隔0で、コードの可読性を重視しています。
      </p>

      <h3 style={{
        marginTop: '24px',
        marginBottom: '16px',
        font: 'var(--text-std-20b-150)',
        color: 'var(--text-primary)',
      }}>
        Bold
      </h3>
      <TextStyleExample
        styleName='Mono-17B-150'
        cssVar='--text-mono-17b-150'
        description='17px / Bold / 150% / 0'
        text="const greeting = 'Hello, World!';"
      />
      <TextStyleExample
        styleName='Mono-16B-150'
        cssVar='--text-mono-16b-150'
        description='16px / Bold / 150% / 0'
        text='function add(a: number, b: number) { return a + b; }'
      />
      <TextStyleExample
        styleName='Mono-14B-150'
        cssVar='--text-mono-14b-150'
        description='14px / Bold / 150% / 0'
        text='npm install @fumimi-channel/ui'
      />

      <h3 style={{
        marginTop: '32px',
        marginBottom: '16px',
        font: 'var(--text-std-20b-150)',
        color: 'var(--text-primary)',
      }}>
        Normal
      </h3>
      <div style={{
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: 'var(--surface-default)',
        border: '1px solid var(--border-default)',
        borderRadius: '4px',
      }}>
        <pre style={{
          font: 'var(--text-mono-17n-150)',
          letterSpacing: 'var(--letter-spacing-0)',
          margin: 0,
          color: 'var(--text-primary)',
        }}>
{`interface User {
  id: string;
  name: string;
  email: string;
}`}
        </pre>
      </div>

      <div style={{
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: 'var(--surface-default)',
        border: '1px solid var(--border-default)',
        borderRadius: '4px',
      }}>
        <pre style={{
          font: 'var(--text-mono-16n-150)',
          letterSpacing: 'var(--letter-spacing-0)',
          margin: 0,
          color: 'var(--text-primary)',
        }}>
{`export const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};`}
        </pre>
      </div>

      <div style={{
        padding: '16px',
        backgroundColor: 'var(--surface-default)',
        border: '1px solid var(--border-default)',
        borderRadius: '4px',
      }}>
        <pre style={{
          font: 'var(--text-mono-14n-150)',
          letterSpacing: 'var(--letter-spacing-0)',
          margin: 0,
          color: 'var(--text-primary)',
        }}>
{`git commit -m "feat: デジタル庁タイポグラフィ対応"
git push origin feat/typography`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * ## フォント読み込み
 *
 * デジタル庁デザインシステムで推奨されているフォントの読み込み方法。
 */
export const FontLoading: Story = {
  render: () => (
    <div style={{padding: '20px'}}>
      <h2 style={{
        marginBottom: '32px',
        font: 'var(--text-std-28b-150)',
        color: 'var(--text-primary)',
      }}>
        フォント読み込み
      </h2>

      <div style={{
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: 'var(--surface-default)',
        border: '1px solid var(--border-default)',
        borderRadius: '4px',
      }}>
        <h3 style={{
          marginBottom: '12px',
          font: 'var(--text-std-18b-160)',
          color: 'var(--text-primary)',
        }}>
          Google Fonts経由での読み込み
        </h3>
        <pre style={{
          font: 'var(--text-mono-14n-150)',
          letterSpacing: 'var(--letter-spacing-0)',
          margin: 0,
          color: 'var(--text-primary)',
          overflow: 'auto',
        }}>
{'@import url(\'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Sans+Mono:wght@400;700&display=swap\');'}
        </pre>
      </div>

      <div style={{
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: 'var(--surface-default)',
        border: '1px solid var(--border-default)',
        borderRadius: '4px',
      }}>
        <h3 style={{
          marginBottom: '12px',
          font: 'var(--text-std-18b-160)',
          color: 'var(--text-primary)',
        }}>
          CSSでの指定例
        </h3>
        <pre style={{
          font: 'var(--text-mono-14n-150)',
          letterSpacing: 'var(--letter-spacing-0)',
          margin: 0,
          color: 'var(--text-primary)',
          overflow: 'auto',
        }}>
{`body {
  font-family:
    'Noto Sans JP',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

code {
  font-family: 'Noto Sans Mono', monospace;
}`}
        </pre>
      </div>

      <p style={{
        font: 'var(--text-std-16n-170)',
        color: 'var(--text-secondary)',
        marginTop: '24px',
      }}>
        Noto Sans JPとNoto Sans Monoは、オープンソース（SIL Open Font License 1.1）で提供されており、
        Webフォントとして無料で利用できます。
      </p>
    </div>
  ),
};
