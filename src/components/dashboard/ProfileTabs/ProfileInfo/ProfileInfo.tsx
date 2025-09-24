// components/profile/ProfileInfo.tsx
"use client";
import { useState } from "react";
import styles from "./ProfileInfo.module.css";
import ProfileModal from "@/components/modal/ProfileModal/ProfileModal";

export default function ProfileInfo() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Profile Information</h2>
        <p className={styles.subHeader}>
          Basic info, like your name and address, that you use on our platform.
        </p>
      </div>

      <div className={styles.infoRow}>
        <span>Full Name</span>
        <span className={styles.value}>John Doe</span>
      </div>

      <div className={styles.infoRow}>
        <span>Email</span>
        <span className={styles.value}>johndoe@email.com</span>
      </div>

      <div className={styles.infoRow}>
        <span>Phone Number</span>
        <span className={styles.value}>+234 801 234 5678</span>
      </div>

      <div className={styles.infoRow}>
        <span>Gender</span>
        <span className={styles.value}>Male</span>
      </div>

      <div className={styles.infoRow}>
        <span>Date of birth</span>
        <span className={styles.value}>01/01/1990 </span>
      </div>

      <div className={styles.infoRow}>
        <span>Address</span>
        <span className={styles.value}>123 Main St, Anytown, USA</span>
      </div>

      <div className={styles.infoRow}>
        <span>Country</span>
        <span className={styles.value}>USA</span>
      </div>

      <button className={styles.editBtn} onClick={() => setOpen(true)}>
        Edit Profile
      </button>

      {open && <ProfileModal onClose={() => setOpen(false)} />}
    </div>
  );
}
