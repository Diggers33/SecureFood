'use client';
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

const SectorDetailView = () => {
  const [selectedMetric, setSelectedMetric] = useState('temperature');

  const environmentalData = [
    { month: 'Jan', temp: 8, algae: 12, oxygen: 8.2 },
    { month: 'Feb', temp: 9, algae: 15, oxygen: 8.0 },
    { month: 'Mar', temp: 11, algae: 22, oxygen: 7.8 },
    { month: 'Apr', temp: 14, algae: 35, oxygen: 7.5 },
    { month: 'May', temp: 17, algae: 42, oxygen: 7.2 },
    { month: 'Jun', temp: 20, algae: 38, oxygen: 7.4 },
    { month: 'Jul', temp: 22, algae: 28, oxygen: 7.6 },
    { month: 'Aug', temp: 21, algae: 24, oxygen: 7.7 }
  ];

  const productionData = [
    { month: 'Jan', catch: 450, affected: 5 },
    { month: 'Feb', catch: 480, affected: 4 },
    { month: 'Mar', catch: 420, affected: 8 },
    { month: 'Apr', catch: 380, affected: 12 },
    { month: 'May', catch: 350, affected: 15 },
    { month: 'Jun', catch: 370, affected: 13 },
    { month: 'Jul', catch: 410, affected: 9 },
    { month: 'Aug', catch: 440, affected: 6 }
  ];

  const priceData = [
    { month: 'Jan', wholesale: 4.2, retail: 8.5 },
    { month: 'Feb', wholesale: 4.5, retail: 8.8 },
    { month: 'Mar', wholesale: 5.1, retail: 9.5 },
    { month: 'Apr', wholesale: 5.8, retail: 10.2 },
    { month: 'May', wholesale: 6.2, retail: 11.0 },
    { month: 'Jun', wholesale: 5.9, retail: 10.5 },
    { month: 'Jul', wholesale: 5.4, retail: 9.8 },
    { month: 'Aug', wholesale: 5.0, retail: 9.2 }
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
            width: '280px',
            backgroundColor: '#FFFFFF',
            borderRight: '2px solid #E0E0E0',
            padding: '30px 20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: '#5B9BD510',
              borderRadius: '12px'
            }}
          >
            <div style={{ fontSize: '36px' }}>🐟</div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#1B5560' }}>FISH</div>
              <div style={{ fontSize: '13px', color: '#666' }}>Greece Region</div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '16px'
              }}
            >
              Quick Metrics
            </h3>
            {[
              { label: 'Status', value: 'Active', color: '#5CB85C', icon: '●' },
              { label: 'Facilities', value: '8', color: '#1B5560', icon: '🏭' },
              { label: 'Daily Catch', value: '440t', color: '#5B9BD5', icon: '🎣' },
              { label: 'Quality Score', value: '87%', color: '#C9A961', icon: '⭐' }
            ].map((metric, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #F0F0F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{metric.icon}</span>
                  <span style={{ fontSize: '14px', color: '#666' }}>{metric.label}</span>
                </div>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: metric.color
                  }}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '16px'
              }}
            >
              Categories
            </h3>
            {[
              { label: 'Environmental', active: true },
              { label: 'Production', active: false },
              { label: 'Logistics', active: false },
              { label: 'Economic', active: false },
              { label: 'Availability', active: false }
            ].map((cat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  marginBottom: '8px',
                  backgroundColor: cat.active ? '#1B556010' : 'transparent',
                  borderLeft: cat.active
                    ? '3px solid #1B5560'
                    : '3px solid transparent',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: cat.active ? '600' : '500',
                  color: cat.active ? '#1B5560' : '#666'
                }}
              >
                {cat.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
          {/* Top title and buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px'
            }}
          >
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#1B5560',
                margin: 0
              }}
            >
              FISH Sector - Detailed Monitoring
            </h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                📊 Export Data
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#1B5560',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                📄 Generate Report
              </button>
            </div>
          </div>

          {/* Alert Banner */}
          <div
            style={{
              backgroundColor: '#FFF4E6',
              border: '2px solid #F0AD4E',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '32px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            <div style={{ fontSize: '32px' }}>⚠️</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '6px'
                }}
              >
                Algae Bloom Alert - Moderate Risk
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Algae concentration levels 35% above normal in 3 zones.
                Recommended action: Increase monitoring frequency and prepare
                mitigation measures.
              </div>
            </div>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#F0AD4E',
                border: 'none',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              View Details
            </button>
          </div>

          {/* Environmental Metrics Section */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              marginBottom: '24px'
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1B5560',
                marginBottom: '24px'
              }}
            >
              Environmental Parameters
            </h2>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={environmentalData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D9534F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D9534F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAlgae" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F0AD4E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F0AD4E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOxygen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B9BD5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5B9BD5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#D9534F"
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="algae"
                  stroke="#F0AD4E"
                  fillOpacity={1}
                  fill="url(#colorAlgae)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="oxygen"
                  stroke="#5B9BD5"
                  fillOpacity={1}
                  fill="url(#colorOxygen)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Two-column layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }}
          >
            {/* Production Metrics */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1B5560',
                  marginBottom: '24px'
                }}
              >
                Production & Operations
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={productionData}>
                  <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#999" />
                  <Tooltip />
                  <Bar dataKey="catch" fill="#5B9BD5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Economic Metrics */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1B5560',
                  marginBottom: '24px'
                }}
              >
                Economic Indicators
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={priceData}>
                  <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#999" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="wholesale"
                    stroke="#C9A961"
                    strokeWidth={3}
                    dot={{ fill: '#C9A961', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="retail"
                    stroke="#1B5560"
                    strokeWidth={3}
                    dot={{ fill: '#1B5560', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorDetailView;
