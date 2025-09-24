"use client";

import React, { useState, ReactNode } from "react";
import Link from "next/link";
import styles from "./AdminDashboardLayout.module.css";
import { useAuth } from "@/contexts/AuthContext";
import {
  FiGrid,
  FiUsers,
  FiCheckSquare,
  FiBarChart2,
  FiCreditCard,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiBell,
  FiPercent,
  FiUserCheck,
} from "react-icons/fi";
import { AdminDashboardProviders } from "@/contexts/AdminDashboardProviders";
import AdminNotificationDropdown from "@/components/admin/AdminNotificationDropdown/AdminNotificationDropdown";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: AdminDashboardLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const { logout } = useAuth();

  const menuItems = [
    { href: "/admin", label: "Overview", icon: <FiGrid /> },
    { href: "/admin/users", label: "User Management", icon: <FiUsers /> },
    {
      href: "/admin/verifications",
      label: "Verifications",
      icon: <FiCheckSquare />,
    },
    {
      href: "/admin/investment-plans",
      label: "Investment Plans",
      icon: <FiBarChart2 />,
    },
    {
      href: "/admin/transactions",
      label: "Transactions",
      icon: <FiCreditCard />,
    },
    { href: "/admin/payouts", label: "Payouts", icon: <FiTrendingUp /> },
    { href: "/admin/referrals", label: "Referrals", icon: <FiPercent /> },
    { href: "/admin/notifications", label: "Notifications", icon: <FiBell /> },
    { href: "/admin/settings", label: "Settings", icon: <FiSettings /> },
    { href: "/admin/profile", label: "My Profile", icon: <FiUserCheck /> },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.layout}>
      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.logo}>
          <Link href="/admin">
            <span>InvestWise Admin</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className={`${styles.navLink} ${styles.logoutButton}`}
              >
                <span className={styles.icon}>
                  <FiLogOut />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <button className={styles.menuButton} onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
          <div className={styles.headerRight}>
            <AdminNotificationDropdown />
          </div>
        </header>
        <div className={styles.contentArea}>{children}</div>
      </main>
    </div>
  );
};

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <AdminDashboardProviders>
      <Layout>{children}</Layout>
    </AdminDashboardProviders>
  );
}
