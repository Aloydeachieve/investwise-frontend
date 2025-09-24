"use client";

import React from 'react';
import AdminDashboardLayout from '@/components/layout/AdminDashboard/AdminDashboardLayout';
import Link from 'next/link';
import styles from './styles.module.css';
import { ChevronLeft, MoreVertical, Clock, Calendar, CheckCircle } from 'lucide-react';
import CircularProgressBar from '@/components/admin/CircularProgressBar/CircularProgressBar';
import Table, { ColumnDef } from '@/components/admin/Table/Table';

// Mock Data
const mockInvestment = {
  id: 'inv-001',
  planName: 'Gold Plan',
  interestRate: '5%',
  duration: '90 Days',
  userId: 'user-123',
  status: 'active',
  amount: 50000,
  profit: 2500,
  startDate: '2024-05-01T10:00:00Z',
  endDate: '2024-08-01T10:00:00Z',
  paymentSchedule: [
    { date: '2024-06-01', amount: 833.33, status: 'paid' },
    { date: '2024-07-01', amount: 833.33, status: 'paid' },
    { date: '2024-08-01', amount: 833.34, status: 'pending' },
  ],
  paymentTerm: 'Monthly',
  capitalReturn: 'At End of Term',
  isFixed: false,
  createdDate: '2024-04-30T12:00:00Z',
  approvedDate: '2024-05-01T09:00:00Z',
  approvedBy: 'admin_jdoe',
  completionDate: null,
  lastUpdated: '2024-07-01T10:05:00Z',
  totalReturn: 52500,
  paymentStatus: 'On-going',
  reference: 'TXN-GOLD-50K-USER123',
  userAccount: 'Sylvanus Odi (sylvanus@example.com)',
  notes: 'User upgraded from Silver plan.',
  progress: 29.17,
  netProfit: 9.43,
  remainingDays: 17,
};

const mockTransactions = [
    { id: '1', details: 'Investment for Gold Plan', date: '2024-05-01 10:00 AM', amount: -50000 },
    { id: '2', details: 'Profit for Jun 2024', date: '2024-06-01 10:00 AM', amount: 833.33 },
    { id: '3', details: 'Profit for Jul 2024', date: '2024-07-01 10:00 AM', amount: 833.33 },
];

const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

const StatusIcon = ({ status }: { status: 'paid' | 'pending' }) => {
    if (status === 'paid') return <CheckCircle size={16} className={styles.paidIcon} />;
    return <Clock size={16} className={styles.pendingIcon} />;
};

