"use client";

import { Clock, User, Shield, CreditCard, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import styles from './RecentActivity.module.css';

interface ActivityItem {
  id: string;
  type: 'user' | 'verification' | 'transaction' | 'investment' | 'system';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
  user?: string;
}

const activityData: ActivityItem[] = [
  {
    id: '1',
    type: 'user',
    title: 'New User Registration',
    description: 'Sarah Johnson created a new account',
    timestamp: '2 minutes ago',
    status: 'success',
    user: 'Sarah Johnson'
  },
  {
    id: '2',
    type: 'verification',
    title: 'KYC Verification Submitted',
    description: 'Michael Brown submitted BVN verification',
    timestamp: '5 minutes ago',
    status: 'warning',
    user: 'Michael Brown'
  },
  {
    id: '3',
    type: 'transaction',
    title: 'Large Deposit Alert',
    description: 'Emily Davis deposited ₦2,500,000',
    timestamp: '12 minutes ago',
    status: 'info',
    user: 'Emily Davis'
  },
  {
    id: '4',
    type: 'investment',
    title: 'Investment Plan Created',
    description: 'New "Premium Gold Plan" investment option added',
    timestamp: '23 minutes ago',
    status: 'success'
  },
  {
    id: '5',
    type: 'transaction',
    title: 'Withdrawal Request',
    description: 'James Wilson requested withdrawal of ₦750,000',
    timestamp: '35 minutes ago',
    status: 'warning',
    user: 'James Wilson'
  },
  {
    id: '6',
    type: 'system',
    title: 'System Maintenance',
    description: 'Scheduled maintenance completed successfully',
    timestamp: '1 hour ago',
    status: 'success'
  },
  {
    id: '7',
    type: 'verification',
    title: 'KYC Approved',
    description: 'Amanda Martinez verification approved',
    timestamp: '1 hour ago',
    status: 'success',
    user: 'Amanda Martinez'
  },
  {
    id: '8',
    type: 'transaction',
    title: 'Failed Transaction',
    description: 'Payment processing failed for David Lee',
    timestamp: '2 hours ago',
    status: 'error',
    user: 'David Lee'
  }
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'user':
      return <User className={styles.activityIcon} />;
    case 'verification':
      return <Shield className={styles.activityIcon} />;
    case 'transaction':
      return <CreditCard className={styles.activityIcon} />;
    case 'investment':
      return <TrendingUp className={styles.activityIcon} />;
    case 'system':
      return <AlertTriangle className={styles.activityIcon} />;
    default:
      return <Clock className={styles.activityIcon} />;
  }
};

export default function RecentActivity() {
  return (
    <div className={styles.container}>
      <div className={styles.activityList}>
        {activityData.map((activity) => (
          <div key={activity.id} className={styles.activityItem}>
            <div className={styles.activityIconWrapper}>
              <div 
                className={`${styles.activityIconContainer} ${styles[activity.status]}`}
              >
                {getActivityIcon(activity.type)}
              </div>
            </div>
            
            <div className={styles.activityContent}>
              <div className={styles.activityHeader}>
                <h4 className={styles.activityTitle}>{activity.title}</h4>
                <span className={styles.activityTime}>
                  <Clock className={styles.timeIcon} />
                  {activity.timestamp}
                </span>
              </div>
              
              <p className={styles.activityDescription}>
                {activity.description}
              </p>
              
              {activity.user && (
                <div className={styles.activityUser}>
                  <span className={styles.userLabel}>User:</span>
                  <span className={styles.userName}>{activity.user}</span>
                </div>
              )}
            </div>
            
            <div className={styles.activityStatus}>
              <div 
                className={`${styles.statusDot} ${styles[activity.status]}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.viewAllContainer}>
        <Link href="/admin/logs" className={styles.viewAllButton}>
          View All Activities
        </Link>
      </div>
    </div>
  );
}
