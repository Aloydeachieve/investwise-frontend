export type TransactionStatus = 'confirmed' | 'pending' | 'on-hold' | 'failed' | 'proceed';
export type TransactionType = 'deposit' | 'withdraw' | 'bonus' | 'investment';
export type TransactionMethod = 'Crypto Wallet' | 'Bank Transfer' | 'Card' | 'System';
export type TransactionCurrency = 'NGN' | 'USD' | 'BTC' | 'ETH';

export interface Transaction {
  id: string;
  type: TransactionType;
  date: string;
  user: {
    id: string;
    name: string;
  };
  method: TransactionMethod;
  orderId: string;
  reference: string;
  amount: number;
  currency: TransactionCurrency;
  status: TransactionStatus;
}