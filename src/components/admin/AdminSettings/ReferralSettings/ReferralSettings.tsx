"use client";

import React, { useState } from 'react';
import sharedStyles from '@/styles/shared.module.css';
import styles from './referralSettings.module.css';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';

export default function ReferralSettings() {
  const [settings, setSettings] = useState({
    enabled: true,
    rewardType: 'percentage', // 'fixed' or 'percentage'
    rewardAmount: 10,
    rewardCondition: 'first_investment',
    validityPeriod: 30, // in days
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Referral settings saved!');
    console.log('Saving Referral Settings:', settings);
  };

  return (
    <div className={sharedStyles.settingsCard}>
      <div className={sharedStyles.cardHeader}>
        <h2 className={sharedStyles.cardTitle}>Referral / Reward Settings</h2>
        <p className={sharedStyles.cardDescription}>Manage the affiliate and referral program settings.</p>
      </div>
      <form onSubmit={handleSave} className={sharedStyles.form}>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Referral Program</label>
            <p>Enable or disable the referral system globally.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <ToggleSwitch
              id="referralEnabled"
              checked={settings.enabled}
              onChange={(checked) => setSettings(prev => ({ ...prev, enabled: checked }))}
              label={settings.enabled ? 'Enabled' : 'Disabled'}
            />
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Reward Type</label>
            <p>Choose how referees are rewarded.</p>
          </div>
          <div className={`${sharedStyles.inputGroup} ${styles.radioGroup}`}>
            <div className={styles.radioWrapper}>
              <input type="radio" id="rewardFixed" name="rewardType" value="fixed" checked={settings.rewardType === 'fixed'} onChange={(e) => setSettings(prev => ({ ...prev, rewardType: e.target.value }))} />
              <label htmlFor="rewardFixed">Fixed Amount</label>
            </div>
            <div className={styles.radioWrapper}>
              <input type="radio" id="rewardPercentage" name="rewardType" value="percentage" checked={settings.rewardType === 'percentage'} onChange={(e) => setSettings(prev => ({ ...prev, rewardType: e.target.value }))} />
              <label htmlFor="rewardPercentage">Percentage</label>
            </div>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="rewardAmount">Reward Amount</label>
            <p>The value of the reward.</p>
          </div>
          <div className={`${sharedStyles.inputGroup} ${styles.inputWithAdornment}`}>
            <input id="rewardAmount" type="number" className={sharedStyles.input} value={settings.rewardAmount} onChange={(e) => setSettings(prev => ({ ...prev, rewardAmount: parseFloat(e.target.value) || 0 }))} />
            <span>{settings.rewardType === 'fixed' ? 'NGN' : '%'}</span>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="rewardCondition">Reward Condition</label>
            <p>When the reward should be given.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <select id="rewardCondition" className={sharedStyles.select} value={settings.rewardCondition} onChange={(e) => setSettings(prev => ({ ...prev, rewardCondition: e.target.value }))}>
              <option value="first_investment">On first investment</option>
              <option value="signup">On successful signup</option>
              <option value="verification">On account verification</option>
            </select>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="validityPeriod">Expiry Period</label>
            <p>How long the referral link is valid (in days).</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <input id="validityPeriod" type="number" className={sharedStyles.input} value={settings.validityPeriod} onChange={(e) => setSettings(prev => ({ ...prev, validityPeriod: parseInt(e.target.value) || 0 }))} />
          </div>
        </div>

        <div className={sharedStyles.footer}>
          <button type="submit" className={sharedStyles.saveButton}>Save Changes</button>
        </div>
      </form>
    </div>
  );
}