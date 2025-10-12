import React, { useMemo } from 'react';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { ActivityLog } from '@/components/types/details';
import styles from '@/styles/Tabs.module.css';
import { Trash2 } from 'lucide-react';

interface ActivitiesTabProps {
  userId: string;
}

const mockActivities: ActivityLog[] = [
  { id: 'act1', browser: 'Chrome on Windows', ipAddress: '192.168.1.1', timestamp: '2024-05-21T10:00:00Z', action: 'Logged In' },
  { id: 'act2', browser: 'Safari on macOS', ipAddress: '10.0.0.5', timestamp: '2024-05-20T15:30:00Z', action: 'Viewed Investment Plan' },
  { id: 'act3', browser: 'Chrome on Windows', ipAddress: '192.168.1.1', timestamp: '2024-05-20T10:05:00Z', action: 'Updated Profile' },
];

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ userId }) => {
  const columns: ColumnDef<ActivityLog>[] = useMemo(() => [
    { header: 'Browser & OS', accessor: 'browser' },
    { header: 'IP Address', accessor: 'ipAddress' },
    { header: 'Timestamp', accessor: 'timestamp', cell: (item) => new Date(item.timestamp).toLocaleString() },
    { header: 'Action', accessor: 'action' },
    {
      header: 'Clear',
      accessor: 'id',
      cell: (item) => (
        <button className={styles.clearButton} onClick={() => console.log('Clear log', item.id, 'for user', userId)}>
          <Trash2 size={16} />
        </button>
      ),
    },
  ], [userId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>User Activities</h3>
        <button className={styles.clearAllButton}>Clear All Logs</button>
      </div>
      <Table columns={columns} data={mockActivities} />
    </div>
  );
};

export default ActivitiesTab;