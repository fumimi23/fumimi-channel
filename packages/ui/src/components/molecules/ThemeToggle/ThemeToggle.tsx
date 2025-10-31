import React, { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

export interface ThemeToggleProps {
  /** 初期テーマ */
  defaultTheme?: 'light' | 'dark' | 'system';
  /** テーマ変更時のコールバック */
  onThemeChange?: (theme: 'light' | 'dark' | 'system') => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  defaultTheme = 'system',
  onThemeChange,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(defaultTheme);

  useEffect(() => {
    // システム設定を取得
    const getSystemTheme = () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // テーマを適用
    const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
      const root = document.documentElement;
      
      if (newTheme === 'system') {
        const systemTheme = getSystemTheme();
        root.setAttribute('data-theme', systemTheme);
      } else {
        root.setAttribute('data-theme', newTheme);
      }
    };

    applyTheme(theme);

    // システムテーマ変更の監視
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    onThemeChange?.(newTheme);
    
    // localStorageに保存
    localStorage.setItem('theme-preference', newTheme);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${theme === 'light' ? styles.active : ''}`}
        onClick={() => handleThemeChange('light')}
        aria-label="ライトモード"
        title="ライトモード"
      >
        ☀️
      </button>
      <button
        className={`${styles.button} ${theme === 'system' ? styles.active : ''}`}
        onClick={() => handleThemeChange('system')}
        aria-label="システム設定"
        title="システム設定"
      >
        💻
      </button>
      <button
        className={`${styles.button} ${theme === 'dark' ? styles.active : ''}`}
        onClick={() => handleThemeChange('dark')}
        aria-label="ダークモード"
        title="ダークモード"
      >
        🌙
      </button>
    </div>
  );
};
