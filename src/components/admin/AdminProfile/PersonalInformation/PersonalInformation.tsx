"use client";

import styles from "./PersonalInformation.module.css";

// Mock data, replace with API call
const personalInfo = {
  fullName: "Sylvanus Odi",
  displayName: "Sylvanus",
  email: "admin@investwise.com",
  phone: "+1 (555) 123-4567",
  telegram: "@sylvanusodi",
  dob: "1990-01-01",
  address: "123 Admin Lane, Tech City, 10001",
};

export default function PersonalInformation() {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Personal Details</h3>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Full Name</label>
          <span>{personalInfo.fullName}</span>
        </div>
        <div className={styles.field}>
          <label>Display Name</label>
          <span>{personalInfo.displayName}</span>
        </div>
        <div className={styles.field}>
          <label>Email Address</label>
          <span>{personalInfo.email}</span>
        </div>
        <div className={styles.field}>
          <label>Phone Number</label>
          <span>{personalInfo.phone}</span>
        </div>
        <div className={styles.field}>
          <label>Telegram</label>
          <span>{personalInfo.telegram}</span>
        </div>
        <div className={styles.field}>
          <label>Date of Birth</label>
          <span>{personalInfo.dob}</span>
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Address</label>
          <span>{personalInfo.address}</span>
        </div>
      </div>
    </div>
  );
}
