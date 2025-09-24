"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useNotification } from '@/contexts/NotificationContext';
import styles from './notificationDropdown.module.css';
import NotificationIcon from '@/components/shared/NotificationIcon';
import { timeAgo } from '@/utils/time';

const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const latestNotifications = notifications.slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.bellButton}>
        <Bell size={22} />
        {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount > 9 ? '9+' : unreadCount}</span>}
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.header}>
            <h3>Notifications</h3>
            <Link href="/dashboard/notifications" onClick={() => setIsOpen(false)} className={styles.viewAllLink}>
              View All
            </Link>
          </div>
          <div className={styles.notificationList}>
            {latestNotifications.length > 0 ? (
              latestNotifications.map(notif => (
                <div key={notif.id} className={`${styles.notificationItem} ${!notif.isRead ? styles.unread : ''}`} onClick={() => markAsRead(notif.id)}>
                  <div className={styles.iconWrapper}>
                    <NotificationIcon type={notif.type} size={18} />
                  </div>
                  <div className={styles.content}>
                    <p className={styles.title}>{notif.title}</p>
                    <p className={styles.message}>{notif.message}</p>
                    <p className={styles.timestamp}>{timeAgo(notif.timestamp)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>No new notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;