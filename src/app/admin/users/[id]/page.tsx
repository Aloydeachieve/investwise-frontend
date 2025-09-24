import React from 'react';
import AdminDashboardLayout from '@/components/layout/AdminDashboard/AdminDashboardLayout';
import UserDetailsLayout from '@/components/admin/UserDetails/UserDetailsLayout';
import { User } from '@/components/types/user';
import styles from './styles.module.css';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// Mock data - in a real app, this would be fetched based on the `id` param
const mockUser: User = {
  id: '17683',
  name: 'Sylvanus Odi',
  fullName: 'Sylvanus Odi',
  email: 'sylvanus@example.com',
  status: 'active',
  joinDate: '2023-10-26',
  lastLogin: '2024-05-20T10:00:00Z',
  mobile: '+1 234 567 890',
  dob: '1990-01-15',
  gender: 'Male',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'Anystate',
    zip: '12345',
    country: 'USA',
  },
  registrationMethod: 'Email',
  balances: {
    main: 50000,
    investment: 150000,
    locked: 25000,
  },
  isVerified: true,
};

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  // Here you would fetch the user by params.id
  const user = mockUser;

  return (
    <AdminDashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <Link href="/admin/users" className={styles.backLink}>
              <ChevronLeft size={20} />
              <span>Back to Users</span>
            </Link>
            <h1 className={styles.title}>User Details</h1>
            <p className={styles.subtitle}>Detailed information for {user.name}.</p>
          </div>
        </div>
        <UserDetailsLayout user={user} />
      </div>
    </AdminDashboardLayout>
  );
}