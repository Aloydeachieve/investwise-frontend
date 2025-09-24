import { UserInvestment } from '@/components/types/investment';

export const userInvestments: UserInvestment[] = [
  { id: 'inv-001', planName: 'Gold Plan', investedBy: { id: '1', name: 'Sylvanus Odi' }, startDate: '2024-05-01', endDate: '2024-08-01', amountInvested: 50000, profitGained: 2500, status: 'active' },
  { id: 'inv-002', planName: 'Silver Plan', investedBy: { id: '2', name: 'Jane Smith' }, startDate: '2024-03-15', endDate: '2024-06-15', amountInvested: 25000, profitGained: 1200, status: 'active' },
  { id: 'inv-003', planName: 'Platinum Plan', investedBy: { id: '3', name: 'John Doe' }, startDate: '2024-01-10', endDate: '2024-04-10', amountInvested: 100000, profitGained: 10000, status: 'completed' },
  { id: 'inv-004', planName: 'Gold Plan', investedBy: { id: '4', name: 'Emily White' }, startDate: '2024-05-20', endDate: '2024-08-20', amountInvested: 50000, profitGained: 0, status: 'active' },
];