export default function InvestmentDetailsPage({ params }: { params: { id: string } }) {
    const investment = mockInvestment; // Fetch by params.id in real app

    const transactionColumns: ColumnDef<typeof mockTransactions[0]>[] = [
        { header: 'Details', accessor: 'details' },
        { header: 'Date & Time', accessor: 'date' },
        { header: 'Amount', accessor: 'amount', cell: (item) => (
            <span className={item.amount > 0 ? styles.profit : styles.loss}>
                {formatCurrency(item.amount)}
            </span>
        )},
    ];

    return (
        <AdminDashboardLayout>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <div className={styles.breadcrumb}>
                            Investment / {investment.planName} - {investment.interestRate} for {investment.duration}
                        </div>
                        <h1 className={styles.title}>Investment Details</h1>
                        <div className={styles.subHeader}>
                            <span>User ID: {investment.userId}</span>
                            <span className={`${styles.statusBadge} ${styles[investment.status]}`}>{investment.status}</span>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <Link href="/admin/investment-plans" className={styles.backButton}>
                            <ChevronLeft size={18} /> Back
                        </Link>
                        <button className={styles.menuButton}><MoreVertical size={20} /></button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className={styles.mainGrid}>
                    {/* Left Column */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Investment Overview</h3>
                        <div className={styles.overviewAmount}>
                            {formatCurrency(investment.amount)}
                            <span className={styles.profitAmount}>+ {formatCurrency(investment.profit)}</span>
                        </div>
                        <div className={styles.termDetails}>
                            <div className={styles.termItem}>
                                <Calendar size={16} />
                                <span>{new Date(investment.startDate).toLocaleDateString()}</span>
                                <small>Start Date</small>
                            </div>
                            <div className={styles.termArrow}>&rarr;</div>
                            <div className={styles.termItem}>
                                <Calendar size={16} />
                                <span>{new Date(investment.endDate).toLocaleDateString()}</span>
                                <small>End Date</small>
                            </div>
                        </div>
                        <h4 className={styles.scheduleTitle}>Payment Schedule</h4>
                        <div className={styles.schedule}>
                            {investment.paymentSchedule.map((p, i) => (
                                <div key={i} className={styles.scheduleItem}>
                                    <StatusIcon status={p.status} />
                                    <span>{new Date(p.date).toLocaleDateString()}</span>
                                    <strong>{formatCurrency(p.amount)}</strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Plan & Action Details</h3>
                        <div className={styles.detailsSection}>
                            <h4>Plan Details</h4>
                            <div className={styles.detailItem}><span>Scheme</span><strong>{investment.planName}</strong></div>
                            <div className={styles.detailItem}><span>Term</span><strong>{investment.paymentTerm}</strong></div>
                            <div className={styles.detailItem}><span>Interest</span><strong>{investment.interestRate} ({investment.paymentTerm})</strong></div>
                            <div className={styles.detailItem}><span>Duration</span><strong>{investment.duration}</strong></div>
                            <div className={styles.detailItem}><span>Capital Return</span><strong>{investment.capitalReturn}</strong></div>
                            <div className={styles.detailItem}><span>Type</span><strong>{investment.isFixed ? 'Fixed' : 'Compound'}</strong></div>
                        </div>
                        <div className={styles.detailsSection}>
                            <h4>Action Details</h4>
                            <div className={styles.detailItem}><span>Created</span><strong>{new Date(investment.createdDate).toLocaleString()}</strong></div>
                            <div className={styles.detailItem}><span>Approved</span><strong>{new Date(investment.approvedDate).toLocaleString()} by {investment.approvedBy}</strong></div>
                            <div className={styles.detailItem}><span>Completed</span><strong>{investment.completionDate ? new Date(investment.completionDate).toLocaleString() : 'N/A'}</strong></div>
                            <div className={styles.detailItem}><span>Last Update</span><strong>{new Date(investment.lastUpdated).toLocaleString()}</strong></div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Additional Info</h3>
                        <div className={styles.detailsSection}>
                            <div className={styles.detailItem}><span>Total Return</span><strong>{formatCurrency(investment.totalReturn)}</strong></div>
                            <div className={styles.detailItem}><span>Payment Status</span><span className={styles.paymentStatus}>{investment.paymentStatus}</span></div>
                            <div className={styles.detailItem}><span>Reference</span><strong>{investment.reference}</strong></div>
                            <div className={styles.detailItem}><span>User Account</span><strong>{investment.userAccount}</strong></div>
                        </div>
                        <div className={styles.notesSection}>
                            <h4>Notes</h4>
                            <p>{investment.notes || 'No notes for this investment.'}</p>
                        </div>
                    </div>
                </div>

                {/* Analytics */}
                <div className={styles.analyticsGrid}>
                    <CircularProgressBar percentage={investment.progress} color="#3b82f6" label="Overall Progress" startValue="0%" endValue="100%" />
                    <CircularProgressBar percentage={investment.netProfit} color="#16a34a" label="Net Profit" startValue="0%" endValue="100%" />
                    <CircularProgressBar percentage={(90 - investment.remainingDays) / 90 * 100} color="#8b5cf6" label="Remaining Time" startValue="0 Days" endValue={`${investment.remainingDays} Days`} />
                </div>

                {/* Transaction History */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Transaction History</h3>
                    <Table columns={transactionColumns} data={mockTransactions} />
                </div>
            </div>
        </AdminDashboardLayout>
    );
}
