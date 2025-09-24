"use client";

import React, { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import sharedStyles from '@/styles/shared.module.css';
import styles from './generalSettings.module.css';

type Settings = {
  platformName: string;
  logo: string;
  defaultCurrency: string;
  supportedCurrencies: string;
  timezone: string;
  contactEmail: string;
  contactPhone: string;
  termsUrl: string;
  privacyUrl: string;
};

type Errors = Partial<Record<keyof Settings, string>>;

export default function GeneralSettings() {
  const { addToast } = useToast();
  const [settings, setSettings] = useState<Settings>({
    platformName: 'InvestWise',
    logo: '',
    defaultCurrency: 'NGN',
    supportedCurrencies: 'NGN, USD, EUR',
    timezone: 'Africa/Lagos',
    contactEmail: 'support@investwise.com',
    contactPhone: '+234 800 123 4567',
    termsUrl: '/legal/terms',
    privacyUrl: '/legal/privacy',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!settings.platformName.trim()) newErrors.platformName = 'Platform name is required.';
    if (!settings.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required.';
    else if (!/\S+@\S+\.\S+/.test(settings.contactEmail)) newErrors.contactEmail = 'Email is invalid.';
    if (!settings.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required.';
    return newErrors;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast('Please fix the errors before saving.', 'error');
      return;
    }
    setErrors({});
    addToast('General settings saved successfully!', 'success');
    console.log('Saving settings:', settings);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSettings(prev => ({ ...prev, logo: file.name }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={sharedStyles.settingsCard}>
      <div className={sharedStyles.cardHeader}>
        <h2 className={sharedStyles.cardTitle}>General Settings</h2>
        <p className={sharedStyles.cardDescription}>Update your platform's basic information and legal links.</p>
      </div>
      <form onSubmit={handleSave} className={sharedStyles.form}>
        
        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="platformName">Platform Name</label>
            <p>The public name of your investment platform.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <input 
              id="platformName" 
              type="text" 
              className={`${sharedStyles.input} ${errors.platformName ? sharedStyles.inputErrorState : ''}`} 
              value={settings.platformName} onChange={(e) => setSettings(prev => ({ ...prev, platformName: e.target.value }))} 
            />
            {errors.platformName && <p className={sharedStyles.errorMessage}>{errors.platformName}</p>}
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Platform Logo</label>
            <p>Upload a logo. Recommended size: 200x50px.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <div className={sharedStyles.fileInputContainer}>
              {logoPreview && <img src={logoPreview} alt="Logo preview" className={sharedStyles.logoPreview} />}
              <label htmlFor="logoUpload" className={sharedStyles.fileInputLabel}>Upload</label>
              <input id="logoUpload" type="file" className={sharedStyles.fileInput} onChange={handleFileChange} accept="image/*" />
            </div>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="defaultCurrency">Currency Settings</label>
            <p>Set default and supported currencies (comma-separated).</p>
          </div>
          <div className={`${sharedStyles.inputGroup} ${styles.currencyGroup}`}>
            <select id="defaultCurrency" className={sharedStyles.select} value={settings.defaultCurrency} onChange={(e) => setSettings(prev => ({ ...prev, defaultCurrency: e.target.value }))}>
              <option>NGN</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
            <input type="text" placeholder="e.g., NGN, USD, EUR" className={sharedStyles.input} value={settings.supportedCurrencies} onChange={(e) => setSettings(prev => ({ ...prev, supportedCurrencies: e.target.value }))} />
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="timezone">Timezone</label>
            <p>Set the default timezone for the platform.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <select id="timezone" className={sharedStyles.select} value={settings.timezone} onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}>
              <option>Africa/Lagos</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
            </select>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="contactEmail">Contact Information</label>
            <p>How users can contact you.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <input 
              id="contactEmail" 
              type="email" 
              placeholder="Contact Email" 
              className={`${sharedStyles.input} ${errors.contactEmail ? sharedStyles.inputErrorState : ''}`} 
              value={settings.contactEmail} onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))} 
            />
            {errors.contactEmail && <p className={sharedStyles.errorMessage}>{errors.contactEmail}</p>}
            <input 
              type="tel" 
              placeholder="Contact Phone" 
              className={`${sharedStyles.input} ${errors.contactPhone ? sharedStyles.inputErrorState : ''}`} 
              value={settings.contactPhone} onChange={(e) => setSettings(prev => ({ ...prev, contactPhone: e.target.value }))} />
            {errors.contactPhone && <p className={sharedStyles.errorMessage}>{errors.contactPhone}</p>}
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="termsUrl">Legal Links</label>
            <p>URLs for your legal documents.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <input id="termsUrl" type="text" placeholder="Terms of Service URL" className={sharedStyles.input} value={settings.termsUrl} onChange={(e) => setSettings(prev => ({ ...prev, termsUrl: e.target.value }))} />
            <input type="text" placeholder="Privacy Policy URL" className={sharedStyles.input} value={settings.privacyUrl} onChange={(e) => setSettings(prev => ({ ...prev, privacyUrl: e.target.value }))} />
          </div>
        </div>

        <div className={sharedStyles.footer}>
          <button type="submit" className={sharedStyles.saveButton}>Save Changes</button>
        </div>
      </form>
    </div>
  );
}