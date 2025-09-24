"use client";

import React, { useState, useMemo } from 'react';
import AdminDashboardLayout from '@/components/layout/AdminDashboard/AdminDashboardLayout';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { AdminReferral } from '@/components/types/referral';
import { mockAdminReferrals } from '@/data/referrals';
import styles from './styles.module.css';
import { Eye, Search } from 'lucide-react';
import ReferralDetailsModal from '@/components/admin/ReferralDetailsModal/ReferralDetailsModal';
import { useToast } from '@/contexts/ToastContext';

const StatusBadge: React.FC<{ status: 'pending' | 'confirmed' | 'rejected' }> = ({ status }) => {
  const statusClasses = {
    confirmed: styles.statusConfirmed,
    pending: styles.statusPending,
    rejected: styles.statusRejected,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>;
};

type FilterTab = 'pending' | 'confirmed' | 'history';

export default function AdminReferralsPage() {
  const { addToast } = useToast();
  const [referrals, setReferrals] = useState<AdminReferral[]>(mockAdminReferrals);
  const [activeTab, setActiveTab] = useState<FilterTab>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReferral, setSelectedReferral] = useState<AdminReferral | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredReferrals = useMemo(() => {
    let filtered = [...referrals];
    if (activeTab !== 'history') {
      filtered = filtered.filter(r => r.status === activeTab);
    }
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.referrer.name.toLowerCase().includes(lowercasedSearch) ||
        r.referred.name.toLowerCase().includes(lowercasedSearch) ||
        r.referred.email.toLowerCase().includes(lowercasedSearch)
      );
    }
    return filtered;
  }, [activeTab, referrals, searchTerm]);

  const handleApprove = (id: string) => {
    setReferrals(prev => prev.map(r => r.id === id ? { ...r, status: 'confirmed' } : r));
    addToast('Referral approved successfully!', 'success');
    setModalOpen(false);
  };

  const handleReject = (id: string) => {
    setReferrals(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    addToast('Referral has been rejected.', 'info');
    setModalOpen(false);
  };

  const handleViewDetails = (referral: AdminReferral) => {
    setSelectedReferral(referral);
    setModalOpen(true);
  };

  const columns: ColumnDef<AdminReferral>[] = useMemo(() => [
    { header: 'Referrer', accessor: 'referrer', cell: (item) => item.referrer.name },
    { header: 'Referred User', accessor: 'referred', cell: (item) => item.referred.name },
    { header: 'Email', accessor: 'referred', cell: (item) => item.referred.email },
    { header: 'Bonus', accessor: 'bonus', cell: (item) => `${item.bonus.toLocaleString()} ${item.currency}` },
    { header: 'Status', accessor: 'status', cell: (item) => <StatusBadge status={item.status} /> },
    { header: 'Date', accessor: 'date', cell: (item) => new Date(item.date).toLocaleDateString() },
    {
      header: 'Action',
      accessor: 'id',
      cell: (item) => (
        <button className={styles.actionButton} onClick={() => handleViewDetails(item)}>
          <Eye size={16} />
          <span>View</span>
        </button>
      ),
    },
  ], []);

  const tabItems: { label: string; value: FilterTab }[] = [
    { label: 'Pending Referrals', value: 'pending' },
    { label: 'Confirmed Referrals', value: 'confirmed' },
    { label: 'History', value: 'history' },
  ];

  return (
    <AdminDashboardLayout>
      <ReferralDetailsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        referral={selectedReferral}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Referral Management</h1>
          <p className={styles.subtitle}>Monitor and manage all user referrals.</p>
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

        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by referrer, referred user, or email..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <Table columns={columns} data={filteredReferrals} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
