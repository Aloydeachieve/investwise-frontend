"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { driversLicenseSchema, DriversLicenseSchema } from "@/schemas/verificationSchema";
import { post } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./DriversVerification.module.css";
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

export default function DriversVerification() {
  const router = useRouter();
  const { login, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DriversLicenseSchema>({
    resolver: zodResolver(driversLicenseSchema),
  });

  const onSubmit = async (data: DriversLicenseSchema) => {
    const formData = new FormData();
    formData.append("documents[0][type]", "driver_license");
    formData.append("documents[0][file]", data.license[0]);

    try {
      const response = await post<KycResponse>("/kyc/submit", formData);
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
    } catch (error) {
      console.error("KYC Submission failed", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Verify with Driver&apos;s License</h1>
        <p className={styles.subtitle}>Upload a clear image of your driver&apos;s license.</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <FileUploadField id="license" label="Upload License" register={register("license")} error={errors.license?.message as string} accept="image/png, image/jpeg, image/jpg"/>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit for Verification"}
          </button>
        </form>
      </div>
    </div>
  );
}
