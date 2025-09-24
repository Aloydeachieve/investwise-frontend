"use client";

import React, { useState, useEffect } from 'react';
import styles from './AddSchemaModal.module.css';
import { X } from 'lucide-react';
import { InvestmentPlan } from '@/components/types/investment';
import Switch from '@/components/admin/Switch/Switch';

interface AddSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (schemaData: Omit<InvestmentPlan, 'id'> | InvestmentPlan) => void;
  initialData?: InvestmentPlan | null;
}

const initialFormState: Omit<InvestmentPlan, 'id'> = {
  name: '',
  shortName: '',
  description: '',
  amount: 0,
  interestRate: 0,
  interestType: 'percent',
  interestPeriod: 'monthly',
  termDuration: 30,
  maxInvestmentsPerUser: null,
  maxTotalInvestments: null,
  isFixed: false,
  isFeatured: false,
  isActive: true,
};

export default function AddSchemaModal({ isOpen, onClose, onSave, initialData }: AddSchemaModalProps) {
  const [formData, setFormData] = useState<Omit<InvestmentPlan, 'id'> | InvestmentPlan>(initialFormState);
  const isEditing = !!initialData;

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData ? { ...initialData } : initialFormState);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    const parsedValue = isNumber ? (value === '' ? null : Number(value)) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSwitchChange = (name: keyof (Omit<InvestmentPlan, 'id'> | InvestmentPlan), checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{isEditing ? 'Edit' : 'Add New'} Investment Schema</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Schema Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="shortName">Short Name</label>
              <input type="text" id="shortName" name="shortName" value={formData.shortName} onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3}></textarea>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="amount">Investment Amount (₦)</label>
              <input type="number" id="amount" name="amount" value={formData.amount || ''} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="interestRate">Interest Rate</label>
              <div className={styles.inputGroup}>
                <input type="number" id="interestRate" name="interestRate" value={formData.interestRate || ''} onChange={handleChange} required />
                <select name="interestType" value={formData.interestType} onChange={handleChange}>
                  <option value="percent">%</option>
                  <option value="fixed">Fixed (₦)</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="interestPeriod">Interest Period</label>
              <select id="interestPeriod" name="interestPeriod" value={formData.interestPeriod} onChange={handleChange}>
                <option value="hourly">Hourly</option><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="yearly">Yearly</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="termDuration">Term Duration (days)</label>
              <input type="number" id="termDuration" name="termDuration" value={formData.termDuration || ''} onChange={handleChange} required />
            </div>
          </div>

          <h3 className={styles.subheading}>Investment Restrictions</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="maxInvestmentsPerUser">Max Investments / User</label>
              <input type="number" id="maxInvestmentsPerUser" name="maxInvestmentsPerUser" value={formData.maxInvestmentsPerUser ?? ''} onChange={handleChange} placeholder="Unlimited" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="maxTotalInvestments">Max Total Investments</label>
              <input type="number" id="maxTotalInvestments" name="maxTotalInvestments" value={formData.maxTotalInvestments ?? ''} onChange={handleChange} placeholder="Unlimited" />
            </div>
          </div>

          <h3 className={styles.subheading}>Settings</h3>
          <div className={styles.switchGrid}>
            <div className={styles.switchItem}><label>Fixed Investment</label><Switch checked={!!formData.isFixed} onChange={(c) => handleSwitchChange('isFixed', c)} /></div>
            <div className={styles.switchItem}><label>Featured Plan</label><Switch checked={!!formData.isFeatured} onChange={(c) => handleSwitchChange('isFeatured', c)} /></div>
            <div className={styles.switchItem}><label>Active Plan</label><Switch checked={!!formData.isActive} onChange={(c) => handleSwitchChange('isActive', c)} /></div>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>{isEditing ? 'Save Changes' : 'Add Schema'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}