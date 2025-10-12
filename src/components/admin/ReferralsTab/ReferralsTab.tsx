import React, { useMemo } from 'react';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { User } from '@/components/types/user';
import styles from '@/styles/Tabs.module.css';

interface ReferralTabProps {
  userId: string;
}

// Set to empty array to test the "no referrals" message
const mockReferrals: User[] = [
  // { id: 'ref1', name: 'Referred User 1', email: 'ref1@example.com', joinDate: '2024-05-01', status: 'active', lastLogin: null },
  // { id: 'ref2', name: 'Referred User 2', email: 'ref2@example.com', joinDate: '2024-05-05', status: 'pending', lastLogin: null },
];

const ReferralsTab: React.FC<ReferralTabProps> = ({ userId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // TODO: Use userId to fetch user-specific referrals data
  const columns: ColumnDef<User>[] = useMemo(() => [
    { header: 'Username', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Join Date', accessor: 'joinDate', cell: (item) => new Date(item.joinDate).toLocaleDateString() },
    { header: 'Status', accessor: 'status' },
  ], []);

  if (mockReferrals.length === 0) {
    return (
      <div className={styles.placeholder}>
        <p>This user has not referred anyone yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Referred Users</h3>
      <Table columns={columns} data={mockReferrals} />
    </div>
  );
}

export default ReferralsTab;
