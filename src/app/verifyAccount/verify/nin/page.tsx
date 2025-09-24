"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./NINVerification.module.css";

export default function NINVerification() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nin: "",
    dob: "",
    image: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("NIN verification submitted. Pending approval.");
    router.push("/verifyAccount/pending");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Verify with NIN</h1>
      <p className={styles.subtitle}>Provide your National Identification Number for verification.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>NIN Number</label>
        <input
          type="text"
          name="nin"
          value={formData.nin}
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

        <label className={styles.label}>Upload NIN Slip</label>
        <input type="file" name="image" className={styles.input} accept="image/*" required />

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}
