"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

import InputField from "@/components/formFields/InputField";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  // ⏱ Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Handle code verification
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || code !== "123456") {
      setError("Invalid code. Please check and try again.");
      return;
    }

    setLoading(true);
    setError("");
    await new Promise((res) => setTimeout(res, 1000));
    router.push("/auth/cretePassword");
  };

  // 🔁 Resend code logic
  const handleResend = async () => {
    setResending(true);
    setError("");
    await new Promise((res) => setTimeout(res, 1000)); // simulate resend
    setCode("");
    setTimeLeft(60);
    setResending(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Enter Verification Code</h2>
        <p className={styles.subtitle}>
          We've sent a 6-digit code to your email.
          {timeLeft > 0 ? (
            <>
              {" "}
              It will expire in <strong>{timeLeft}s</strong>.
            </>
          ) : (
            <> Your code has expired.</>
          )}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}

          <InputField
            id="code"
            type="text"
            name="code"
            label="Verification Code"
            placeholder="Enter your Verification code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={timeLeft === 0}
            error={error}
          />

          <button
            type="submit"
            className={styles.button}
            disabled={loading || timeLeft === 0}
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>

        {timeLeft === 0 && (
          <div className={styles.resendBlock}>
            <p className={styles.subtitle}>Didn't receive the code?</p>
            <button
              className={styles.resendButton}
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? "Resending..." : "Resend Code"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
