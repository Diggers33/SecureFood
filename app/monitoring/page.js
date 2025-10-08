'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function MonitoringDashboard() {
  const [selectedUseCase, setSelectedUseCase] = useState('FISH – Greece');
  const [selectedPeriod, setSelectedPeriod] = useState('Year');
  
  const useCases = [
    'FISH – Greece',
    'AQUACULTURE – Belgium',
    'GRAIN – Ukraine',
    'FRUIT & VEGETABLES – Portugal',
    'MILK & DAIRY – Greece/Finland'
  ];
  
  const temperatureData = [
    { month: 'J', value: 18, target: 20 },
    { month: 'F', value: 15, target: 19 },
    { month: 'M', value: 19, target: 20 },
    { month: 'A', value: 14, target: 18 },
    { month: 'M', value: 17, target: 19 },
    { month: 'J', value: 12, target: 17 },
    { month: 'J', value: 16, target: 18 },
    { month: 'A', value: 10, target: 16 }
  ];
  
  const logisticsData = [
    { month: 'J', value: 25 },
    { month: 'F', value: 18 },
    { month: 'M', value: 22 },
    { month: 'A', value: 16 },
    { month: 'M', value: 20 },
    { month: 'J', value: 14 },
    { month: 'J', value: 19 },
    { month: 'A', value: 13 }
  ];
  
  const stockData = [
    { month: 'J', value: 22 },
    { month: 'F', value: 16 },
    { month: 'M', value: 19 },
    { month: 'A', value: 13 },
    { month: 'M', value: 17 },
    { month: 'J', value: 11 },
    { month: 'J', value: 15 },
    { month: 'A', value: 10 }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAFAF8',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Content below global header */}
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Left Sidebar */}
        <div
          style={{
            width: '300px',
            backgroundColor: '#FFFFFF',
            borderRight: '2px solid #E0E0E0',
            padding: '30px 24px'
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1B5560',
              marginBottom: '30px'
            }}
          >
            Supply Chain Status
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
              ▼ Production Nodes
            </div>
            <div style={{ fontSize: '14px', color: '#666', paddingLeft: '16px' }}>
              ▶ Transport Routes
            </div>
            <div style={{ fontSize: '14px', color: '#666', paddingLeft: '16px' }}>
              ▶ Storage Facilities
            </div>
            <div style={{ fontSize: '14px', color: '#666', paddingLeft: '16px' }}>
              ▶ Distribution Points
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '20px'
              }}
            >
              Network Status
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: '🌾', label: 'Production', status: 'active' },
                { icon: '🚚', label: 'Transport', status: 'active' },
                { icon: '🏭', label: 'Storage', status: 'warning' },
                { icon: '🏪', label: 'Distribution', status: 'active' }
              ].map((node, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor:
                        node.status === 'active' ? '#5CB85C20' : '#F0AD4E20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}
                  >
                    {node.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#333'
                      }}
                    >
                      {node.label}
                    </div>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor:
                          node.status === 'active' ? '#5CB85C' : '#F0AD4E',
                        marginTop: '4px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
          {/* Top Controls */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <select
              value={selectedUseCase}
              onChange={(e) => setSelectedUseCase(e.target.value)}
              style={{
                width: '300px',
                height: '45px',
                padding: '0 15px',
                borderRadius: '4px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#FFFFFF',
                fontSize: '14px',
                color: '#333',
                cursor: 'pointer'
              }}
            >
              {useCases.map((uc) => (
                <option key={uc} value={uc}>
                  {uc}
                </option>
              ))}
            </select>

            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              style={{
                width: '150px',
                height: '45px',
                padding: '0 15px',
                borderRadius: '4px',
                border: '1px solid #CCCCCC',
                backgroundColor: '#FFFFFF',
                fontSize: '14px',
                color: '#333',
                cursor: 'pointer'
              }}
            >
              <option>Year</option>
              <option>Month</option>
              <option>Week</option>
            </select>
          </div>

          {/* KPI Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 280px)',
              gap: '20px',
              marginBottom: '30px'
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#F0AD4E'
                }}
              >
                3
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#666',
                  marginTop: '8px'
                }}
              >
                Active Incidents
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  fontSize: '28px'
                }}
              >
                ⚠️
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#D9534F'
                }}
              >
                7
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#666',
                  marginTop: '8px'
                }}
              >
                Alert Thresholds
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  fontSize: '28px'
                }}
              >
                🔔
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#5CB85C'
                }}
              >
                67%
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#666',
                  marginTop: '8px',
                  marginBottom: '12px'
                }}
              >
                Stock Levels
              </div>
              <div
                style={{
                  height: '8px',
                  backgroundColor: '#E0E0E0',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: '67%',
                    height: '100%',
                    backgroundColor: '#5CB85C'
                  }}
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '40px',
                    fontWeight: 'bold',
                    color: '#1B5560'
                  }}
                >
                  2.4
                </span>
                <span style={{ fontSize: '18px', color: '#666' }}>days</span>
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                Avg Delivery Time
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  fontSize: '28px'
                }}
              >
                🕐
              </div>
            </div>
          </div>

          {/* Charts */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px'
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '15px'
                }}
              >
                Temperature Trends
              </h3>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={temperatureData}>
                  <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#1B5560" strokeWidth={2.5} dot={false} />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#C9A961"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="3 3"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '15px'
                }}
              >
                Logistics Status
              </h3>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={logisticsData}>
                  <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                  <YAxis hide />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1B5560"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '15px'
                }}
              >
                Stock Changes
              </h3>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={stockData}>
                  <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                  <YAxis hide />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#5CB85C"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
