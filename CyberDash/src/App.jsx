import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Terminal, Activity, Wifi, Cpu, ShieldAlert, Zap } from 'lucide-react';
import './CyberDash.css';

const API_URL = 'http://localhost:8000/api/network/stats';

function App() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(API_URL);
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching network stats:", error);
      }
    };

    // Poll every 2 seconds
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !stats) {
    return (
      <div className="cyber-container flex-center">
        <div className="glitch-text" data-text="INITIALIZING UPLINK...">INITIALIZING UPLINK...</div>
      </div>
    );
  }

  const { current, history, peaks, system } = stats;

  return (
    <div className="cyber-container">
      <header className="cyber-header">
        <div className="header-title">
          <Terminal className="icon green-glow" />
          <h1>CYBER<span className="accent">DASH</span> // NETWORK_MONITOR</h1>
        </div>
        <div className="status-badge">
          <span className="dot pulse"></span>
          SECURE_CONNECTION_ACTIVE
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Top Cards */}
        <div className="cyber-card">
          <div className="card-header">
            <Activity className="icon" />
            <h3>PING_LATENCY</h3>
          </div>
          <div className="card-value">
            {current.ping_ms} <span className="unit">ms</span>
          </div>
          <div className="card-subtitle">
            {current.ping_ms > 100 ? 'STATUS: DEGRADED' : 'STATUS: OPTIMAL'}
          </div>
        </div>

        <div className="cyber-card">
          <div className="card-header">
            <Wifi className="icon" />
            <h3>CURRENT_DOWN</h3>
          </div>
          <div className="card-value">
            {current.download_mbps} <span className="unit">Mbps</span>
          </div>
          <div className="card-subtitle">PEAK: {peaks.download} Mbps</div>
        </div>

        <div className="cyber-card">
          <div className="card-header">
            <Zap className="icon" />
            <h3>CURRENT_UP</h3>
          </div>
          <div className="card-value">
            {current.upload_mbps} <span className="unit">Mbps</span>
          </div>
          <div className="card-subtitle">PEAK: {peaks.upload} Mbps</div>
        </div>

        <div className="cyber-card">
          <div className="card-header">
            <Cpu className="icon" />
            <h3>SYSTEM_LOAD</h3>
          </div>
          <div className="card-value">
            {system.cpu_percent}<span className="unit">%</span>
          </div>
          <div className="card-subtitle">RAM: {system.ram_percent}%</div>
        </div>

        {/* Charts Section */}
        <div className="cyber-card span-2">
          <div className="card-header">
            <h3>// BANDWIDTH_TRAFFIC_ANALYSIS</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff41" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00ff41" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008f11" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#008f11" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#113311" />
                <XAxis dataKey="time" stroke="#00ff41" />
                <YAxis stroke="#00ff41" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #00ff41', color: '#00ff41' }}
                  itemStyle={{ color: '#00ff41' }}
                />
                <Area type="monotone" dataKey="download_mbps" stroke="#00ff41" fillOpacity={1} fill="url(#colorDown)" name="Download (Mbps)" />
                <Area type="monotone" dataKey="upload_mbps" stroke="#008f11" fillOpacity={1} fill="url(#colorUp)" name="Upload (Mbps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="cyber-card span-2">
          <div className="card-header">
            <h3>// PING_LATENCY_TRACKER</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#113311" />
                <XAxis dataKey="time" stroke="#00ff41" />
                <YAxis stroke="#00ff41" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #00ff41', color: '#00ff41' }}
                  itemStyle={{ color: '#00ff41' }}
                />
                <Line type="monotone" dataKey="ping_ms" stroke="#00ff41" strokeWidth={2} dot={false} name="Ping (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Logs terminal */}
        <div className="cyber-card span-full terminal-card">
          <div className="card-header">
            <ShieldAlert className="icon" />
            <h3>SECURITY_LOGS</h3>
          </div>
          <div className="terminal-body">
            <p className="log-entry">[SYS] Network interface bound successfully.</p>
            <p className="log-entry">[SYS] Listening on localhost:8000</p>
            <p className="log-entry">[INFO] Intrusion detection: Disabled (Local Policy Restriction)</p>
            <p className="log-entry">[INFO] Port scanning: Disabled (Local Policy Restriction)</p>
            <p className="log-entry">[MONITOR] Traffic analysis stream established.</p>
            <p className="log-entry">[MONITOR] Ping latency tracker initialized at {current.time}</p>
            <p className="log-entry blink">_</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
