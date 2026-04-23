export default function ChartCard() {
  return (
    <div className="chart-card">
      <div className="panel-header">
        <h3>Data Overview (Last 7 Days)</h3>
        <button className="range-btn">Last 7 Days</button>
      </div>

      <div className="chart-legend">
        <span><i className="legend-dot pink"></i> Device 1</span>
        <span><i className="legend-dot green"></i> Device 2</span>
      </div>

      <div className="fake-chart">
        <div className="chart-line pink-path"></div>
        <div className="chart-line green-path"></div>
      </div>

      <div className="chart-dates">
        <span>May 9</span>
        <span>May 10</span>
        <span>May 11</span>
        <span>May 12</span>
        <span>May 13</span>
        <span>May 14</span>
        <span>May 15</span>
      </div>
    </div>
  );
}