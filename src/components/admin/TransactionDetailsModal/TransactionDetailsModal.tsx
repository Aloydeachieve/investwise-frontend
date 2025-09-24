"use client";

import React from 'react';
import styles from './TransactionDetailsModal.module.css';
import { X, ArrowRight } from 'lucide-react';
import { Transaction, TransactionStatus } from '@/components/types/transaction';
import Link from 'next/link';

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const StatusBadge: React.FC<{ status: TransactionStatus }> = ({ status }) => {
  const statusClasses = {
    confirmed: styles.statusConfirmed,
    pending: styles.statusPending,
    'on-hold': styles.statusOnHold,
    failed: styles.statusFailed,
    proceed: styles.statusProceed,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status.replace('-', ' ')}</span>;
};

const DetailItem: React.FC<{ label: string; value: React.ReactNode; fullWidth?: boolean }> = ({ label, value, fullWidth }) => (
  <div className={`${styles.detailItem} ${fullWidth ? styles.fullWidth : ''}`}>
    <span className={styles.detailLabel}>{label}</span>
    <span className={styles.detailValue}>{value}</span>
  </div>
);

export default function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
  if (!isOpen || !transaction) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Transaction #{transaction.orderId}</h2>
            <div className={styles.subHeader}>
              <StatusBadge status={transaction.status} />
            </div>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.contentGrid}>
          {/* Transaction Overview */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Transaction Overview</h3>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewColumn}>
                <h4>In Account</h4>
                <DetailItem label="Amount" value={`${transaction.amount.toLocaleString()} ${transaction.currency}`} />
                <DetailItem label="Fees" value={`0.00 ${transaction.currency}`} />
                <DetailItem label="Total" value={`${transaction.amount.toLocaleString()} ${transaction.currency}`} />
              </div>
              <div className={styles.overviewArrow}>
                <ArrowRight size={24} />
              </div>
              <div className={styles.overviewColumn}>
                <h4>In Transaction</h4>
                <DetailItem label="Amount" value={`${transaction.amount.toLocaleString()} ${transaction.currency}`} />
                <DetailItem label="Fees" value={`0.00 ${transaction.currency}`} />
                <DetailItem label="Total" value={`${transaction.amount.toLocaleString()} ${transaction.currency}`} />
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Order Details</h3>
            <div className={styles.detailsList}>
              <DetailItem label="Order Date" value={new Date(transaction.date).toLocaleString()} />
              <DetailItem label="Placed By" value={<Link href={`/admin/users/${transaction.user.id}`} className={styles.userLink}>{transaction.user.name}</Link>} />
              <DetailItem label="User Email" value={transaction.user.name.split(' ')[0].toLowerCase() + '@example.com'} />
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className={`${styles.card} ${styles.fullWidthCard}`}>
          <h3 className={styles.cardTitle}>Additional Details</h3>
          <div className={styles.detailsList}>
            <DetailItem label="Transaction Type" value={transaction.type} />
            <DetailItem label="Payment Gateway" value={transaction.method} />
            <DetailItem label="Payment To/From" value={transaction.reference} />
            <DetailItem label="Transaction Details" value={`Transaction for ${transaction.type}`} fullWidth />
            <DetailItem label="Description by User" value="User provided description goes here." fullWidth />
          </div>
        </div>
        <div className={styles.actions}>
            <button type="button" onClick={onClose} className={`${styles.button} ${styles.cancelButton}`}>Close</button>
        </div>
      </div>
    </div>
  );
}