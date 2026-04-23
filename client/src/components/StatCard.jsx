export default function StatCard({ icon, title, value, note, noteClass = '' }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
        <span className={`stat-note ${noteClass}`}>{note}</span>
      </div>
    </div>
  );
}