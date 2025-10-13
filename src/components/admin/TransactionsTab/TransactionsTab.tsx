import React, { useMemo } from 'react';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { Transaction } from '@/components/types/details';
import styles from '@/styles/Tabs.module.css';

interface TransactionsTabProps {
  userId: string;
}

const mockTransactions: Transaction[] = [
  { id: 'txn1', type: 'Deposit', orderId: 'ORD-123', reference: 'REF-ABC', amount: 50000, currency: 'NGN', date: '2024-05-20', status: 'completed' },
  { id: 'txn2', type: 'Withdrawal', orderId: 'ORD-124', reference: 'REF-DEF', amount: 10000, currency: 'NGN', date: '2024-05-18', status: 'pending' },
  { id: 'txn3', type: 'Bonus', orderId: 'ORD-125', reference: 'REF-GHI', amount: 5000, currency: 'NGN', date: '2024-05-15', status: 'completed' },
  { id: 'txn4', type: 'Deposit', orderId: 'ORD-126', reference: 'REF-JKL', amount: 25000, currency: 'NGN', date: '2024-05-10', status: 'failed' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

const StatusBadge: React.FC<{ status: Transaction['status'] }> = ({ status }) => {
  const statusClasses = {
    completed: styles.statusCompleted,
    pending: styles.statusPending,
    failed: styles.statusFailed,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TransactionsTab: React.FC<TransactionsTabProps> = ({ userId }) => {
  // TODO: Use userId to fetch user-specific transactions data.
  const columns: ColumnDef<Transaction>[] = useMemo(() => [
    { header: 'Type', accessor: 'type' },
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Amount', accessor: 'amount', cell: (item) => formatCurrency(item.amount) },
    { header: 'Date', accessor: 'date', cell: (item) => new Date(item.date).toLocaleDateString() },
    { header: 'Status', accessor: 'status', cell: (item) => <StatusBadge status={item.status} /> },
  ], []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>User Transactions</h3>
      <Table columns={columns} data={mockTransactions} />
    </div>
  );
}


export default TransactionsTab;
