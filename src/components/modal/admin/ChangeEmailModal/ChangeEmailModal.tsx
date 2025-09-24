"use client";

import { useToast } from "@/contexts/ToastContext";
import styles from "./ChangeEmailModal.module.css";

export default function ChangeEmailModal({ onClose }: { onClose: () => void }) {
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call
    addToast("Email change request sent!", "success");
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Change Email</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>New Email Address</label>
            <input type="email" placeholder="Enter new email" required />
          </div>
          <div className={styles.field}>
            <label>Confirm New Email</label>
            <input type="email" placeholder="Confirm new email" required />
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
            <button type="submit" className={styles.saveButton}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}