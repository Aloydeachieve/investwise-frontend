import React from 'react';
import styles from './Switch.module.css';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export default function Switch({ checked, onChange, id }: SwitchProps) {
  return (
    <label htmlFor={id} className={styles.switch}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className={styles.slider}></span>
    </label>
  );
}