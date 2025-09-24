// src/components/dashboard/VerifyReminderBanner.tsx

"use client";

import React from "react";
import styles from "./VerifyReminderBanner.module.css";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function VerifyReminderBanner() {
  return (
    <div className={styles.banner}>
      <AlertTriangle className={styles.icon} />
      <div className={styles.message}>
        Your account is not verified yet. <br className="sm:hidden" />
        Please complete verification to deposit and invest.
      </div>
      <Link href="/verify" className={styles.cta}>
        Verify Now
      </Link>
    </div>
  );
}
