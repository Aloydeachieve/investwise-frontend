"use client";

import styles from "./AccountActivity.module.css";

const activityLogs = [
  { id: 1, ip: "192.168.1.1", location: "New York, USA", device: "Chrome on Windows", timestamp: "2024-08-25 10:30 AM" },
  { id: 2, ip: "10.0.0.5", location: "London, UK", device: "Safari on macOS", timestamp: "2024-08-25 09:15 AM" },
  { id: 3, ip: "172.16.0.10", location: "Tokyo, Japan", device: "Firefox on Linux", timestamp: "2024-08-24 11:00 PM" },
  { id: 4, ip: "192.168.1.2", location: "New York, USA", device: "Chrome on Windows", timestamp: "2024-08-24 08:00 AM" },
];

export default function AccountActivity() {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Account Activity</h3>
      <p className={styles.subtitle}>Recent login activity for your account.</p>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Location</th>
              <th>Device</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {activityLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.ip}</td>
                <td>{log.location}</td>
                <td>{log.device}</td>
                <td>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
