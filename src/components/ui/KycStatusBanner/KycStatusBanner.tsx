"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { get } from '@/lib/api';
import styles from './KycStatusBanner.module.css';
import { FiAlertTriangle, FiXCircle } from 'react-icons/fi';

const KycStatusBanner = () => {
  const { user, updateUser, loading } = useAuth();

useEffect(() => {
  if (user && (user.kyc_status === 'pending' || user.kyc_status === 'rejected' || !user.kyc_status)) {
    let cancelled = false;
    const fetchStatus = async () => {
      try {
        const response = await get('kyc/status');
        if (!cancelled && response.success && response.data) {
          updateUser({ kyc_status: ((response.data as { overall_status?: string }).overall_status || 'pending') as 'pending' | 'approved' | 'rejected' | 'not_submitted' });
        }
      } catch (error) {
        console.error("Failed to fetch KYC status", error);
      }
    };
    fetchStatus();
    return () => { cancelled = true; };
  }
}, [user?.id, user?.kyc_status, updateUser, user]);

  if (loading || !user || user.kyc_status === 'approved') {
    return null;
  }

  if (user.kyc_status === 'not_submitted') {
    return (
      <div className={`${styles.banner} ${styles.warning}`}>
        <FiAlertTriangle />
        <span>Your account is not verified. Please complete KYC to access all features.</span>
        <Link href="/verifyAccount" className={styles.actionButton}>Verify Now</Link>
      </div>
    );
  }

  if (user.kyc_status === 'pending') {
    return (
      <div className={`${styles.banner} ${styles.pending}`}>
        <FiAlertTriangle className={styles.blinkingIcon} />
        <span>Your verification is pending approval. This may take up to 24 hours.</span>
      </div>
    );
  }

  if (user.kyc_status === 'rejected') {
    return (
      <div className={`${styles.banner} ${styles.danger}`}>
        <FiXCircle />
        <span>Your verification was rejected. Please check your details and resubmit.</span>
        <Link href="/verifyAccount" className={styles.actionButton}>Resubmit</Link>
      </div>
    );
  }

  return null;
};

export default KycStatusBanner;
