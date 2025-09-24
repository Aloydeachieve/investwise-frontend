"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./BVNVerification.module.css";

export default function BVNVerification() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bvn: "",
    dob: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("BVN verification submitted. Pending approval.");
    router.push("/verifyAccount/pending");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Verify with BVN</h1>
      <p className={styles.subtitle}>Enter your BVN and date of birth for verification.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>BVN</label>
        <input
          type="text"
          name="bvn"
          value={formData.bvn}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}
