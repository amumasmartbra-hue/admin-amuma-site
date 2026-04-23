import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Devices() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar title="Devices" subtitle="Manage all connected Amuma devices" />
        <div className="page-card">Devices page</div>
      </main>
    </div>
  );
}