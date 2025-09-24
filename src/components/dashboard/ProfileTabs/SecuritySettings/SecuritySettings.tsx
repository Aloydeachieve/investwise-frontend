// components/profile/SecuritySettings.tsx
"use client";
import { useState } from "react";
import styles from "./SecuritySettings.module.css";
import ChangeEmailModal from "@/components/modal/securitySetting/ChangeEmailModal/ChangeEmailModal";
import ChangePasswordModal from "@/components/modal/securitySetting/ChangePasswordModal/ChangePasswordModal";
import Enable2FAModal from "@/components/modal/securitySetting/Change2FAModal/Change2FAModal";

export default function SecuritySettings() {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerSection}>
        <h2 className={styles.header}>Security Settings</h2>
        <p>These settings are helps you keep your account secure.</p>
      </div>
      <div className={styles.option}>
        <div className={styles.options}>
          <div className={styles.optionText}>
            <span>Change Email Address</span>
            <p>Update your current email address to new email address.</p>
          </div>
          <button onClick={() => setModal("email")} className={styles.actionButton} >Change Email</button>
        </div>
        <div className={styles.options}>
          <div className={styles.optionText}>
            <span>Change Password</span>
            <p>Set a unique password to protect your account.</p>
          </div>
          <button onClick={() => setModal("password")} className={styles.actionButton} >Change Password</button>
        </div>
        <div className={styles.options}>
          <div className={styles.optionText}>
            <span>2FA Security</span>
            <p>
              Secure your account with 2FA security. When it is activated you
              will need to enter not only your password, but also a special code
              using your mobile.
            </p>
          </div>
          <button onClick={() => setModal("2fa")} className={styles.actionButton} >Enable 2FA</button>
        </div>
      </div>

      {modal === "email" && <ChangeEmailModal onClose={() => setModal(null)} />}
      {modal === "password" && (
        <ChangePasswordModal onClose={() => setModal(null)} />
      )}
      {modal === "2fa" && <Enable2FAModal onClose={() => setModal(null)} />}
    </div>
  );
}
