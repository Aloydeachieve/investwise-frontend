"use client";

import { ReactNode, useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Percent
} from 'lucide-react';
import NotificationDropdown from '@/components/dashboard/NotificationDropdown/NotificationDropdown';
import styles from './DashboardLayout.module.css';

function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/dashboard', icon: <Briefcase className={styles.icon} />, label: 'Dashboard' },
    { href: '/dashboard/investmentPlans', icon: <DollarSign className={styles.icon} />, label: 'Investments Plans' },
    { href: '/dashboard/transactions', icon: <TrendingUp className={styles.icon} />, label: 'Transactions' },
    { href: '/dashboard/myInvestments', icon: <Calendar className={styles.icon} />, label: 'Investments' },
    { href: '/dashboard/referrals', icon: <Percent className={styles.icon} />, label: 'Referrals' },
    { href: '/dashboard/notifications', icon: <Bell className={styles.icon} />, label: 'Notifications' },
    { href: '/dashboard/settings', icon: <Settings className={styles.icon} />, label: 'Settings' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <div className={styles.logoWrapper}>
              <Link href="/" className={styles.logo}>TreVox</Link>
            </div>
            <div className={styles.navWrapper}>
              <nav className={styles.nav}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
                <hr className={styles.divider} />
                <Link
                  href="/"
                  className={styles.navItem}
                >
                  <LogOut className={styles.icon} />
                  Sign out
                </Link>
              </nav>
            </div>
          </div>
          <div className={styles.profileSection}>
            <div className={styles.profileWrapper}>
              <div className={styles.profileInfo}>
                <div className={styles.avatar}>JD</div>
                <div className={styles.profileText}>
                  <p className={styles.profileName}>John Doe</p>
                  <p className={styles.profileView}>View profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainWrapper}>
        <div className={styles.topBar}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.mobileToggle}
          >
            <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {isMobileMenuOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
          </button>

          <div className={styles.topBarContent}>
            <div className={styles.welcomeWrapper}>
              <p className={styles.welcomeText}>Welcome back, John</p>
            </div>
            <div className={styles.notificationWrapper}>
              <NotificationDropdown />
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileNavItem} ${isActive(item.href) ? styles.active : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <hr className={styles.divider} />
              <Link
                href="/"
                className={styles.mobileNavItem}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogOut className={styles.icon} />
                Sign out
              </Link>
            </nav>
          </div>
        )}

        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
