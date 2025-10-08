'use client';
import React, { useState } from 'react';

const ValueChainView = () => {
  const [activeStage, setActiveStage] = useState('processing');
  
  const stages = [
    { id: 'production', label: 'Production', icon: '🚜', trend: [20, 25, 23, 28, 30, 27] },
    { id: 'processing', label: 'Processing', icon: '🏭', trend: [25, 30, 28, 32, 35, 33] },
    { id: 'transport', label: 'Transport', icon: '🚚', trend: [15, 18, 20, 19, 22, 21] },
    { id: 'storage', label: 'Storage', icon: '🏢', trend: [30, 28, 32, 30, 33, 31] },
    { id: 'distribution', label: 'Distribution', icon: '🏪', trend: [22, 25, 24, 27, 29, 28] }
  ];

  const metrics = [
    { label: 'Energy Consumption', value: '105.7', unit: 'kWh', percentage: '+16%', color: '#1B5560', icon: '⚡' },
    { label: 'Money Invested', value: '88.3', unit: 'k€', percentage: '53%', color: '#C9A961', icon: '💰' },
    { label: 'Time Invested', value: '0.59', unit: 'hrs', percentage: '31%', color: '#5B9BD5', icon: '🕐' }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAFAF8',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Content */}
      <div style={{ padding: '50px 80px' }}>
        {/* Title */}
        <div style={{ marginBottom: '50px' }}>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#1B5560',
              margin: '0 0 8px 0'
            }}
          >
            Scenario: Olive Picual
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#666',
              margin: 0
            }}
          >
            Value Chain Analysis
          </p>
        </div>

        {/* Value Chain Flow */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '50px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            marginBottom: '40px'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '30px',
              position: 'relative'
            }}
          >
            {stages.map((stage, idx) => (
              <div
                key={stage.id}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                {idx < stages.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50px',
                      left: '50%',
                      width: 'calc(100% + 30px)',
                      height: '3px',
                      backgroundColor: '#E0E0E0',
                      zIndex: 0
                    }}
                  />
                )}
                <div
                  onClick={() => setActiveStage(stage.id)}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: activeStage === stage.id ? '#1B5560' : '#F0F0F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '42px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow:
                      activeStage === stage.id
                        ? '0 8px 24px rgba(27,85,96,0.3)'
                        : '0 2px 8px rgba(0,0,0,0.06)',
                    zIndex: 1,
                    border: activeStage === stage.id ? '4px solid #C9A961' : '4px solid transparent'
                  }}
                >
                  {stage.icon}
                </div>
                <div
                  style={{
                    marginTop: '16px',
                    fontSize: '14px',
                    fontWeight: activeStage === stage.id ? '600' : '500',
                    color: activeStage === stage.id ? '#1B5560' : '#666',
                    textAlign: 'center'
                  }}
                >
                  {stage.label}
                </div>
                <svg width="120" height="40" style={{ marginTop: '12px' }}>
                  <polyline
                    points={stage.trend.map((v, i) => `${i * 20},${40 - v}`).join(' ')}
                    fill="none"
                    stroke={activeStage === stage.id ? '#1B5560' : '#CCCCCC'}
                    strokeWidth="2"
                  />
                  <polyline
                    points={
                      stage.trend.map((v, i) => `${i * 20},${40 - v}`).join(' ') +
                      ` 120,40 0,40`
                    }
                    fill={activeStage === stage.id ? '#1B556020' : '#CCCCCC10'}
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Section */}
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {/* Left: Metrics List */}
          <div
            style={{
              flex: '1.5',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              minWidth: '500px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px'
              }}
            >
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1B5560',
                  margin: 0
                }}
              >
                Olive Picual Processing
              </h2>
              <span
                style={{
                  fontSize: '14px',
                  color: '#999',
                  backgroundColor: '#F5F5F5',
                  padding: '6px 12px',
                  borderRadius: '4px'
                }}
              >
                2023
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {metrics.map((metric, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '24px' }}>{metric.icon}</span>
                      <span style={{ fontSize: '15px', color: '#333', fontWeight: '500' }}>
                        {metric.label}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '28px',
                          fontWeight: 'bold',
                          color: metric.color
                        }}
                      >
                        {metric.value}
                      </span>
                      <span style={{ fontSize: '14px', color: '#999' }}>{metric.unit}</span>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#FFFFFF',
                          backgroundColor: metric.color,
                          padding: '4px 10px',
                          borderRadius: '12px',
                          marginLeft: '12px'
                        }}
                      >
                        {metric.percentage}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      height: '8px',
                      backgroundColor: '#F0F0F0',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${parseFloat(metric.value)}%`,
                        backgroundColor: metric.color,
                        borderRadius: '4px',
                        transition: 'width 1s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Donut Chart */}
          <div
            style={{
              flex: '1',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '400px'
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '32px'
              }}
            >
              Resource Distribution
            </h3>
            <svg width="280" height="280" viewBox="0 0 280 280">
              <circle cx="140" cy="140" r="90" fill="none" stroke="#1B5560" strokeWidth="40" strokeDasharray="198.9 570" transform="rotate(-90 140 140)" />
              <circle cx="140" cy="140" r="90" fill="none" stroke="#C9A961" strokeWidth="40" strokeDasharray="226.2 570" strokeDashoffset="-198.9" transform="rotate(-90 140 140)" />
              <circle cx="140" cy="140" r="90" fill="none" stroke="#5B9BD5" strokeWidth="40" strokeDasharray="141.4 570" strokeDashoffset="-425.1" transform="rotate(-90 140 140)" />
              <circle cx="140" cy="140" r="70" fill="#FFFFFF" />
            </svg>
            <div style={{ marginTop: '32px', width: '100%' }}>
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: idx < metrics.length - 1 ? '1px solid #F0F0F0' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '2px',
                        backgroundColor: metric.color
                      }}
                    />
                    <span style={{ fontSize: '14px', color: '#666' }}>{metric.label}</span>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>
                    {metric.value} {metric.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueChainView;
