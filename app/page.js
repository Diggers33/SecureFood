// app/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MainDashboard() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();
  
  const categories = [
    {
      id: 'dairy',
      title: 'DAIRY PRODUCTS',
      icon: '🥛',
      route: '/monitoring?sector=dairy',
      color: '#C9A961',
      gradient: 'linear-gradient(135deg, #C9A961 0%, #E8D4A0 100%)'
    },
    {
      id: 'fruits',
      title: 'FRUITS & VEGETABLES',
      icon: '🥬',
      route: '/monitoring?sector=fruits',
      color: '#5CB85C',
      gradient: 'linear-gradient(135deg, #5CB85C 0%, #8FD68F 100%)'
    },
    {
      id: 'cereals',
      title: 'CEREALS & LEGUMES',
      icon: '🌾',
      route: '/value-chain',
      color: '#C9A961',
      gradient: 'linear-gradient(135deg, #D4A76A 0%, #E8C89A 100%)'
    },
    {
      id: 'seafood',
      title: 'SEA FOOD',
      icon: '🐟',
      route: '/fish-detail',
      color: '#5B9BD5',
      gradient: 'linear-gradient(135deg, #5B9BD5 0%, #8FB9E5 100%)'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#FAFAF8'
    }}>

      {/* Hero Section */}
      <div style={{
        padding: '80px 0 60px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '56px',
          fontWeight: 'bold',
          color: '#1B5560',
          margin: '0 0 16px 0',
          letterSpacing: '-0.5px'
        }}>
          Digital Twin
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#666666',
          margin: 0,
          fontWeight: '400'
        }}>
          Food Supply Chain Monitoring Platform
        </p>
      </div>

      {/* Category Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 480px)',
        gap: '40px',
        justifyContent: 'center',
        padding: '0 80px 80px'
      }}>
        {categories.map((category) => (
          <div
            key={category.id}
            onMouseEnter={() => setHoveredCard(category.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => router.push(category.route)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '60px 40px',
              boxShadow: hoveredCard === category.id 
                ? '0 12px 32px rgba(0,0,0,0.12)' 
                : '0 4px 16px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: hoveredCard === category.id ? 'translateY(-8px)' : 'translateY(0)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: category.gradient,
              opacity: '0.08',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              transform: hoveredCard === category.id ? 'scale(1.5)' : 'scale(1)'
            }} />
            
            {/* Icon Container */}
            <div style={{
              width: '140px',
              height: '140px',
              background: category.gradient,
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '72px',
              boxShadow: `0 8px 24px ${category.color}40`,
              transition: 'all 0.3s ease',
              transform: hoveredCard === category.id ? 'scale(1.05) rotate(5deg)' : 'scale(1) rotate(0deg)'
            }}>
              {category.icon}
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#1B5560',
              margin: 0,
              letterSpacing: '0.5px',
              textAlign: 'center'
            }}>
              {category.title}
            </h3>

            {/* Quick Stats */}
            <div style={{
              display: 'flex',
              gap: '32px',
              marginTop: '8px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#5CB85C' }}>
                  ✓
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                  Active
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                  12
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                  Facilities
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                  98%
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                  Uptime
                </div>
              </div>
            </div>

            {/* Arrow indicator on hover */}
            <div style={{
              marginTop: '8px',
              fontSize: '24px',
              color: category.color,
              opacity: hoveredCard === category.id ? 1 : 0,
              transition: 'all 0.3s ease',
              transform: hoveredCard === category.id ? 'translateX(0)' : 'translateX(-10px)'
            }}>
              →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}