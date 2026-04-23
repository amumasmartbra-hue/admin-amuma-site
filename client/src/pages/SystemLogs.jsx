import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function SystemLogs() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar title="System Logs" subtitle="System activity and technical logs" />
        <div className="page-card">System Logs page</div>
      </main>
    </div>
  );
}