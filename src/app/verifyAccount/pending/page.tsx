// src/app/verify/pending/page.tsx

"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function PendingVerification() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Clock size={48} className={styles.icon} />
        <h1 className={styles.title}>Verification in Progress</h1>
        <p className={styles.message}>
          Your identity verification is currently under review. This process may
          take up to <strong>24–48 hours</strong>.
        </p>
        <p className={styles.note}>
          You’ll receive an email once your account is verified. In the meantime,
          you may continue to use your account with limited features.
        </p>

        <Link href="/auth/login" className={styles.button}>
          Go to Login
        </Link>
      </div>
    </div>
  );
}
