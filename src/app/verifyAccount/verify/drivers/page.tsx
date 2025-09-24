"use client";

import { useRouter } from "next/navigation";
import styles from "./DriversVerification.module.css";

export default function DriversVerification() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Driver's License verification submitted. Pending approval.");
    router.push("/verifyAccount/pending");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Verify with Driver's License</h1>
      <p className={styles.subtitle}>Upload a clear image of your driver’s license.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Upload License</label>
        <input type="file" name="license" className={styles.input} accept="image/*" required />

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}
