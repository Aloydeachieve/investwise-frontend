"use client";
import { useState } from "react";
import styles from "./AccountSettings.module.css";
import BankAccountModal from "@/components/modal/accountSetting/BankAccountModal/BankAccountModal";
import CryptoAccountModal from "@/components/modal/accountSetting/CryptoAccountModal/CryptoAccountModal";

export default function AccountSettings() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeModal, setActiveModal] = useState<"bank" | "crypto" | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.warningBox}>
        ⚠️ Please add your account details to enable deposits & withdrawals.
      </div>

      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={styles.addButton}
      >
        Add Account
      </button>

      {showDropdown && (
        <div className={styles.dropdown}>
          <button
            onClick={() => {
              setActiveModal("crypto");
              setShowDropdown(false);
            }}
            className={styles.dropdownItem}
          >
            Crypto Account
          </button>
          <button
            onClick={() => {
              setActiveModal("bank");
              setShowDropdown(false);
            }}
            className={styles.dropdownItem}
          >
            Bank Account
          </button>
        </div>
      )}

      {activeModal === "bank" && (
        <BankAccountModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "crypto" && (
        <CryptoAccountModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
