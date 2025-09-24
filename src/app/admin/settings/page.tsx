"use client";

import React, { useState } from 'react';
import AdminDashboardLayout from '@/components/layout/AdminDashboard/AdminDashboardLayout';
import styles from './settings.module.css';

// Import settings components
import GeneralSettings from '@/components/admin/AdminSettings/GeneralSettings/GeneralSettings';
import FeesSettings from '@/components/admin/AdminSettings/FeesSettings/FeesSettings';
import KYCSettings from '@/components/admin/AdminSettings/KYCSettings/KYCSettings';
import SecuritySettings from '@/components/admin/AdminSettings/SecuritySettings/SecuritySettings';
import NotificationSettings from '@/components/admin/AdminSettings/NotificationSettings/NotificationSettings';
import ReferralSettings from '@/components/admin/AdminSettings/ReferralSettings/ReferralSettings';
import PayoutSettings from '@/components/admin/AdminSettings/PayoutSettings/PayoutSettings';
import AppearanceSettings from '@/components/admin/AdminSettings/AppearanceSettings/AppearanceSettings';

type SettingsTab = 'general' | 'fees' | 'kyc' | 'security' | 'notifications' | 'referrals' | 'payouts' | 'appearance';

const tabItems: { label: string; value: SettingsTab }[] = [
  { label: 'General', value: 'general' },
  { label: 'Fees & Rates', value: 'fees' },
  { label: 'KYC', value: 'kyc' },
  { label: 'Security', value: 'security' },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Referrals', value: 'referrals' },
  { label: 'Payouts', value: 'payouts' },
  { label: 'Appearance', value: 'appearance' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings />;
      case 'fees': return <FeesSettings />;
      case 'kyc': return <KYCSettings />;
      case 'security': return <SecuritySettings />;
      case 'notifications': return <NotificationSettings />;
      case 'referrals': return <ReferralSettings />;
      case 'payouts': return <PayoutSettings />;
      case 'appearance': return <AppearanceSettings />;
      default: return <GeneralSettings />;
    }
  };

  return (
    <AdminDashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Platform Settings</h1>
          <p className={styles.subtitle}>Manage your platform’s configuration and behavior.</p>
        </div>

        <div className={styles.tabs}>
          {tabItems.map(tab => (
            <button
              key={tab.value}
              className={`${styles.tabButton} ${activeTab === tab.value ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
