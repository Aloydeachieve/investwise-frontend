// /src/app/verify/page.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './verify.module.css';
import { useRouter } from 'next/navigation';

export default function VerifyAccountPage() {
  const [method, setMethod] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!method) return;
    router.push(`/verifyAccount/verify/${method}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Verify Your Account</h1>
        <p>Choose any government-issued document to verify your identity.</p>
        <Link href="/auth/login" className={styles.skip}>Skip & Login →</Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.optionGroup}>
          <label>
            <input type="radio" name="method" value="nin" onChange={e => setMethod(e.target.value)} />
            National Identification Number (NIN)
          </label>
          <label>
            <input type="radio" name="method" value="bvn" onChange={e => setMethod(e.target.value)} />
            Bank Verification Number (BVN)
          </label>
          <label>
            <input type="radio" name="method" value="passport" onChange={e => setMethod(e.target.value)} />
            International Passport
          </label>
          <label>
            <input type="radio" name="method" value="drivers" onChange={e => setMethod(e.target.value)} />
            Driver&apos;s License
          </label>
          <label>
            <input type="radio" name="method" value="voters" onChange={e => setMethod(e.target.value)} />
            Voter&apos;s Card
          </label>
        </div>
        <button className={styles.submitBtn} disabled={!method} type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
