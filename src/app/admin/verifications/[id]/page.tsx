"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminDashboardLayout from '@/components/layout/AdminDashboard/AdminDashboardLayout';
import { Verification } from '@/components/types/verification';
import styles from './styles.module.css';
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react';

// Mock Data - in a real app, this would be fetched based on the `id` param
const mockVerification: Verification = {
  id: 'ver1',
  user: { id: '1', name: 'Sylvanus Odi', email: 'sylvanus@example.com', phone: '+2348012345678', country: 'Nigeria' },
  documentType: 'NIN',
  documentUrl: '/mock-doc.png', // Placeholder image
  submittedAt: '2024-05-21T10:00:00Z',
  status: 'pending'
};

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className={styles.detailItem}>
    <dt className={styles.detailLabel}>{label}</dt>
    <dd className={styles.detailValue}>{value || 'N/A'}</dd>
  </div>
);

export default function VerificationDetailsPage({ params }: { params: { id: string } }) {
  // Here you would fetch the verification by params.id
  const verification = mockVerification;

  return (
    <AdminDashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <Link href="/admin/verifications" className={styles.backLink}>
              <ChevronLeft size={20} />
              <span>Back to Verifications</span>
            </Link>
            <h1 className={styles.title}>Verification Details</h1>
            <p className={styles.subtitle}>Review document submitted by {verification.user.name}.</p>
          </div>
          <div className={styles.actions}>
            <button className={`${styles.actionButton} ${styles.rejectButton}`}>
              <XCircle size={18} />
              <span>Reject</span>
            </button>
            <button className={`${styles.actionButton} ${styles.approveButton}`}>
              <CheckCircle size={18} />
              <span>Approve</span>
            </button>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.detailsCard}>
            <h3 className={styles.cardTitle}>User Information</h3>
            <dl className={styles.detailsList}>
              <DetailItem label="Full Name" value={verification.user.name} />
              <DetailItem label="Email Address" value={verification.user.email} />
              <DetailItem label="Phone Number" value={verification.user.phone} />
              <DetailItem label="Country" value={verification.user.country} />
            </dl>
          </div>
          <div className={styles.detailsCard}>
            <h3 className={styles.cardTitle}>Document Information</h3>
            <dl className={styles.detailsList}>
              <DetailItem label="Document Type" value={verification.documentType} />
              <DetailItem label="Submitted At" value={new Date(verification.submittedAt).toLocaleString()} />
              <DetailItem label="Status" value={<span className={`${styles.statusBadge} ${styles[verification.status]}`}>{verification.status}</span>} />
            </dl>
          </div>
        </div>

        <div className={styles.documentViewer}>
          <h3 className={styles.cardTitle}>Submitted Document</h3>
          <div className={styles.imageContainer}>
            <Image src={verification.documentUrl} alt={`Document for ${verification.user.name}`} layout="fill" objectFit="contain" />
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}