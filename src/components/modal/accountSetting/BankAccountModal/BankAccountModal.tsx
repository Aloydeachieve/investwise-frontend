"use client";
import styles from "./BankAccountModal.module.css";

interface Props {
  onClose: () => void;
}

export default function BankAccountModal({ onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Add Bank Account</h2>
        <form className={styles.form}>
          <label>
            Bank Name
            <input type="text" placeholder="Enter bank name" />
          </label>
          <label>
            Account Number
            <input type="text" placeholder="Enter account number" />
          </label>
          <label>
            Account Holder
            <input type="text" placeholder="Enter account holder name" />
          </label>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>
            <button type="submit" className={styles.save}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
