"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Search, Frown } from "lucide-react";
import { useDebounce } from "use-debounce";

// Mock data and types
type TransactionStatus = "approved" | "pending" | "rejected";
type TransactionType =
  | "deposit"
  | "withdrawal"
  | "referral_bonus"
  | "payout"
  | "investment";

interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  reference: string;
}

const fetchTransactions = async (): Promise<Transaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // In a real app, you'd fetch all transactions here
  return [
    {
      id: "1",
      date: "2025-08-20",
      type: "deposit",
      amount: 5000,
      status: "approved",
      reference: "DEPO-12345",
    },
    {
      id: "2",
      date: "2025-08-18",
      type: "investment",
      amount: -10000,
      status: "approved",
      reference: "INV-67890",
    },
    {
      id: "3",
      date: "2025-08-15",
      type: "withdrawal",
      amount: -2000,
      status: "pending",
      reference: "WDR-11223",
    },
    {
      id: "4",
      date: "2025-08-12",
      type: "referral_bonus",
      amount: 150,
      status: "approved",
      reference: "REF-44556",
    },
    {
      id: "5",
      date: "2025-08-10",
      type: "payout",
      amount: -500,
      status: "approved",
      reference: "PAY-77889",
    },
    {
      id: "6",
      date: "2025-08-05",
      type: "deposit",
      amount: 2500,
      status: "approved",
      reference: "DEPO-99001",
    },
    {
      id: "7",
      date: "2025-08-01",
      type: "withdrawal",
      amount: -1000,
      status: "rejected",
      reference: "WDR-22334",
    },
    // ... more transactions for pagination
  ];
};

const getStatusVariant = (status: TransactionStatus) => {
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

const formatCurrency = (amount: number) => {
  const isNegative = amount < 0;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));
  return isNegative ? `${formatted}` : `${formatted}`;
};

const getTypeStyling = (type: TransactionType) => {
  switch (type) {
    case "deposit":
    case "referral_bonus":
      return "text-green-600 dark:text-green-400";
    case "withdrawal":
    case "payout":
    case "investment":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-muted-foreground";
  }
};

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["allTransactions"],
    queryFn: fetchTransactions,
  });

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => activeTab === "all" || tx.type === activeTab)
      .filter((tx) => {
        if (!debouncedSearchTerm) return true;
        const lowerSearch = debouncedSearchTerm.toLowerCase();
        return (
          tx.reference.toLowerCase().includes(lowerSearch) ||
          String(tx.amount).includes(lowerSearch)
        );
      });
  }, [transactions, activeTab, debouncedSearchTerm]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="space-y-6 p-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View your complete transaction history.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="deposit">Deposits</TabsTrigger>
                  <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
                  <TabsTrigger value="referral_bonus">Bonuses</TabsTrigger>
                  <TabsTrigger value="payout">Payouts</TabsTrigger>
                </TabsList>
                <div className="relative mt-4 sm:mt-0 w-full sm:w-auto ">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by reference or amount..."
                    className="pl-8 sm:w-[300px] text-amber-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value={activeTab} className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      [...Array(5)].map((_, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={5}>
                            <Skeleton className="h-8 w-full" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : paginatedTransactions.length > 0 ? (
                      paginatedTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>
                            {new Date(tx.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell className="font-medium capitalize">
                            {tx.type.replace("_", " ")}
                          </TableCell>
                          <TableCell
                            className={`font-mono font-semibold ${getTypeStyling(
                              tx.type
                            )}`}
                          >
                            {formatCurrency(tx.amount)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(tx.status)}>
                              {tx.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-muted-foreground">
                            {tx.reference}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="h-24 text-center text-muted-foreground"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Frown />
                            <span>No transactions yet.</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
