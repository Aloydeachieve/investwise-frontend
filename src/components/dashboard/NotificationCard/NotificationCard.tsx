"use client";

import React from 'react';
import { Notification } from '@/components/types/notification';
import styles from './notificationCard.module.css';
import NotificationIcon from '@/components/shared/NotificationIcon';
import { Check } from 'lucide-react';
import { timeAgo } from '@/utils/time';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
  return (
    <div className={`${styles.card} ${!notification.isRead ? styles.unread : ''}`}>
      <div className={styles.iconWrapper}><NotificationIcon type={notification.type} /></div>
      <div className={styles.content}>
        <h4 className={styles.title}>{notification.title}</h4>
        <p className={styles.message}>{notification.message}</p>
        <span className={styles.timestamp}>{timeAgo(notification.timestamp)}</span>
      </div>
      {!notification.isRead && (
        <button onClick={() => onMarkAsRead(notification.id)} className={styles.readButton} title="Mark as read">
          <Check size={16} />
        </button>
      )}
    </div>
  );
}