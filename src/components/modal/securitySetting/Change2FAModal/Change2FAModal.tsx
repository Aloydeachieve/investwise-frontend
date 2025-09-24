// components/profile/Enable2FAModal.tsx
"use client";
import styles from "./Change2FAModal.module.css";

export default function Enable2FAModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Enable Two-Factor Authentication</h3>
        <p>Scan the QR code with your authenticator app.</p>
        <div className={styles.qrBox}>[QR-CODE-HERE]</div>
        <form className={styles.form}>
          <label>
            Verification Code
            <input type="text" placeholder="Enter code" />
          </label>
          <button type="submit" className={styles.saveBtn}>Enable</button>
        </form>
        <button onClick={onClose} className={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
}
