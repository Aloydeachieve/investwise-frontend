// src/app/verify/pending/page.tsx

"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { Clock, MailCheck } from "lucide-react";

export default function PendingVerification() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Clock size={40} strokeWidth={2} />
        </div>
        <h1 className={styles.title}>Verification in Progress</h1>
        <p className={styles.message}>
          Thank you for submitting your details. Your account is currently under
          review. This usually takes a few hours.
        </p>
        <p className={styles.note}>
          We will notify you via email once the verification is complete.
        </p>

        <Link href="/auth/login" className={styles.button}>
          Proceed to Login
        </Link>
        <div className={styles.footerNote}>
          <MailCheck size={16} />
          <span>An email has been sent to you with more details.</span>
        </div>
      </div>
    </div>
  );
}
