"use client";

import React, { useState } from 'react';
import sharedStyles from '@/styles/shared.module.css';
import styles from './notificationSettings.module.css';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import Modal from '@/components/modal/Modal/Modal';

const emailTemplates = [
  { id: 'password_reset', name: 'Password Reset', subject: 'Reset Your Password' },
  { id: 'account_verification', name: 'Account Verification', subject: 'Verify Your Account' },
  { id: 'withdrawal_status', name: 'Withdrawal Status', subject: 'Your Withdrawal Update' },
  { id: 'referral_reward', name: 'Referral Reward', subject: 'You\'ve Earned a Reward!' },
];

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    smtpHost: 'smtp.mailtrap.io',
    smtpPort: 2525,
    smtpUser: 'user123',
    smtpPass: 'pass123',
    fromEmail: 'noreply@TreVox.com',
    notificationsEnabled: true,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<typeof emailTemplates[0] | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Notification settings saved!');
    console.log('Saving Notification Settings:', settings);
  };

  const handleEditTemplate = (template: typeof emailTemplates[0]) => {
    setEditingTemplate(template);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTemplate(null);
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Template "${editingTemplate?.name}" saved!`);
    handleCloseModal();
  };

  return (
    <>
      <div className={sharedStyles.settingsCard}>
        <div className={sharedStyles.cardHeader}>
          <h2 className={sharedStyles.cardTitle}>Notification / Email Settings</h2>
          <p className={sharedStyles.cardDescription}>Configure SMTP settings and manage email templates.</p>
        </div>
        <form onSubmit={handleSave} className={sharedStyles.form}>
          
          <div className={sharedStyles.formSection}>
            <div className={sharedStyles.labelGroup}>
              <label>Global Email Status</label>
              <p>Enable or disable all outgoing emails.</p>
            </div>
            <div className={sharedStyles.inputGroup}>
              <ToggleSwitch
                id="notificationsEnabled"
                checked={settings.notificationsEnabled}
                onChange={(checked) => setSettings(prev => ({ ...prev, notificationsEnabled: checked }))}
                label={settings.notificationsEnabled ? 'Enabled' : 'Disabled'}
              />
            </div>
          </div>

          <div className={sharedStyles.formSection}>
            <div className={sharedStyles.labelGroup}>
              <label>SMTP Configuration</label>
              <p>Set up your email sending service.</p>
            </div>
            <div className={sharedStyles.inputGroup}>
              <div className={styles.smtpGrid}>
                <input id="smtpHost" type="text" placeholder="SMTP Host" className={sharedStyles.input} value={settings.smtpHost} onChange={(e) => setSettings(prev => ({ ...prev, smtpHost: e.target.value }))} />
                <input id="smtpPort" type="number" placeholder="Port" className={sharedStyles.input} value={settings.smtpPort} onChange={(e) => setSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) || 0 }))} />
              </div>
              <input id="smtpUser" type="text" placeholder="Username" className={sharedStyles.input} value={settings.smtpUser} onChange={(e) => setSettings(prev => ({ ...prev, smtpUser: e.target.value }))} />
              <input id="smtpPass" type="password" placeholder="Password" className={sharedStyles.input} value={settings.smtpPass} onChange={(e) => setSettings(prev => ({ ...prev, smtpPass: e.target.value }))} />
              <input id="fromEmail" type="email" placeholder="From Email" className={sharedStyles.input} value={settings.fromEmail} onChange={(e) => setSettings(prev => ({ ...prev, fromEmail: e.target.value }))} />
            </div>
          </div>

          <div className={sharedStyles.formSection}>
            <div className={sharedStyles.labelGroup}>
              <label>Email Templates</label>
              <p>Edit the content of automated emails.</p>
            </div>
            <div className={sharedStyles.inputGroup}>
              <ul className={styles.templateList}>
                {emailTemplates.map(template => (
                  <li key={template.id} className={styles.templateItem}>
                    <span>{template.name}</span>
                    <button type="button" className={styles.editButton} onClick={() => handleEditTemplate(template)}>
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={sharedStyles.footer}>
            <button type="submit" className={sharedStyles.saveButton}>Save Changes</button>
          </div>
        </form>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Edit Template: ${editingTemplate?.name || ''}`}>
        <form onSubmit={handleSaveTemplate} className={styles.modalForm}>
          <div className={sharedStyles.formGroup}>
            <label htmlFor="emailSubject">Email Subject</label>
            <input
              id="emailSubject"
              type="text"
              defaultValue={editingTemplate?.subject}
              className={sharedStyles.input}
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <label htmlFor="emailBody">Email Body</label>
            <textarea
              id="emailBody"
              rows={10}
              className={sharedStyles.textarea}
              defaultValue={`Hello [[user_name]],\n\nThis is a notification from [[site_name]].\n\n...`}
            />
          </div>
          <div className={styles.shortcodeInfo}>
            <h4>Available Shortcodes:</h4>
            <p>
              <code>[[user_name]]</code>, <code>[[site_name]]</code>, <code>[[site_url]]</code>, <code>[[transaction_id]]</code>, <code>[[amount]]</code>
            </p>
          </div>
          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className={sharedStyles.saveButton}>
              Save Template
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

