"use client";

import { useState } from "react";
import styles from "./SecuritySettings.module.css";
import ChangeEmailModal from "@/components/modal/admin/ChangeEmailModal/ChangeEmailModal";
import ChangePasswordModal from "@/components/modal/admin/ChangePasswordModal/ChangePasswordModal";
import Enable2FAModal from "@/components/modal/admin/Enable2FAModal/Enable2FAModal";

export default function SecuritySettings() {
  const [saveActivity, setSaveActivity] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Security Settings</h3>
      <p className={styles.subtitle}>
        These settings help you keep your account secure.
      </p>

      <div className={styles.settingItem}>
        <div>
          <h4>Save Activity Logs</h4>
          <p>You can save your all activity logs including unusual activity detected.</p>
        </div>
        <label className={styles.switch}>
          <input type="checkbox" checked={saveActivity} onChange={() => setSaveActivity(!saveActivity)} />
          <span className={styles.slider}></span>
        </label>
      </div>

      <div className={styles.settingItem}>
        <div>
          <h4>Email Alerts</h4>
          <p>Get email alerts for unusual activity in your account.</p>
        </div>
        <label className={styles.switch}>
          <input type="checkbox" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
          <span className={styles.slider}></span>
        </label>
      </div>

      <div className={styles.settingItem}>
        <div>
          <h4>Change Email</h4>
          <p>Update your current email address.</p>
        </div>
        <button onClick={() => setActiveModal("email")} className={styles.actionButton}>
          Change
        </button>
      </div>

      <div className={styles.settingItem}>
        <div>
          <h4>Change Password</h4>
          <p>Set a unique password to protect your account.</p>
        </div>
        <button onClick={() => setActiveModal("password")} className={styles.actionButton}>
          Change
        </button>
      </div>

      <div className={styles.settingItem}>
        <div>
          <h4>2FA Authentication</h4>
          <p>Secure your account with 2FA security.</p>
        </div>
        <button onClick={() => setActiveModal("2fa")} className={`${styles.actionButton} ${is2FAEnabled ? styles.disableButton : ''}`}>
          {is2FAEnabled ? "Disable" : "Enable"}
        </button>
      </div>

      {activeModal === "email" && <ChangeEmailModal onClose={() => setActiveModal(null)} />}
      {activeModal === "password" && <ChangePasswordModal onClose={() => setActiveModal(null)} />}
      {activeModal === "2fa" && <Enable2FAModal onClose={() => setActiveModal(null)} />}
    </div>
  );
}
