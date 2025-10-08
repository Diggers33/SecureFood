'use client';
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function SimulationDashboard() {
  const [selectedScenario, setSelectedScenario] = useState('climate');
  const [intensity, setIntensity] = useState(50);
  const [showResults, setShowResults] = useState(false);

  const scenarios = [
    { id: 'climate', label: 'Climate Event', icon: '🌡️', description: 'Heatwave, drought, flooding' },
    { id: 'geopolitical', label: 'Geopolitical Crisis', icon: '⚠️', description: 'Conflict, sanctions, blockades' },
    { id: 'logistics', label: 'Logistics Failure', icon: '🚫', description: 'Route disruption, capacity issues' }
  ];

  const beforeAfterData = [
    { category: 'Production', before: 85, after: 62 },
    { category: 'Transport', before: 78, after: 45 },
    { category: 'Storage', before: 92, after: 88 },
    { category: 'Distribution', before: 81, after: 53 }
  ];

  const timelineData = [
    { day: 0, impact: 0 }, { day: 5, impact: 15 }, { day: 10, impact: 38 },
    { day: 15, impact: 65 }, { day: 20, impact: 82 }, { day: 25, impact: 75 }, { day: 30, impact: 45 }
  ];

  const regionalImpact = [
    { region: 'North', impact: 85 },
    { region: 'South', impact: 45 },
    { region: 'East', impact: 62 },
    { region: 'West', impact: 38 }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAFAF8',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Content below the global Header from app/layout.js */}
      <div style={{ display: 'flex' }}>
        {/* Left Panel - Scenario Selection */}
        <div style={{
          width: 400,
          backgroundColor: '#FFFFFF',
          borderRight: '2px solid #E0E0E0',
          padding: '40px 30px',
          overflowY: 'auto'
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1B5560', marginBottom: 12 }}>
            What-If Scenarios
          </h2>
          <p style={{ fontSize: 14, color: '#666', marginBottom: 32 }}>
            Analyze potential supply chain impacts under different conditions
          </p>

          <div style={{ marginBottom: 40 }}>
            <h3 style={{
              fontSize: 14, fontWeight: 600, color: '#999',
              textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16
            }}>
              Select Scenario
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {scenarios.map(s => (
                <div
                  key={s.id}
                  onClick={() => setSelectedScenario(s.id)}
                  style={{
                    padding: 20, borderRadius: 12,
                    border: selectedScenario === s.id ? '2px solid #1B5560' : '2px solid #E0E0E0',
                    backgroundColor: selectedScenario === s.id ? '#1B556008' : '#FFFFFF',
                    cursor: 'pointer', transition: 'all .2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 28 }}>{s.icon}</span>
                    <span style={{
                      fontSize: 16, fontWeight: 600,
                      color: selectedScenario === s.id ? '#1B5560' : '#333'
                    }}>
                      {s.label}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: '#666', margin: 0, paddingLeft: 40 }}>
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Intensity Slider */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{
              fontSize: 14, fontWeight: 600, color: '#999',
              textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16
            }}>
              Event Intensity
            </h3>
            <div style={{ padding: 24, backgroundColor: '#F8F8F8', borderRadius: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: '#666' }}>Low</span>
                <span style={{
                  fontSize: 18, fontWeight: 'bold',
                  color: intensity > 75 ? '#D9534F' : intensity > 50 ? '#F0AD4E' : '#5CB85C'
                }}>
                  {intensity}%
                </span>
                <span style={{ fontSize: 13, color: '#666' }}>Extreme</span>
              </div>
              <input
                type="range" min="0" max="100" value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                style={{
                  width: '100%', height: 8, borderRadius: 4, outline: 'none',
                  background: 'linear-gradient(to right, #5CB85C 0%, #F0AD4E 50%, #D9534F 100%)'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, color: '#999' }}>
                <span>Minimal</span><span>Moderate</span><span>Severe</span><span>Critical</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={() => setShowResults(true)}
              style={{
                padding: 16, backgroundColor: '#1B5560', color: '#FFFFFF',
                border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer'
              }}
            >
              Run Simulation
            </button>
            <button
              style={{
                padding: 16, backgroundColor: 'transparent', color: '#1B5560',
                border: '2px solid #1B5560', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer'
              }}
            >
              Save Scenario
            </button>
            <button
              style={{
                padding: 16, backgroundColor: 'transparent', color: '#666',
                border: '2px solid #E0E0E0', borderRadius: 8, fontSize: 15, fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              📄 Download Report
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: 40, overflowY: 'auto' }}>
          {!showResults ? (
            <div style={{
              height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', color: '#999'
            }}>
              <div style={{ fontSize: 72, marginBottom: 24 }}>📊</div>
              <h3 style={{ fontSize: 24, color: '#666', marginBottom: 12 }}>No Simulation Running</h3>
              <p style={{ fontSize: 16, color: '#999', textAlign: 'center', maxWidth: 400 }}>
                Select a scenario, adjust intensity, and click "Run Simulation" to see predicted impacts
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 32, fontWeight: 'bold', color: '#1B5560', marginBottom: 8 }}>
                  Simulation Results
                </h1>
                <p style={{ fontSize: 16, color: '#666' }}>
                  {scenarios.find(s => s.id === selectedScenario)?.label} • Intensity: {intensity}%
                </p>
              </div>

              {/* Results Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 24 }}>
                {/* Before vs After */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 28, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 20 }}>Before vs. After Impact</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={beforeAfterData}>
                      <XAxis dataKey="category" stroke="#999" style={{ fontSize: 12 }} />
                      <YAxis stroke="#999" style={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="before" fill="#5CB85C" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="after" fill="#D9534F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ display: 'flex', gap: 24, marginTop: 16, justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 12, height: 12, backgroundColor: '#5CB85C', borderRadius: 2 }} />
                      <span style={{ fontSize: 13, color: '#666' }}>Before</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 12, height: 12, backgroundColor: '#D9534F', borderRadius: 2 }} />
                      <span style={{ fontSize: 13, color: '#666' }}>After</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 28, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 20 }}>Impact Timeline (30 days)</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={timelineData}>
                      <XAxis dataKey="day" stroke="#999" style={{ fontSize: 12 }} />
                      <YAxis stroke="#999" style={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="impact" stroke="#D9534F" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <p style={{ fontSize: 13, color: '#666', textAlign: 'center', marginTop: 12 }}>
                    Peak impact at day 20 • Recovery begins day 25
                  </p>
                </div>

                {/* Regional Impact */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 28, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 20 }}>Regional Impact Distribution</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {regionalImpact.map((region, idx) => (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>{region.region}</span>
                          <span style={{ fontSize: 14, fontWeight: 600, color: region.impact > 70 ? '#D9534F' : region.impact > 50 ? '#F0AD4E' : '#5CB85C' }}>
                            {region.impact}% affected
                          </span>
                        </div>
                        <div style={{ height: 10, backgroundColor: '#F0F0F0', borderRadius: 5, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', width: `${region.impact}%`,
                            backgroundColor: region.impact > 70 ? '#D9534F' : region.impact > 50 ? '#F0AD4E' : '#5CB85C',
                            transition: 'width 1s ease'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 28, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 20 }}>Critical Impact Metrics</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {[
                      { label: 'Supply Reduction', value: '-38%', icon: '📉', color: '#D9534F' },
                      { label: 'Cost Increase', value: '+127%', icon: '💰', color: '#F0AD4E' },
                      { label: 'Delivery Delays', value: '+15 days', icon: '⏱️', color: '#F0AD4E' },
                      { label: 'Recovery Time', value: '30 days', icon: '🔄', color: '#5CB85C' }
                    ].map((m, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#F8F8F8', borderRadius: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 24 }}>{m.icon}</span>
                          <span style={{ fontSize: 14, color: '#666' }}>{m.label}</span>
                        </div>
                        <span style={{ fontSize: 20, fontWeight: 'bold', color: m.color }}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div style={{ backgroundColor: '#FFF9E6', border: '2px solid #F0AD4E', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <span style={{ fontSize: 32 }}>💡</span>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1B5560', marginBottom: 8 }}>Recommended Actions</h4>
                    <ul style={{ fontSize: 14, color: '#666', lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
                      <li>Increase buffer stock by 30% in least-affected regions</li>
                      <li>Establish alternative transport routes through Western corridor</li>
                      <li>Implement emergency procurement protocols within 48 hours</li>
                      <li>Activate backup supplier agreements in non-affected zones</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
