export default function ActivityTable() {
  const rows = [
    ['User_0321', 'Device 1', 'Session Started', '5 min ago', 'green'],
    ['User_0876', 'Device 2', 'Data Sync', '15 min ago', 'blue'],
    ['User_1142', 'Device 1', 'Session Ended', '30 min ago', 'gray'],
    ['User_1298', 'Device 2', 'Data Sync', '45 min ago', 'blue'],
    ['User_1345', 'Device 1', 'Session Started', '1 hr ago', 'green'],
  ];

  return (
    <div className="panel-card">
      <div className="panel-header">
        <h3>Recent User Activity</h3>
        <button>View all</button>
      </div>

      <div className="table-wrap">
        <table className="activity-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Device</th>
              <th>Activity</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([user, device, activity, time, color], index) => (
              <tr key={index}>
                <td>{user}</td>
                <td>{device}</td>
                <td>
                  <span className={`activity-badge ${color}`}>{activity}</span>
                </td>
                <td>{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}