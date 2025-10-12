"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  votersCardSchema,
  VotersCardSchema,
} from "@/schemas/verificationSchema";
import { post } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./VotersVerification.module.css";
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

export default function VotersVerification() {
  const router = useRouter();
  const { login, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VotersCardSchema>({
    resolver: zodResolver(votersCardSchema),
  });

  const onSubmit = async (data: VotersCardSchema) => {
    const formData = new FormData();
    formData.append("documents[0][type]", "voters_card");
    formData.append("documents[0][file]", data.voters[0]);

    try {
      const response = await post<KycResponse>("/kyc/submit", formData);
      if (response.success) {
        const user = response.data?.user || response.user;
        const token = response.data?.token;

        if (
          user &&
          token &&
          "name" in user &&
          "email" in user &&
          "kyc_status" in user
        ) {
          login({
            user: {
              id: String(user.id),
              name: user.name,
              email: user.email,
              kyc_status: user.kyc_status as
                | "not_submitted"
                | "pending"
                | "approved"
                | "rejected",
            },
            token,
          });
        } else {
          updateUser({ kyc_status: "pending" });
        }
        router.push("/verifyAccount/pending");
      }
    } catch (error) {
      console.error("KYC Submission failed", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Verify with Voter&apos;s Card</h1>
        <p className={styles.subtitle}>
          Upload a clear image of your voter&apos;s card.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <FileUploadField
            id="voters"
            label="Upload Voter's Card"
            register={register("voters")}
            error={errors.voters?.message as string}
            accept="image/png, image/jpeg, image/jpg"
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
