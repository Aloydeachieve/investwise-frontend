import React, { useState } from "react";
import { User } from "@/components/types/user";
import styles from "./UserProfileCard.module.css";
import {
  Mail,
  Phone,
  ShieldCheck,
  ShieldOff,
  KeyRound,
  UserX,
  Send,
  UserCheck,
} from "lucide-react";
import { put, post } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SendEmailModal from "@/components/modal/SendEmailModal/SendEmailModal";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    amount
  );

export default function UserProfileCard({ user }: { user: User }) {
  const [isVerified, setIsVerified] = useState(user.isVerified);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedUserForEmail, setSelectedUserForEmail] = useState<User | null>(
    null
  );

  const sendEmailMutation = useMutation({
    mutationFn: ({
      userId,
      subject,
      message,
    }: {
      userId: string;
      subject: string;
      message: string;
    }) => post(`/auth/users/${userId}/send-email`, { subject, message }),
    onSuccess: () => {
      setIsEmailModalOpen(false);
    },
  });

  const handleSendEmail = (data: { subject: string; message: string }) => {
    if (!selectedUserForEmail) return;
    sendEmailMutation.mutate({ userId: selectedUserForEmail.id, ...data });
  };

    const suspendMutation = useMutation({
      mutationFn: (userId: string) => put(`/auth/users/${userId}/suspend`, {}),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

  const unsuspendMutation = useMutation({
    mutationFn: (userId: string) => put(`/auth/users/${userId}/unsuspend`, {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const toggleVerification = async () => {
    setLoading(true);
    try {
      const res = await put(`auth/users/${user.id}/verify`, {
        verified: !isVerified,
      });
      if (res.success) {
        setIsVerified(!isVerified);
      }
    } catch (err) {
      console.error("Verification toggle failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        user={selectedUserForEmail}
        onSendEmail={handleSendEmail}
        isSending={sendEmailMutation.isPending}
      />
      <div className={styles.card}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>{user?.name?.charAt(0)}</div>
          <h2 className={styles.userName}>{user.fullName || user.name}</h2>
          <p className={styles.userRole}>
            Status:{" "}
            <span className={`${styles.status} ${styles[user.status]}`}>
              {user.status}
            </span>
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
            <span className={styles.balanceAmount}>
              {formatCurrency(user.balances?.main ?? 0)}
            </span>
          </div>
          <div className={styles.balanceItem}>
            <span>Investment Wallet</span>
            <span className={styles.balanceAmount}>
              {formatCurrency(user.balances?.investment ?? 0)}
            </span>
          </div>
          <div className={styles.balanceItem}>
            <span>Locked Profit</span>
            <span className={styles.balanceAmount}>
              {formatCurrency(user.balances?.locked ?? 0)}
            </span>
          </div>
        </div>

        <div className={styles.actionsSection}>
          <h3 className={styles.sectionTitle}>Quick Actions</h3>
          <div className={styles.actionButtons}>
            <button
              className={styles.actionButton}
              onClick={() => {
                setSelectedUserForEmail(user);
                setIsEmailModalOpen(true);
                // setOpenDropdownId(null);
              }}
            >
              <Send size={16} />
              <span>Send Email</span>
            </button>
            <button
              onClick={toggleVerification}
              disabled={loading}
              className={`${styles.actionButton} ${
                isVerified ? styles.unverifyButton : styles.verifyButton
              }`}
            >
              {isVerified ? <ShieldOff size={16} /> : <ShieldCheck size={16} />}
              <span>{isVerified ? "Un-verify" : "Verify Email"}</span>
            </button>
            <button className={styles.actionButton}>
              <KeyRound size={16} />
              <span>Reset Pass</span>
            </button>

            {user.status !== "suspended" ? (
              <button
                className={`${styles.actionButton} ${styles.suspendButton}`}
                title="Suspend User"
                onClick={() => suspendMutation.mutate(user.id)}
              >
                <UserX size={16} />
                <span>Suspend</span>
              </button>
            ) : (
              <button
                className={`${styles.actionButton} ${styles.unsuspendButton}`}
                title="Un-suspend User"
                onClick={() => unsuspendMutation.mutate(user.id)}
              >
                <UserCheck size={16} />
                <span>Un-suspend</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
