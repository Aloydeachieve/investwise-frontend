import React, { useMemo } from 'react';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { Investment } from '@/components/types/details';
import styles from '@/styles/Tabs.module.css';

const mockInvestments: Investment[] = [
  { id: 'inv1', planName: 'Starter Plan', startDate: '2024-04-01', endDate: '2024-07-01', investmentId: 'INV-001', amount: 50000, currency: 'NGN', status: 'active' },
  { id: 'inv2', planName: 'Pro Plan', startDate: '2024-01-15', endDate: '2024-04-15', investmentId: 'INV-002', amount: 100000, currency: 'NGN', status: 'completed' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

const StatusBadge: React.FC<{ status: Investment['status'] }> = ({ status }) => {
  const statusClasses = {
    active: styles.statusActive,
    completed: styles.statusCompleted,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>;
};

export default function InvestmentsTab() {
  const columns: ColumnDef<Investment>[] = useMemo(() => [
    { header: 'Plan Name', accessor: 'planName' },
    { header: 'Amount', accessor: 'amount', cell: (item) => formatCurrency(item.amount) },
    { header: 'Start Date', accessor: 'startDate', cell: (item) => new Date(item.startDate).toLocaleDateString() },
    { header: 'End Date', accessor: 'endDate', cell: (item) => new Date(item.endDate).toLocaleDateString() },
    { header: 'Status', accessor: 'status', cell: (item) => <StatusBadge status={item.status} /> },
  ], []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>User Investments</h3>
      <Table columns={columns} data={mockInvestments} />
    </div>
  );
}