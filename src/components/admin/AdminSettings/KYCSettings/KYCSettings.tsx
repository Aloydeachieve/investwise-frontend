"use client";

import React, { useState } from 'react';
import sharedStyles from '@/styles/shared.module.css';
import styles from './kycSettings.module.css';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';

const documentOptions = [
    { id: 'passport', label: 'Passport' },
    { id: 'drivers_license', label: "Driver's License" },
    { id: 'nin', label: 'NIN (National Identification Number)' },
    { id: 'bvn', label: 'BVN (Bank Verification Number)' },
    { id: 'national_id', label: 'National ID Card' },
];

export default function KYCSettings() {
  const [settings, setSettings] = useState({
    kycEnabled: true,
    autoApprove: false,
    requiredDocuments: ['passport', 'national_id'],
    maxFileSize: 5, // in MB
    retryLimits: 3,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('KYC settings saved!');
    console.log('Saving KYC Settings:', settings);
  };

  const handleCheckboxChange = (docId: string) => {
    setSettings(prev => {
      const newDocs = prev.requiredDocuments.includes(docId)
        ? prev.requiredDocuments.filter(id => id !== docId)
        : [...prev.requiredDocuments, docId];
      return { ...prev, requiredDocuments: newDocs };
    });
  };

  return (
    <div className={sharedStyles.settingsCard}>
      <div className={sharedStyles.cardHeader}>
        <h2 className={sharedStyles.cardTitle}>KYC / Verification Settings</h2>
        <p className={sharedStyles.cardDescription}>Manage KYC requirements and verification processes.</p>
      </div>
      <form onSubmit={handleSave} className={sharedStyles.form}>
        
        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>KYC Global Status</label>
            <p>Enable or disable KYC verification for all users.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <ToggleSwitch
              id="kycEnabled"
              checked={settings.kycEnabled}
              onChange={(checked) => setSettings(prev => ({ ...prev, kycEnabled: checked }))}
              label={settings.kycEnabled ? 'Enabled' : 'Disabled'}
            />
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Required Documents</label>
            <p>Select the documents users can submit for verification.</p>
          </div>
          <div className={`${sharedStyles.inputGroup} ${sharedStyles.checkboxGroup}`}>
            {documentOptions.map(doc => (
              <div key={doc.id} className={sharedStyles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id={doc.id}
                  checked={settings.requiredDocuments.includes(doc.id)}
                  onChange={() => handleCheckboxChange(doc.id)}
                />
                <label htmlFor={doc.id}>{doc.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Approval Process</label>
            <p>Set how verifications are approved.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <ToggleSwitch
              id="autoApprove"
              checked={settings.autoApprove}
              onChange={(checked) => setSettings(prev => ({ ...prev, autoApprove: checked }))}
              label={settings.autoApprove ? 'Auto-approve submissions' : 'Manual approval required'}
            />
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="maxFileSize">File Restrictions</label>
            <p>Set limits for uploaded document files.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <div className={styles.inputWithAdornment}>
              <input
                id="maxFileSize"
                type="number"
                className={sharedStyles.input}
                value={settings.maxFileSize}
                onChange={(e) => setSettings(prev => ({ ...prev, maxFileSize: parseInt(e.target.value) || 0 }))}
              />
              <span>MB</span>
            </div>
            <p className={sharedStyles.labelGroup}>Allowed file types: JPG, PNG, PDF</p>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="retryLimits">Retry Limits</label>
            <p>How many times a user can re-submit after a rejection.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <input
              id="retryLimits"
              type="number"
              className={sharedStyles.input}
              value={settings.retryLimits}
              onChange={(e) => setSettings(prev => ({ ...prev, retryLimits: parseInt(e.target.value) || 0 }))}
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