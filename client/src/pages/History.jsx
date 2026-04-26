import { useEffect, useMemo, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../services/firebase';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function History() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const usersRef = ref(db, 'amuma/users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      setUsers(snapshot.val() || {});
    });

    return () => unsubscribe();
  }, []);

  const historyList = useMemo(() => {
    const records = [];

    Object.entries(users).forEach(([userId, user]) => {
      const history = user.history || {};

      Object.entries(history).forEach(([historyId, item]) => {
        records.push({
          id: historyId,
          userId,
          userName: user.fullName || 'No Name',
          email: user.email || 'No Email',
          deviceId: item.deviceId || user.assignedDevice || 'No Device',
          heartRate: item.heartRate ?? '--',
          respiratoryRate: item.respiratoryRate ?? '--',
          lungSound: item.lungSound ?? '--',
          timestamp: item.timestamp || item.savedAt || '',
          savedAt: item.savedAt || item.timestamp || '',
        });
      });
    });

    return records.sort(
      (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    );
  }, [users]);

  const formatDevice = (device) => {
    if (!device || device === 'No Device') return 'No Device';

    return device
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDateTime = (dateText) => {
    if (!dateText) return 'No date';

    const date = new Date(dateText);
    if (Number.isNaN(date.getTime())) return dateText;

    return date.toLocaleString();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar title="User History" subtitle="Review user history and records" />

        <div className="panel-card">
          <div className="panel-header">
            <h3>History Records</h3>
            <span className="history-count">
              {historyList.length} record{historyList.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Device</th>
                  <th>Heart Rate</th>
                  <th>Respiration</th>
                  <th>Lung Sound</th>
                  <th>Timestamp</th>
                </tr>
              </thead>

              <tbody>
                {historyList.length === 0 ? (
                  <tr>
                    <td colSpan="7">No history records found.</td>
                  </tr>
                ) : (
                  historyList.map((record) => (
                    <tr key={`${record.userId}-${record.id}`}>
                      <td>{record.userName}</td>
                      <td>{record.email}</td>
                      <td>
                        <span className="device-pill">
                          {formatDevice(record.deviceId)}
                        </span>
                      </td>
                      <td>{record.heartRate} BPM</td>
                      <td>{record.respiratoryRate} BrPM</td>
                      <td>{record.lungSound}</td>
                      <td>{formatDateTime(record.timestamp)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}