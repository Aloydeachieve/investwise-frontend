"use client";

import { useState, useEffect } from 'react';
import SummaryCards from '@/components/admin/SummaryCards/SummaryCards';
import AdminChart from '@/components/admin/AdminChart/AdminChart';
import RecentActivity from '@/components/admin/RecentActivity/RecentActivity';
import styles from './styles.module.css';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Admin Overview</h1>
            <p className={styles.subtitle}>
              Monitor platform performance and manage operations
            </p>
          </div>

          <div className={styles.content}>
            <div className={styles.summarySection}>
              <SummaryCards />
            </div>

            <div className={styles.content2}>
            <div className={styles.chartSection}>
              <div className={styles.chartContainer}>
                <div className={styles.chartHeader}>
                  <h2 className={styles.chartTitle}>Investment & Transaction Trends</h2>
                  <p className={styles.chartSubtitle}>Monthly overview of platform activity</p>
                </div>
                <AdminChart />
              </div>
            </div>

            <div className={styles.activitySection}>
              <div className={styles.activityContainer}>
                <div className={styles.activityHeader}>
                  <h2 className={styles.activityTitle}>Recent Activity</h2>
                  <p className={styles.activitySubtitle}>Latest platform actions and events</p>
                </div>
                <RecentActivity />
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
