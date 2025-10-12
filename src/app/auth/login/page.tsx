"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/schemas/authSchema";
import { useAuth } from "@/contexts/AuthContext";
import { post } from "@/lib/api";
import styles from "./styles.module.css";
import { User } from "@/components/types/user"; // <-- Add this line

import InputField from "@/components/formFields/InputField";
import CheckboxField from "@/components/formFields/CheckBoxField";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const response = await post<{ user: User; token: string }>(
        "/auth/login",
        payload
      );

      if (response.success && response.data?.user) {
        login({
          user: response.data.user,
          token: response.data.token,
        });

        // Decide based on role
        if (response.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          status?: number;
          data?: { errors?: Record<string, string[]> };
        };
      };
      if (err.response?.status === 422 && err.response.data?.errors) {
        const apiErrors = err.response.data.errors;
        Object.keys(apiErrors).forEach((key) => {
          setError(key as keyof LoginSchema, {
            message: apiErrors[key][0],
          });
        });
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Sign in to your account</h2>
        <p className={styles.subtitle}>
          Or{" "}
          <Link href="/auth/signup" className={styles.link}>
            create a new account
          </Link>
        </p>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputField
              id="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              required
              {...register("email")}
              error={errors.email?.message}
            />

            {/* Password Field */}
            <div className={styles.passwordWrapper}>
              <InputField
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                required
                {...register("password")}
                error={errors.password?.message}
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
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <CheckboxField
                      id="rememberMe"
                      name="rememberMe"
                      label="Remember Me"
                      checked={field.value ?? false}
                      onChange={field.onChange}
                      required
                    >
                      Remember Me
                    </CheckboxField>
                  )}
                />
              </div>
              <Link href="/auth/forgetPassword" className={styles.link}>
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.button}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
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
                aria-hidden="true"
              >
                {" "}
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />{" "}
              </svg>
            </a>
            <a href="#" className={styles.oauthButton}>
              <span className="sr-only">Sign in with Apple</span>
              <svg
                className={styles.oauthIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {" "}
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />{" "}
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
