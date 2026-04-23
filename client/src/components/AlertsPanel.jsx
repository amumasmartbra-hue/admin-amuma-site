export default function AlertsPanel() {
  const alerts = [
    {
      title: 'High temperature detected',
      subtitle: 'Device 1 • User: User_0321',
      time: '5 min ago',
      color: 'pink',
    },
    {
      title: 'Device 2 battery low',
      subtitle: 'Device 2 • User: User_0876',
      time: '15 min ago',
      color: 'orange',
    },
    {
      title: 'New user registered',
      subtitle: 'User: User_1345',
      time: '1 hr ago',
      color: 'blue',
    },
  ];

  return (
    <div className="panel-card">
      <div className="panel-header">
        <h3>Recent Alerts</h3>
        <button>View all</button>
      </div>

      <div className="alerts-list">
        {alerts.map((item, index) => (
          <div className="alert-item" key={index}>
            <div className={`alert-icon ${item.color}`}>!</div>

            <div className="alert-info">
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
            </div>

            <div className="alert-time">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}