import axios, { AxiosError, AxiosResponse } from "axios";
import { showCustomToast } from "@/components/ui/CustomToast/CustomToast";

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  user?: T;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true, // keep if using Sanctum SPA cookie auth
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(
      `➡️ Request: ${config.method?.toUpperCase()} ${config.baseURL}${
        config.url
      }`
    );
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      showCustomToast(response.data.message, "success");
    }
    return response;
  },
  (error: AxiosError) => {
    let message;
    console.error("❌ API Error:", error);

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { errors?: Record<string, string[]>; message?: string };

      if (status === 401) {
        // Only redirect to login if the request wasn't KYC-related
        if (!error.config?.url?.includes("/kyc/submit")) {
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        }
        // For any 401, redirect to login.
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(error);
      }
      if (status === 403) {
        message = "Access denied";
      } else if (status === 422 && data.errors) {
        message = Object.values(data.errors).flat().join("\n");
      } else if (status === 500) {
        message = "An unexpected error occurred. Please try again.";
      } else {
        message = data.message || "An error occurred";
      }
    } else {
      message = "Network Error. Please check your connection.";
    }

    showCustomToast(message, "error");
    return Promise.reject(error);
  }
);

const handleApiCall = async <T>(
  apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiCall();

    // Default to success if Laravel doesn’t send a `success` field
    const success =
      response.data.success ??
      (response.status >= 200 && response.status < 300);

    return {
      success,
      message: response.data.message,
      data: response.data.data ?? response.data.user ?? undefined,
      user: response.data.user ?? undefined,
    };
  } catch (error: unknown) {
    throw error;
  }
};

export const post = <T>(url: string, data: Record<string, unknown> | FormData) => {
  const config =
    data instanceof FormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : {};

  return handleApiCall<T>(() => api.post<ApiResponse<T>>(url, data, config));
};

export const get = <T>(url: string) =>
  handleApiCall<T>(() => api.get<ApiResponse<T>>(url));

export const put = <T>(url: string, data: Record<string, unknown> | FormData) =>
  handleApiCall<T>(() => api.put<ApiResponse<T>>(url, data));

export const del = <T>(url: string) =>
  handleApiCall<T>(() => api.delete<ApiResponse<T>>(url));

export default api;
