"use client";

import React, { useState } from 'react';
import sharedStyles from '@/styles/shared.module.css';
import styles from './feesSettings.module.css';

export default function FeesSettings() {
  const [settings, setSettings] = useState({
    depositFee: 1.5,
    withdrawalFee: 2.0,
    minDeposit: 1000,
    minWithdrawal: 5000,
    interestRates: [
      { id: 'starter', plan: 'Starter Plan', rate: 5 },
      { id: 'gold', plan: 'Gold Plan', rate: 7.5 },
      { id: 'platinum', plan: 'Platinum Plan', rate: 10 },
    ],
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Fees & Rates settings saved!');
    console.log('Saving settings:', settings);
  };

  const handleRateChange = (id: string, newRate: number) => {
    setSettings(prev => ({
      ...prev,
      interestRates: prev.interestRates.map(rate =>
        rate.id === id ? { ...rate, rate: isNaN(newRate) ? 0 : newRate } : rate
      ),
    }));
  };

  return (
    <div className={sharedStyles.settingsCard}>
      <div className={sharedStyles.cardHeader}>
        <h2 className={sharedStyles.cardTitle}>Fees & Rates</h2>
        <p className={sharedStyles.cardDescription}>Configure transaction fees and profit rates for investment plans.</p>
      </div>
      <form onSubmit={handleSave} className={sharedStyles.form}>
        
        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Transaction Fees</label>
            <p>Set the percentage-based fees for deposits and withdrawals.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <div className={styles.inputWithAdornment}>
              <input id="depositFee" type="number" step="0.01" className={sharedStyles.input} value={settings.depositFee} onChange={(e) => setSettings(prev => ({ ...prev, depositFee: parseFloat(e.target.value) || 0 }))} />
              <span>%</span>
            </div>
            <div className={styles.inputWithAdornment}>
              <input id="withdrawalFee" type="number" step="0.01" className={sharedStyles.input} value={settings.withdrawalFee} onChange={(e) => setSettings(prev => ({ ...prev, withdrawalFee: parseFloat(e.target.value) || 0 }))} />
              <span>%</span>
            </div>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Minimum Amounts</label>
            <p>Define the minimum amounts for deposits and withdrawals.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <input id="minDeposit" type="number" placeholder="Min Deposit" className={sharedStyles.input} value={settings.minDeposit} onChange={(e) => setSettings(prev => ({ ...prev, minDeposit: parseInt(e.target.value) || 0 }))} />
            <input id="minWithdrawal" type="number" placeholder="Min Withdrawal" className={sharedStyles.input} value={settings.minWithdrawal} onChange={(e) => setSettings(prev => ({ ...prev, minWithdrawal: parseInt(e.target.value) || 0 }))} />
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Profit / Interest Rates</label>
            <p>Configure the interest rates for different investment plans.</p>
          </div>
          <div className={`${sharedStyles.inputGroup} ${styles.rateTableContainer}`}>
            {settings.interestRates.map(rate => (
              <div key={rate.id} className={styles.rateRow}>
                <label htmlFor={`rate-${rate.id}`}>{rate.plan}</label>
                <div className={styles.inputWithAdornment}>
                  <input id={`rate-${rate.id}`} type="number" step="0.01" value={rate.rate} onChange={(e) => handleRateChange(rate.id, parseFloat(e.target.value))} className={sharedStyles.input} />
                  <span>%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={sharedStyles.footer}>
          <button type="submit" className={sharedStyles.saveButton}>Save Changes</button>
        </div>
      </form>
    </div>
  );
}