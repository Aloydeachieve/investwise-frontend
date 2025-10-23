import { Product } from '@/components/types/investment';

export const investmentProducts: Product[] = [
    {
      id: 'high-yield-savings',
      name: 'High-Yield Savings',
      description: 'FDIC-insured account with higher interest rates than traditional banks. Perfect for emergency funds and short-term goals.',
      category: 'savings',
      riskLevel: 'Very Low',
      minInvestment: 0,
      historicalReturns: '4.25% APY',
      fees: 'No fees',
      features: [
        'FDIC insured up to $250,000',
        'No minimum balance required',
        'No monthly maintenance fees',
        'Interest compounded daily and paid monthly',
        'Unlimited transfers between TreVox accounts'
      ],
      color: 'bg-green-100',
      textColor: 'text-green-700'
    },
    {
      id: 'growth-portfolio',
      name: 'Growth Portfolio',
      description: 'A diversified mix of stocks and bonds designed for long-term capital appreciation with moderate risk.',
      category: 'portfolio',
      riskLevel: 'Medium',
      minInvestment: 1000,
      historicalReturns: '9-12% annually',
      fees: '0.25% annual management fee',
      features: [
        'Globally diversified portfolio',
        'Automatic rebalancing',
        'Tax-loss harvesting',
        'Personalized allocation based on risk tolerance',
        'Quarterly performance reports'
      ],
      color: 'bg-blue-100',
      textColor: 'text-blue-700'
    },
    {
      id: 'dividend-income',
      name: 'Dividend Income',
      description: 'Focus on established companies that regularly pay dividends to generate passive income with lower volatility.',
      category: 'portfolio',
      riskLevel: 'Medium-Low',
      minInvestment: 5000,
      historicalReturns: '6-8% annually',
      fees: '0.30% annual management fee',
      features: [
        'Regular income distributions',
        'Focus on blue-chip stocks',
        'Lower volatility than growth portfolios',
        'Dividend reinvestment option',
        'Quarterly income projections'
      ],
      color: 'bg-indigo-100',
      textColor: 'text-indigo-700'
    },
    {
      id: 'tech-innovation-fund',
      name: 'Tech Innovation Fund',
      description: 'Invest in cutting-edge technology companies with high growth potential. Higher risk with potential for greater returns.',
      category: 'fund',
      riskLevel: 'High',
      minInvestment: 2500,
      historicalReturns: '12-18% annually',
      fees: '0.40% annual management fee',
      features: [
        'Exposure to emerging technologies',
        'Access to pre-IPO companies',
        'Focus on disruptive innovation',
        'Actively managed by tech specialists',
        'Quarterly innovation reports'
      ],
      color: 'bg-purple-100',
      textColor: 'text-purple-700'
    },
    {
      id: 'sustainable-investing',
      name: 'Sustainable Investing',
      description: 'Invest in companies with strong environmental, social, and governance (ESG) practices for competitive returns with positive impact.',
      category: 'portfolio',
      riskLevel: 'Medium',
      minInvestment: 1000,
      historicalReturns: '8-11% annually',
      fees: '0.35% annual management fee',
      features: [
        'ESG screening and scoring',
        'Carbon footprint reduction',
        'Socially responsible companies',
        'Impact reporting',
        'Alignment with UN Sustainable Development Goals'
      ],
      color: 'bg-teal-100',
      textColor: 'text-teal-700'
    },
    {
      id: 'retirement-fund',
      name: 'Retirement Fund',
      description: 'Long-term investment strategy designed specifically for retirement goals with tax advantages and age-based risk adjustment.',
      category: 'retirement',
      riskLevel: 'Medium-Low to Medium',
      minInvestment: 500,
      historicalReturns: '7-10% annually',
      fees: '0.20% annual management fee',
      features: [
        'Tax-advantaged accounts (IRA, Roth IRA, 401k)',
        'Age-based risk adjustment',
        'Retirement income calculator',
        'Required Minimum Distribution (RMD) planning',
        'Social Security optimization'
      ],
      color: 'bg-orange-100',
      textColor: 'text-orange-700'
    },
    {
      id: 'real-estate-fund',
      name: 'Real Estate Fund',
      description: 'Invest in diversified real estate properties for income and appreciation without the hassles of direct property ownership.',
      category: 'fund',
      riskLevel: 'Medium',
      minInvestment: 5000,
      historicalReturns: '8-10% annually',
      fees: '0.45% annual management fee',
      features: [
        'Diversified real estate exposure',
        'Quarterly income distributions',
        'Commercial and residential properties',
        'REITs and direct property investments',
        'Geographic diversification'
      ],
      color: 'bg-amber-100',
      textColor: 'text-amber-700'
    },
    {
      id: 'fixed-income',
      name: 'Fixed Income Portfolio',
      description: 'Conservative investment approach focused on bonds and other fixed-income securities for stable returns and income.',
      category: 'portfolio',
      riskLevel: 'Low',
      minInvestment: 1000,
      historicalReturns: '3-5% annually',
      fees: '0.15% annual management fee',
      features: [
        'Government and corporate bonds',
        'Regular interest payments',
        'Lower volatility than stock portfolios',
        'Preservation of capital',
        'Laddered maturity strategy'
      ],
      color: 'bg-blue-50',
      textColor: 'text-blue-700'
    }
];
