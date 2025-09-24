import { Notification } from "@/components/types/notification";

export const mockUserNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'deposit',
    title: 'Deposit Confirmed',
    message: 'Your deposit of ₦50,000 has been confirmed.',
    isRead: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 'notif-2',
    type: 'investment',
    title: 'New Investment Started',
    message: 'Your investment in the "Real Estate" plan is now active.',
    isRead: false,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
  },
  {
    id: 'notif-3',
    type: 'referral',
    title: 'Referral Bonus Earned!',
    message: 'You earned ₦500 from your referral, Alice Johnson.',
    isRead: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 'notif-4',
    type: 'withdrawal',
    title: 'Withdrawal Processed',
    message: 'Your withdrawal of ₦10,000 has been sent.',
    isRead: true,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 'notif-5',
    type: 'alert',
    title: 'Security Alert',
    message: 'Your password was recently changed. If this wasn\'t you, please contact support.',
    isRead: false,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: 'notif-6',
    type: 'kyc',
    title: 'KYC Approved',
    message: 'Your identity verification has been successfully approved.',
    isRead: true,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  }
];

export const mockAdminNotifications: Notification[] = [
  {
    id: 'admin-notif-1',
    type: 'deposit',
    title: '⚠️ New Deposit Pending',
    message: 'User Sylvanus Odi has deposited ₦100,000. Action required.',
    isRead: false,
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
  },
  {
    id: 'admin-notif-2',
    type: 'withdrawal',
    title: '⚠️ Withdrawal Request',
    message: 'User Jane Smith has requested to withdraw ₦25,000.',
    isRead: false,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: 'admin-notif-3',
    type: 'kyc',
    title: '⚠️ New KYC Submission',
    message: 'User John Doe has submitted documents for KYC verification.',
    isRead: false,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
  },
  {
    id: 'admin-notif-4',
    type: 'referral',
    title: '⚠️ Referral Payout',
    message: 'A referral bonus of ₦500 is due for Sylvanus Odi.',
    isRead: true,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 'admin-notif-5',
    type: 'alert',
    title: 'System Alert',
    message: 'Database backup completed successfully.',
    isRead: true,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
];