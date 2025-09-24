"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

import AppImage from "@/components/AppImage/Appimagee";
import InputField from "@/components/formFields/InputField";
import CheckboxField from "@/components/formFields/CheckBoxField";

import { showCustomToast } from "@/components/ui/CustomToast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Sign in to your account</h2>
        <p className={styles.subtitle}>
          Or{" "}
          <Link href="/signup" className={styles.link}>
            create a new account
          </Link>
        </p>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}

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

            <div className={styles.rememberRow}>
              <div className={styles.checkboxContainer}>
                <CheckboxField
                  id="agree"
                  name="agree"
                  label="Remember Me"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  required
                  error={error}
                >
                  {/* Children prop required by CheckboxFieldProps */}
                  Remember Me
                </CheckboxField>
              </div>
              <Link href="/auth/forgetPassword" className={styles.link}>
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.button}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          <div className={styles.oauthGrid}>
            <a href="#" className={styles.oauthButton}>
              <span className="sr-only">Sign in with Google</span>
              <svg
                className={styles.oauthIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.48 10.92..." />
              </svg>
            </a>
            <a href="#" className={styles.oauthButton}>
              <span className="sr-only">Sign in with Apple</span>
              <svg
                className={styles.oauthIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2..." />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
