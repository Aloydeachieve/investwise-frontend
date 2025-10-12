"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ninSchema, NINSchema } from "@/schemas/verificationSchema";
import { post } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./NINVerification.module.css";
import InputField from "@/components/formFields/InputField";
import FileUploadField from "@/components/formFields/FileUploadField/FileUploadField";

interface KycResponse {
  success: boolean;
  message?: string;
  data?: {
    user?: {
      id: number;
      name: string;
      email: string;
      kyc_status: string;
    };
    token?: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
    kyc_status: string;
  };
  token?: string;
}

export default function NINVerification() {
  const router = useRouter();
  const { login, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NINSchema>({
    resolver: zodResolver(ninSchema),
  });

  const onSubmit = async (data: NINSchema) => {
    const formData = new FormData();
    // The user requested this specific format for the backend
    formData.append("documents[0][type]", "nin");
    formData.append("documents[0][file]", data.image[0]);
    formData.append("nin", data.nin);
    formData.append("dob", data.dob);

    try {
      console.log("Submitting NIN verification data:", {
        nin: data.nin,
        dob: data.dob,
        fileSize: data.image[0]?.size,
        fileType: data.image[0]?.type,
        fileName: data.image[0]?.name
      });

      const response = await post<KycResponse>("/kyc/submit", formData);
      console.log("Server response:", response);

      if (response.success) {
        const user = response.data?.user || response.user;
        const token = response.data?.token;

        if (user && token && 'name' in user && 'email' in user && 'kyc_status' in user) {
          login({
            user: {
              id: String(user.id),
              name: user.name,
              email: user.email,
              kyc_status: user.kyc_status as "not_submitted" | "pending" | "approved" | "rejected"
            },
            token
          });
        } else {
          updateUser({ kyc_status: 'pending' });
        }
        updateUser({ kyc_status: 'pending' });
        router.push("/verifyAccount/pending");
      }
      // Error toast is handled by the api.ts interceptor
    } catch (error: unknown) {
      console.error("KYC Submission failed", error);
      const axiosError = error as {
        message?: string;
        response?: {
          data?: unknown;
          status?: number;
        };
      };
      console.error("Error details:", {
        message: axiosError?.message,
        response: axiosError?.response?.data,
        status: axiosError?.response?.status
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Verify with NIN</h1>
        <p className={styles.subtitle}>
          Provide your National Identification Number for verification.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <InputField
            id="nin"
            label="NIN Number"
            type="text"
            placeholder="Enter your 11-digit NIN"
            {...register("nin")}
            error={errors.nin?.message}
          />
          <InputField
            id="dob"
            label="Date of Birth"
            type="date"
            {...register("dob")}
            error={errors.dob?.message}
          />
          <FileUploadField
            id="image"
            label="Upload NIN Slip"
            register={register("image")}
            error={errors.image?.message as string}
            accept="image/png, image/jpeg, image/jpg"
          />
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit for Verification"}
          </button>
        </form>
      </div>
    </div>
  );
}
