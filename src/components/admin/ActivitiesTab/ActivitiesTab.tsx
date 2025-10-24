import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table, { ColumnDef } from "@/components/admin/Table/Table";
import { ActivityLog } from "@/components/types/details";
import styles from "@/styles/Tabs.module.css";
import { Trash2 } from "lucide-react";
import { fetchUserActivities, clearActivityLog, deleteUserActivity } from "@/lib/adminUserApi";

interface ActivitiesTabProps {
  userId: string;
  initialData?: ActivityLog[];
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ userId, initialData }) => {
  const [activities, setActivities] = useState<ActivityLog[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData);

  const loadActivities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchUserActivities(userId);
      if (Array.isArray(res)) {
        setActivities(res);
      } else if (res?.data && Array.isArray(res.data)) {
        setActivities(res.data);
      } else {
        setActivities([]);
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!initialData) {
      loadActivities();
    }
  }, [userId, initialData, loadActivities]);

  const handleClear = useCallback(async (id?: string) => {
    try {
      if (id) {
        await deleteUserActivity(userId, id);
      } else {
        await clearActivityLog(userId);
      }
      await loadActivities();
    } catch (error) {
      console.error("Failed to clear logs", error);
    }
  }, [userId, loadActivities]);

  const columns: ColumnDef<ActivityLog>[] = useMemo(
    () => [
      { header: "Browser & OS", accessor: "browser", sortable: true },
      { header: "IP Address", accessor: "ipAddress", sortable: true },
      {
        header: "Timestamp",
        accessor: "timestamp",
        cell: (item) => new Date(item.timestamp).toLocaleString(),
        sortable: true,
      },
      { header: "Action", accessor: "action", sortable: true },
      {
        header: "Clear",
        accessor: "id",
        cell: (item) => (
          <button
            className={styles.clearButton}
            onClick={() => handleClear(item.id)}
          >
            <Trash2 size={16} />
          </button>
        ),
      },
    ],
    [handleClear]
  );

  if (loading) return <p className={styles.loading}>Loading activity logs...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>User Activities</h3>
                <button
          className={styles.clearAllButton}
          onClick={() => handleClear()}
        >
          Clear All Logs
        </button>
      </div>
      {activities.length > 0 ? (
        <Table columns={columns} data={activities} />
      ) : (
        <div className={styles.placeholder}>
          <p>No activities found for this user.</p>
        </div>
      )}
    </div>
  );
};

export default ActivitiesTab;
