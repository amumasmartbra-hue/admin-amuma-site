import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Settings() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar title="Settings" subtitle="Update system preferences" />
        <div className="page-card">Settings page</div>
      </main>
    </div>
  );
}