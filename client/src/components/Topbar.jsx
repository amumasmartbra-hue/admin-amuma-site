import { FiBell, FiChevronDown } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

export default function Topbar({ title, subtitle }) {
  return (
    <header className="topbar">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-right">
        <button className="notif-btn">
          <FiBell />
          <span className="notif-badge">3</span>
        </button>

        <div className="profile-box">
          <div className="profile-avatar">
            <FaUserCircle />
          </div>
          <div className="profile-text">
            <strong>Admin</strong>
            <span>Super Admin</span>
          </div>
          <FiChevronDown className="profile-arrow" />
        </div>
      </div>
    </header>
  );
}