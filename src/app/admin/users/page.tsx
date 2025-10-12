"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Table, { ColumnDef } from "@/components/admin/Table/Table";
import { User, UserStatus } from "@/components/types/user";
import styles from "./styles.module.css";
import {
  Eye,
  Ban,
  MoreVertical,
  UserPlus,
  Mail,
  Trash2,
  UserCheck,
} from "lucide-react";
import SendEmailModal from "@/components/modal/SendEmailModal/SendEmailModal";
import AddUserModal from "@/components/modal/UserDetails/AddUserModal";
import { get, post, del, put } from "@/lib/api"; // ✅ using your API helpers
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const StatusBadge: React.FC<{ status: UserStatus }> = ({ status }) => {
  const statusClasses = {
    active: styles.statusActive,
    suspended: styles.statusSuspended,
    pending: styles.statusPending,
    inactive: styles.statusInactive,
  };
  // Normalize status to lowercase to match keys
  const normalizedStatus = status.toLowerCase() as keyof typeof statusClasses;
  return (
    <span className={`${styles.statusBadge} ${statusClasses[normalizedStatus]}`}>
      {status}
    </span>
  );
};

type FilterStatus = "active" | "inactive" | "suspended" | "all";

export default function UserManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedUserForEmail, setSelectedUserForEmail] = useState<User | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔹 Fetch users based on selected filter
const { data: users = [], isLoading } = useQuery<User[]>({
  queryKey: ["users", filter],
  queryFn: async () => {
    let endpoint = "/auth/users/all";
    if (filter !== "all") endpoint = `/auth/users/${filter}`;
    const res = await get(endpoint);
    return res.success ? (res.data as User[]) : [];
  },
});

  // 🔹 Mutations
  const suspendMutation = useMutation({
    mutationFn: (userId: string) => put(`/auth/users/${userId}/suspend`, {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const unsuspendMutation = useMutation({
    mutationFn: (userId: string) => put(`/auth/users/${userId}/unsuspend`, {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => del(`/auth/users/${userId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const sendEmailMutation = useMutation({
    mutationFn: ({ userId, subject, message }: { userId: string; subject: string; message: string }) =>
      post(`/auth/users/${userId}/send-email`, { subject, message }),
    onSuccess: () => {
      setIsEmailModalOpen(false);
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (data: Omit<User, 'id' | 'created_at' | 'last_login_at'>) => post("/auth/users", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalOpen(false);
    },
  });

  const handleSendEmail = (data: { subject: string; message: string }) => {
    if (!selectedUserForEmail) return;
    sendEmailMutation.mutate({ userId: selectedUserForEmail.id, ...data });
  };

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        header: "Name",
        accessor: "name",
        cell: (user) => (
          <div className={styles.userCell}>
            <div className={styles.avatar}>{user.name.charAt(0)}</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userEmail}>{user.email}</div>
            </div>
          </div>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        cell: (user) => <StatusBadge status={user.status} />,
      },
      {
        header: "Date Joined",
        accessor: "joinDate",
        cell: (user) => new Date(user.joinDate).toLocaleDateString(),
      },
      {
        header: "Last Login",
        accessor: "lastLogin",
        cell: (user) =>
          user.lastLogin
            ? new Date(user.lastLogin).toLocaleString()
            : "Never",
      },
      {
        header: "Actions",
        accessor: "id",
        cell: (user) => (
          <div
            className={styles.actionsCell}
            ref={openDropdownId === user.id ? dropdownRef : null}
          >
            <Link
              href={`/admin/users/${user.id}`}
              className={styles.actionButton}
              title="View Details"
            >
              <Eye size={16} />
            </Link>

            {user.status !== "suspended" ? (
              <button
                className={styles.actionButton}
                title="Suspend User"
                onClick={() => suspendMutation.mutate(user.id)}
              >
                <Ban size={16} />
              </button>
            ) : (
              <button
                className={styles.actionButton}
                title="Un-suspend User"
                onClick={() => unsuspendMutation.mutate(user.id)}
              >
                <UserCheck size={16} />
              </button>
            )}

            <button
              className={styles.actionButton}
              title="More Options"
              onClick={() =>
                setOpenDropdownId(openDropdownId === user.id ? null : user.id)
              }
            >
              <MoreVertical size={16} />
            </button>

            {openDropdownId === user.id && (
              <div className={styles.dropdownMenu}>
                <button
                  className={styles.dropdownItem} 
                  onClick={() => {
                    setSelectedUserForEmail(user);
                    setIsEmailModalOpen(true);
                    setOpenDropdownId(null);
                  }}
                >
                  <Mail size={14} />
                  <span>Send Email</span>
                </button>
                <button
                  className={`${styles.dropdownItem} ${styles.dropdownItemDelete}`}
                  onClick={() => deleteMutation.mutate(user.id)}
                >
                  <Trash2 size={14} />
                  <span>Delete User</span>
                </button>
              </div>
            )}
          </div>
        ),
      },
    ],
    [openDropdownId, deleteMutation, suspendMutation, unsuspendMutation]
  );

  const tabItems: { label: string; value: FilterStatus }[] = [
    { label: "All Users", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Suspended", value: "suspended" },
  ];

  return (
    <>
      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        user={selectedUserForEmail}
        onSendEmail={handleSendEmail}
        isSending={sendEmailMutation.isPending}
      />

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={(data) => createUserMutation.mutate({ ...data, role: "user" })}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>User Management</h1>
            <p className={styles.subtitle}>
              View, manage, and monitor all platform users.
            </p>
          </div>
          <button
            className={styles.createUserButton}
            onClick={() => setIsModalOpen(true)}
          >
            <UserPlus size={18} />
            <span>Create User</span>
          </button>
        </div>

        <div className={styles.filterTabs}>
          {tabItems.map((tab) => (
            <button
              key={tab.value}
              className={`${styles.tabButton} ${
                filter === tab.value ? styles.activeTab : ""
              }`}
              onClick={() => setFilter(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {isLoading ? (
            <div>Loading users...</div>
          ) : (
            <Table columns={columns} data={users} />
          )}
        </div>
      </div>
    </>
  );
}
