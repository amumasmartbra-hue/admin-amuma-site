import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiCpu,
  FiUsers,
  FiActivity,
  FiRotateCcw,
  FiBell,
  FiFileText,
  FiSettings,
  FiClipboard,
  FiLogOut,
} from 'react-icons/fi';

export default function Sidebar() {
  const navClass = ({ isActive }) =>
    isActive ? 'sidebar-link active' : 'sidebar-link';

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-heart">♥</div>
        <div>
          <h1>amuma</h1>
          <span>ADMIN</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={navClass}>
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/devices" className={navClass}>
          <FiCpu />
          <span>Devices</span>
        </NavLink>

        <NavLink to="/users" className={navClass}>
          <FiUsers />
          <span>Users</span>
        </NavLink>

        <NavLink to="/data-monitor" className={navClass}>
          <FiActivity />
          <span>Data Monitor</span>
        </NavLink>

        <NavLink to="/history" className={navClass}>
          <FiRotateCcw />
          <span>User History</span>
        </NavLink>

        <NavLink to="/alerts" className={navClass}>
          <FiBell />
          <span>Alerts</span>
        </NavLink>

        <NavLink to="/reports" className={navClass}>
          <FiFileText />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className={navClass}>
          <FiSettings />
          <span>Settings</span>
        </NavLink>

        <NavLink to="/system-logs" className={navClass}>
          <FiClipboard />
          <span>System Logs</span>
        </NavLink>
      </nav>

      <button className="logout-outline-btn">
        <FiLogOut />
        <span>Logout</span>
      </button>
    </aside>
  );
}