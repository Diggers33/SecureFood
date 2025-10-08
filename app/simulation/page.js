'use client';
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SimulationDashboard = () => {
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
    { day: 0, impact: 0 },
    { day: 5, impact: 15 },
    { day: 10, impact: 38 },
    { day: 15, impact: 65 },
    { day: 20, impact: 82 },
    { day: 25, impact: 75 },
    { day: 30, impact: 45 }
  ];

  const regionalImpact = [
    { region: 'North', impact: 85 },
    { region: 'South', impact: 45 },
    { region: 'East', impact: 62 },
    { region: 'West', impact: 38 }
  ];

  return (
    <div style={{ 
      width: '1920px', 
      height: '1080px', 
      backgroundColor: '#FAFAF8',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      <div style={{
        height: '70px',
        backgroundColor: '#1B5560',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '28px' }}>🌾</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFFFFF' }}>
              SecureFood
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '30px' }}>
            {['Dashboard', 'Monitoring', 'Simulations', 'Data Integration', 'Reports'].map((item, idx) => (
              <span key={item} style={{ 
                color: idx === 2 ? '#FFFFFF' : '#FFFFFF99', 
                fontSize: '14px',
                fontWeight: idx === 2 ? '600' : '500',
                cursor: 'pointer',
                borderBottom: idx === 2 ? '2px solid #C9A961' : 'none',
                paddingBottom: '4px'
              }}>
                {item}
              </span>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '8px 20px',
            borderRadius: '4px',
            color: '#1B5560',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            2023
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#C9A961',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}>
            👤
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100% - 70px)' }}>
        {/* Left Panel - Scenario Selection */}
        <div style={{
          width: '400px',
          backgroundColor: '#FFFFFF',
          borderRight: '2px solid #E0E0E0',
          padding: '40px 30px',
          overflowY: 'auto'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1B5560',
            marginBottom: '12px'
          }}>
            What-If Scenarios
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '32px'
          }}>
            Analyze potential supply chain impacts under different conditions
          </p>

          {/* Scenario Cards */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '16px'
            }}>
              Select Scenario
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {scenarios.map(scenario => (
                <div
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario.id)}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: selectedScenario === scenario.id ? '2px solid #1B5560' : '2px solid #E0E0E0',
                    backgroundColor: selectedScenario === scenario.id ? '#1B556008' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '28px' }}>{scenario.icon}</span>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: selectedScenario === scenario.id ? '#1B5560' : '#333'
                    }}>
                      {scenario.label}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '13px',
                    color: '#666',
                    margin: 0,
                    paddingLeft: '40px'
                  }}>
                    {scenario.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Intensity Slider */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '16px'
            }}>
              Event Intensity
            </h3>
            <div style={{
              padding: '24px',
              backgroundColor: '#F8F8F8',
              borderRadius: '12px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '13px', color: '#666' }}>Low</span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: intensity > 75 ? '#D9534F' : intensity > 50 ? '#F0AD4E' : '#5CB85C'
                }}>
                  {intensity}%
                </span>
                <span style={{ fontSize: '13px', color: '#666' }}>Extreme</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  outline: 'none',
                  background: `linear-gradient(to right, #5CB85C 0%, #F0AD4E 50%, #D9534F 100%)`
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '12px',
                fontSize: '11px',
                color: '#999'
              }}>
                <span>Minimal</span>
                <span>Moderate</span>
                <span>Severe</span>
                <span>Critical</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => setShowResults(true)}
              style={{
                padding: '16px',
                backgroundColor: '#1B5560',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Run Simulation
            </button>
            <button
              style={{
                padding: '16px',
                backgroundColor: 'transparent',
                color: '#1B5560',
                border: '2px solid #1B5560',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Save Scenario
            </button>
            <button
              style={{
                padding: '16px',
                backgroundColor: 'transparent',
                color: '#666',
                border: '2px solid #E0E0E0',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              📄 Download Report
            </button>
          </div>
        </div>

        {/* Main Content - Simulation Results */}
        <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
          {!showResults ? (
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999'
            }}>
              <div style={{ fontSize: '72px', marginBottom: '24px' }}>📊</div>
              <h3 style={{ fontSize: '24px', color: '#666', marginBottom: '12px' }}>
                No Simulation Running
              </h3>
              <p style={{ fontSize: '16px', color: '#999', textAlign: 'center', maxWidth: '400px' }}>
                Select a scenario, adjust intensity, and click "Run Simulation" to see predicted impacts
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '32px' }}>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#1B5560',
                  marginBottom: '8px'
                }}>
                  Simulation Results
                </h1>
                <p style={{ fontSize: '16px', color: '#666' }}>
                  {scenarios.find(s => s.id === selectedScenario)?.label} • Intensity: {intensity}%
                </p>
              </div>

              {/* Results Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
                marginBottom: '24px'
              }}>
                {/* Before vs After Comparison */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '28px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '20px'
                  }}>
                    Before vs. After Impact
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={beforeAfterData}>
                      <XAxis dataKey="category" stroke="#999" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#999" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Bar dataKey="before" fill="#5CB85C" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="after" fill="#D9534F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ display: 'flex', gap: '24px', marginTop: '16px', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#5CB85C', borderRadius: '2px' }} />
                      <span style={{ fontSize: '13px', color: '#666' }}>Before</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#D9534F', borderRadius: '2px' }} />
                      <span style={{ fontSize: '13px', color: '#666' }}>After</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Evolution */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '28px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '20px'
                  }}>
                    Impact Timeline (30 days)
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={timelineData}>
                      <XAxis dataKey="day" stroke="#999" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#999" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="impact" stroke="#D9534F" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <p style={{
                    fontSize: '13px',
                    color: '#666',
                    textAlign: 'center',
                    marginTop: '12px'
                  }}>
                    Peak impact at day 20 • Recovery begins day 25
                  </p>
                </div>

                {/* Regional Impact */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '28px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '20px'
                  }}>
                    Regional Impact Distribution
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {regionalImpact.map((region, idx) => (
                      <div key={idx}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '8px'
                        }}>
                          <span style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
                            {region.region}
                          </span>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: region.impact > 70 ? '#D9534F' : region.impact > 50 ? '#F0AD4E' : '#5CB85C'
                          }}>
                            {region.impact}% affected
                          </span>
                        </div>
                        <div style={{
                          height: '10px',
                          backgroundColor: '#F0F0F0',
                          borderRadius: '5px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${region.impact}%`,
                            backgroundColor: region.impact > 70 ? '#D9534F' : region.impact > 50 ? '#F0AD4E' : '#5CB85C',
                            transition: 'width 1s ease'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Summary */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '28px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '20px'
                  }}>
                    Critical Impact Metrics
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      { label: 'Supply Reduction', value: '-38%', icon: '📉', color: '#D9534F' },
                      { label: 'Cost Increase', value: '+127%', icon: '💰', color: '#F0AD4E' },
                      { label: 'Delivery Delays', value: '+15 days', icon: '⏱️', color: '#F0AD4E' },
                      { label: 'Recovery Time', value: '30 days', icon: '🔄', color: '#5CB85C' }
                    ].map((metric, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                        backgroundColor: '#F8F8F8',
                        borderRadius: '8px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '24px' }}>{metric.icon}</span>
                          <span style={{ fontSize: '14px', color: '#666' }}>{metric.label}</span>
                        </div>
                        <span style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: metric.color
                        }}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div style={{
                backgroundColor: '#FFF9E6',
                border: '2px solid #F0AD4E',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <span style={{ fontSize: '32px' }}>💡</span>
                  <div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1B5560',
                      marginBottom: '8px'
                    }}>
                      Recommended Actions
                    </h4>
                    <ul style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.8',
                      margin: 0,
                      paddingLeft: '20px'
                    }}>
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
};

export default SimulationDashboard;