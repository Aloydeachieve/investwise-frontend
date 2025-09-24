"use client";

import React from "react";
import { ToastProvider } from "./ToastContext";
import { AdminNotificationProvider } from "./AdminNotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AdminDashboardProvidersProps {
  children: React.ReactNode;
}


export function AdminDashboardProviders({ children }: AdminDashboardProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AdminNotificationProvider>
          {children}
        </AdminNotificationProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
