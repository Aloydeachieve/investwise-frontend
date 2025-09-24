"use client";

import React from 'react';
import styles from './PayoutDetailsModal.module.css';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { Payout, PayoutStatus } from '@/components/types/payout';
import Link from 'next/link';

interface PayoutDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  payout: Payout | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const StatusBadge: React.FC<{ status: PayoutStatus }> = ({ status }) => {
  const statusClasses = {
    approved: styles.statusApproved,
    pending: styles.statusPending,
    rejected: styles.statusRejected,
    cancelled: styles.statusCancelled,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>;
};

const DetailItem: React.FC<{ label: string; value: React.ReactNode; fullWidth?: boolean }> = ({ label, value, fullWidth }) => (
  <div className={`${styles.detailItem} ${fullWidth ? styles.fullWidth : ''}`}>
    <span className={styles.detailLabel}>{label}</span>
    <span className={styles.detailValue}>{value}</span>
  </div>
);

export default function PayoutDetailsModal({ isOpen, onClose, payout, onApprove, onReject }: PayoutDetailsModalProps) {
  if (!isOpen || !payout) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Withdrawal Details</h2>
            <div className={styles.subHeader}>
              <StatusBadge status={payout.status} />
            </div>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>User & Order Details</h3>
            <DetailItem label="Transaction ID" value={payout.transactionId} />
            <DetailItem label="User" value={<Link href={`/admin/users/${payout.user.id}`} className={styles.userLink}>{payout.user.name} ({payout.user.email})</Link>} />
            <DetailItem label="Request Date" value={new Date(payout.requestDate).toLocaleString()} />
            {payout.processDate && <DetailItem label="Process Date" value={new Date(payout.processDate).toLocaleString()} />}
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Payout Details</h3>
            <DetailItem label="Amount" value={`${payout.amount.toLocaleString()} ${payout.currency}`} />
            <DetailItem label="Method" value={payout.method} />
            <DetailItem label="Destination" value={<span className={styles.destination}>{payout.destination}</span>} />
          </div>
        </div>

        {payout.status === 'pending' && (
          <div className={styles.actions}>
            <button onClick={() => { onReject(payout.id); onClose(); }} className={`${styles.button} ${styles.rejectButton}`}>
              <XCircle size={18} /> Reject
            </button>
            <button onClick={() => { onApprove(payout.id); onClose(); }} className={`${styles.button} ${styles.approveButton}`}>
              <CheckCircle size={18} /> Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
}