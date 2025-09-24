export interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Bonus';
  orderId: string;
  reference: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Investment {
  id: string;
  planName: string;
  startDate: string;
  endDate: string;
  investmentId: string;
  amount: number;
  currency: string;
  status: 'active' | 'completed';
}

export interface ActivityLog {
  id: string;
  browser: string;
  ipAddress: string;
  timestamp: string;
  action: string;
}