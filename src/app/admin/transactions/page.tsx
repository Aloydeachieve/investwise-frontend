"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { Transaction, TransactionStatus } from '@/components/types/transaction';
import { mockTransactions } from '@/data/transactions';
import styles from './styles.module.css';
import { SlidersHorizontal, MoreVertical, Eye, CheckCircle, XCircle, Trash2, Plus, Search } from 'lucide-react';
import FilterTransactionsModal, { Filters } from '@/components/admin/FilterTransactionsModal/FilterTransactionsModal';
import AddTransactionModal from '@/components/admin/AddTransactionModal/AddTransactionModal';
import TransactionDetailsModal from '@/components/admin/TransactionDetailsModal/TransactionDetailsModal';

// --- Helper Components ---

const StatusBadge: React.FC<{ status: TransactionStatus }> = ({ status }) => {
  const statusClasses = {
    confirmed: styles.statusConfirmed,
    pending: styles.statusPending,
    'on-hold': styles.statusOnHold,
    failed: styles.statusFailed,
    proceed: styles.statusProceed,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status.replace('-', ' ')}</span>;
};

const TransactionDetailsCell: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
  <div>
    <div className={styles.transactionType}>{transaction.type}</div>
    <div className={styles.transactionDate}>{new Date(transaction.date).toLocaleDateString()}</div>
  </div>
);

const ActionsMenu: React.FC<{ 
  transaction: Transaction;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetails: (transaction: Transaction) => void;
}> = ({ transaction, onApprove, onReject, onDelete, onViewDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.actionsCell} ref={menuRef}>
      <button className={styles.actionButton} onClick={() => setIsOpen(!isOpen)}>
        <MoreVertical size={16} />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button className={styles.dropdownItem} onClick={() => {
            onViewDetails(transaction);
            setIsOpen(false);
          }}>
            <Eye size={14} /> View Details
          </button>
          {transaction.status === 'pending' && (
            <button className={styles.dropdownItem} onClick={() => {
              onApprove(transaction.id);
              setIsOpen(false);
            }}>
              <CheckCircle size={14} /> Approve
            </button>
          )}
          {transaction.status === 'pending' || transaction.status === 'on-hold' ? (
            <button className={styles.dropdownItem} onClick={() => {
              onReject(transaction.id);
              setIsOpen(false);
            }}>
              <XCircle size={14} /> Reject
            </button>
          ) : null}
          <button 
            className={`${styles.dropdownItem} ${styles.dropdownItemDelete}`}
            onClick={() => {
              onDelete(transaction.id);
              setIsOpen(false);
            }}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---

type FilterTab = 'history' | TransactionStatus | 'deposit' | 'withdraw' | 'proceed';

const initialFilters: Filters = {
  type: 'all',
  status: 'all',
  currency: 'all',
  method: 'all',
  includeDeleted: false,
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [activeTab, setActiveTab] = useState<FilterTab>('history');
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Tab filtering
    if (activeTab !== 'history') {
      if (['deposit', 'withdraw', 'proceed'].includes(activeTab)) {
        filtered = filtered.filter(t => t.type === activeTab);
      } else {
        filtered = filtered.filter(t => t.status === activeTab);
      }
    }

    // Advanced modal filtering
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    if (filters.currency !== 'all') {
      filtered = filtered.filter(t => t.currency === filters.currency);
    }
    if (filters.method !== 'all') {
      filtered = filtered.filter(t => t.method === filters.method);
    }

    // Search term filtering
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.user.name.toLowerCase().includes(lowercasedSearch) ||
        t.orderId.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    return filtered;
  }, [activeTab, transactions, filters, searchTerm]);

  const handleApprove = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'confirmed' } : t));
  };

  const handleReject = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'failed' } : t));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailsModalOpen(true);
  };

  const columns: ColumnDef<Transaction>[] = useMemo(() => [
    { header: 'Details', accessor: 'id', cell: (item) => <TransactionDetailsCell transaction={item} /> },
    { header: 'Txn By', accessor: 'user', cell: (item) => <Link href={`/admin/users/${item.user.id}`} className={styles.userLink}>{item.user.name}</Link> },
    { header: 'Method', accessor: 'method' },
    { header: 'Order/Reference ID', accessor: 'orderId' },
    { header: 'Amount', accessor: 'amount', cell: (item) => (
      <span className={item.amount > 0 ? styles.amountPositive : styles.amountNegative}>
        {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()} {item.currency}
      </span>
    )},
    { header: 'Status', accessor: 'status', cell: (item) => <StatusBadge status={item.status} /> },
    { header: 'Action', accessor: 'id', cell: (item) => (
      <ActionsMenu
        transaction={item}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />) },
  ], []);

  const tabItems: { label: string; value: FilterTab }[] = [
    { label: 'History', value: 'history' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Pending', value: 'pending' },
    { label: 'On Hold', value: 'on-hold' },
    { label: 'Deposit', value: 'deposit' },
    { label: 'Withdraw', value: 'withdraw' },
    { label: 'Proceed', value: 'proceed' },
  ];

  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters);
    setActiveTab('history'); // Reset tab to show all results with new filters
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleAddTransaction = (data: Omit<Transaction, 'id' | 'date' | 'currency' | 'status' | 'orderId' | 'reference'>) => {
    const newTransaction: Transaction = {
      ...data,
      id: `txn-${Date.now()}`,
      date: new Date().toISOString(),
      currency: 'NGN',
      status: 'confirmed', // Or 'pending' depending on logic
      orderId: `ORD-${Date.now()}`,
      reference: `REF-${data.type.toUpperCase()}-${Date.now()}`,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <>
      <FilterTransactionsModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onFilter={handleFilter}
        onReset={handleReset}
        currentFilters={filters}
      />
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        transaction={selectedTransaction}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Transactions</h1>
            <p className={styles.subtitle}>Total {transactions.length} transactions.</p>
          </div>
          <button className={styles.addButton} onClick={() => setAddModalOpen(true)}>
            <Plus size={18} />
            <span>Add Transaction</span>
          </button>
        </div>

        <div className={styles.filterTabs}>
          {tabItems.map(tab => (
            <button
              key={tab.value}
              className={`${styles.tabButton} ${activeTab === tab.value ? styles.activeTab : ''}`}
              onClick={() => {
                setFilters(initialFilters); // Reset advanced filters when changing tabs
                setSearchTerm(''); // Reset search term
                setActiveTab(tab.value);
              }}
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
              placeholder="Search by user or Order ID..." 
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.filterButton} onClick={() => setFilterModalOpen(true)}>
            <SlidersHorizontal size={18} />
            <span>Filter</span>
          </button>
        </div>

        <div className={styles.content}>
          <Table columns={columns} data={filteredTransactions} />
        </div>
      </div>
    </>
  );
}
