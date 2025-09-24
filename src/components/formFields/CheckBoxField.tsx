"use client";

import React from "react";
import styles from "./styles.module.css";

interface CheckboxFieldProps {
  id: string;
  label?: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
    required?: boolean;
    children: React.ReactNode;
}

export default function CheckboxField({
  id,
  label,
  name,
  checked,
  onChange,
  required,
  error,
  children,
}: CheckboxFieldProps) {
  return (
    <div className={styles.checkboxWrapper}>
          <input
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={styles.input}
          required={required}
        />
      <label htmlFor={id} className={styles.label}>
        {children ?? label}
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
