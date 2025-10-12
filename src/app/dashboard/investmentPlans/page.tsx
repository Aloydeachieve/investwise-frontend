'use client';

import { useState } from 'react';
import Link from 'next/link';

import styles from './styles.module.css';
import { investmentProducts } from '@/data/investmentProducts';

export default function InvestmentPlans() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'portfolio', name: 'Managed Portfolios' },
    { id: 'fund', name: 'Investment Funds' },
    { id: 'savings', name: 'Savings Products' },
    { id: 'retirement', name: 'Retirement Planning' }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const filteredProducts = investmentProducts.filter(product => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className={styles.investmentPlans}>
        <div className={styles.investmentText}>
          <h1>Investment Plans</h1>
          <p>Here is our several investment plans. You can invest daily, weekly or monthly and get higher returns in your investment.</p>
          <span>Choose your favourite plan and start earning now.</span>
        </div>
        <div className={styles.container}>
          <div className={styles.filterCard}>
            <div className={styles.filterWrapper}>
              <div className={styles.filterButtons}>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`${styles.filterButton} ${activeFilter === category.id ? styles.activeFilter : ''}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div className={styles.searchInputWrapper}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <div className={styles.searchIcon}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.gridWrapper}>
            {filteredProducts.map(product => (
              <div key={product.id} className={styles.card}>
                <div className={`${styles.cardHeader} ${product.color} ${product.textColor}`}>
                  <h2 className={styles.productName}>{product.name}</h2>
                  <div className={styles.productMeta}>
                    <span>Risk: {product.riskLevel}</span>
                    <span>Returns: {product.historicalReturns}</span>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.productDescription}>{product.description}</p>

                  <div className={styles.featureBlock}>
                    <div>
                      <h3 className={styles.featureTitle}>Minimum Investment</h3>
                      <p className={styles.featureValue}>
                        {product.minInvestment === 0 ? 'No minimum' : formatCurrency(product.minInvestment)}
                      </p>
                    </div>

                    <div>
                      <h3 className={styles.featureTitle}>Fees</h3>
                      <p className={styles.featureValue}>{product.fees}</p>
                    </div>

                    <div>
                      <h3 className={styles.featureTitle}>Key Features</h3>
                      <ul className={styles.featureList}>
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <Link href={`/dashboard/investmentPlans/${product.id}/investNow`} className={styles.learnMoreButton}>
                    Invest Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className={styles.emptyTitle}>No products found</h3>
              <p className={styles.emptyText}>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
