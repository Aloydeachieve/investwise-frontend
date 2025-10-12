"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post } from '@/lib/api';
import styles from './styles.module.css';
import { FiCheck, FiX, FiEye, FiLoader, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Table, { ColumnDef } from '@/components/admin/Table/Table';
import { useRouter } from "next/navigation";

interface KycSubmission {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  document_type: string;
  status: 'pending' | 'approved' | 'rejected';
  meta: Record<string, string | number | boolean>;
  submitted_at: string;
  document_url: string;
}

interface PaginatedResponse {
  submissions: KycSubmission[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

const fetchVerifications = async (filter: string, page: number): Promise<PaginatedResponse> => {
  let endpoint = "/admin/kyc/pending";
  if (filter === "approved") endpoint = "/admin/kyc/approved";
  if (filter === "all") endpoint = "/admin/kyc/all";

  const response = await get(`${endpoint}?page=${page}`);
  return response.data as PaginatedResponse; // <-- Fix: type assertion
};

const StatusBadge: React.FC<{ status: KycSubmission['status'] }> = ({ status }) => {
  const statusClasses = {
    pending: styles.statusPending,
    approved: styles.statusApproved,
    rejected: styles.statusRejected,
  };
  return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>;
};

type FilterStatus = 'pending' | 'approved' | 'all';

export default function VerificationManagementPage() {
    const router = useRouter(); 
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<FilterStatus>('pending');
  const [page, setPage] = useState(1);


  const { data, isLoading, isError } = useQuery({
    queryKey: ['verifications', filter, page],
    queryFn: () => fetchVerifications(filter, page),
  });

  const submissions = data?.submissions || [];
  const pagination = data?.pagination;

  const mutation = useMutation({
    mutationFn: ({ id, action }: { id: number, action: 'approve' | 'reject' }) => {
      return post(`/admin/kyc/${id}/${action}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
    },
  });

  const handleAction = useCallback((id: number, action: 'approve' | 'reject') => {
    mutation.mutate({ id, action });
  }, [mutation]);

  const columns: ColumnDef<KycSubmission>[] = useMemo(() => [
    {
      header: 'User',
      accessor: 'user',
      cell: (item) => (
        <div className={styles.userCell}>
          <div className={styles.avatar}>{item.user.name.charAt(0)}</div>
          <div>
            <div className={styles.userName}>{item.user.name}</div>
            <div className={styles.userEmail}>{item.user.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Document Type',
      accessor: 'document_type',
      cell: (item) => item.document_type.toUpperCase().replace('_', ' '),
    },
    {
      header: 'Submitted At',
      accessor: 'submitted_at',
      cell: (item) => new Date(item.submitted_at).toLocaleDateString(),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (item) => (
        <div className={styles.actionsCell}>
          <button onClick={() => router.push(`/admin/verifications/${item.id}`)} className={styles.actionButton} title="View Details"><FiEye size={16} /></button>
          {filter === 'pending' && item.status === 'pending' && (
            <>
              <button onClick={() => handleAction(item.id, 'approve')} className={`${styles.actionButton} ${styles.approveButton}`} disabled={mutation.isPending}><FiCheck size={16} /></button>
              <button onClick={() => handleAction(item.id, 'reject')} className={`${styles.actionButton} ${styles.rejectButton}`} disabled={mutation.isPending}><FiX size={16} /></button>
            </>
          )}
        </div>
      ),
    },
  ], [mutation.isPending, filter, handleAction, router]);

  const tabItems: { label: string; value: FilterStatus }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'All', value: 'all' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Verification Management</h1>
          <p className={styles.subtitle}>Manage and review user identity verifications.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.filterTabs}>
        {tabItems.map(tab => (
          <button
            key={tab.value}
            className={`${styles.tabButton} ${filter === tab.value ? styles.activeTab : ''}`}
            onClick={() => { setFilter(tab.value); setPage(1); }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {isLoading && <div className={styles.centered}><FiLoader className={styles.loader} /></div>}
        {isError && <div className={styles.centered}>Error fetching data.</div>}
        {!isLoading && !isError && <Table columns={columns} data={submissions} />}
      </div>

      {/* Pagination Controls */}
      {pagination && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            disabled={pagination.current_page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            <FiChevronLeft /> Prev
          </button>
          <span className={styles.pageInfo}>
            Page {pagination.current_page} of {pagination.last_page} ({pagination.total} records)
          </span>
          <button
            className={styles.pageButton}
            disabled={pagination.current_page === pagination.last_page}
            onClick={() => setPage((p) => Math.min(p + 1, pagination.last_page))}
          >
            Next <FiChevronRight />
          </button>
        </div>
      )}

      {/* Modal */}
      {/* {selectedSubmission && (
        <div className={styles.modalOverlay} onClick={() => setSelectedSubmission(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Verification Details</h2>
            <p><strong>User:</strong> {selectedSubmission.user.name} ({selectedSubmission.user.email})</p>
            <p><strong>Document Type:</strong> {selectedSubmission.document_type.toUpperCase()}</p>
            {selectedSubmission.meta?.nin && <p><strong>NIN:</strong> {selectedSubmission.meta.nin}</p>}
            {selectedSubmission.meta?.bvn && <p><strong>BVN:</strong> {selectedSubmission.meta.bvn}</p>}
            {selectedSubmission.meta?.dob && <p><strong>Date of Birth:</strong> {selectedSubmission.meta.dob}</p>}
            <div className={styles.imagePreview}>
              <a href={selectedSubmission.document_url} target="_blank" rel="noopener noreferrer">
                <img src={selectedSubmission.document_url} alt={`${selectedSubmission.document_type} document`} />
              </a>
            </div>
            <button onClick={() => setSelectedSubmission(null)} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )} */}
    </div>
  );
}
