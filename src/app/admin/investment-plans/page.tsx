"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AdminDashboardLayout from '@/components/layout/AdminDashboard/AdminDashboardLayout';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { UserInvestment, InvestmentStatus } from '@/components/types/investment';
import ProgressBar from '@/components/admin/ProgressBar/ProgressBar';
import styles from './styles.module.css';
import { SlidersHorizontal, Eye } from 'lucide-react';
import { userInvestments as mockInvestments } from '@/data/userInvestments';

// Helper to calculate progress
const calculateProgress = (startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  if (now >= end) return 100;
  if (now <= start) return 0;
  const totalDuration = end - start;
  const elapsed = now - start;
  return (elapsed / totalDuration) * 100;
};

// Status Component
const StatusCell: React.FC<{ investment: UserInvestment }> = ({ investment }) => {
  switch (investment.status) {
    case 'active':
      const progress = calculateProgress(investment.startDate, investment.endDate);
      return (
        <div className={styles.activeStatus}>
          <span className={styles.statusText}>Active ({Math.round(progress)}%)</span>
          <ProgressBar value={progress} />
        </div>
      );
    case 'completed':
      return <span className={`${styles.statusBadge} ${styles.statusCompleted}`}>Completed</span>;
    case 'pending':
      return <span className={`${styles.statusBadge} ${styles.statusPending}`}>Pending</span>;
    default:
      return null;
  }
};

type FilterStatus = InvestmentStatus | 'all';

export default function InvestmentManagementPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredInvestments = useMemo(() => {
    if (filter === 'all') return mockInvestments;
    if (filter === 'pending') return []; // No pending investments in mock data
    return mockInvestments.filter(inv => inv.status === filter);
  }, [filter]);

  const columns: ColumnDef<UserInvestment>[] = useMemo(() => [
    { header: 'Plan Name', accessor: 'planName' },
    { header: 'Invested By', accessor: 'investedBy', cell: (item) => item.investedBy.name },
    { header: 'Start Date', accessor: 'startDate', cell: (item) => new Date(item.startDate).toLocaleDateString() },
    { header: 'End Date', accessor: 'endDate', cell: (item) => new Date(item.endDate).toLocaleDateString() },
    { header: 'Amount', accessor: 'amountInvested', cell: (item) => `₦${item.amountInvested.toLocaleString()}` },
    { header: 'Profit', accessor: 'profitGained', cell: (item) => `₦${item.profitGained.toLocaleString()}` },
    { header: 'Status', accessor: 'status', cell: (item) => <StatusCell investment={item} /> },
    {
      header: 'Action',
      accessor: 'id',
      cell: (item) => (
        <Link href={`/admin/investment-plans/investments/${item.id}`} className={styles.actionButton} title="View Investment Details">
          <Eye size={16} />
        </Link>
      ),
    },
  ], []);

  const tabItems: { label: string; value: FilterStatus }[] = [
    { label: 'All Plans', value: 'all' },
    { label: 'Active Plans', value: 'active' },
    { label: 'Pending Plans', value: 'pending' },
    { label: 'Completed Plans', value: 'completed' },
  ];

  return (
    <AdminDashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Investment Management</h1>
            <p className={styles.subtitle}>Track and manage all user investments.</p>
          </div>
          <Link href="/admin/investment-plans/schemas" className={styles.manageButton}>
            <SlidersHorizontal size={18} />
            <span>Manage Schema/Plans</span>
          </Link>
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
          {filter === 'pending' && filteredInvestments.length === 0 ? (
            <div className={styles.placeholder}>
              No pending investments found.
            </div>
          ) : (
            <Table columns={columns} data={filteredInvestments} />
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}