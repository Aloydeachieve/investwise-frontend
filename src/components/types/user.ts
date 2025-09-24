export type UserStatus = 'active' | 'suspended' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  joinDate: string;
  lastLogin: string | null;
  // New detailed fields
  fullName?: string;
  mobile?: string | null;
  dob?: string | null;
  gender?: 'Male' | 'Female' | 'Other' | null;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  } | null;
  registrationMethod?: 'Email' | 'Google' | 'Facebook';
  balances?: { main: number; investment: number; locked: number };
  isVerified?: boolean;
}
