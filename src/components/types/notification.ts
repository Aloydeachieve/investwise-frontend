export type NotificationType = 'deposit' | 'withdrawal' | 'investment' | 'referral' | 'alert' | 'kyc';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
}