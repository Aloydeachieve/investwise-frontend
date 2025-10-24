import React, { useEffect, useMemo, useState } from 'react';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { Investment } from '@/components/types/details';
import styles from '@/styles/Tabs.module.css';
import { fetchUserInvestments } from '@/lib/adminUserApi';

interface InvestmentsTabProps {
  userId: string;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);

const StatusBadge: React.FC<{ status: Investment['status'] }> = ({ status }) => {
  const statusClasses = {
    active: styles.statusActive,
    completed: styles.statusCompleted,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>;
};

const InvestmentsTab: React.FC<InvestmentsTabProps> = ({ userId }) => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const data = await fetchUserInvestments(userId);
        setInvestments(data.data || []);
      } catch (err) {
        console.error('Failed to fetch investments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [userId]);

  const columns: ColumnDef<Investment>[] = useMemo(() => [
    { header: 'Plan ID', accessor: 'investmentId' },
    { header: 'Amount Invested', accessor: 'amount', cell: (item) => formatCurrency(item.amount) },
    { header: 'Start Date', accessor: 'startDate', cell: (item) => new Date(item.startDate).toLocaleDateString() },
    { header: 'End Date', accessor: 'endDate', cell: (item) => new Date(item.endDate).toLocaleDateString() },
    { header: 'Status', accessor: 'status', cell: (item) => <StatusBadge status={item.status} /> },
  ], []);

  if (loading) return <p>Loading investments...</p>;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>User Investments</h3>
      <Table columns={columns} data={investments} />
    </div>
  );
};

export default InvestmentsTab;
