"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./notifications.module.css";
import { Bell, CheckCheck } from "lucide-react";
import NotificationCard from "@/components/dashboard/NotificationCard/NotificationCard";
import { useNotification } from "@/contexts/NotificationContext";

type FilterTab = "all" | "unread";

const UserNotificationsContent = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotification();
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
          <h1 className={styles.title}>Notifications</h1>
          <p className={styles.subtitle}>
            You have {unreadCount} unread messages.
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
          Unread
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
                  ? "You're all caught up!"
                  : "No notifications yet."}
              </h2>
              <p>
                {activeTab === "unread"
                  ? "You have no unread notifications."
                  : "We'll notify you when something new happens."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function NotificationsPage() {
  return <UserNotificationsContent />;
}
