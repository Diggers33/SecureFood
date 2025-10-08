'use client';

import React, { useState } from 'react';

const DataIntegration = () => {
  const [showAddSource, setShowAddSource] = useState(false);

  const dataSources = [
    { name: 'IEP - Incident & Event Platform', type: 'External', status: 'Active', lastUpdate: '2 minutes ago', frequency: 'Real-time', records: '1,245' },
    { name: 'RESILOG - Logistics & Routes', type: 'External', status: 'Active', lastUpdate: '5 minutes ago', frequency: 'Every 15 min', records: '3,892' },
    { name: 'EWS - Early Warning System', type: 'External', status: 'Active', lastUpdate: '1 minute ago', frequency: 'Real-time', records: '567' },
    { name: 'Production Database', type: 'Internal', status: 'Active', lastUpdate: '10 minutes ago', frequency: 'Hourly', records: '12,450' },
    { name: 'Weather Service API', type: 'External', status: 'Active', lastUpdate: '3 minutes ago', frequency: 'Every 30 min', records: '2,103' },
    { name: 'Market Price Feed', type: 'External', status: 'Warning', lastUpdate: '2 hours ago', frequency: 'Daily', records: '892' }
  ];

  const recentActivity = [
    { time: '10:34 AM', action: 'Data sync completed', source: 'IEP', status: 'success' },
    { time: '10:31 AM', action: 'New records imported', source: 'RESILOG', status: 'success' },
    { time: '10:28 AM', action: 'Connection restored', source: 'Market Price Feed', status: 'warning' },
    { time: '10:15 AM', action: 'Schema validation passed', source: 'Production Database', status: 'success' },
    { time: '10:05 AM', action: 'API rate limit warning', source: 'Weather Service', status: 'warning' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAFAF8',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ padding: '50px 80px' }}>
        {/* Title + action */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1B5560', margin: '0 0 8px 0' }}>
              Data Integration & Configuration
            </h1>
            <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
              Manage data source connections and monitor data flow
            </p>
          </div>
          <button
            onClick={() => setShowAddSource(true)}
            style={{
              padding: '14px 28px',
              backgroundColor: '#1B5560',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(27,85,96,0.2)'
            }}
          >
            <span style={{ fontSize: '18px' }}>+</span>
            Add New Data Source
          </button>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {[
            { label: 'Active Sources', value: '6', icon: '🔗', color: '#5CB85C' },
            { label: 'Total Records', value: '21.1K', icon: '📊', color: '#1B5560' },
            { label: 'Last Sync', value: '2 min', icon: '🔄', color: '#5B9BD5' },
            { label: 'Data Quality', value: '98%', icon: '✓', color: '#5CB85C' }
          ].map((card, idx) => (
            <div key={idx} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: card.color, lineHeight: '1' }}>{card.value}</div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Data sources table */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1B5560', marginBottom: '24px' }}>Connected Data Sources</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
                    {['Source Name', 'Type', 'Status', 'Last Update', 'Frequency', 'Records', 'Actions'].map((header) => (
                      <th key={header} style={{ textAlign: 'left', padding: '12px 8px', fontSize: '13px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataSources.map((source, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F5F5F5' }}>
                      <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>{source.name}</td>
                      <td style={{ padding: '16px 8px' }}>
                        <span style={{
                          fontSize: '12px', padding: '4px 10px', borderRadius: '12px',
                          backgroundColor: source.type === 'External' ? '#5B9BD515' : '#C9A96115',
                          color: source.type === 'External' ? '#5B9BD5' : '#C9A961', fontWeight: '500'
                        }}>
                          {source.type}
                        </span>
                      </td>
                      <td style={{ padding: '16px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: source.status === 'Active' ? '#5CB85C' : '#F0AD4E' }} />
                          <span style={{ fontSize: '13px', color: source.status === 'Active' ? '#5CB85C' : '#F0AD4E', fontWeight: '500' }}>
                            {source.status}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 8px', fontSize: '13px', color: '#666' }}>{source.lastUpdate}</td>
                      <td style={{ padding: '16px 8px', fontSize: '13px', color: '#666' }}>{source.frequency}</td>
                      <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>{source.records}</td>
                      <td style={{ padding: '16px 8px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#666', fontWeight: '500' }}>View</button>
                          <button style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#666', fontWeight: '500' }}>Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent activity */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1B5560', marginBottom: '24px' }}>Recent Activity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentActivity.map((activity, idx) => (
                <div key={idx} style={{ paddingBottom: '16px', borderBottom: idx < recentActivity.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: activity.status === 'success' ? '#5CB85C15' : '#F0AD4E15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {activity.status === 'success' ? '✓' : '⚠'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: '#333', marginBottom: '4px' }}>{activity.action}</div>
                      <div style={{ fontSize: '12px', color: '#999' }}>{activity.source} • {activity.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ width: '100%', marginTop: '20px', padding: '12px', backgroundColor: '#F5F5F5', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '500', color: '#666', cursor: 'pointer' }}>
              View All Activity
            </button>
          </div>
        </div>

        {/* Upload section */}
        <div style={{ marginTop: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1B5560', marginBottom: '16px' }}>Upload Data from Documents</h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
            Import data directly from CSV, Excel, or JSON files to update the platform
          </p>
          <div style={{ border: '2px dashed #C9A961', borderRadius: '12px', padding: '48px', textAlign: 'center', backgroundColor: '#C9A96108', cursor: 'pointer' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
            <div style={{ fontSize: '16px', fontWeight: '500', color: '#333', marginBottom: '8px' }}>Drag and drop files here</div>
            <div style={{ fontSize: '14px', color: '#999', marginBottom: '16px' }}>or click to browse</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Supported formats: CSV, XLSX, JSON (Max 50MB)</div>
          </div>
        </div>
      </div>

      {/* Add Source Modal */}
      {showAddSource && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '40px', width: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1B5560', margin: 0 }}>Add New Data Source</h2>
              <button onClick={() => setShowAddSource(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' }}>×</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <label>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '8px' }}>Source Name</span>
                <input type="text" placeholder="Enter data source name" style={{ width: '100%', padding: '12px', border: '2px solid #E0E0E0', borderRadius: '8px', fontSize: '14px' }} />
              </label>

              <label>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '8px' }}>Source Type</span>
                <select style={{ width: '100%', padding: '12px', border: '2px solid #E0E0E0', borderRadius: '8px', fontSize: '14px', backgroundColor: '#FFFFFF' }}>
                  <option>External API</option>
                  <option>Internal Database</option>
                  <option>File Upload</option>
                  <option>Webhook</option>
                </select>
              </label>

              <label>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '8px' }}>Connection URL</span>
                <input type="text" placeholder="https://api.example.com/data" style={{ width: '100%', padding: '12px', border: '2px solid #E0E0E0', borderRadius: '8px', fontSize: '14px' }} />
              </label>

              <label>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '8px' }}>Update Frequency</span>
                <select style={{ width: '100%', padding: '12px', border: '2px solid #E0E0E0', borderRadius: '8px', fontSize: '14px', backgroundColor: '#FFFFFF' }}>
                  <option>Real-time</option>
                  <option>Every 15 minutes</option>
                  <option>Hourly</option>
                  <option>Daily</option>
                </select>
              </label>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button onClick={() => setShowAddSource(false)} style={{ flex: 1, padding: '14px', backgroundColor: '#F5F5F5', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', color: '#666', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={() => setShowAddSource(false)} style={{ flex: 1, padding: '14px', backgroundColor: '#1B5560', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', color: '#FFFFFF', cursor: 'pointer' }}>
                  Add Source
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataIntegration;
