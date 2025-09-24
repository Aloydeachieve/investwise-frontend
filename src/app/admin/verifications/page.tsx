"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AdminDashboardLayout from '@/components/layout/AdminDashboard/AdminDashboardLayout';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { Verification, VerificationStatus } from '@/components/types/verification';
import styles from './styles.module.css';
import { Eye, User } from 'lucide-react';

// Mock Data
const mockVerifications: Verification[] = [
  { id: 'ver1', user: { id: '1', name: 'Sylvanus Odi', email: 'sylvanus@example.com', phone: '+2348012345678', country: 'Nigeria' }, documentType: 'NIN', documentUrl: '/mock-doc.png', submittedAt: '2024-05-21T10:00:00Z', status: 'pending' },
  { id: 'ver2', user: { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1-202-555-0181', country: 'USA' }, documentType: 'Passport', documentUrl: '/mock-doc.png', submittedAt: '2024-05-20T14:30:00Z', status: 'approved' },
  { id: 'ver3', user: { id: '3', name: 'John Doe', email: 'john.doe@example.com', phone: '+44 20 7946 0958', country: 'UK' }, documentType: 'Drivers License', documentUrl: '/mock-doc.png', submittedAt: '2024-05-19T08:00:00Z', status: 'rejected' },
  { id: 'ver4', user: { id: '4', name: 'Emily White', email: 'emily.white@example.com', phone: '+2349087654321', country: 'Nigeria' }, documentType: 'BVN', documentUrl: '/mock-doc.png', submittedAt: '2024-05-18T12:00:00Z', status: 'pending' },
];

const StatusBadge: React.FC<{ status: VerificationStatus }> = ({ status }) => {
  const statusClasses = {
    pending: styles.statusPending,
    approved: styles.statusApproved,
    rejected: styles.statusRejected,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>;
};

type FilterStatus = 'pending' | 'approved' | 'all';

export default function VerificationManagementPage() {
  const [filter, setFilter] = useState<FilterStatus>('pending');

  const filteredVerifications = useMemo(() => {
    if (filter === 'all') {
      return mockVerifications;
    }
    return mockVerifications.filter(v => v.status === filter);
  }, [filter]);

  const columns: ColumnDef<Verification>[] = useMemo(() => [
    {
      header: 'User',
      accessor: 'user',
      cell: (item) => (
        <div className={styles.userCell}>
          <div className={styles.avatar}>{item.user.name.charAt(0)}</div>
          <div>
            <div className={styles.userName}>{item.user.name}</div>
            <div className={styles.userMeta}>{item.user.phone}</div>
          </div>
        </div>
      ),
    },
    { header: 'Country', accessor: 'user', cell: (item) => item.user.country },
    { header: 'Document', accessor: 'documentType' },
    { header: 'Submitted At', accessor: 'submittedAt', cell: (item) => new Date(item.submittedAt).toLocaleDateString() },
    { header: 'Status', accessor: 'status', cell: (item) => <StatusBadge status={item.status} /> },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (item) => (
        <div className={styles.actionsCell}>
          <Link href={`/admin/verifications/${item.id}`} className={styles.actionButton} title="View Document">
            <Eye size={16} />
          </Link>
          <Link href={`/admin/users/${item.user.id}`} className={styles.actionButton} title="View Profile">
            <User size={16} />
          </Link>
        </div>
      ),
    },
  ], []);

  const tabItems: { label: string; value: FilterStatus }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'All Verifications', value: 'all' },
  ];

  return (
    <AdminDashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Verification Management</h1>
            <p className={styles.subtitle}>Approve or reject user identity verifications.</p>
          </div>
        </div>

        <div className={styles.filterTabs}>
          {tabItems.map(tab => (
            <button
              key={tab.value}
              className={`${styles.tabButton} ${filter === tab.value ? styles.activeTab : ''}`}
              onClick={() => setFilter(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          <Table columns={columns} data={filteredVerifications} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
