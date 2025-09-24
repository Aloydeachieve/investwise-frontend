"use client";

import React from 'react';
import styles from './toggleSwitch.module.css';

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, checked, onChange, label }) => {
  return (
    <div className={styles.toggleWrapper}>
      <label className={styles.switch}>
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
    </div>
  );
};

export default ToggleSwitch;