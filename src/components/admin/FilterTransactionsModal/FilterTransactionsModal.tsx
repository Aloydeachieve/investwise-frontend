"use client";

import React, { useState, useEffect } from 'react';
import styles from './FilterTransactionsModal.module.css';
import { X } from 'lucide-react';
import { TransactionStatus, TransactionType, TransactionMethod, TransactionCurrency } from '@/components/types/transaction';

export interface Filters {
  type: TransactionType | 'all';
  status: TransactionStatus | 'all';
  currency: TransactionCurrency | 'all';
  method: TransactionMethod | 'all';
  includeDeleted: boolean;
}

interface FilterTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: Filters) => void;
  onReset: () => void;
  currentFilters: Filters;
}

export default function FilterTransactionsModal({
  isOpen,
  onClose,
  onFilter,
  onReset,
  currentFilters,
}: FilterTransactionsModalProps) {
  const [filters, setFilters] = useState<Filters>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: checked }));
  };

  const handleApply = () => {
    onFilter(filters);
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Filter Transactions</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="type">Type</label>
              <select id="type" name="type" value={filters.type} onChange={handleChange}>
                <option value="all">All</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="bonus">Bonus</option>
                <option value="investment">Investment</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={filters.status} onChange={handleChange}>
                <option value="all">All</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="on-hold">On Hold</option>
                <option value="failed">Failed</option>
                <option value="proceed">Proceed</option>
              </select>
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="currency">Currency</label>
              <select id="currency" name="currency" value={filters.currency} onChange={handleChange}>
                <option value="all">All</option>
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="method">Method</label>
              <select id="method" name="method" value={filters.method} onChange={handleChange}>
                <option value="all">All</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Card">Card</option>
                <option value="Crypto Wallet">Crypto Wallet</option>
                <option value="System">System</option>
              </select>
            </div>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={handleReset} className={`${styles.button} ${styles.resetButton}`}>
              Reset Filter
            </button>
            <button type="button" onClick={handleApply} className={`${styles.button} ${styles.filterButton}`}>
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}