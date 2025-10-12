"use client";
import React from "react";
import {
  StatsCard,
  StatsCardSkeleton,
} from "@/components/dashboard/StatsCard/StatsCard";
import {
  DepositsWithdrawalsChart,
  InvestmentGrowthChart,
  ChartSkeleton,
} from "@/components/dashboard/ChartCard/ChartCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import {
  Wallet,
  Download,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import KycStatusBanner from '@/components/ui/KycStatusBanner/KycStatusBanner';

// Mock API fetching functions
const fetchOverview = async () => {
  // In a real app, this would be an API call with an auth token
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    walletBalance: 12530.5,
    totalDeposits: 50000.0,
    totalWithdrawals: 15000.0,
    activeInvestments: 5,
    referralBonus: 1250.0,
    pendingPayouts: 2500.0,
    kycStatus: "Approved",
  };
};

const fetchRecentTransactions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      id: "txn1",
      date: "2025-08-20",
      type: "deposit",
      amount: 5000,
      status: "approved",
    },
    {
      id: "txn2",
      date: "2025-08-18",
      type: "investment",
      amount: -10000,
      status: "approved",
    },
    {
      id: "txn3",
      date: "2025-08-15",
      type: "withdrawal",
      amount: -2000,
      status: "pending",
    },
    {
      id: "txn4",
      date: "2025-08-12",
      type: "referral_bonus",
      amount: 150,
      status: "approved",
    },
    {
      id: "txn5",
      date: "2025-08-10",
      type: "payout",
      amount: -500,
      status: "approved",
    },
  ];
};

const RecentTransactions = ({
  transactions,
}: {
  transactions: {
    id: string;
    date: string;
    type: string;
    amount: number;
    status: string;
  }[];
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your last 5 transactions.
          </CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/transactions">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  {new Date(tx.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="capitalize">
                  {tx.type.replace("_", " ")}
                </TableCell>
                <TableCell>{tx.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(tx.status)}>{tx.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: overview, isLoading: isOverviewLoading } = useQuery({
    queryKey: ["dashboardOverview"],
    queryFn: fetchOverview,
  });
  const { data: recentTransactions, isLoading: isTransactionsLoading } =
    useQuery({
      queryKey: ["recentTransactions"],
      queryFn: fetchRecentTransactions,
    });

  const isLoading = isOverviewLoading || isTransactionsLoading;

  const getKycBadgeVariant = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };
  return (
    <>
      <div className="space-y-8 p-7">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Here&apos;s a summary of your account activity.
            </p>
          </div>
          {isLoading ? (
            <div className="h-9 w-28 animate-pulse bg-gray-200 rounded-md dark:bg-gray-700" />
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">KYC Status:</span>
              <Badge variant={getKycBadgeVariant(user?.kyc_status)}>
                {user?.kyc_status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            </div>
          )}
        </div>

        <KycStatusBanner />

        {/* --- Stats Cards --- */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {isLoading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : (
            <>
              <StatsCard
                title="Wallet Balance"
                value={overview?.walletBalance}
                icon={Wallet}
                isCurrency
              />
              <StatsCard
                title="Total Deposits"
                value={overview?.totalDeposits}
                icon={Download}
                isCurrency
                className="text-green-500"
              />
              <StatsCard
                title="Total Withdrawals"
                value={overview?.totalWithdrawals}
                icon={TrendingUp}
                isCurrency
                className="text-red-500"
              />
              <StatsCard
                title="Active Investments"
                value={overview?.activeInvestments}
                icon={Users}
              />
              <StatsCard
                title="Referral Bonus"
                value={overview?.referralBonus}
                icon={DollarSign}
                isCurrency
              />
              <StatsCard
                title="Pending Payouts"
                value={overview?.pendingPayouts}
                icon={Clock}
                isCurrency
              />
            </>
          )}
        </div>

        {/* --- Charts --- */}
        <div className="grid gap-8 md:grid-cols-2">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <DepositsWithdrawalsChart />
              <InvestmentGrowthChart />
            </>
          )}
        </div>

        {/* --- Recent Transactions --- */}
        <RecentTransactions transactions={recentTransactions ?? []} />
      </div>
    </>
  );
}
