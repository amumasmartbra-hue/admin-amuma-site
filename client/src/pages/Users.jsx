import { useEffect, useMemo, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../services/firebase';
import * as XLSX from 'xlsx';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Users() {
  const [users, setUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const usersRef = ref(db, 'amuma/users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      setUsers(snapshot.val() || {});
    });

    return () => unsubscribe();
  }, []);

  const userList = useMemo(() => {
    return Object.entries(users).map(([id, user]) => ({
      id,
      name: user.fullName || 'No Name',
      email: user.email || 'No Email',
      device: user.assignedDevice || 'No Device',
      status: user.status || 'inactive',
      createdAt: user.createdAt || '',
      history: user.history || {},
    }));
  }, [users]);

  const formatDevice = (device) => {
    if (!device || device === 'No Device') return 'No Device';

    return device
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (dateText) => {
    if (!dateText) return 'No date';

    const date = new Date(dateText);
    if (Number.isNaN(date.getTime())) return dateText;

    return date.toLocaleDateString();
  };

  const getEcgText = (ecgSamples) => {
    if (!ecgSamples) return '--';

    if (Array.isArray(ecgSamples)) {
      return ecgSamples.length > 0 ? ecgSamples.join(', ') : '--';
    }

    if (typeof ecgSamples === 'object') {
      const values = Object.values(ecgSamples);
      return values.length > 0 ? values.join(', ') : '--';
    }

    return String(ecgSamples);
  };

  const getUserHistory = (user) => {
    if (!user?.history) return [];

    return Object.entries(user.history)
      .map(([historyId, item]) => ({
        id: historyId,
        deviceId: item.deviceId || user.device || 'No Device',
        heartRate: item.heartRate ?? '--',
        respiratoryRate: item.respiratoryRate ?? '--',
        lungSound: item.lungSound ?? '--',
        ecgSamples: item.ecgSamples || [],
        timestamp: item.timestamp || '',
        savedAt: item.savedAt || '',
      }))
      .sort(
        (a, b) =>
          new Date(b.savedAt || b.timestamp).getTime() -
          new Date(a.savedAt || a.timestamp).getTime()
      );
  };

  const exportUserHistory = (user) => {
    const historyData = getUserHistory(user);

    if (historyData.length === 0) {
      alert('No history data to export.');
      return;
    }

    const excelData = historyData.map((item) => ({
      Name: user.name,
      Email: user.email,
      Device: formatDevice(item.deviceId),
      'Heart Rate': item.heartRate,
      'Respiratory Rate': item.respiratoryRate,
      'Lung Sound': item.lungSound,
      'ECG Data': getEcgText(item.ecgSamples),
      Timestamp: item.timestamp,
      'Saved At': item.savedAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'User History');
    XLSX.writeFile(workbook, `${user.name}_history.xlsx`);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar title="Users" subtitle="Manage users" />

        <div className="panel-card">
          <div className="panel-header">
            <h3>Users List</h3>
          </div>

          <div className="table-wrap">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Device</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {userList.length === 0 ? (
                  <tr>
                    <td colSpan="6">No users found.</td>
                  </tr>
                ) : (
                  userList.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{formatDevice(user.device)}</td>

                      <td>
                        <span
                          className={`status-badge ${
                            user.status === 'active' ? 'green' : 'gray'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td>{formatDate(user.createdAt)}</td>

                      <td>
                        <div className="user-action-buttons">
                          <button
                            type="button"
                            className="view-history-btn"
                            onClick={() => setSelectedUser(user)}
                          >
                            View History
                          </button>

                          <button
                            type="button"
                            className="export-excel-btn"
                            onClick={() => exportUserHistory(user)}
                          >
                            Export Excel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUser && (
          <div className="history-modal-overlay">
            <div className="history-modal">
              <div className="history-modal-header">
                <div>
                  <h2>{selectedUser.name} History</h2>
                  <p>{selectedUser.email}</p>
                </div>

                <button
                  type="button"
                  className="close-modal-btn"
                  onClick={() => setSelectedUser(null)}
                >
                  ×
                </button>
              </div>

              <div className="history-modal-actions">
                <button
                  type="button"
                  className="export-excel-btn"
                  onClick={() => exportUserHistory(selectedUser)}
                >
                  Export Excel
                </button>
              </div>

              <div className="table-wrap">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Device</th>
                      <th>Heart Rate</th>
                      <th>Respiration</th>
                      <th>Lung Sound</th>
                      <th>ECG Data</th>
                      <th>Timestamp</th>
                      <th>Saved At</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getUserHistory(selectedUser).length === 0 ? (
                      <tr>
                        <td colSpan="7">No history found.</td>
                      </tr>
                    ) : (
                      getUserHistory(selectedUser).map((item) => (
                        <tr key={item.id}>
                          <td>{formatDevice(item.deviceId)}</td>
                          <td>{item.heartRate} BPM</td>
                          <td>{item.respiratoryRate} BrPM</td>
                          <td>{item.lungSound}</td>
                          <td className="ecg-data-cell">
                            {getEcgText(item.ecgSamples)}
                          </td>
                          <td>{item.timestamp || 'No date'}</td>
                          <td>{item.savedAt || 'No date'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}