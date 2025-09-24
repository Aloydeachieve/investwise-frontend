"use client";

import { useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import styles from "./UpdateProfileModal.module.css";

export default function UpdateProfileModal({ onClose }: { onClose: () => void }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'personal' | 'address'>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call
    addToast("Profile updated successfully!", "success");
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Update Profile</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className={styles.tabs}>
          <button
            type="button"
            className={activeTab === 'personal' ? styles.activeTab : ''}
            onClick={() => setActiveTab('personal')}
          >
            Personal Information
          </button>
          <button
            type="button"
            className={activeTab === 'address' ? styles.activeTab : ''}
            onClick={() => setActiveTab('address')}
          >
            Address Information
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {activeTab === 'personal' && (
            <>
              <div className={styles.field}>
                <label>Full Name</label>
                <input type="text" defaultValue="Sylvanus Odi" />
              </div>
              <div className={styles.field}>
                <label>Display Name</label>
                <input type="text" defaultValue="Sylvanus" />
              </div>
              <div className={styles.field}>
                <label>Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className={styles.field}>
                <label>Telegram</label>
                <input type="text" defaultValue="@sylvanusodi" />
              </div>
              <div className={styles.field}>
                <label>Date of Birth</label>
                <input type="date" defaultValue="1990-01-01" />
              </div>
            </>
          )}
          {activeTab === 'address' && (
            <>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label>Address</label>
                <input type="text" defaultValue="123 Admin Lane, Tech City, 10001" />
              </div>
              <div className={styles.field}>
                <label>Nationality</label>
                <input type="text" defaultValue="Nigerian" />
              </div>
              <div className={styles.field}>
                <label>State</label>
                <input type="text" defaultValue="Lagos" />
              </div>
              <div className={styles.field}>
                <label>Province</label>
                <input type="text" defaultValue="Lagos" />
              </div>
            </>
          )}
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
            <button type="submit" className={styles.saveButton}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
