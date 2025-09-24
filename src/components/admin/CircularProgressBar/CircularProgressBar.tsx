"use client";
import React from 'react';
import styles from './CircularProgressBar.module.css';

interface CircularProgressBarProps {
  percentage: number;
  color: string;
  label: string;
  startValue: string;
  endValue: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  color,
  label,
  startValue,
  endValue,
}) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.container}>
      <svg className={styles.svg} viewBox="0 0 120 120">
        <circle
          className={styles.backgroundCircle}
          strokeWidth="10"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className={styles.progressCircle}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx="60"
          cy="60"
          style={{ stroke: color, filter: `drop-shadow(0 4px 6px ${color}40)` }}
        />
        <text x="60" y="55" className={styles.percentageText}>
          {percentage.toFixed(2)}%
        </text>
        <text x="60" y="75" className={styles.labelText}>
          {label}
        </text>
      </svg>
      <div className={styles.legend}>
        <span>{startValue}</span>
        <span>{endValue}</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;