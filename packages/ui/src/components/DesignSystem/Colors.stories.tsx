import type {Meta} from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Colors',
  parameters: {
    docs: {
      description: {
        component: 'デジタル庁デザインシステムを参考にしたカラーパレット。WCAG 2.1 AAレベルのアクセシビリティ基準を満たしています。',
      },
    },
  },
};

export default meta;

const ColorSwatch = ({color, name, hex}: {color: string; name: string; hex?: string}) => (
  <div style={{marginBottom: '8px'}}>
    <div
      style={{
        width: '100%',
        height: '60px',
        backgroundColor: `var(${color})`,
        borderRadius: '8px',
        border: '1px solid var(--color-gray-200)',
        marginBottom: '8px',
      }}
    />
    <div style={{fontSize: '14px', fontWeight: '500'}}>{name}</div>
    <div style={{fontSize: '12px', color: 'var(--color-gray-600)'}}>
      {color}
      {hex && ` (${hex})`}
    </div>
  </div>
);

const ColorGrid = ({children}: {children: React.ReactNode}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '24px',
      marginBottom: '48px',
    }}
  >
    {children}
  </div>
);

const Section = ({title, children}: {title: string; children: React.ReactNode}) => (
  <div style={{marginBottom: '48px'}}>
    <h2 style={{marginBottom: '24px', fontSize: '24px', fontWeight: '600'}}>{title}</h2>
    {children}
  </div>
);

export const Primary = () => (
  <Section title='プライマリーカラー（Primary）'>
    <p style={{marginBottom: '24px', color: 'var(--color-gray-700)'}}>
      ブランドカラー。主要なアクション、CTAボタン、アクティブ状態に使用します。
    </p>
    <ColorGrid>
      <ColorSwatch color='--color-primary-50' name='Primary 50' />
      <ColorSwatch color='--color-primary-100' name='Primary 100' />
      <ColorSwatch color='--color-primary-200' name='Primary 200' />
      <ColorSwatch color='--color-primary-300' name='Primary 300' />
      <ColorSwatch color='--color-primary-400' name='Primary 400' />
      <ColorSwatch color='--color-primary' name='Primary (メイン)' hex='#1976d2' />
      <ColorSwatch color='--color-primary-600' name='Primary 600' />
      <ColorSwatch color='--color-primary-700' name='Primary 700' />
      <ColorSwatch color='--color-primary-hover' name='Primary Hover' />
      <ColorSwatch color='--color-primary-active' name='Primary Active' />
    </ColorGrid>
  </Section>
);

export const Semantic = () => (
  <>
    <Section title='セマンティックカラー（Semantic）'>
      <p style={{marginBottom: '24px', color: 'var(--color-gray-700)'}}>
        特定の意味や状態を表すカラー。一貫性のある情報伝達に使用します。
      </p>

      <h3 style={{marginBottom: '16px', fontSize: '18px', fontWeight: '600'}}>Success（成功・完了）</h3>
      <ColorGrid>
        <ColorSwatch color='--color-success-50' name='Success 50' />
        <ColorSwatch color='--color-success-100' name='Success 100' />
        <ColorSwatch color='--color-success-200' name='Success 200' />
        <ColorSwatch color='--color-success' name='Success (メイン)' hex='#2e7d32' />
        <ColorSwatch color='--color-success-600' name='Success 600' />
        <ColorSwatch color='--color-success-700' name='Success 700' />
      </ColorGrid>

      <h3 style={{
 marginBottom: '16px', fontSize: '18px', fontWeight: '600', marginTop: '32px',
}}>
        Warning（警告・注意）
      </h3>
      <ColorGrid>
        <ColorSwatch color='--color-warning-50' name='Warning 50' />
        <ColorSwatch color='--color-warning-100' name='Warning 100' />
        <ColorSwatch color='--color-warning-200' name='Warning 200' />
        <ColorSwatch color='--color-warning' name='Warning (メイン)' hex='#f57c00' />
        <ColorSwatch color='--color-warning-600' name='Warning 600' />
        <ColorSwatch color='--color-warning-700' name='Warning 700' />
      </ColorGrid>

      <h3 style={{
 marginBottom: '16px', fontSize: '18px', fontWeight: '600', marginTop: '32px',
}}>
        Error/Danger（エラー・危険）
      </h3>
      <ColorGrid>
        <ColorSwatch color='--color-error-50' name='Error 50' />
        <ColorSwatch color='--color-error-100' name='Error 100' />
        <ColorSwatch color='--color-error-200' name='Error 200' />
        <ColorSwatch color='--color-error' name='Error (メイン)' hex='#c62828' />
        <ColorSwatch color='--color-error-600' name='Error 600' />
        <ColorSwatch color='--color-error-700' name='Error 700' />
      </ColorGrid>

      <h3 style={{
 marginBottom: '16px', fontSize: '18px', fontWeight: '600', marginTop: '32px',
}}>Info（情報）</h3>
      <ColorGrid>
        <ColorSwatch color='--color-info-50' name='Info 50' />
        <ColorSwatch color='--color-info-100' name='Info 100' />
        <ColorSwatch color='--color-info-200' name='Info 200' />
        <ColorSwatch color='--color-info' name='Info (メイン)' hex='#0288d1' />
        <ColorSwatch color='--color-info-600' name='Info 600' />
        <ColorSwatch color='--color-info-700' name='Info 700' />
      </ColorGrid>
    </Section>
  </>
);

