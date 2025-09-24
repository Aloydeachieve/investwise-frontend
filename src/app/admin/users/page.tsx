"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AdminDashboardLayout from '@/components/layout/AdminDashboard/AdminDashboardLayout';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { User, UserStatus } from '@/components/types/user';
import styles from './styles.module.css';
import { Eye, Ban, MoreVertical, UserPlus } from 'lucide-react';
import AddUserModal from '@/components/modal/UserDetails/AddUserModal';

// Mock Data
const mockUsers: User[] = [
  { id: '1', name: 'Sylvanus Odi', email: 'sylvanus@example.com', status: 'active', joinDate: '2023-10-26', lastLogin: '2024-05-20T10:00:00Z' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', status: 'suspended', joinDate: '2023-11-15', lastLogin: '2024-05-18T14:30:00Z' },
  { id: '3', name: 'John Doe', email: 'john.doe@example.com', status: 'pending', joinDate: '2024-01-05', lastLogin: null },
  { id: '4', name: 'Emily White', email: 'emily.white@example.com', status: 'active', joinDate: '2023-09-01', lastLogin: '2024-05-21T08:00:00Z' },
  { id: '5', name: 'Michael Brown', email: 'michael.brown@example.com', status: 'active', joinDate: '2024-02-20', lastLogin: '2024-05-21T09:15:00Z' },
  { id: '6', name: 'Jessica Green', email: 'jessica.green@example.com', status: 'suspended', joinDate: '2024-03-10', lastLogin: '2024-04-30T18:45:00Z' },
];

// Helper to render status badge
const StatusBadge: React.FC<{ status: UserStatus }> = ({ status }) => {
  const statusClasses = {
    active: styles.statusActive,
    suspended: styles.statusSuspended,
    pending: styles.statusPending,
  };
  return (
    <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

// New type for our filters
type FilterStatus = UserStatus | 'all';

export default function UserManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredUsers = useMemo(() => {
    if (filter === 'all') {
      return mockUsers;
    }
    return mockUsers.filter(user => user.status === filter);
  }, [filter]);

  const columns: ColumnDef<User>[] = useMemo(() => [
    {
      header: 'Name',
      accessor: 'name',
      cell: (user) => (
        <div className={styles.userCell}>
          <div className={styles.avatar}>{user.name.charAt(0)}</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userEmail}>{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (user) => <StatusBadge status={user.status} />,
    },
    {
      header: 'Date Joined',
      accessor: 'joinDate',
      cell: (user) => new Date(user.joinDate).toLocaleDateString(),
    },
    {
      header: 'Last Login',
      accessor: 'lastLogin',
      cell: (user) => user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never',
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (user) => (
        <div className={styles.actionsCell}>
          <Link href={`/admin/users/${user.id}`} className={styles.actionButton} title="View Details">
            <Eye size={16} />
          </Link>
          <button className={styles.actionButton} title="Suspend User" onClick={() => console.log('Suspend', user.id)}><Ban size={16} /></button>
          <button className={styles.actionButton} title="More Options"><MoreVertical size={16} /></button>
        </div>
      ),
    },
  ], []);

  const tabItems: { label: string; value: FilterStatus }[] = [
    { label: 'All Users', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Suspended', value: 'suspended' },
    { label: 'Pending', value: 'pending' },
  ];

  return (
    <AdminDashboardLayout>
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddUser={(data) => console.log('New User:', data)} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>User Management</h1>
            <p className={styles.subtitle}>View, manage, and monitor all platform users.</p>
          </div>
          <button className={styles.createUserButton} onClick={() => setIsModalOpen(true)}>
            <UserPlus size={18} />
            <span>Create User</span>
          </button>
        </div>

        <div className={styles.filterTabs}>
          {tabItems.map(tab => (
            <button
              key={tab.value}
              className={`${styles.tabButton} ${filter === tab.value ? styles.activeTab : ''}`}
              onClick={() => setFilter(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          <Table columns={columns} data={filteredUsers} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
