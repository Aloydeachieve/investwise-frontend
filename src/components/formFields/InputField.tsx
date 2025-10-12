"use client";

import React, { forwardRef } from "react";
import styles from "./styles.module.css";

type Props = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default forwardRef<HTMLInputElement, Props>(function InputField({
  id,
  label,
  name,
  placeholder = '',
  type = 'text',
  error,
  required = false,
  disabled = false,
  value,
  onChange,
}, ref) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        ref={ref}
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
});
