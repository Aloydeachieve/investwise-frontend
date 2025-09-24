import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Briefcase, Gift, ShieldAlert, UserCheck, Bell } from 'lucide-react';
import { NotificationType } from '@/components/types/notification';

interface NotificationIconProps {
  type: NotificationType;
  size?: number;
}

const iconMap: Record<NotificationType, React.ElementType> = {
  deposit: ArrowDownLeft,
  withdrawal: ArrowUpRight,
  investment: Briefcase,
  referral: Gift,
  alert: ShieldAlert,
  kyc: UserCheck,
};

export default function NotificationIcon({ type, size = 20 }: NotificationIconProps) {
  const Icon = iconMap[type] || Bell;
  return <Icon size={size} />;
}