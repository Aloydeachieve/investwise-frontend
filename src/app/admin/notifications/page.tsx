"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminNotification } from "@/contexts/AdminNotificationContext";
import { Notification } from "@/components/types/notification";
import styles from "./notifications.module.css";
import { Bell, CheckCheck } from "lucide-react";
import NotificationCard from "@/components/dashboard/NotificationCard/NotificationCard";
import AdminDashboardLayout from "@/components/layout/AdminDashboard/AdminDashboardLayout";

type FilterTab = "all" | "unread";

const AdminNotificationsContent = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useAdminNotification();
  const [activeTab, setActiveTab] = useState<FilterTab>("unread");

  const filteredNotifications = useMemo(() => {
    if (activeTab === "unread") {
      return notifications.filter((n) => !n.isRead);
    }
    return notifications;
  }, [activeTab, notifications]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Notifications</h1>
          <p className={styles.subtitle}>
            You have {unreadCount} unread notifications requiring action.
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className={styles.markAllButton}
          disabled={unreadCount === 0}
        >
          <CheckCheck size={16} />
          <span>Mark all as read</span>
        </button>
      </div>

      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab("unread")}
          className={`${styles.tabButton} ${
            activeTab === "unread" ? styles.activeTab : ""
          }`}
        >
          Pending Actions
          {unreadCount > 0 && (
            <span className={styles.unreadPill}>{unreadCount}</span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`${styles.tabButton} ${
            activeTab === "all" ? styles.activeTab : ""
          }`}
        >
          All Notifications
        </button>
      </div>

      <div className={styles.notificationList}>
        <AnimatePresence>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
              >
                <NotificationCard
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.emptyState}
            >
              <div className={styles.emptyIcon}>
                <Bell size={48} />
              </div>
              <h2>
                {activeTab === "unread"
                  ? "No pending actions!"
                  : "No notifications yet."}
              </h2>
              <p>
                {activeTab === "unread"
                  ? "All user actions have been reviewed."
                  : "We'll notify you when something new happens."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function AdminNotificationsPage() {
  return (
    <AdminDashboardLayout>
      <AdminNotificationsContent />
    </AdminDashboardLayout>
  );
}
