// File: src/app/dashboard/investments/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { investmentProducts } from "@/data/investmentProducts";
import styles from "./styles.module.css";
import Link from "next/link";
import { FaWallet } from "react-icons/fa"; // Import the wallet icon from Font Awesome


export default function InvestNowPage() {
  const { id } = useParams();
  const product = investmentProducts.find((p) => p.id === id);

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrapperTitle}>
          <h1 className={styles.title}>Invest on {product.name}</h1>
          <p className={styles.subtitle}>
            Investment for long term & earn money.
          </p>
        </div>

        <div className={styles.wrapperCard}>
          <div className={styles.card}>
            <label className={styles.label}>Invested Plan</label>
            <div className={styles.planBox}>
              <strong>{product.name}</strong>
              <p>{product.description}</p>
            </div>
          </div>

          <div className={styles.card}>
            <label className={styles.label}>Fixed Investment Amount</label>
            <div className={styles.amountInputWrapper}>
              <input
                type="number"

                placeholder="100"
                defaultValue={product.minInvestment || 100}
                className={styles.amountInput}
              />
              <span className={styles.unit}>USD</span>
            </div>
            <p className={styles.note}>
              Note: The investment amount is a fixed amount for the selected
              plan.
            </p>
          </div>

          <div className={styles.card}>
            <label className={styles.label}>Payment Account</label>
            <div className={styles.paymentBox}>
              <FaWallet className={styles.walletIcon} />
              <div className={styles.paymentDetails}>
                <span>Main Balance</span>
                <p>
                  Current Balance: <strong>250.00 USD</strong> (0.0665 ETH)
                </p>
              </div>
            </div>
          </div>

          <Link href={`/dashboard/investmentPlans/${product.id}/confirmInvest`} className={styles.investButton}>Continue to Invest</Link>
        </div>

        <p className={styles.note}>By continuing this, you agree to our investment terms and conditions.</p>

        <Link href="/dashboard/investments" className={styles.backLink}>
          ← Back to Plans
        </Link>
      </div>
    </>
  );
}
