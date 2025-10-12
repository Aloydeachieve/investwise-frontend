"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passportSchema, PassportSchema } from "@/schemas/verificationSchema";
import { post } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./PassportVerification.module.css";
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

export default function PassportVerification() {
  const router = useRouter();
  const { login, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PassportSchema>({
    resolver: zodResolver(passportSchema),
  });

  const onSubmit = async (data: PassportSchema) => {
    const formData = new FormData();
    formData.append("documents[0][type]", "passport");
    formData.append("documents[0][file]", data.passport[0]);

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
        <h1 className={styles.title}>Verify with Passport</h1>
        <p className={styles.subtitle}>Upload a clear photo of your international passport.</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <FileUploadField id="passport" label="Upload Passport" register={register("passport")} error={errors.passport?.message as string} accept="image/png, image/jpeg, image/jpg"/>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit for Verification"}
          </button>
        </form>
      </div>
    </div>
  );
}
