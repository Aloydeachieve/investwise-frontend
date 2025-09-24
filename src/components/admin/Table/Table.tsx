"use client";

import React from 'react';
import styles from './Table.module.css';

export interface ColumnDef<T> {
  header: string;
  accessor: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

export default function Table<T extends { id: string | number }>({ columns, data }: TableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No data available to display.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            {columns.map((col) => (
              <th key={col.header} className={styles.tableHeadCell}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.map((item) => (
            <tr key={item.id} className={styles.tableRow}>
              {columns.map((col) => (
                <td key={`${item.id}-${col.header}`} className={styles.tableCell}>
                  {col.cell ? col.cell(item) : String(item[col.accessor] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}