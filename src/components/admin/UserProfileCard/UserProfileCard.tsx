import React from "react";
import { User } from "@/components/types/user";
import styles from "./UserProfileCard.module.css";
import { Mail, Phone, ShieldCheck, ShieldOff, KeyRound, UserX, Send } from "lucide-react";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount);

export default function UserProfileCard({ user }: { user: User }) {
  return (
    <div className={styles.card}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>{user.name.charAt(0)}</div>
        <h2 className={styles.userName}>{user.fullName || user.name}</h2>
        <p className={styles.userRole}>
          Status: <span className={`${styles.status} ${styles[user.status]}`}>{user.status}</span>
        </p>
      </div>

      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <Mail size={16} className={styles.contactIcon} />
          <span>{user.email}</span>
        </div>
        {user.mobile && (
          <div className={styles.contactItem}>
            <Phone size={16} className={styles.contactIcon} />
            <span>{user.mobile}</span>
          </div>
        )}
      </div>

      <div className={styles.balanceSection}>
        <h3 className={styles.sectionTitle}>Account Balances</h3>
        <div className={styles.balanceItem}>
          <span>Main Balance</span>
          <span className={styles.balanceAmount}>{formatCurrency(user.balances?.main ?? 0)}</span>
        </div>
        <div className={styles.balanceItem}>
          <span>Investment Wallet</span>
          <span className={styles.balanceAmount}>{formatCurrency(user.balances?.investment ?? 0)}</span>
        </div>
        <div className={styles.balanceItem}>
          <span>Locked Profit</span>
          <span className={styles.balanceAmount}>{formatCurrency(user.balances?.locked ?? 0)}</span>
        </div>
      </div>

      <div className={styles.actionsSection}>
        <h3 className={styles.sectionTitle}>Quick Actions</h3>
        <div className={styles.actionButtons}>
          <button className={styles.actionButton}>
            <Send size={16} />
            <span>Send Email</span>
          </button>
          {user.isVerified ? (
            <button className={`${styles.actionButton} ${styles.unverifyButton}`}>
              <ShieldOff size={16} />
              <span>Un-verify</span>
            </button>
          ) : (
            <button className={`${styles.actionButton} ${styles.verifyButton}`}>
              <ShieldCheck size={16} />
              <span>Verify Email</span>
            </button>
          )}
          <button className={styles.actionButton}>
            <KeyRound size={16} />
            <span>Reset Pass</span>
          </button>
          <button className={`${styles.actionButton} ${styles.suspendButton}`}>
            <UserX size={16} />
            <span>Suspend</span>
          </button>
        </div>
      </div>
    </div>
  );
}
