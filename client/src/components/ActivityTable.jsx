import { useEffect, useMemo, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../services/firebase';

export default function ActivityTable() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const usersRef = ref(db, 'amuma/users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      setUsers(snapshot.val() || {});
    });

    return () => unsubscribe();
  }, []);

  const userActivity = useMemo(() => {
    return Object.entries(users)
      .map(([id, user]) => ({
        id,
        name: user.fullName || user.email || id,
        device: user.assignedDevice || 'No device',
        status: user.status || 'inactive',
        createdAt: user.createdAt || '',
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [users]);

  const formatDeviceName = (deviceId) => {
    if (!deviceId || deviceId === 'No device') return 'No device';

    return deviceId
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatTime = (dateText) => {
    if (!dateText) return 'No date';

    const date = new Date(dateText);
    if (Number.isNaN(date.getTime())) return dateText;

    return date.toLocaleString();
  };

  const getActivityLabel = (status) => {
    if (status === 'active') return 'Active';
    if (status === 'inactive') return 'Inactive';
    return status;
  };

  const getBadgeClass = (status) => {
    if (status === 'active') return 'green';
    if (status === 'inactive') return 'gray';
    return 'blue';
  };

  return (
    <div className="panel-card">
      <div className="panel-header">
        <h3>Recent User Activity</h3>
        <button>View all</button>
      </div>

      <div className="table-wrap">
        <table className="activity-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Device</th>
              <th>Activity</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {userActivity.length === 0 ? (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            ) : (
              userActivity.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{formatDeviceName(user.device)}</td>
                  <td>
                    <span className={`activity-badge ${getBadgeClass(user.status)}`}>
                      {getActivityLabel(user.status)}
                    </span>
                  </td>
                  <td>{formatTime(user.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}