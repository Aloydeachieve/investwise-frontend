"use client";

import React from "react";
import { ToastProvider } from "./ToastContext";
import { NotificationProvider } from "./NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface DashboardProvidersProps {
  children: React.ReactNode;
}

export function DashboardProviders({ children }: DashboardProvidersProps) {
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
        <NotificationProvider>{children}</NotificationProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
