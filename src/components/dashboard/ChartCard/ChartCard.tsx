"use client";

import {
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

// Mock API fetching functions
const fetchTransactionSummary = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    { month: "Jan", deposits: 4000, withdrawals: 2400 },
    { month: "Feb", deposits: 3000, withdrawals: 1398 },
    { month: "Mar", deposits: 2000, withdrawals: 9800 },
    { month: "Apr", deposits: 2780, withdrawals: 3908 },
    { month: "May", deposits: 1890, withdrawals: 4800 },
    { month: "Jun", deposits: 2390, withdrawals: 3800 },
    { month: "Jul", deposits: 3490, withdrawals: 4300 },
  ];
};

const fetchInvestmentSummary = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    { date: "2025-01-01", value: 10000 },
    { date: "2025-02-01", value: 12000 },
    { date: "2025-03-01", value: 11500 },
    { date: "2025-04-01", value: 13500 },
    { date: "2025-05-01", value: 15000 },
    { date: "2025-06-01", value: 14800 },
    { date: "2025-07-01", value: 17300 },
  ];
};

const chartVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

export function DepositsWithdrawalsChart() {
  const { data } = useQuery({
    queryKey: ["transactionSummary"],
    queryFn: fetchTransactionSummary,
  });

  return (
    <motion.div variants={chartVariants} initial="hidden" animate="visible">
      <Card>
        <CardHeader>
          <CardTitle>Deposits vs. Withdrawals</CardTitle>
          <CardDescription>Monthly overview of your cash flow.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="deposits" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="withdrawals" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function InvestmentGrowthChart() {
  const { data } = useQuery({
    queryKey: ["investmentSummary"],
    queryFn: fetchInvestmentSummary,
  });

  return (
    <motion.div variants={chartVariants} initial="hidden" animate="visible">
      <Card>
        <CardHeader>
          <CardTitle>Investment Growth</CardTitle>
          <CardDescription>
            Your investment portfolio value over time.
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(str) =>
                  new Date(str).toLocaleDateString("en-US", { month: "short" })
                }
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
}