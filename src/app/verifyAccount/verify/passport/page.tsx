"use client";

import { useRouter } from "next/navigation";
import styles from "./PassportVerification.module.css";

export default function PassportVerification() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Passport verification submitted. Pending approval.");
    router.push("/verifyAccount/pending");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Verify with Passport</h1>
      <p className={styles.subtitle}>Upload a clear photo of your international passport.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Upload Passport</label>
        <input type="file" name="passport" className={styles.input} accept="image/*" required />

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}
