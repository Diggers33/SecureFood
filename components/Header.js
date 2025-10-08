'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../public/securefood-logo.png'; // note the .. from /components to /public


const items = [
  { label: 'Dashboard', path: '/' },
  { label: 'Monitoring', path: '/monitoring' },
  { label: 'Simulations', path: '/simulation' },
  { label: 'Data Integration', path: '/data-integration' },
  { label: 'Reports', path: '/reports' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{
      height: 70,
      backgroundColor: '#1B5560',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Brand (logo) */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Using static import so it works perfectly on GitHub Pages */}
        <Image
          src="/securefood-logo.png"
          alt="SecureFood"
          width={160}         // tweak as you like
          height={40}
          priority
          style={{ height: 40, width: 'auto' }}
        />
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', gap: 30 }}>
        {items.map(({ label, path }) => {
          const active = pathname === path || (path !== '/' && pathname.startsWith(path));
          return (
            <Link
              key={path}
              href={path}
              style={{
                position: 'relative',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: 16,
                fontWeight: 600,
                opacity: active ? 1 : 0.85,
              }}
            >
              {label}
              {active && (
                <span style={{
                  position: 'absolute',
                  left: 0,
                  bottom: -8,
                  height: 3,
                  width: '100%',
                  backgroundColor: '#C9A961',
                  borderRadius: 2,
                  display: 'block',
                }} />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

