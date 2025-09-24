"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

import InputField from "@/components/formFields/InputField";
import CheckboxField from "@/components/formFields/CheckBoxField";

import { showCustomToast } from "@/components/ui/CustomToast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill out all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/verifyAccount/verify");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Create your account</h2>
        <p className={styles.subtitle}>
          Or{" "}
          <Link href="/login" className={styles.link}>
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.grid}>
              <InputField
                id="firstName"
                type="text"
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={error}
              />
              <InputField
                id="lastName"
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={error}
              />
            </div>

            <InputField
              id="email"
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />

            {/* Password Field */}
            <div className={styles.passwordWrapper}>
              <InputField
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className={styles.passwordWrapper}>
              <InputField
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={error}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <CheckboxField
              id="agreeTerms"
              name="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            >
              I agree to the{" "}
              <a href="/terms" className={styles.link}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className={styles.link}>
                Privacy Policy
              </a>
            </CheckboxField>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.button}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          <div className={styles.oauthGrid}>
            <a href="#" className={styles.oauthButton}>
              <span className="sr-only">Sign up with Google</span>
              <svg
                className={styles.oauthIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.48..." />
              </svg>
            </a>
            <a href="#" className={styles.oauthButton}>
              <span className="sr-only">Sign up with Apple</span>
              <svg
                className={styles.oauthIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C..." />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
