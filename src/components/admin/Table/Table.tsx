"use client";

import React, { useState } from "react";
import styles from "./Table.module.css";

export interface ColumnDef<T> {
  header: string;
  accessor: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data?: T[] | null | unknown; // allow for undefined or bad API responses
  sortable?: boolean;
}

export default function Table<T extends { id: string | number }>({
  columns,
  data,
  sortable = false,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  // ✅ Always coerce data into an array safely
  const safeData: T[] = React.useMemo(() => Array.isArray(data) ? data : [], [data]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return safeData;
    return [...safeData].sort((a: T, b: T) => {
      const key = sortConfig.key;
      const aValue = a[key as keyof T];
      const bValue = b[key as keyof T];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [safeData, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // ✅ Empty state check
  if (!safeData.length) {
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
              <th
                key={col.header}
                className={`${styles.tableHeadCell} ${sortable ? styles.sortable : ""}`}
                onClick={() => sortable && requestSort(col.accessor.toString())}
              >
                {col.header}
                {sortable && sortConfig?.key === col.accessor && (
                  <span className={styles.sortIcon}>
                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {sortedData.map((item) => (
            <tr key={item.id} className={styles.tableRow}>
              {columns.map((col) => (
                <td key={`${item.id}-${col.header}`} className={styles.tableCell}>
                  {col.cell ? col.cell(item) : String(item[col.accessor] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
