export default function DeviceStatusCard({ name, users, updated, lineClass = 'pink-line' }) {
  return (
    <div className="device-status-item">
      <div className="device-heart-shape">♥</div>

      <div className="device-status-info">
        <div className="device-status-head">
          <h4>{name}</h4>
          <span className="device-online-badge">Online</span>
        </div>

        <div className="device-status-meta">
          <div>
            <span>Users</span>
            <strong>{users}</strong>
          </div>
          <div>
            <span>Last Updated</span>
            <strong>{updated}</strong>
          </div>
        </div>
      </div>

      <div className={`mini-line-chart ${lineClass}`} />
    </div>
  );
}