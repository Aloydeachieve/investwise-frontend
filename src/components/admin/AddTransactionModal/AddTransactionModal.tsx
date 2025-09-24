"use client";

import React, { useState } from 'react';
import styles from './AddTransactionModal.module.css';
import { X } from 'lucide-react';
import { Transaction, TransactionType, TransactionMethod } from '@/components/types/transaction';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transactionData: Omit<Transaction, 'id' | 'date' | 'currency' | 'status' | 'orderId' | 'reference'>) => void;
}

const initialFormState = {
  user: { id: '', name: '' },
  amount: 0,
  type: 'deposit' as TransactionType,
  method: 'System' as TransactionMethod,
  description: '',
  notes: '',
};

export default function AddTransactionModal({ isOpen, onClose, onAddTransaction }: AddTransactionModalProps) {
  const [formData, setFormData] = useState(initialFormState);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'user') {
      // Assuming value is "userId,userName"
      const [id, userName] = value.split(',');
      setFormData(prev => ({ ...prev, user: { id, name: userName } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.user.id || formData.amount === 0) {
      alert('Please fill all required fields.');
      return;
    }
    onAddTransaction(formData);
    setFormData(initialFormState); // Reset form
    onClose();
  };

  // Mock user list
  const users = [
    { id: 'user-001', name: 'Sylvanus Odi' },
    { id: 'user-002', name: 'Jane Smith' },
    { id: 'user-003', name: 'John Doe' },
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add New Transaction</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="user">User Account</label>
              <select id="user" name="user" value={`${formData.user.id},${formData.user.name}`} onChange={handleChange} required>
                <option value="" disabled>Select a user</option>
                {users.map(u => (
                  <option key={u.id} value={`${u.id},${u.name}`}>{u.name} ({u.id})</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="amount">Amount (NGN)</label>
              <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleNumberChange} required />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="type">Transaction Type</label>
              <select id="type" name="type" value={formData.type} onChange={handleChange}>
                <option value="deposit">Deposit</option>
                <option value="bonus">Bonus</option>
                <option value="investment">Investment Charge</option>
                <option value="withdraw">Withdrawal</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="method">Method</label>
              <select id="method" name="method" value={formData.method} onChange={handleChange}>
                <option value="System">System</option>
                <option value="Bank Transfer">Manual (Bank Transfer)</option>
                <option value="Card">Manual (Card)</option>
                <option value="Crypto Wallet">Manual (Crypto)</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description (for user)</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Reason for the transaction. This will display to the user."></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes">Note / Remarks (for admin)</label>
            <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="The note or remarks help to reminder. Only administrator can read."></textarea>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}