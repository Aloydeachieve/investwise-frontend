"use client";

import React, { useState } from 'react';
import styles from './ManualPayoutModal.module.css';
import { X } from 'lucide-react';
import { PayoutMethod } from '@/components/types/payout';

interface ManualPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPayout: (payoutData: any) => void;
}

const initialFormState = {
  user: { id: '', name: '' },
  amount: 0,
  currency: 'NGN',
  method: 'Bank' as PayoutMethod,
  destination: '',
  notes: '',
};

export default function ManualPayoutModal({ isOpen, onClose, onAddPayout }: ManualPayoutModalProps) {
  const [formData, setFormData] = useState(initialFormState);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'user') {
      const [id, userName] = value.split(',');
      setFormData(prev => ({ ...prev, user: { id, name: userName } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.user.id || formData.amount <= 0 || !formData.destination) {
      alert('Please fill all required fields.');
      return;
    }
    onAddPayout(formData);
    setFormData(initialFormState);
    onClose();
  };

  const users = [
    { id: 'user-001', name: 'Sylvanus Odi' },
    { id: 'user-002', name: 'Jane Smith' },
    { id: 'user-003', name: 'John Doe' },
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create Manual Payout</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="user">User Account</label>
            <select id="user" name="user" value={formData.user.id ? `${formData.user.id},${formData.user.name}` : ''} onChange={handleChange} required>
              <option value="" disabled>Select a user</option>
              {users.map(u => (
                <option key={u.id} value={`${u.id},${u.name}`}>{u.name} ({u.id})</option>
              ))}
            </select>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="amount">Amount</label>
              <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="currency">Currency</label>
              <select id="currency" name="currency" value={formData.currency} onChange={handleChange}>
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="method">Method</label>
            <select id="method" name="method" value={formData.method} onChange={handleChange}>
              <option value="Bank">Bank</option>
              <option value="Crypto">Crypto</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="destination">Destination Details</label>
            <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} placeholder="Wallet address, Bank Account, etc." required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes">Notes (for admin)</label>
            <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3}></textarea>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Add Payout</button>
          </div>
        </form>
      </div>
    </div>
  );
}