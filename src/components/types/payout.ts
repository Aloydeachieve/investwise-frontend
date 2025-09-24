export type PayoutStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type PayoutMethod = 'Crypto' | 'Bank' | 'PayPal';

export interface Payout {
  id: string;
  transactionId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  amount: number;
  currency: string;
  method: PayoutMethod;
  destination: string; // Wallet address or bank details
  status: PayoutStatus;
  requestDate: string;
  processDate?: string;
}