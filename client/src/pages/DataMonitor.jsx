import { useEffect, useMemo, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../services/firebase';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

import {
  FiHeart,
  FiWifi,
  FiMoreVertical,
  FiBatteryCharging,
} from 'react-icons/fi';

function ECGDiagram({ samples = [], heartRate }) {
  const values = Array.isArray(samples)
    ? samples
    : Object.values(samples || {});

  const safeValues =
    values.length > 0
      ? values.map(Number)
      : [520, 540, 610, 780, 850, 820, 560, 500, 530, 545, 560, 760, 870, 840, 570, 510];

  const width = 900;
  const height = 160;
  const min = Math.min(...safeValues);
  const max = Math.max(...safeValues);
  const range = max - min || 1;

  const points = safeValues
    .map((value, index) => {
      const x = (index / (safeValues.length - 1 || 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="ecg-monitor-card">
      <div className="ecg-monitor-header">
        <div>
          <h3>Electrocardiogram (ECG)</h3>
          <p>Real-time heart activity</p>
        </div>

        <span className="ecg-live-badge">Live reading • Connected</span>
      </div>

      <div className="ecg-chart-area">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke="#ef8a9a"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="ecg-footer">
        <strong>{heartRate ?? '--'} <span>BPM</span></strong>
        <span className="ecg-normal-badge">Normal ›</span>
      </div>
    </div>
  );
}

export default function DataMonitor() {
  const [devices, setDevices] = useState({});

  useEffect(() => {
    const devicesRef = ref(db, 'amuma/devices');

    const unsubscribe = onValue(devicesRef, (snapshot) => {
      setDevices(snapshot.val() || {});
    });

    return () => unsubscribe();
  }, []);

  const deviceList = useMemo(() => {
    return Object.entries(devices).map(([id, device], index) => ({
      id,
      displayName: `Device ${index + 1}`,
      deviceCode: id === 'device_1' ? 'AMU-DEV-001' : 'AMU-DEV-002',
      color: index % 2 === 0 ? 'pink' : 'green',
      readings: device.currentReadings || {},
    }));
  }, [devices]);

  const formatLastSync = (timestamp) => {
    if (!timestamp) return 'No data';

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;

    // eslint-disable-next-line react-hooks/purity
    const diffMin = Math.floor((Date.now() - date.getTime()) / 60000);

    if (diffMin < 1) return 'Just now';
    if (diffMin === 1) return '1 min ago';
    if (diffMin < 60) return `${diffMin} min ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr === 1) return '1 hr ago';
    return `${diffHr} hrs ago`;
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar title="Data Monitor" subtitle="Live data from the devices" />

        <section className="monitor-grid">
          {deviceList.map((device) => (
            <div className="monitor-card" key={device.id}>
              <div className="monitor-header">
                <div className={`device-image ${device.color}`}>
                  <span>♡</span>
                  <small>amuma</small>
                </div>

                <div className="monitor-title">
                  <div className="monitor-title-row">
                    <h3>{device.displayName}</h3>
                    <span className="device-online-badge">Online</span>
                  </div>

                  <div className="monitor-info-row">
                    <div>
                      <span>Device ID</span>
                      <strong>{device.deviceCode}</strong>
                    </div>

                    <div>
                      <span>Last Sync</span>
                      <strong className="sync-dot">
                        {formatLastSync(device.readings.timestamp)}
                      </strong>
                    </div>

                    <div>
                      <span>Battery</span>
                      <strong className="battery-text">
                        <FiBatteryCharging /> {device.id === 'device_1' ? '78%' : '85%'}
                      </strong>
                    </div>
                  </div>
                </div>

                <button className="monitor-menu-btn">
                  <FiMoreVertical />
                </button>
              </div>

              <div className="sensor-grid">
                <div className="sensor-card heart">
                  <div className="sensor-icon">
                    <FiHeart />
                  </div>
                  <span>Heart Rate</span>
                  <h2>{device.readings.heartRate ?? '--'} <small>BPM</small></h2>
                  <p>Normal</p>
                </div>

                <div className="sensor-card lungs">
                  <div className="sensor-icon">🫁</div>
                  <span>Lungs</span>
                  <h2>{device.readings.lungSound ?? '--'}</h2>
                  <p>Normal</p>
                </div>

                <div className="sensor-card respiration">
                  <div className="sensor-icon">🫁</div>
                  <span>Respiration</span>
                  <h2>{device.readings.respiratoryRate ?? '--'} <small>BrPM</small></h2>
                  <p>Monitor</p>
                </div>
              </div>

              <ECGDiagram
                samples={device.readings.ecgSamples}
                heartRate={device.readings.heartRate}
              />

              {/* <div className="device-detail-row">
                <div>
                  <span>Firmware</span>
                  <strong>v1.2.4</strong>
                </div>

                <div>
                  <span>Connection</span>
                  <strong>
                    <FiWifi /> Strong
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong className="normal-status">Normal</strong>
                </div>

                <div>
                  <span>Uptime</span>
                  <strong>{device.id === 'device_1' ? '2d 14h' : '3d 2h'}</strong>
                </div>
              </div> */}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}