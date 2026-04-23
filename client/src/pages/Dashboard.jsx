import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import DeviceStatusCard from '../components/DeviceStatusCard';
import AlertsPanel from '../components/AlertsPanel';
import ActivityTable from '../components/ActivityTable';
import ChartCard from '../components/ChartCard';
import { FiCpu, FiUsers, FiBarChart2, FiHeart } from 'react-icons/fi';

export default function Dashboard() {
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
            value="2"
            note="● All devices online"
            noteClass="green-text"
          />
          <StatCard
            icon={<FiUsers />}
            title="Total Users"
            value="128"
            note="↑ +12 this week"
            noteClass="pink-text"
          />
          <StatCard
            icon={<FiBarChart2 />}
            title="Total Data Points"
            value="24,568"
            note="↑ +8.5% vs last week"
            noteClass="pink-text"
          />
          <StatCard
            icon={<FiCpu />}
            title="Active Sessions"
            value="32"
            note="● Users currently active"
            noteClass="green-text"
          />
        </section>

        <section className="dashboard-middle">
          <div className="panel-card">
            <div className="panel-header">
              <h3>Device Status</h3>
            </div>

            <div className="device-status-list">
              <DeviceStatusCard name="Device 1" users="75" updated="2 min ago" lineClass="pink-line" />
              <DeviceStatusCard name="Device 2" users="53" updated="1 min ago" lineClass="green-line" />
            </div>

            <div className="panel-footer-link">View all devices →</div>
          </div>

          <ChartCard />
        </section>

        <section className="dashboard-bottom">
          <AlertsPanel />
          <ActivityTable />
        </section>
      </main>
    </div>
  );
}