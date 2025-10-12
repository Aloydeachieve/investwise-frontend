"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bvnSchema, BVNSchema } from "@/schemas/verificationSchema";
import { post } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./BVNVerification.module.css";
import InputField from "@/components/formFields/InputField";

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

export default function BVNVerification() {
  const router = useRouter();
  const { login, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BVNSchema>({
    resolver: zodResolver(bvnSchema),
  });

  const onSubmit = async (data: BVNSchema) => {
    const formData = new FormData();
    formData.append("documents[0][type]", "bvn");

    formData.append("bvn", data.bvn);
    formData.append("dob", data.dob);

    try {
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
          updateUser({ kyc_status: "pending" });
        }
        updateUser({ kyc_status: "pending" });
        router.push("/verifyAccount/pending");
      }
    } catch (error) {
      console.error("KYC Submission failed", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Verify with BVN</h1>
        <p className={styles.subtitle}>
          Enter your BVN and date of birth for verification.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <InputField
            id="bvn"
            label="BVN"
            type="text"
            placeholder="Enter your 11-digit BVN"
            {...register("bvn")}
            error={errors.bvn?.message}
          />
          <InputField
            id="dob"
            label="Date of Birth"
            type="date"
            {...register("dob")}
            error={errors.dob?.message}
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit for Verification"}
          </button>
        </form>
      </div>
    </div>
  );
}
