import { useEffect, useMemo, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../services/firebase';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import DeviceStatusCard from '../components/DeviceStatusCard';
import ActivityTable from '../components/ActivityTable';

import { FiCpu, FiUsers, FiBarChart2, FiHeart } from 'react-icons/fi';

export default function Dashboard() {
  const [devices, setDevices] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    const devicesRef = ref(db, 'amuma/devices');
    const usersRef = ref(db, 'amuma/users');

    const unsubDevices = onValue(devicesRef, (snapshot) => {
      setDevices(snapshot.val() || {});
    });

    const unsubUsers = onValue(usersRef, (snapshot) => {
      setUsers(snapshot.val() || {});
    });

    return () => {
      unsubDevices();
      unsubUsers();
    };
  }, []);

  const deviceList = useMemo(() => {
    return Object.entries(devices).map(([id, device]) => ({
      id,
      ...device,
      currentReadings: device.currentReadings || {},
    }));
  }, [devices]);

  const userList = useMemo(() => {
    return Object.entries(users).map(([id, user]) => ({
      id,
      ...user,
    }));
  }, [users]);

  const totalDevices = deviceList.length;
  const totalUsers = userList.length;

  const onlineDevices = deviceList.filter((device) => {
    const timestamp = device.currentReadings?.timestamp;
    if (!timestamp) return false;

    const lastTime = new Date(timestamp).getTime();

    if (Number.isNaN(lastTime)) return false;

    // eslint-disable-next-line react-hooks/purity
    return Date.now() - lastTime < 5 * 60 * 1000;
  }).length;

  const activeSessions = userList.filter((user) => user.assignedDevice).length;

  const totalDataPoints = deviceList.reduce((total, device) => {
    const readings = device.currentReadings || {};
    let count = 0;

    if (readings.heartRate !== undefined) count++;
    if (readings.respiratoryRate !== undefined) count++;
    if (readings.lungSound !== undefined) count++;

    if (readings.ecgSamples !== undefined) {
      count += Array.isArray(readings.ecgSamples)
        ? readings.ecgSamples.length
        : Object.keys(readings.ecgSamples || {}).length;
    }

    return total + count;
  }, 0);

  const getUsersPerDevice = (deviceId) => {
    return userList.filter((user) => user.assignedDevice === deviceId).length;
  };

  const formatDeviceName = (deviceId) => {
    return deviceId
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return 'No data';

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;

    // eslint-disable-next-line react-hooks/purity
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return 'Just now';
    if (diffMin === 1) return '1 min ago';
    if (diffMin < 60) return `${diffMin} min ago`;

    const diffHr = Math.floor(diffMin / 60);

    if (diffHr === 1) return '1 hr ago';
    if (diffHr < 24) return `${diffHr} hrs ago`;

    return date.toLocaleString();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar
          title="Dashboard"
          subtitle="Overview of Amuma devices and users"
        />

        <section className="stats-grid">
          <StatCard
            icon={<FiHeart />}
            title="Total Devices"
            value={totalDevices}
            note={`● ${onlineDevices} device${onlineDevices !== 1 ? 's' : ''} online`}
            noteClass="green-text"
          />

          <StatCard
            icon={<FiUsers />}
            title="Total Users"
            value={totalUsers}
            note="Registered users"
            noteClass="pink-text"
          />

          <StatCard
            icon={<FiBarChart2 />}
            title="Total Data Points"
            value={totalDataPoints}
            note="Current Firebase readings"
            noteClass="pink-text"
          />

          <StatCard
            icon={<FiCpu />}
            title="Active Sessions"
            value={activeSessions}
            note="● Users with assigned device"
            noteClass="green-text"
          />
        </section>

        <section className="dashboard-middle">
          <div className="panel-card">
            <div className="panel-header">
              <h3>Device Status</h3>
            </div>

            <div className="device-status-list">
              {deviceList.length === 0 ? (
                <p>No devices found.</p>
              ) : (
                deviceList.map((device, index) => (
                  <DeviceStatusCard
                    key={device.id}
                    name={formatDeviceName(device.id)}
                    users={getUsersPerDevice(device.id)}
                    updated={formatLastUpdated(device.currentReadings?.timestamp)}
                    heartRate={device.currentReadings?.heartRate}
                    respiratoryRate={device.currentReadings?.respiratoryRate}
                    lungSound={device.currentReadings?.lungSound}
                    lineClass={index % 2 === 0 ? 'pink-line' : 'green-line'}
                  />
                ))
              )}
            </div>

            <div className="panel-footer-link">View all devices →</div>
          </div>

          <ActivityTable />
        </section>
      </main>
    </div>
  );
}