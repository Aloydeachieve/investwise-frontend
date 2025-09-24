// src/app/products/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { investmentProducts  } from '@/data/investmentProducts';
import styles from './styles.module.css';
import Link from 'next/link';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = investmentProducts .find((p) => p.id === id);

  if (!product) return <div className={styles.notFound}>Product not found</div>;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.header} ${product.color} ${product.textColor}`}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.subtitle}>{product.description}</p>
      </div>

      <div className={styles.body}>
        <section className={styles.section}>
          <h2>Investment Details</h2>
          <ul>
            <li><strong>Category:</strong> {product.category}</li>
            <li><strong>Risk Level:</strong> {product.riskLevel}</li>
            <li><strong>Minimum Investment:</strong> {product.minInvestment === 0 ? 'No minimum' : `$${product.minInvestment}`}</li>
            <li><strong>Returns:</strong> {product.historicalReturns}</li>
            <li><strong>Fees:</strong> {product.fees}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Key Features</h2>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>

        <div className={styles.ctaWrapper}>
          <Link href="/dashboard/investment-plans">
            <button className={styles.ctaButton}>Invest Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

