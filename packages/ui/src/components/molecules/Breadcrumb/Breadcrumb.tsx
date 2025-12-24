import React from 'react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  /** パンくずアイテムのラベル */
  label: string;
  /** リンク先のURL（最後のアイテムの場合は不要） */
  href?: string;
}

export interface BreadcrumbProps {
  /** パンくずリストのアイテム配列 */
  items: BreadcrumbItem[];
  /** モバイルでの表示方式 */
  mobileDisplay?: 'wrap' | 'scroll';
  /** カスタムクラス名 */
  className?: string;
  /** aria-label（ナビゲーションのラベル） */
  ariaLabel?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  mobileDisplay = 'wrap',
  className = '',
  ariaLabel = 'パンくずリスト',
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const containerClass = `${styles.breadcrumb} ${
    mobileDisplay === 'scroll' ? styles.mobileScroll : styles.mobileWrap
  } ${className}`;

  return (
    <nav aria-label={ariaLabel} className={containerClass}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className={styles.item}>
              {!isFirst && (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              )}
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
