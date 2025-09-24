export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  riskLevel: string;
  minInvestment: number;
  historicalReturns: string;
  fees: string;
  features: string[];
  color: string;
  textColor: string;
};

export type InvestmentStatus = 'active' | 'pending' | 'completed';

export interface UserInvestment {
  id: string;
  planName: string;
  investedBy: {
    id: string;
    name: string;
  };
  startDate: string;
  endDate: string;
  amountInvested: number;
  profitGained: number;
  status: InvestmentStatus;
}

export type InterestType = 'fixed' | 'percent';
export type InterestPeriod = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface InvestmentPlan {
    id: string;
    name: string;
    shortName: string;
    description: string;
    amount: number;
    interestRate: number;
    interestType: InterestType;
    interestPeriod: InterestPeriod;
    termDuration: number; // in days
    maxInvestmentsPerUser: number | null;
    maxTotalInvestments: number | null;
    isFixed: boolean;
    isFeatured: boolean;
    isActive: boolean;
}