"use client";

import React, { useState, useMemo } from "react";
import { useToast } from "@/contexts/ToastContext";
import Table, { ColumnDef } from "@/components/admin/Table/Table";
import { Referral } from "@/components/types/referral";
import {
  mockUserReferrals,
  mockReferralStats,
} from "@/data/referrals";
import styles from "./referrals.module.css";
import { Copy, Gift, Users, UserCheck } from "lucide-react";

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
}> = ({ icon, label, value }) => (
  <div className={styles.summaryCard}>
    <div className={styles.cardIcon}>{icon}</div>
    <div>
      <div className={styles.cardLabel}>{label}</div>
      <div className={styles.cardValue}>{value}</div>
    </div>
  </div>
);

const StatusBadge: React.FC<{
  status: "pending" | "confirmed" | "rejected";
}> = ({ status }) => {
  const statusClasses = {
    confirmed: styles.statusConfirmed,
    pending: styles.statusPending,
    rejected: styles.statusRejected,
  };
  return (
    <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default function ReferralsPage() {
  const { addToast } = useToast();
  const [referrals] = useState<Referral[]>(mockUserReferrals);
  const [stats] = useState(mockReferralStats);
  const referralLink = "https://investwise.com/ref/sylvanusodi";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        addToast("Referral link copied to clipboard!", "success");
      })
      .catch((err) => {
        addToast("Failed to copy link.", "error");
        console.error("Failed to copy text: ", err);
      });
  };

  const columns: ColumnDef<Referral>[] = useMemo(
    () => [
      {
        header: "Referred User",
        accessor: "referredUser",
        cell: (item) => item.referredUser.name,
      },
      {
        header: "Email",
        accessor: "referredUser",
        cell: (item) => item.referredUser.email,
      },
      {
        header: "Bonus",
        accessor: "bonus",
        cell: (item) => `${item.bonus.toLocaleString()} ${item.currency}`,
      },
      {
        header: "Status",
        accessor: "status",
        cell: (item) => <StatusBadge status={item.status} />,
      },
      {
        header: "Date",
        accessor: "date",
        cell: (item) => new Date(item.date).toLocaleDateString(),
      },
    ],
    []
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Referrals</h1>
          <p className={styles.subtitle}>
            Invite friends and earn rewards when they invest.
          </p>
        </div>

        <div className={styles.summaryGrid}>
          <StatCard
            icon={<Gift size={24} />}
            label="Total Bonus Earned"
            value={`${stats.totalBonus.toLocaleString()} ${stats.currency}`}
          />
          <StatCard
            icon={<Users size={24} />}
            label="Total Invited"
            value={stats.invitedCount}
          />
          <StatCard
            icon={<UserCheck size={24} />}
            label="Activated Referrals"
            value={stats.activatedCount}
          />
        </div>

        <div className={styles.referralLinkSection}>
          <h3 className={styles.sectionTitle}>Your Referral Link</h3>
          <p className={styles.sectionDescription}>
            Share this link with your friends. You&apos;ll earn a bonus for every
            friend who signs up and makes their first investment.
          </p>
          <div className={styles.linkWrapper}>
            <input
              type="text"
              readOnly
              value={referralLink}
              className={styles.referralLinkInput}
            />
            <button onClick={copyToClipboard} className={styles.copyButton}>
              <Copy size={16} />
              <span>Copy</span>
            </button>
          </div>
        </div>

        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h3 className={styles.sectionTitle}>Your Referrals</h3>
          </div>
          {referrals.length > 0 ? (
            <Table columns={columns} data={referrals} />
          ) : (
            <div className={styles.emptyState}>
              <p>
                You haven&apos;t referred anyone yet. Share your link and earn
                rewards!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
