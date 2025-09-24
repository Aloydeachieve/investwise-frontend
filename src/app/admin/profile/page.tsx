"use client";

import { useState } from "react";
import styles from "./profile.module.css";
import PersonalInformation from "@/components/admin/AdminProfile/PersonalInformation/PersonalInformation";
import SecuritySettings from "@/components/admin/AdminProfile/SecuritySettings/SecuritySettings";
import AccountActivity from "@/components/admin/AdminProfile/AccountActivity/AccountActivity";
import UpdateProfileModal from "@/components/modal/admin/UpdateProfileModal/UpdateProfileModal";
import AdminDashboardLayout from "@/components/layout/AdminDashboard/AdminDashboardLayout";

type Tab = "personal" | "security" | "activity";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data, replace with API call
  const adminProfile = {
    name: "Sylvanus Odi",
    email: "admin@investwise.com",
    role: "Administrator",
    avatar: "", // or a URL to an image
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInformation />;
      case "security":
        return <SecuritySettings />;
      case "activity":
        return <AccountActivity />;
      default:
        return <PersonalInformation />;
    }
  };

  return (
    <AdminDashboardLayout>
      <div className={styles.container}>
        <div className={styles.overviewSection}>
          <div className={styles.avatar}>
            {adminProfile.avatar ? (
              <img src={adminProfile.avatar} alt={adminProfile.name} />
            ) : (
              <span>{getInitials(adminProfile.name)}</span>
            )}
          </div>
          <div className={styles.profileDetails}>
            <h2>{adminProfile.name}</h2>
            <p>{adminProfile.email}</p>
            <span>{adminProfile.role}</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.updateButton}
          >
            Update Profile
          </button>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.tabs}>
            <button
              onClick={() => setActiveTab("personal")}
              className={activeTab === "personal" ? styles.activeTab : ""}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={activeTab === "security" ? styles.activeTab : ""}
            >
              Security Settings
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={activeTab === "activity" ? styles.activeTab : ""}
            >
              Account Activity
            </button>
          </div>
          <div className={styles.tabContent}>{renderContent()}</div>
        </div>

        {isModalOpen && (
          <UpdateProfileModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
