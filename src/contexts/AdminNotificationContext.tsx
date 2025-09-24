"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode, useCallback } from 'react';
import { Notification } from '@/components/types/notification';
import { mockAdminNotifications } from '@/data/notifications';
import { useToast } from './ToastContext';

interface AdminNotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const AdminNotificationContext = createContext<AdminNotificationContextType | undefined>(undefined);

export const useAdminNotification = () => {
  const context = useContext(AdminNotificationContext);
  if (!context) {
    throw new Error('useAdminNotification must be used within a AdminNotificationProvider');
  }
  return context;
};

export const AdminNotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(mockAdminNotifications);

  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id && !n.isRead ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    if (unreadCount > 0) {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      addToast('All notifications marked as read.', 'success');
    }
  }, [addToast, unreadCount]);

  const value = { notifications, unreadCount, markAsRead, markAllAsRead };

  return (
    <AdminNotificationContext.Provider value={value}>
      {children}
    </AdminNotificationContext.Provider>
  );
};