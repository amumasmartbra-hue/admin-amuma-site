import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Alerts() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar title="Alerts" subtitle="System alerts and warnings" />
        <div className="page-card">Alerts page</div>
      </main>
    </div>
  );
}