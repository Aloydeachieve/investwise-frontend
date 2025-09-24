"use client";

import React, { useState } from 'react';
import sharedStyles from '@/styles/shared.module.css';
import styles from './payoutSettings.module.css';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';

const payoutMethods = [
    { id: 'bank', label: 'Bank Transfer' },
    { id: 'crypto', label: 'Crypto Wallet' },
    { id: 'paypal', label: 'PayPal' },
];

export default function PayoutSettings() {
  const [settings, setSettings] = useState({
    minWithdrawal: 5000,
    allowedMethods: ['bank', 'crypto'],
    processingTime: '24 hours review',
    manualApproval: true,
    defaultStatus: 'pending',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Payout settings saved!');
    console.log('Saving Payout Settings:', settings);
  };

  const handleCheckboxChange = (methodId: string) => {
    setSettings(prev => {
      const newMethods = prev.allowedMethods.includes(methodId)
        ? prev.allowedMethods.filter(id => id !== methodId)
        : [...prev.allowedMethods, methodId];
      return { ...prev, allowedMethods: newMethods };
    });
  };

  return (
    <div className={sharedStyles.settingsCard}>
      <div className={sharedStyles.cardHeader}>
        <h2 className={sharedStyles.cardTitle}>Payout / Withdrawal Settings</h2>
        <p className={sharedStyles.cardDescription}>Configure withdrawal methods, limits, and approval flows.</p>
      </div>
      <form onSubmit={handleSave} className={sharedStyles.form}>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="minWithdrawal">Minimum Withdrawal</label>
            <p>The minimum amount for a single withdrawal request.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <input id="minWithdrawal" type="number" className={sharedStyles.input} value={settings.minWithdrawal} onChange={(e) => setSettings(prev => ({ ...prev, minWithdrawal: parseInt(e.target.value) || 0 }))} />
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Allowed Payout Methods</label>
            <p>Select which payout methods are available to users.</p>
          </div>
          <div className={`${sharedStyles.inputGroup} ${styles.methodGrid}`}>
            {payoutMethods.map(method => (
              <div key={method.id} className={sharedStyles.checkboxWrapper}>
                <input type="checkbox" id={`payout-${method.id}`} checked={settings.allowedMethods.includes(method.id)} onChange={() => handleCheckboxChange(method.id)} />
                <label htmlFor={`payout-${method.id}`}>{method.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="processingTime">Processing Time</label>
            <p>A public message about withdrawal processing times.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <input id="processingTime" type="text" className={sharedStyles.input} value={settings.processingTime} onChange={(e) => setSettings(prev => ({ ...prev, processingTime: e.target.value }))} />
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Manual Approval</label>
            <p>Require an admin to approve every withdrawal request.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <ToggleSwitch
              id="manualApproval"
              checked={settings.manualApproval}
              onChange={(checked) => setSettings(prev => ({ ...prev, manualApproval: checked }))}
              label={settings.manualApproval ? 'Manual approval required' : 'Auto-process withdrawals'}
            />
          </div>
        </div>

        <div className={sharedStyles.footer}>
          <button type="submit" className={sharedStyles.saveButton}>Save Changes</button>
        </div>
      </form>
    </div>
  );
}