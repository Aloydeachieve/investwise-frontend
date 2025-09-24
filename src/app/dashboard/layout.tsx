"use client";

import { ReactNode } from "react";
import { DashboardProviders } from "@/contexts/DashboardProviders";
import Layout from "@/components/layout/Dashboard/DashboardLayout"; // the sidebar + topbar layout you pasted

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProviders>
      <Layout>{children}</Layout>
    </DashboardProviders>
  );
}
