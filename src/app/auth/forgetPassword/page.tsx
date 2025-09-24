'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import Link from 'next/link';
import InputField from "@/components/formFields/InputField";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    await new Promise((res) => setTimeout(res, 1000));

        // Store timestamp for expiry check
    const expiresAt = Date.now() + 60000; // 60 seconds from now
    localStorage.setItem('verification_expires_at', expiresAt.toString());

    router.push('/auth/verifyCode');
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Forgot your password?</h2>
        <p className={styles.subtitle}>
          Enter your email address and we’ll send you a link to reset it.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}

              <InputField
                id='email'
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
              />

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Sending...' : 'Send verification code'}
          </button>

          <p className={styles.back}>
            <Link href="/auth/login" className={styles.link}>Back to login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
