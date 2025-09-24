import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number; // 0 to 100
}

export default function ProgressBar({ value }: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  return (
    <div className={styles.container}>
      <div className={styles.bar} style={{ width: `${clampedValue}%` }} />
    </div>
  );
}