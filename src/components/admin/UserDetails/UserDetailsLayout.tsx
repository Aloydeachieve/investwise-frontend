"use client";

import React, { useState } from "react";
import { User } from "@/components/types/user";
import UserProfileCard from "@/components/admin/UserProfileCard/UserProfileCard";
import PersonalTab from "@/components/admin/PersonalTab/PersonalTab";
import TransactionsTab from "@/components/admin/TransactionsTab/TransactionsTab";
import InvestmentsTab from "@/components/admin/InvestmentsTab/InvestmentsTab";
import ReferralsTab from "@/components/admin/ReferralsTab/ReferralsTab";
import ActivitiesTab from "@/components/admin/ActivitiesTab/ActivitiesTab";
import styles from "./UserDetailsLayout.module.css";

type Tab = "personal" | "transactions" | "investments" | "referrals" | "activities";

export default function UserDetailsLayout({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  const tabs = [
    { id: "personal", label: "Personal", component: <PersonalTab user={user} /> },
    { id: "transactions", label: "Transactions", component: <TransactionsTab userId={user.id} /> },
    { id: "investments", label: "Investments", component: <InvestmentsTab userId={user.id} /> },
    { id: "referrals", label: "Referrals", component: <ReferralsTab userId={user.id} /> },
    { id: "activities", label: "Activities", component: <ActivitiesTab userId={user.id} /> },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.tabNav}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab.id as Tab)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.tabContent}>
          {tabs.find((t) => t.id === activeTab)?.component}
        </div>
      </div>

      <aside className={styles.sidebar}>
        <UserProfileCard user={user} />
      </aside>
    </div>
  );
}
