"use client";

import { Users, TrendingUp, Shield, CreditCard, Banknote, AlertTriangle } from 'lucide-react';
import styles from './SummaryCards.module.css';

interface SummaryCardData {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const mockData: SummaryCardData[] = [
  {
    title: 'Total Users',
    value: '12,456',
    change: '+12.5%',
    changeType: 'positive',
    icon: <Users />,
    color: '#3b82f6'
  },
  {
    title: 'Active Investments',
    value: '8,234',
    change: '+8.2%',
    changeType: 'positive',
    icon: <TrendingUp />,
    color: '#10b981'
  },
  {
    title: 'Pending Verifications',
    value: '245',
    change: '-15.3%',
    changeType: 'positive',
    icon: <Shield />,
    color: '#f59e0b'
  },
  {
    title: 'Total Deposits',
    value: '₦125.6M',
    change: '+22.1%',
    changeType: 'positive',
    icon: <CreditCard />,
    color: '#8b5cf6'
  },
  {
    title: 'Total Withdrawals',
    value: '₦98.4M',
    change: '+18.7%',
    changeType: 'positive',
    icon: <Banknote />,
    color: '#ef4444'
  },
  {
    title: 'Platform Profits',
    value: '₦27.2M',
    change: '+31.4%',
    changeType: 'positive',
    icon: <AlertTriangle />,
    color: '#06b6d4'
  }
];

export default function SummaryCards() {
  return (
    <div className={styles.container}>
      {mockData.map((card) => (
        <div key={card.title} className={styles.card}>
          <div className={styles.cardHeader}>
            <div 
              className={styles.iconWrapper}
              style={{ backgroundColor: `${card.color}15` }}
            >
              <div 
                className={styles.icon}
                style={{ color: card.color }}
              >
                {card.icon}
              </div>
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardValue}>{card.value}</p>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <span 
              className={`${styles.change} ${
                card.changeType === 'positive' ? styles.positive : 
                card.changeType === 'negative' ? styles.negative : styles.neutral
              }`}
            >
              {card.change}
            </span>
            <span className={styles.changeText}>from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
