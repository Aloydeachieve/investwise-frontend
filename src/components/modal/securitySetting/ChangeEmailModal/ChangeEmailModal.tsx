// components/profile/ChangeEmailModal.tsx
"use client";
import styles from "./ChangeEmailModal.module.css";

export default function ChangeEmailModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Change Email</h3>
        <form className={styles.form}>
          <div className={styles.addressRow}>
            <label>Current Email Address</label>
            <input type="email" placeholder="Enter current email" />
          </div>

          <div className={styles.addressRow}>
            <label>New Email Address</label>
            <input type="email" placeholder="Enter new email" />
          </div>

          <div className={styles.addressRow}>
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Save
          </button>
        </form>
        <button onClick={onClose} className={styles.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}
