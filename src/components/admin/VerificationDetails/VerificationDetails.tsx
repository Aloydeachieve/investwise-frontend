"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, post } from "@/lib/api";
import styles from "./VerificationDetails.module.css";
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Verification {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
  };
  document_type: string;
  document_url: string; // backend returns this
  submitted_at: string;
  status: "pending" | "approved" | "rejected";
  meta?: Record<string, unknown> | null;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className={styles.detailItem}>
    <dt className={styles.detailLabel}>{label}</dt>
    <dd className={styles.detailValue}>{value || "N/A"}</dd>
  </div>
);

export default function VerificationDetails({ id }: { id: string }) {
  const queryClient = useQueryClient();

  // 🔹 Fetch verification details
  const { data, isLoading, isError } = useQuery<Verification>({
    queryKey: ["verification", id],
    queryFn: async (): Promise<Verification> => {
      const res = await get<Verification>(`/admin/kyc/${id}`);
      if (res.success && res.data) return res.data;
      throw new Error(res.message || "Failed to fetch verification");
    },
  });

  const verification = data!;
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [showRejectModal, setShowRejectModal] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState("");

  // 🔹 Fetch document preview securely
  React.useEffect(() => {
    if (!verification?.document_url) return;

    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // ✅ define token properly
        if (!token) {
          console.warn("No auth token found in localStorage");
          return;
        }

        const res = await axios.get(`${verification.document_url}?preview=1`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        });

        const blobUrl = URL.createObjectURL(res.data);
        setPreviewUrl(blobUrl);
      } catch (err) {
        console.error("Failed to load document preview:", err);
      }
    };

    fetchDocument();
  }, [verification]); // ✅ removed "token" from deps

  // 🔹 Mutations for approve/reject
  const mutation = useMutation({
    mutationFn: ({
      action,
      reason,
    }: {
      action: "approve" | "reject";
      reason?: string;
    }) => {
      const payload =
        action === "reject" && reason ? { rejection_reason: reason } : {};
      return post(`/admin/kyc/${id}/${action}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verification", id] });
      queryClient.invalidateQueries({ queryKey: ["verifications"] });
      setShowRejectModal(false);
      setRejectionReason("");
    },
  });

  // 🔹 Handle reject action
  const handleReject = () => {
    if (rejectionReason.trim()) {
      mutation.mutate({ action: "reject", reason: rejectionReason.trim() });
    }
  };

  if (isLoading) return <div className={styles.centered}>Loading...</div>;
  if (isError || !verification)
    return <div className={styles.centered}>Not found</div>;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <Link href="/admin/verifications" className={styles.backLink}>
            <ChevronLeft size={20} />
            <span>Back to Verifications</span>
          </Link>
          <h1 className={styles.title}>Verification Details</h1>
          <p className={styles.subtitle}>
            Review document submitted by {verification.user?.name}.
          </p>
        </div>

        <div className={styles.actions}>
          {verification.status === "pending" ? (
            <>
              <button
                className={`${styles.actionButton} ${styles.rejectButton}`}
                onClick={() => setShowRejectModal(true)}
                disabled={mutation.isPending}
              >
                <XCircle size={18} />
                <span>Reject</span>
              </button>
              <button
                className={`${styles.actionButton} ${styles.approveButton}`}
                onClick={() => mutation.mutate({ action: "approve" })}
                disabled={mutation.isPending}
              >
                <CheckCircle size={18} />
                <span>Approve</span>
              </button>
            </>
          ) : (
            <span
              className={`${styles.statusBadge} ${styles[verification.status]}`}
            >
              {verification.status.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className={styles.contentGrid}>
        <div className={styles.detailsCard}>
          <h3 className={styles.cardTitle}>User Information</h3>
          <dl className={styles.detailsList}>
            <DetailItem label="Full Name" value={verification.user?.name} />
            <DetailItem
              label="Email Address"
              value={verification.user?.email}
            />
            <DetailItem
              label="Phone Number"
              value={verification.user?.phone || "N/A"}
            />
            <DetailItem
              label="Address"
              value={verification.user?.address || "N/A"}
            />
          </dl>
        </div>

        {/* Document Info */}
        <div className={styles.detailsCard}>
          <h3 className={styles.cardTitle}>Document Information</h3>
          <dl className={styles.detailsList}>
            <DetailItem
              label="Document Type"
              value={verification.document_type}
            />
            <DetailItem
              label="Submitted At"
              value={new Date(verification.submitted_at).toLocaleString()}
            />
            <DetailItem
              label="Status"
              value={
                <span
                  className={`${styles.statusBadge} ${
                    styles[verification.status]
                  }`}
                >
                  {verification.status}
                </span>
              }
            />
          </dl>
        </div>
      </div>

      {/* Document Viewer */}
      <div className={styles.documentViewer}>
        <h3 className={styles.cardTitle}>Submitted Document</h3>
        <div className={styles.imageContainer}>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt={`KYC Document for ${verification.user.name}`}
              width={600}
              height={800}
              className="rounded-lg shadow"
            />
          ) : (
            <p>Loading document preview...</p>
          )}
        </div>
      </div>

      {/* Rejection Reason Modal */}
      {showRejectModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Reject Verification</h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowRejectModal(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>
                Please provide a reason for rejecting the verification for{" "}
                <strong>{verification.user?.name}</strong>.
              </p>
              <div className={styles.formGroup}>
                <label htmlFor="rejectionReason">Rejection Reason *</label>
                <textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter the reason for rejection..."
                  className={styles.textarea}
                  rows={4}
                  required
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <Button
                variant="outline"
                onClick={() => setShowRejectModal(false)}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={mutation.isPending || !rejectionReason.trim()}
              >
                {mutation.isPending ? "Rejecting..." : "Reject Verification"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
