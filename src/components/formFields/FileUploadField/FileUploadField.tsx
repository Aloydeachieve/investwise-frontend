"use client";

import React, { useState, ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Image from 'next/image';
import styles from './FileUploadField.module.css';
import { FiUploadCloud, FiX } from 'react-icons/fi';

interface FileUploadFieldProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  accept?: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ id, label, register, error, accept }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const { onChange, ...rest } = register;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Call the original onChange from react-hook-form
    onChange(e);
  };

  const removePreview = () => {
    setPreview(null);
    setFileName('');
    // This part is tricky as we can't easily clear the file input's value programmatically
    // for security reasons. The user will have to re-select if they want to change.
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <div className={`${styles.dropzone} ${error ? styles.errorBorder : ''}`}>
        <FiUploadCloud className={styles.icon} />
        <p>{fileName || 'Click to browse or drag and drop your file'}</p>
        <input id={id} type="file" accept={accept} {...rest} onChange={handleFileChange} className={styles.input} />
      </div>
      {preview && (
        <div className={styles.preview}>
          <Image src={preview} alt="File preview" width={200} height={200} className={styles.previewImage} />
          <button type="button" onClick={removePreview} className={styles.removeButton}><FiX /></button>
        </div>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default FileUploadField;
