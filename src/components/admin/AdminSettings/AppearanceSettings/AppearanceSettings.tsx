"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import sharedStyles from '@/styles/shared.module.css';
import styles from './appearanceSettings.module.css';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';

export default function AppearanceSettings() {
  const [settings, setSettings] = useState({
    primaryColor: '#1e293b',
    secondaryColor: '#4ade80',
    theme: 'light',
    logo: '',
    favicon: '',
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Appearance settings saved!');
    console.log('Saving Appearance Settings:', settings);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      if (type === 'logo') {
        setSettings(prev => ({ ...prev, logo: file.name }));
        setLogoPreview(previewUrl);
      } else {
        setSettings(prev => ({ ...prev, favicon: file.name }));
        setFaviconPreview(previewUrl);
      }
    }
  };

  return (
    <div className={sharedStyles.settingsCard}>
      <div className={sharedStyles.cardHeader}>
        <h2 className={sharedStyles.cardTitle}>Appearance / Branding</h2>
        <p className={sharedStyles.cardDescription}>Customize the look and feel of your platform.</p>
      </div>
      <form onSubmit={handleSave} className={sharedStyles.form}>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Logos</label>
            <p>Upload your primary logo and favicon.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <div className={sharedStyles.fileInputContainer}>
              {logoPreview && <Image src={logoPreview} alt="Logo preview" className={sharedStyles.logoPreview} width={200} height={50} />}
              <label htmlFor="logoUpload" className={sharedStyles.fileInputLabel}>Upload Primary Logo</label>
              <input id="logoUpload" type="file" className={sharedStyles.fileInput} onChange={(e) => handleFileChange(e, 'logo')} accept="image/*" />
            </div>
            <div className={sharedStyles.fileInputContainer}>
              {faviconPreview && <Image src={faviconPreview} alt="Favicon preview" className={sharedStyles.logoPreview} width={16} height={16} />}
              <label htmlFor="faviconUpload" className={sharedStyles.fileInputLabel}>Upload Favicon</label>
              <input id="faviconUpload" type="file" className={sharedStyles.fileInput} onChange={(e) => handleFileChange(e, 'favicon')} accept="image/x-icon, image/png, image/svg+xml" />
            </div>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Theme Colors</label>
            <p>Set the primary and secondary colors for your brand.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <div className={styles.colorPickerWrapper}>
              <input type="color" id="primaryColor" className={styles.colorInput} value={settings.primaryColor} onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))} />
              <label htmlFor="primaryColor">Primary Color ({settings.primaryColor})</label>
            </div>
            <div className={styles.colorPickerWrapper}>
              <input type="color" id="secondaryColor" className={styles.colorInput} value={settings.secondaryColor} onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))} />
              <label htmlFor="secondaryColor">Secondary Color ({settings.secondaryColor})</label>
            </div>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Theme Mode</label>
            <p>Toggle between light and dark themes for the platform.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <ToggleSwitch id="themeMode" checked={settings.theme === 'dark'} onChange={(checked) => setSettings(prev => ({ ...prev, theme: checked ? 'dark' : 'light' }))} label={settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'} />
          </div>
        </div>

        <div className={sharedStyles.footer}>
          <button type="submit" className={sharedStyles.saveButton}>Save Changes</button>
        </div>
      </form>
    </div>
  );
}