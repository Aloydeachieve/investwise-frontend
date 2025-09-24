"use client";
import { useState } from "react";
import styles from "./ActivityLogs.module.css";

interface Activity {
  id: number;
  browser: string;
  ip: string;
  time: string;
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<Activity[]>([
    { id: 1, browser: "Chrome", ip: "192.168.1.1", time: "2025-08-25 14:30" },
    { id: 2, browser: "Firefox", ip: "192.168.1.2", time: "2025-08-25 15:00" },
  ]);

  const clearLog = (id: number) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const clearAll = () => setLogs([]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Activity Logs</h2>
        <button className={styles.clearAll} onClick={clearAll}>Clear All</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Browser</th>
            <th>IP Address</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.browser}</td>
              <td>{log.ip}</td>
              <td>{log.time}</td>
              <td>
                <button onClick={() => clearLog(log.id)} className={styles.deleteBtn}>
                  x
                </button>
              </td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-gray-500">No activity logs.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
