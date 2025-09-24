"use client";
import { useState } from "react";
import styles from "./styles.module.css";

import ProfileInfo from "@/components/dashboard/ProfileTabs/ProfileInfo/ProfileInfo";
import AccountSettings from "@/components/dashboard/ProfileTabs/AccountSettings/AccountSettings";
import SecuritySettings from "@/components/dashboard/ProfileTabs/SecuritySettings/SecuritySettings";
import ActivityLogs from "@/components/dashboard/ProfileTabs/ActivityLogs/ActivityLogs";

const tabs = ["Profile", "Accounts", "Security", "Activity"];

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileInfo />;
      case "Accounts":
        return <AccountSettings />;
      case "Security":
        return <SecuritySettings />;
      case "Activity":
        return <ActivityLogs />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <>
    <div className={styles.container}>

      <div className={styles.headerContainer}>
        <h1>Profile Info</h1>
        <p>Here you can update your personal information.</p>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  </>
  );
}
