"use client";

import React, { useState } from 'react';
import { User } from '@/components/types/user';
import UserProfileCard from '@/components/admin/UserProfileCard/UserProfileCard';
import PersonalTab from '@/components/admin/PersonalTab/PersonalTab';
import TransactionsTab from '@/components/admin/TransactionsTab/TransactionsTab';
import InvestmentsTab from '@/components/admin/InvestmentsTab/InvestmentsTab';
import ReferralsTab from '@/components/admin/ReferralsTab/ReferralsTab';
import ActivitiesTab from '@/components/admin/ActivitiesTab/ActivitiesTab';
import styles from './UserDetailsLayout.module.css';

type Tab = 'personal' | 'transactions' | 'investments' | 'referrals' | 'activities';

interface UserDetailsLayoutProps {
  user: User;
}

export default function UserDetailsLayout({ user }: UserDetailsLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>('personal');

  const tabs: { id: Tab; label: string; component: React.ReactNode }[] = [
    { id: 'personal', label: 'Personal', component: <PersonalTab user={user} /> },
    { id: 'transactions', label: 'Transactions', component: <TransactionsTab /> },
    { id: 'investments', label: 'Investments', component: <InvestmentsTab /> },
    { id: 'referrals', label: 'Referrals', component: <ReferralsTab /> },
    { id: 'activities', label: 'Activities', component: <ActivitiesTab /> },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.tabNav}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.tabContent}>
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>
      <aside className={styles.sidebar}>
        <UserProfileCard user={user} />
      </aside>
    </div>
  );
}