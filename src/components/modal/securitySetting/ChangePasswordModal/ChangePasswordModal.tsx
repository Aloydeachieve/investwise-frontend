// components/profile/ChangePasswordModal.tsx
"use client";
import styles from "./ChangePasswordModal.module.css";

export default function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Change Password</h3>
        <form className={styles.form}>
          <label>
            Old Password
            <input type="password" placeholder="Enter old password" />
          </label>
          <label>
            New Password
            <input type="password" placeholder="Enter new password" />
          </label>
          <button type="submit" className={styles.saveBtn}>Save</button>
        </form>
        <button onClick={onClose} className={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
}
