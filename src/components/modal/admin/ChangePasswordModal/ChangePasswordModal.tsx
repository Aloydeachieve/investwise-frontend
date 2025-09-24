"use client";

import { useToast } from "@/contexts/ToastContext";
import styles from "./ChangePasswordModal.module.css";

export default function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call
    addToast("Password updated successfully!", "success");
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Change Password</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" required />
          </div>
          <div className={styles.field}>
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" required />
          </div>
          <div className={styles.field}>
            <label>Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" required />
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
            <button type="submit" className={styles.saveButton}>Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}