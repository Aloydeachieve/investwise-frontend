import React, { useEffect, useMemo, useState } from 'react';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { Transaction } from '@/components/types/details';
import styles from '@/styles/Tabs.module.css';
import { fetchUserTransactions } from '@/lib/adminUserApi';

interface TransactionsTabProps {
  userId: string;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);

const StatusBadge: React.FC<{ status: Transaction['status'] }> = ({ status }) => {
  const statusClasses = {
    completed: styles.statusCompleted,
    pending: styles.statusPending,
    failed: styles.statusFailed,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>;
};

const TransactionsTab: React.FC<TransactionsTabProps> = ({ userId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await fetchUserTransactions(userId);
        setTransactions(data.data || []);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  const columns: ColumnDef<Transaction>[] = useMemo(() => [
    { header: 'Type', accessor: 'type' },
    { header: 'Reference', accessor: 'reference' },
    { header: 'Amount', accessor: 'amount', cell: (item) => formatCurrency(item.amount) },
    { header: 'Date', accessor: 'date', cell: (item) => new Date(item.date).toLocaleDateString() },
    { header: 'Status', accessor: 'status', cell: (item) => <StatusBadge status={item.status} /> },
  ], []);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>User Transactions</h3>
      <Table columns={columns} data={transactions} />
    </div>
  );
};

export default TransactionsTab;
