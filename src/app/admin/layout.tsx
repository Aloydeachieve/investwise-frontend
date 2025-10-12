import React, { ReactNode } from "react";
import AdminDashboardLayout from "@/components/layout/AdminDashboard/AdminDashboardLayout";
import { AdminDashboardProviders } from "@/contexts/AdminDashboardProviders";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
  <AdminDashboardProviders>
    <AdminDashboardLayout>{children}</AdminDashboardLayout>;
  </AdminDashboardProviders>
  );
}
