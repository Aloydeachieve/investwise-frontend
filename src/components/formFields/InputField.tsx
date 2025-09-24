"use client";

import React from "react";
import styles from "./styles.module.css";

type Props = {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
};

export default function InputField({
  id,
  label,
  name,
  value,
  placeholder = '',
  type = 'text',
  error,
  onChange,
  required = false,
  disabled = false, // ✅ provide default
}: Props) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={styles.formInput}
      />
      {error && <p style={{ color: "red", width: "100%" }}>{error}</p>}
    </div>
  );
}
