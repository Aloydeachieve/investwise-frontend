"use client";

import React from 'react';
import { AdminReferral } from '@/components/types/referral';
import styles from './referralDetailsModal.module.css';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface ReferralDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  referral: AdminReferral | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const StatusBadge: React.FC<{ status: 'pending' | 'confirmed' | 'rejected' }> = ({ status }) => {
  const statusClasses = {
    confirmed: styles.statusConfirmed,
    pending: styles.statusPending,
    rejected: styles.statusRejected,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>;
};

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className={styles.detailItem}>
    <span className={styles.detailLabel}>{label}</span>
    <span className={styles.detailValue}>{value}</span>
  </div>
);

export default function ReferralDetailsModal({ isOpen, onClose, referral, onApprove, onReject }: ReferralDetailsModalProps) {
  if (!isOpen || !referral) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Referral Details</h2>
          <button onClick={onClose} className={styles.closeButton}><X size={24} /></button>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Referrer Information</h3>
            <DetailItem label="User ID" value={referral.referrer.id} />
            <DetailItem label="Name" value={referral.referrer.name} />
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Referred User Information</h3>
            <DetailItem label="User ID" value={referral.referred.id} />
            <DetailItem label="Name" value={referral.referred.name} />
            <DetailItem label="Email" value={referral.referred.email} />
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Referral Status</h3>
            <DetailItem label="Date" value={new Date(referral.date).toLocaleString()} />
            <DetailItem label="Bonus" value={`${referral.bonus.toLocaleString()} ${referral.currency}`} />
            <DetailItem label="Status" value={<StatusBadge status={referral.status} />} />
          </div>
        </div>
        {referral.status === 'pending' && (
          <div className={styles.actions}>
            <button
              onClick={() => onReject(referral.id)}
              className={`${styles.button} ${styles.rejectButton}`}
            >
              <XCircle size={18} /> Reject
            </button>
            <button
              onClick={() => onApprove(referral.id)}
              className={`${styles.button} ${styles.approveButton}`}
            >
              <CheckCircle size={18} /> Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
