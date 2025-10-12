"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { Clock } from "lucide-react";
import { investmentProducts } from "@/data/investmentProducts";
import { useParams } from "next/navigation";

export default function PendingInvestment() {
  const { id } = useParams();
  const product = investmentProducts.find((p) => p.id === id);

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <Clock size={48} className={styles.icon} />
          <h1 className={styles.title}>Congratulation!</h1>
          <p className={styles.message}>
            You have successfully invested the amount of {product.minInvestment || 100} USD on the plan
            of &ldquo;{product.name}&rdquo; using your account balance.
          </p>
          <p className={styles.note}>
            You’ll receive an email once your investment is confirmed. In the
            meantime, you may continue to use your account with limited
            features.
          </p>

          <div className={styles.buttons}>
            <Link href="/dashboard/myInvestments" className={styles.button}>
              Go to Investment
            </Link>
            <Link href="/dashboard/investmentPlans" className={styles.button1}>
              Check our available plans
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
