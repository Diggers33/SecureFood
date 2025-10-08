'use client';
import React, { useState } from 'react';

const ReportsInterface = () => {
  const [reportType, setReportType] = useState('executive');
  const [selectedSectors, setSelectedSectors] = useState(['fish', 'dairy']);

  const recentReports = [
    { title: 'Q3 2023 Executive Summary', date: 'Sep 30, 2023', type: 'Executive', status: 'Completed', size: '2.4 MB', format: 'PDF' },
    { title: 'FISH Sector Analysis - August', date: 'Sep 05, 2023', type: 'Sector Detail', status: 'Completed', size: '5.1 MB', format: 'PDF' },
    { title: 'Supply Chain Risk Assessment', date: 'Aug 28, 2023', type: 'Risk Analysis', status: 'Completed', size: '3.8 MB', format: 'PDF' },
    { title: 'Drought Scenario Impact Report', date: 'Aug 15, 2023', type: 'Simulation', status: 'Completed', size: '4.2 MB', format: 'PDF' }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAFAF8',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Main content (header is provided globally in app/layout.js) */}
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Left Panel - Report Configuration */}
        <div
          style={{
            width: '450px',
            backgroundColor: '#FFFFFF',
            borderRight: '2px solid #E0E0E0',
            padding: '40px 30px',
            overflowY: 'auto'
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1B5560',
              marginBottom: '32px'
            }}
          >
            Generate New Report
          </h2>

          {/* Report Type Selection */}
          <div style={{ marginBottom: '32px' }}>
            <label
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '12px',
                display: 'block'
              }}
            >
              Report Type
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'executive', label: 'Executive Summary', icon: '📊', desc: 'High-level overview for decision makers' },
                { id: 'detailed', label: 'Detailed Analysis', icon: '📈', desc: 'In-depth metrics and trends' },
                { id: 'risk', label: 'Risk Assessment', icon: '⚠️', desc: 'Vulnerability and threat analysis' },
                { id: 'scenario', label: 'Scenario Comparison', icon: '🔄', desc: 'What-if simulation results' }
              ].map((type) => (
                <div
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: reportType === type.id ? '2px solid #1B5560' : '2px solid #E0E0E0',
                    backgroundColor: reportType === type.id ? '#1B556008' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '24px' }}>{type.icon}</span>
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: reportType === type.id ? '600' : '500',
                        color: reportType === type.id ? '#1B5560' : '#333'
                      }}
                    >
                      {type.label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#999',
                      margin: '0 0 0 36px',
                      lineHeight: '1.4'
                    }}
                  >
                    {type.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div style={{ marginBottom: '32px' }}>
            <label
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '12px',
                display: 'block'
              }}
            >
              Date Range
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="date"
                defaultValue="2023-01-01"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #E0E0E0',
                  fontSize: '14px'
                }}
              />
              <input
                type="date"
                defaultValue="2023-08-31"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #E0E0E0',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Sector Selection */}
          <div style={{ marginBottom: '32px' }}>
            <label
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '12px',
                display: 'block'
              }}
            >
              Include Sectors
            </label>
            {[
              { id: 'fish', label: 'FISH', icon: '🐟' },
              { id: 'aquaculture', label: 'AQUACULTURE', icon: '🦐' },
              { id: 'grain', label: 'GRAIN', icon: '🌾' },
              { id: 'fruits', label: 'FRUITS & VEGETABLES', icon: '🥬' },
              { id: 'dairy', label: 'MILK & DAIRY', icon: '🥛' }
            ].map((sector) => (
              <label
                key={sector.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedSectors.includes(sector.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSectors([...selectedSectors, sector.id]);
                    } else {
                      setSelectedSectors(selectedSectors.filter((s) => s !== sector.id));
                    }
                  }}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '20px' }}>{sector.icon}</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{sector.label}</span>
              </label>
            ))}
          </div>

          {/* Metrics to Include */}
          <div style={{ marginBottom: '32px' }}>
            <label
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '12px',
                display: 'block'
              }}
            >
              Metrics to Include
            </label>
            {['Environmental Indicators', 'Production Data', 'Economic Metrics', 'Supply Chain Status', 'Incidents & Alerts'].map(
              (metric) => (
                <label
                  key={metric}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 0',
                    cursor: 'pointer'
                  }}
                >
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                  <span style={{ fontSize: '14px', color: '#333' }}>{metric}</span>
                </label>
              )
            )}
          </div>

          {/* Format Selection */}
          <div style={{ marginBottom: '32px' }}>
            <label
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '12px',
                display: 'block'
              }}
            >
              Output Format
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['PDF', 'Word', 'Excel'].map((format) => (
                <button
                  key={format}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E0E0E0',
                    backgroundColor: format === 'PDF' ? '#1B5560' : '#FFFFFF',
                    color: format === 'PDF' ? '#FFFFFF' : '#666',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#C9A961',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 12px rgba(201,169,97,0.3)'
            }}
          >
            <span style={{ fontSize: '20px' }}>📄</span>
            Generate Report
          </button>
        </div>

        {/* Right Panel - Recent Reports & Preview */}
        <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
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
                fontSize: '28px',
                fontWeight: '600',
                color: '#1B5560',
                margin: 0
              }}
            >
              Recent Reports
            </h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="search"
                placeholder="Search reports..."
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '2px solid #E0E0E0',
                  fontSize: '14px',
                  width: '250px'
                }}
              />
              <select
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '2px solid #E0E0E0',
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <option>All Types</option>
                <option>Executive</option>
                <option>Detailed</option>
                <option>Risk Analysis</option>
              </select>
            </div>
          </div>

          {/* Reports Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
            {recentReports.map((report, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '2px solid transparent'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: '#1B556010',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px'
                    }}
                  >
                    📄
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      backgroundColor: '#5CB85C15',
                      color: '#5CB85C',
                      fontWeight: '600',
                      height: 'fit-content'
                    }}
                  >
                    {report.status}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1B5560',
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}
                >
                  {report.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '16px',
                    fontSize: '13px',
                    color: '#999'
                  }}
                >
                  <span>📅 {report.date}</span>
                  <span>📦 {report.size}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #F0F0F0'
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#F5F5F5',
                      color: '#666',
                      fontWeight: '500'
                    }}
                  >
                    {report.type}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      style={{
                        padding: '8px 14px',
                        fontSize: '13px',
                        backgroundColor: '#1B5560',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Download
                    </button>
                    <button
                      style={{
                        padding: '8px 14px',
                        fontSize: '13px',
                        backgroundColor: '#F5F5F5',
                        color: '#666',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Report Preview Section */}
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
                fontSize: '20px',
                fontWeight: '600',
                color: '#1B5560',
                marginBottom: '24px'
              }}
            >
              Report Template Preview
            </h3>
            <div
              style={{
                border: '2px solid #E0E0E0',
                borderRadius: '8px',
                padding: '40px',
                backgroundColor: '#FAFAFA',
                minHeight: '300px'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B5560', marginBottom: '8px' }}>
                  Executive Summary Report
                </h4>
                <p style={{ fontSize: '14px', color: '#666' }}>SecureFood Digital Twin Platform</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
                {['Executive Summary', 'Key Performance Indicators', 'Sector Analysis', 'Risk Assessment', 'Recommendations'].map(
                  (section, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        border: '1px solid #E0E0E0'
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#1B556015',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1B5560'
                        }}
                      >
                        {idx + 1}
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>{section}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsInterface;
