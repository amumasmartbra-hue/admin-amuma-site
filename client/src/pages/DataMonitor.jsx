import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function DataMonitor() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar title="Data Monitor" subtitle="Live data from the device" />
        <div className="page-card">Data Monitor page</div>
      </main>
    </div>
  );
}