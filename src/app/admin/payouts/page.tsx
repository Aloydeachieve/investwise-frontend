"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import AdminDashboardLayout from '@/components/layout/AdminDashboard/AdminDashboardLayout';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { Payout, PayoutStatus } from '@/components/types/payout';
import { mockPayouts } from '@/data/payouts';
import styles from './styles.module.css';
import { Eye, CheckCircle, XCircle, Plus, MoreVertical, Search } from 'lucide-react';
import PayoutDetailsModal from '@/components/admin/PayoutDetailsModal/PayoutDetailsModal';
import ManualPayoutModal from '@/components/admin/ManualPayoutModal/ManualPayoutModal';

const StatusBadge: React.FC<{ status: PayoutStatus }> = ({ status }) => {
  const statusClasses = {
    approved: styles.statusApproved,
    pending: styles.statusPending,
    rejected: styles.statusRejected,
    cancelled: styles.statusCancelled,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>;
};

const ActionsMenu: React.FC<{ 
  payout: Payout;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (payout: Payout) => void;
}> = ({ payout, onApprove, onReject, onViewDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.actionsCell} ref={menuRef}>
      <button className={styles.actionButton} onClick={() => setIsOpen(!isOpen)}>
        <MoreVertical size={16} />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button className={styles.dropdownItem} onClick={() => { onViewDetails(payout); setIsOpen(false); }}>
            <Eye size={14} /> View Details
          </button>
          {payout.status === 'pending' && (
            <>
              <button className={styles.dropdownItem} onClick={() => { onApprove(payout.id); setIsOpen(false); }}>
                <CheckCircle size={14} /> Approve
              </button>
              <button className={styles.dropdownItem} onClick={() => { onReject(payout.id); setIsOpen(false); }}>
                <XCircle size={14} /> Reject
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

type FilterTab = 'pending' | 'approved' | 'history';

export default function PayoutsManagementPage() {
  const [payouts, setPayouts] = useState<Payout[]>(mockPayouts);
  const [activeTab, setActiveTab] = useState<FilterTab>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isManualPayoutModalOpen, setManualPayoutModalOpen] = useState(false);

  const summary = useMemo(() => {
    return {
      pending: payouts.filter(p => p.status === 'pending').length,
      confirmed: payouts.filter(p => p.status === 'approved').length,
      cancelled: payouts.filter(p => p.status === 'rejected' || p.status === 'cancelled').length,
      totalAmount: payouts.reduce((acc, p) => p.status === 'approved' ? acc + p.amount : acc, 0),
    };
  }, [payouts]);

  const filteredPayouts = useMemo(() => {
    let filtered = [...payouts];
    if (activeTab !== 'history') {
      filtered = filtered.filter(p => p.status === activeTab);
    }
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.transactionId.toLowerCase().includes(lowercasedSearch) ||
        p.user.name.toLowerCase().includes(lowercasedSearch) ||
        p.user.email.toLowerCase().includes(lowercasedSearch)
      );
    }
    return filtered;
  }, [activeTab, payouts, searchTerm]);

  const handleApprove = (id: string) => {
    if (window.confirm('Are you sure you want to approve this payout?')) {
      setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'approved', processDate: new Date().toISOString() } : p));
    }
  };

  const handleReject = (id: string) => {
    if (window.confirm('Are you sure you want to reject this payout?')) {
      setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected', processDate: new Date().toISOString() } : p));
    }
  };

  const handleViewDetails = (payout: Payout) => {
    setSelectedPayout(payout);
    setDetailsModalOpen(true);
  };

  const handleAddPayout = (data: any) => {
    const newPayout: Payout = {
      ...data,
      id: `payout-${Date.now()}`,
      transactionId: `MANUAL-${Date.now()}`,
      status: 'approved',
      requestDate: new Date().toISOString(),
      processDate: new Date().toISOString(),
    };
    setPayouts(prev => [newPayout, ...prev]);
  };

  const columns: ColumnDef<Payout>[] = useMemo(() => [
    { header: 'Transaction ID', accessor: 'transactionId' },
    { header: 'User', accessor: 'user', cell: (item) => <Link href={`/admin/users/${item.user.id}`} className={styles.userLink}>{item.user.name}</Link> },
    { header: 'Amount', accessor: 'amount', cell: (item) => `${item.amount.toLocaleString()} ${item.currency}` },
    { header: 'Method', accessor: 'method' },
    { header: 'Destination', accessor: 'destination', cell: (item) => <span className={styles.destination}>{item.destination}</span> },
    { header: 'Status', accessor: 'status', cell: (item) => <StatusBadge status={item.status} /> },
    { header: 'Request Date', accessor: 'requestDate', cell: (item) => new Date(item.requestDate).toLocaleDateString() },
    { header: 'Action', accessor: 'id', cell: (item) => <ActionsMenu payout={item} onApprove={handleApprove} onReject={handleReject} onViewDetails={handleViewDetails} /> },
  ], []);

  const tabItems: { label: string; value: FilterTab }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'approved' },
    { label: 'History', value: 'history' },
  ];

  return (
    <AdminDashboardLayout>
      <PayoutDetailsModal isOpen={isDetailsModalOpen} onClose={() => setDetailsModalOpen(false)} payout={selectedPayout} onApprove={handleApprove} onReject={handleReject} />
      <ManualPayoutModal isOpen={isManualPayoutModalOpen} onClose={() => setManualPayoutModalOpen(false)} onAddPayout={handleAddPayout} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Payouts Management</h1>
            <p className={styles.subtitle}>Approve, reject, or manage user withdrawals. Track payout status and history.</p>
          </div>
          <button className={styles.addButton} onClick={() => setManualPayoutModalOpen(true)}>
            <Plus size={18} />
            <span>Add Payout</span>
          </button>
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}><h4>Pending</h4><span>{summary.pending}</span></div>
          <div className={styles.summaryCard}><h4>Confirmed</h4><span>{summary.confirmed}</span></div>
          <div className={styles.summaryCard}><h4>Cancelled</h4><span>{summary.cancelled}</span></div>
          <div className={styles.summaryCard}><h4>Total Withdrawn</h4><span>₦{summary.totalAmount.toLocaleString()}</span></div>
        </div>

        <div className={styles.filterTabs}>
          {tabItems.map(tab => (
            <button key={tab.value} className={`${styles.tabButton} ${activeTab === tab.value ? styles.activeTab : ''}`} onClick={() => setActiveTab(tab.value)}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <input type="text" placeholder="Search by User, Email, or TXN ID..." className={styles.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className={styles.content}>
          <Table columns={columns} data={filteredPayouts} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}