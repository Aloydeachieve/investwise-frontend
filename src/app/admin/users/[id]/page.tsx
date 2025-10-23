"use client";

import React, { useEffect, useState, use } from "react";
import UserDetailsLayout from "@/components/admin/UserDetails/UserDetailsLayout";
import { User } from "@/components/types/user";
import styles from "./styles.module.css";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import api from "@/lib/api"; // your axios wrapper
import { isAxiosError } from "axios";

export default function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = use(params); // Unwrap params Promise for Next.js 15+

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await api.get(`/auth/users/${id}`);
        setUser(res.data.data); // assuming your API wraps in { data: { ...user } }
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          console.error("Error fetching user:", err.message);
          if (err.response?.status === 500) {
            setError("Server error: The backend API is not responding correctly. Please ensure the Laravel backend server is running on http://127.0.0.1:8000");
          } else if (err.response?.status === 404) {
            setError("User not found: The requested user does not exist.");
          } else if (err.response?.status === 401) {
            setError("Authentication error: Please check if you're logged in with admin privileges.");
          } else {
            setError(`Failed to load user details: ${err.response?.data?.message || err.message}`);
          }
        } else {
          console.error("An unexpected error occurred:", err);
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading user details...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!user) return <p className={styles.error}>User not found.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Link href="/admin/users" className={styles.backLink}>
            <ChevronLeft size={20} />
            <span>Back to Users</span>
          </Link>
          <h1 className={styles.title}>User Details</h1>
          <p className={styles.subtitle}>Detailed information for {user.name}.</p>
        </div>
      </div>
      <UserDetailsLayout user={user} />
    </div>
  );
}
