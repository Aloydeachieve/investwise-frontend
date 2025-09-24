// components/profile/ProfileModal.tsx
"use client";
import { useState } from "react";
import styles from "./ProfileModal.module.css";

export default function ProfileModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [fullNameEnabled, setFullNameEnabled] = useState(true);

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3>Update Profile</h3>
          <button onClick={onClose}>&times;</button>
        </div>

        {/* Tabs */}
        <div className={styles.modalTabs}>
          <button
            className={activeTab === "personal" ? styles.activeTab : ""}
            onClick={() => setActiveTab("personal")}
          >
            Personal Info
          </button>
          <button
            className={activeTab === "address" ? styles.activeTab : ""}
            onClick={() => setActiveTab("address")}
          >
            Address
          </button>
        </div>

        {/* Content */}
        <div className={styles.modalBody}>
          {activeTab === "personal" && (
            <form className={styles.form}>
              <div className={styles.addressRow}>
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />
              </div>

              <div className={styles.addressRow}>
                <label>Email</label>
                <input type="email" placeholder="Enter email" />
              </div>

              <div className={styles.addressRow}>
                <label>Phone</label>
                <input type="text" placeholder="+234..." />
              </div>

              <div className={styles.addressRow}>
                <label>Gender</label>
                <input type="text" placeholder="Enter gender" />
              </div>

              <div className={styles.addressRow}>
                <label>Date of Birth</label>
                <input type="date" placeholder="Enter date of birth" />
              </div>

            <div className={styles.addressRow1}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={fullNameEnabled}
                  onChange={() => setFullNameEnabled(!fullNameEnabled)}
                />
                <span className={styles.slider} />
              </label>
              <span>Use full name to display</span>
            </div>


              <button type="submit" className={styles.saveBtn}>
                Save Changes
              </button>
            </form>
          )}

          {activeTab === "address" && (
            <form className={styles.form}>
              <div className={styles.addressRow}>
                <label>Address line 1</label>
                <input type="text" placeholder="Enter address line 1" />
              </div>

              <div className={styles.addressRow}>
                <label>Address line 2</label>
                <input type="text" placeholder="Enter address line 2" />
              </div>

              <div className={styles.addressRow}>
                <label>City/Province</label>
                <input type="text" placeholder="Enter city" />
              </div>

              <div className={styles.addressRow}>
                <label>State</label>
                <input type="text" placeholder="Enter state" />
              </div>

              <div className={styles.addressRow}>
                <label>Zip/postal Code</label>
                <input type="text" placeholder="Enter zip code" />
              </div>

              <div className={styles.addressRow}>
                <label>Country</label>
                <input type="text" placeholder="Enter country" />
              </div>

              <button type="submit" className={styles.saveBtn}>
                Save Address
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