export const Neutral = () => (
  <Section title='ニュートラルカラー（Neutral）'>
    <p style={{marginBottom: '24px', color: 'var(--color-gray-700)'}}>
      背景、テキスト、境界線などの基本要素に使用するグレースケール。
    </p>
    <ColorGrid>
      <ColorSwatch color='--color-white' name='White' hex='#ffffff' />
      <ColorSwatch color='--color-gray-50' name='Gray 50' />
      <ColorSwatch color='--color-gray-100' name='Gray 100' />
      <ColorSwatch color='--color-gray-200' name='Gray 200' />
      <ColorSwatch color='--color-gray-300' name='Gray 300' />
      <ColorSwatch color='--color-gray-400' name='Gray 400' />
      <ColorSwatch color='--color-gray-500' name='Gray 500' />
      <ColorSwatch color='--color-gray-600' name='Gray 600' />
      <ColorSwatch color='--color-gray-700' name='Gray 700' />
      <ColorSwatch color='--color-gray-800' name='Gray 800' />
      <ColorSwatch color='--color-gray-900' name='Gray 900' />
      <ColorSwatch color='--color-black' name='Black' hex='#000000' />
    </ColorGrid>
  </Section>
);

export const Links = () => (
  <Section title='リンクカラー（Link）'>
    <p style={{marginBottom: '24px', color: 'var(--color-gray-700)'}}>
      ウェブの慣習に従った青系と訪問済み紫系のカラー。
    </p>
    <ColorGrid>
      <ColorSwatch color='--color-link' name='Link Default' hex='#0077cc' />
      <ColorSwatch color='--color-link-hover' name='Link Hover' />
      <ColorSwatch color='--color-link-visited' name='Link Visited' hex='#800080' />
      <ColorSwatch color='--color-link-visited-hover' name='Link Visited Hover' />
    </ColorGrid>
  </Section>
);

export const Accent = () => (
  <Section title='アクセントカラー（Accent）'>
    <p style={{marginBottom: '24px', color: 'var(--color-gray-700)'}}>
      特定の要素に注意を引くための補完的なカラー。多用せず、重要な要素のハイライトに使用します。
    </p>
    <ColorGrid>
      <ColorSwatch color='--color-accent-cyan' name='Accent Cyan' />
      <ColorSwatch color='--color-accent-green' name='Accent Green' />
      <ColorSwatch color='--color-accent-lime' name='Accent Lime' />
      <ColorSwatch color='--color-accent-orange' name='Accent Orange' />
      <ColorSwatch color='--color-accent-purple' name='Accent Purple' />
      <ColorSwatch color='--color-accent-magenta' name='Accent Magenta' />
    </ColorGrid>
  </Section>
);

export const Accessibility = () => (
  <Section title='アクセシビリティガイドライン'>
    <div style={{padding: '24px', backgroundColor: 'var(--color-gray-50)', borderRadius: '8px'}}>
      <h3 style={{marginBottom: '16px', fontSize: '18px', fontWeight: '600'}}>コントラスト比の要件</h3>
      <ul style={{lineHeight: '1.8', color: 'var(--color-gray-700)'}}>
        <li>
          <strong>テキスト:</strong> 背景とのコントラスト比 <strong>4.5:1以上</strong>（WCAG AA）
        </li>
        <li>
          <strong>UI要素（ボタン、アイコンなど）:</strong> 背景とのコントラスト比 <strong>3:1以上</strong>
        </li>
        <li>
          <strong>大きなテキスト（18px以上または太字14px以上）:</strong> 3:1以上でも可
        </li>
      </ul>

      <h3 style={{
 marginTop: '24px', marginBottom: '16px', fontSize: '18px', fontWeight: '600',
}}>
        ベストプラクティス
      </h3>
      <ul style={{lineHeight: '1.8', color: 'var(--color-gray-700)'}}>
        <li>色だけに頼らず、アイコンやテキストラベルも併用する</li>
        <li>フォーカス状態を明確に表示する</li>
        <li>エラーメッセージは色とテキストの両方で伝える</li>
        <li>色覚多様性を考慮したカラーパレットを使用する</li>
      </ul>
    </div>
  </Section>
);
