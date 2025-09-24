import React from 'react';
import { User } from '@/components/types/user';
import styles from './PersonalTab.module.css';

interface PersonalTabProps {
  user: User;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className={styles.detailItem}>
    <dt className={styles.detailLabel}>{label}</dt>
    <dd className={styles.detailValue}>{value || 'N/A'}</dd>
  </div>
);

export default function PersonalTab({ user }: PersonalTabProps) {
  const fullAddress = user.address 
    ? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}, ${user.address.country}`
    : 'N/A';

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Personal Information</h3>
      <dl className={styles.detailsList}>
        <DetailItem label="Full Name" value={user.fullName} />
        <DetailItem label="Email Address" value={user.email} />
        <DetailItem label="Mobile Number" value={user.mobile} />
        <DetailItem label="Date of Birth" value={user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'} />
        <DetailItem label="Gender" value={user.gender} />
        <DetailItem label="Address" value={fullAddress} />
        <DetailItem label="Date Joined" value={new Date(user.joinDate).toLocaleString()} />
        <DetailItem label="Registration Method" value={user.registrationMethod} />
        <DetailItem label="Last Login" value={user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'} />
        <DetailItem label="Email Verified" value={user.isVerified ? 'Yes' : 'No'} />
      </dl>
    </div>
  );
}