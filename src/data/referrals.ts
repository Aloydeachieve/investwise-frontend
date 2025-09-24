import { Referral, AdminReferral } from '@/components/types/referral';

export const mockUserReferrals: Referral[] = [
  {
    id: 'ref-001',
    referredUser: {
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
    },
    bonus: 500,
    currency: 'NGN',
    status: 'confirmed',
    date: '2024-07-15T10:00:00Z',
  },
  {
    id: 'ref-002',
    referredUser: {
      name: 'Bob Williams',
      email: 'bob.w@example.com',
    },
    bonus: 500,
    currency: 'NGN',
    status: 'pending',
    date: '2024-07-20T14:30:00Z',
  },
  {
    id: 'ref-003',
    referredUser: {
      name: 'Charlie Brown',
      email: 'charlie.b@example.com',
    },
    bonus: 0,
    currency: 'NGN',
    status: 'pending',
    date: '2024-07-21T09:00:00Z',
  },
];

export const mockReferralStats = {
    totalBonus: 500,
    invitedCount: 3,
    activatedCount: 1,
    currency: 'NGN'
};

export const mockAdminReferrals: AdminReferral[] = [
  {
    id: 'ref-admin-001',
    referrer: { id: 'user-001', name: 'Sylvanus Odi' },
    referred: { id: 'user-005', name: 'Alice Johnson', email: 'alice.j@example.com' },
    bonus: 500,
    currency: 'NGN',
    status: 'confirmed',
    date: '2024-07-15T10:00:00Z',
  },
  {
    id: 'ref-admin-002',
    referrer: { id: 'user-002', name: 'Jane Smith' },
    referred: { id: 'user-006', name: 'Bob Williams', email: 'bob.w@example.com' },
    bonus: 500,
    currency: 'NGN',
    status: 'pending',
    date: '2024-07-20T14:30:00Z',
  },
  {
    id: 'ref-admin-003',
    referrer: { id: 'user-003', name: 'John Doe' },
    referred: { id: 'user-007', name: 'Charlie Brown', email: 'charlie.b@example.com' },
    bonus: 0,
    currency: 'NGN',
    status: 'rejected',
    date: '2024-07-21T09:00:00Z',
  },
];