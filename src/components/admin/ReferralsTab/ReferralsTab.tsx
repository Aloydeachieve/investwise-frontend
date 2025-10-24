// components/admin/UserDetails/Tabs/ReferralsTab.tsx
import React, { useEffect, useState, useMemo } from "react";
import Table, { ColumnDef } from "@/components/admin/Table/Table";
import { Referral } from "@/lib/adminUserApi";
import styles from "@/styles/Tabs.module.css";
import { fetchUserReferrals } from "@/lib/adminUserApi";

interface ReferralsTabProps {
  userId: string;
}

const ReferralsTab: React.FC<ReferralsTabProps> = ({ userId }) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReferrals = async () => {
      try {
        const data = await fetchUserReferrals(userId);
        setReferrals(data.data || []);
      } catch (error) {
        console.error("Failed to fetch referrals", error);
      } finally {
        setLoading(false);
      }
    };
    loadReferrals();
  }, [userId]);

  const columns: ColumnDef<Referral>[] = useMemo(
    () => [
      { header: "Username", accessor: "name", sortable: true },
      { header: "Email", accessor: "email", sortable: true },
      {
        header: "Join Date",
        accessor: "joinDate",
        cell: (item) => new Date(item.joinDate).toLocaleDateString(),
        sortable: true,
      },
      { header: "Status", accessor: "status", sortable: true },
    ],
    []
  );

  if (loading) return <p className={styles.placeholder}>Loading referrals...</p>;
  if (referrals.length === 0)
    return <p className={styles.placeholder}>This user has not referred anyone yet.</p>;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Referred Users</h3>
      <Table columns={columns} data={referrals} sortable />
    </div>
  );
};

export default ReferralsTab;
