"use client";

import { useParams, useRouter } from "next/navigation";
import { investmentProducts } from "@/data/investmentProducts";
import styles from "./styles.module.css";
import Link from "next/link";
import { FaWallet } from "react-icons/fa";

export default function ConfirmInvestPage() {
  const { id } = useParams();
  const product = investmentProducts.find((p) => p.id === id);

  const router = useRouter();

  const handleConfirm = () => {
    // Handle confirmation logic here
    // After successful confirmation, redirect to the investments page
    router.push(`/dashboard/investmentPlans/${id}/pendingInvestment`);
  };

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.wrapperTitle}>
            <h1 className={styles.title}>Confirm Your Investment</h1>
            <p className={styles.subtitle}>
              Review your investment details before confirming.
            </p>
          </div>
          <div className={styles.wrapperCard1}>
            <div className={styles.card1}>
              <label className={styles.label}>Plan Name</label>
              <strong className={styles.value}>{product.name}</strong>
            </div>
            <div className={styles.card1}>
              <label className={styles.label}>Duration</label>
              <strong className={styles.value}>{product.historicalReturns}</strong>
            </div>
            <div className={styles.card1}>
              <label className={styles.label}>Hourly Profit</label>
              <strong className={styles.value}>{product.fees}</strong>
            </div>
          </div>
          <div className={styles.wrapperCard}>
            <div className={styles.card}>
              <label className={styles.label}>Payment Account</label>
              <div className={styles.paymentAccount}>
                <FaWallet className={styles.icon} />
                <strong>Main Balance</strong>
              </div>
            </div>

            <div className={styles.card}>
              <label className={styles.label}>Amount To Invest</label>
              <strong>{product.minInvestment || 100} USD</strong>
            </div>
            <div className={styles.card}>
              <label className={styles.label}>Total Profit Earned</label>
              <strong>10.8 USD</strong>
            </div>

            <div className={styles.card}>
              <label className={styles.label}>Total Return (inc. cap)</label>
              <strong>110.8 USD</strong>
            </div>
          </div>

          <div className={styles.amountToDebit}>
            <strong>Amount To Debit</strong>
            <strong>{product.minInvestment || 100} USD</strong>
          </div>

          < p className={styles.note}>
            *The amount will be deducted immediately from your account balance
            once you confirm.
          </p>

          <button className={styles.confirmButton} onClick={handleConfirm}>
            Confirm & Proceed
          </button>

          <Link href="/dashboard/investmentPlans" className={styles.backLink}>
            ← Back
          </Link>
        </div>
      </div>
    </>
  );
}
