import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Reports() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar title="Reports" subtitle="View generated reports" />
        <div className="page-card">Reports page</div>
      </main>
    </div>
  );
}