"use client";

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  TooltipProps,
  ResponsiveContainer 
} from 'recharts';
import styles from './AdminChart.module.css';

interface ChartData {
  month: string;
  investments: number;
  deposits: number;
  withdrawals: number;
}

const chartData: ChartData[] = [
  {
    month: 'Jan',
    investments: 45,
    deposits: 125,
    withdrawals: 98,
  },
  {
    month: 'Feb',
    investments: 52,
    deposits: 142,
    withdrawals: 107,
  },
  {
    month: 'Mar',
    investments: 38,
    deposits: 118,
    withdrawals: 89,
  },
  {
    month: 'Apr',
    investments: 67,
    deposits: 178,
    withdrawals: 142,
  },
  {
    month: 'May',
    investments: 71,
    deposits: 195,
    withdrawals: 156,
  },
  {
    month: 'Jun',
    investments: 58,
    deposits: 162,
    withdrawals: 128,
  },
  {
    month: 'Jul',
    investments: 89,
    deposits: 234,
    withdrawals: 189,
  },
  {
    month: 'Aug',
    investments: 94,
    deposits: 267,
    withdrawals: 201,
  },
  {
    month: 'Sep',
    investments: 76,
    deposits: 198,
    withdrawals: 165,
  },
  {
    month: 'Oct',
    investments: 102,
    deposits: 289,
    withdrawals: 223,
  },
  {
    month: 'Nov',
    investments: 118,
    deposits: 325,
    withdrawals: 248,
  },
  {
    month: 'Dec',
    investments: 132,
    deposits: 378,
    withdrawals: 285,
  },
];

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{`Month: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className={styles.tooltipEntry} style={{ color: entry.color }}>
            {`${entry.name}: ₦${entry.value}M`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminChart() {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            tickFormatter={(value) => `₦${value}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="investments"
            stroke="#10b981"
            strokeWidth={3}
            name="New Investments"
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="deposits"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Total Deposits"
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="withdrawals"
            stroke="#ef4444"
            strokeWidth={3}
            name="Total Withdrawals"
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
