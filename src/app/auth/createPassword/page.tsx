'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

import InputField from "@/components/formFields/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmNewPassword) {
      setError('Please fill both password fields');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    await new Promise((res) => setTimeout(res, 1000));
    router.push('/login');
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Create a new password</h2>
        <p className={styles.subtitle}>Enter and confirm your new password below.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}

              {/* Password Field */}
              <div className={styles.passwordWrapper}>
                <InputField
                  id='newPassword'
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter your new password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={error}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className={styles.passwordWrapper}>
                <InputField
                  id='confirmNewPassword'
                  type={showConfirmNewPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  placeholder="Re-enter your New password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  error={error}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                >
                  {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Confirming...' : 'Confirm password'}
          </button>
        </form>
      </div>
    </div>
  );
}
