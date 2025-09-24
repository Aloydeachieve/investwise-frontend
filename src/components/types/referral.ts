export interface Referral {
  id: string;
  referredUser: {
    name: string;
    email: string;
  };
  bonus: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'rejected';
  date: string;
}

export interface AdminReferral extends Omit<Referral, 'referredUser'> {
  referrer: {
    id: string;
    name: string;
  };
  referred: {
    id: string;
    name: string;
    email: string;
  };
}