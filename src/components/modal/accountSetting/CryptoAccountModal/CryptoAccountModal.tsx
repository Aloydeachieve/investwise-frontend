"use client";
import styles from "./CryptoAccountModal.module.css";

interface Props {
  onClose: () => void;
}

export default function CryptoAccountModal({ onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Add Crypto Wallet</h2>
        <form className={styles.form}>
          <label>
            Wallet Type
            <select>
              <option>Bitcoin (BTC)</option>
              <option>Ethereum (ETH)</option>
              <option>USDT (Tether)</option>
            </select>
          </label>
          <label>
            Wallet Address
            <input type="text" placeholder="Enter wallet address" />
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
