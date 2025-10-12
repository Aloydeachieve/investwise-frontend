"use client";

import React, { useState, useEffect } from 'react';
import { User } from '@/components/types/user';
import styles from './SendEmailModal.module.css';
import { X } from 'lucide-react';

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: (data: { subject: string; message: string }) => void;
  user: User | null;
  isSending: boolean;
}

export default function SendEmailModal({ isOpen, onClose, onSendEmail, user, isSending }: SendEmailModalProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSubject('');
      setMessage('');
    }
  }, [isOpen]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim() && message.trim()) {
      onSendEmail({ subject, message });
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Send Email to {user.name}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.textarea}
              rows={6}
              required
            />
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={`${styles.button} ${styles.cancelButton}`} disabled={isSending}>Cancel</button>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`} disabled={isSending || !subject.trim() || !message.trim()}>{isSending ? 'Sending...' : 'Send Email'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}