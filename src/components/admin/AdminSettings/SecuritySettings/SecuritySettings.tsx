"use client";

import React, { useState } from 'react';
import sharedStyles from '@/styles/shared.module.css';
import styles from './securitySettings.module.css';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';

export default function SecuritySettings() {
  const [settings, setSettings] = useState({
    minLength: 8,
    requireUppercase: true,
    requireSpecialChar: true,
    enable2FA: true,
    sessionTimeout: 30, // in minutes
    lockoutAttempts: 5,
    loginNotifications: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Security settings saved!');
    console.log('Saving Security Settings:', settings);
  };

  return (
    <div className={sharedStyles.settingsCard}>
      <div className={sharedStyles.cardHeader}>
        <h2 className={sharedStyles.cardTitle}>Security Settings</h2>
        <p className={sharedStyles.cardDescription}>Manage password policies, 2FA, and session settings.</p>
      </div>
      <form onSubmit={handleSave} className={sharedStyles.form}>
        
        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Password Policy</label>
            <p>Define requirements for user passwords.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <div className={styles.inputWithLabel}>
              <label htmlFor="minLength">Minimum length</label>
              <input
                id="minLength"
                type="number"
                className={sharedStyles.input}
                value={settings.minLength}
                onChange={(e) => setSettings(prev => ({ ...prev, minLength: parseInt(e.target.value) || 8 }))}
              />
            </div>
            <div className={sharedStyles.checkboxWrapper}>
              <input
                type="checkbox"
                id="requireUppercase"
                checked={settings.requireUppercase}
                onChange={(e) => setSettings(prev => ({ ...prev, requireUppercase: e.target.checked }))}
              />
              <label htmlFor="requireUppercase">Require uppercase letter</label>
            </div>
            <div className={sharedStyles.checkboxWrapper}>
              <input
                type="checkbox"
                id="requireSpecialChar"
                checked={settings.requireSpecialChar}
                onChange={(e) => setSettings(prev => ({ ...prev, requireSpecialChar: e.target.checked }))}
              />
              <label htmlFor="requireSpecialChar">Require special character</label>
            </div>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Two-Factor Authentication (2FA)</label>
            <p>Enable or disable 2FA for all users.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <ToggleSwitch
              id="enable2FA"
              checked={settings.enable2FA}
              onChange={(checked) => setSettings(prev => ({ ...prev, enable2FA: checked }))}
              label={settings.enable2FA ? 'Enabled' : 'Disabled'}
            />
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label htmlFor="sessionTimeout">Session Timeout</label>
            <p>Automatically log out users after a period of inactivity.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <div className={styles.inputWithAdornment}>
              <input
                id="sessionTimeout"
                type="number"
                className={sharedStyles.input}
                value={settings.sessionTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 0 }))}
              />
              <span>minutes</span>
            </div>
          </div>
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.labelGroup}>
            <label>Login Notifications</label>
            <p>Send an email to users when a login occurs from a new device.</p>
          </div>
          <div className={sharedStyles.inputGroup}>
            <ToggleSwitch
              id="loginNotifications"
              checked={settings.loginNotifications}
              onChange={(checked) => setSettings(prev => ({ ...prev, loginNotifications: checked }))}
              label={settings.loginNotifications ? 'Enabled' : 'Disabled'}
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