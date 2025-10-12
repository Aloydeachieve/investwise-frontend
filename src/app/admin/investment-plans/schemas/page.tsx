"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { InvestmentPlan } from "@/components/types/investment";
import styles from "./styles.module.css";
import {
  ChevronLeft,
  Plus,
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  ToggleLeft,
  ToggleRight,
  Briefcase,
} from "lucide-react";
import { investmentSchemas as mockPlans } from "@/data/investmentSchemas";
import AddSchemaModal from "@/components/admin/AddSchemaModal/AddSchemaModal";

type FilterStatus = "active" | "inactive";

const PlanCard: React.FC<{
  plan: InvestmentPlan;
  onAction: (action: string, plan: InvestmentPlan) => void;
}> = ({ plan, onAction }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{plan.name}</h3>
        <div className={styles.headerActions}>
          <span
            className={`${styles.statusBadge} ${
              plan.isActive ? styles.statusActive : styles.statusInactive
            }`}
          >
            {plan.isActive ? "Active" : "Inactive"}
          </span>
          <div className={styles.dropdown} ref={menuRef}>
            <button
              className={styles.dropdownToggle}
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
            >
              <MoreVertical size={20} />
            </button>
            {isMenuOpen && (
              <div className={styles.dropdownMenu}>
                <Link
                  href={`/admin/investment-plans/schemas/${plan.id}`}
                  className={styles.dropdownItem}
                >
                  <Eye size={14} /> View Details
                </Link>
                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    onAction("edit", plan);
                    setMenuOpen(false);
                  }}
                >
                  <Edit size={14} /> Edit Plan
                </button>
                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    onAction("toggle", plan);
                    setMenuOpen(false);
                  }}
                >
                  {plan.isActive ? (
                    <ToggleLeft size={14} />
                  ) : (
                    <ToggleRight size={14} />
                  )}
                  Mark as {plan.isActive ? "Inactive" : "Active"}
                </button>
                <button
                  className={`${styles.dropdownItem} ${styles.dropdownItemDelete}`}
                  onClick={() => {
                    onAction("delete", plan);
                    setMenuOpen(false);
                  }}
                >
                  <Trash2 size={14} /> Delete Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardRow}>
          <div className={styles.cardMetric}>
            <span className={styles.metricValue}>
              {plan.interestRate}
              {plan.interestType === "percent" ? "%" : ""}
            </span>
            <span className={styles.metricLabel}>Interest</span>
          </div>
          <div className={styles.cardMetric}>
            <span className={styles.metricValue}>{plan.termDuration}</span>
            <span className={styles.metricLabel}>Days</span>
          </div>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.detailItem}>
            <span>Profit Period</span>
            <strong>
              {plan.interestPeriod.charAt(0).toUpperCase() +
                plan.interestPeriod.slice(1)}
            </strong>
          </div>
          <div className={styles.detailItem}>
            <span>Capital Return</span>
            <strong>{plan.isFixed ? "At End of Term" : "Each Term"}</strong>
          </div>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.investmentRange}>
          <span>Min. Investment</span>
          <strong>₦{plan.amount.toLocaleString()}</strong>
        </div>
        <div className={styles.investmentRange}>
          <span>Max. Investment</span>
          <strong>
            {plan.isFixed ? `₦${plan.amount.toLocaleString()}` : "Unlimited"}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default function SchemaManagementPage() {
  const [plans, setPlans] = useState<InvestmentPlan[]>(mockPlans);
  const [filter, setFilter] = useState<FilterStatus>("active");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<InvestmentPlan | null>(null);

  const filteredPlans = useMemo(() => {
    return plans.filter((p) =>
      filter === "active" ? p.isActive : !p.isActive
    );
  }, [filter, plans]);

  const handleSaveSchema = (
    schemaData: Omit<InvestmentPlan, "id"> | InvestmentPlan
  ) => {
    if ("id" in schemaData) {
      // Editing existing plan
      setPlans((prev) =>
        prev.map((p) => (p.id === schemaData.id ? schemaData : p))
      );
    } else {
      // Adding new plan
      const newPlan: InvestmentPlan = {
        id: `plan-${Date.now()}`,
        ...schemaData,
      };
      setPlans((prev) => [newPlan, ...prev]);
    }
  };

  const handleCardAction = (action: string, plan: InvestmentPlan) => {
    if (action === 'edit') {
      setEditingPlan(plan);
      setIsModalOpen(true);
    } else if (action === 'toggle') {
      setPlans(prev => prev.map(p => p.id === plan.id ? { ...p, isActive: !p.isActive } : p));
    } else if (action === 'delete') {
      // Implement confirmation before deleting
      if (window.confirm(`Are you sure you want to delete the plan "${plan.name}"?`)) {
        setPlans(prev => prev.filter(p => p.id !== plan.id));
      }
    }
  };

  const handleOpenAddModal = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const tabItems: { label: string; value: FilterStatus }[] = [
    { label: "Active Plans", value: "active" },
    { label: "Inactive Plans", value: "inactive" },
  ];

  return (
    <>
      <AddSchemaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSchema}
        initialData={editingPlan}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <Link href="/admin/investment-plans" className={styles.backLink}>
              <ChevronLeft size={20} />
              <span>Back to Investments</span>
            </Link>
            <h1 className={styles.title}>Schema Management</h1>
            <p className={styles.subtitle}>
              Create, update, and manage investment plans.
            </p>
          </div>
          <div className={styles.headerActions}>
            <Link
              href="/admin/investment-plans"
              className={styles.investedButton}
            >
              <Briefcase size={18} />
              <span>Invested Plans</span>
            </Link>
            <button
              className={styles.createButton}
              onClick={handleOpenAddModal}
            >
              <Plus size={18} />
              <span>Add New Schema</span>
            </button>
          </div>
        </div>

        <div className={styles.filterTabs}>
          {tabItems.map((tab) => (
            <button
              key={tab.value}
              className={`${styles.tabButton} ${
                filter === tab.value ? styles.activeTab : ""
              }`}
              onClick={() => setFilter(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.contentGrid}>
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onAction={handleCardAction} />
            ))
          ) : (
            <p>No {filter} plans found.</p>
          )}
        </div>
      </div>
    </>
  );
}
