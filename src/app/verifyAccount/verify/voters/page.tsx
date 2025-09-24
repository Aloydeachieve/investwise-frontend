"use client";

import { useRouter } from "next/navigation";
import styles from "./VotersVerification.module.css";

export default function VotersVerification() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Voter's card verification submitted. Pending approval.");
    router.push("/verifyAccount/pending");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Verify with Voter's Card</h1>
      <p className={styles.subtitle}>Upload a clear image of your voter’s card.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Upload Voter’s Card</label>
        <input type="file" name="voters" className={styles.input} accept="image/*" required />

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}
