import { get, del } from "./api";
import { Investment, Transaction } from "@/components/types/details";

export interface Referral {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: string;
}

export interface Activity {
  id: string;
  browser: string;
  ipAddress: string;
  timestamp: string;
  action: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  joinedAt: string;
  status: string;
  verified: boolean;
}

// Fetch user core details (Personal tab)
export const fetchUserDetails = (id: string) =>
  get<AdminUser>(`/auth/users/${id}`);

// Fetch user transactions
export const fetchUserTransactions = (id: string) =>
  get<Transaction[]>(`/auth/users/${id}/transactions`);

// Fetch user investments
export const fetchUserInvestments = (id: string) =>
  get<Investment[]>(`/auth/users/${id}/investments`);

// Fetch user referrals
export const fetchUserReferrals = (id: string) =>
  get<Referral[]>(`/auth/users/${id}/referrals`);

// Fetch user activities
export const fetchUserActivities = (id: string) =>
  get<Activity[]>(`/auth/users/${id}/activities`);

// Delete one activity
export const deleteUserActivity = (userId: string, activityId: string) =>
  del(`/auth/users/${userId}/activities/${activityId}`);

// Clear all activity logs
export const clearActivityLog = (userId: string) =>
  del(`/auth/users/${userId}/activities/clear`);



// // ✅ Fetch user details (including relationships)
// export const fetchUserDetails = async (userId: string) => {
//   const res = await api.get(`/admin/users/${userId}`);
//   return res.data.data;
// };

// // ✅ Fetch transactions
// export const fetchUserTransactions = async (userId: string) => {
//   const res = await api.get(`/admin/users/${userId}/transactions`);
//   return res.data.data;
// };

// // ✅ Fetch investments
// export const fetchUserInvestments = async (userId: string) => {
//   const res = await api.get(`/admin/users/${userId}/investments`);
//   return res.data.data;
// };

// // ✅ Fetch referrals
// export const fetchUserReferrals = async (userId: string) => {
//   const res = await api.get(`/admin/users/${userId}/referrals`);
//   return res.data.data;
// };

// // ✅ Fetch activities
// export const fetchUserActivities = async (userId: string) => {
//   const res = await api.get(`/admin/users/${userId}/activities`);
//   return res.data.data;
// };

// // ✅ Clear one or all activity logs
// export const clearActivityLog = async (userId: string, activityId?: string) => {
//   const url = activityId
//     ? `/admin/users/${userId}/activities/${activityId}`
//     : `/admin/users/${userId}/activities/clear`;
//   const res = await api.delete(url);
//   return res.data;
// };
