import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Users() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar title="Users" subtitle="Manage users and sessions" />
        <div className="page-card">Users page</div>
      </main>
    </div>
  );
}