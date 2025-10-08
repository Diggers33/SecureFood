'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { label: 'Dashboard', path: '/' },
  { label: 'Monitoring', path: '/monitoring' },
  { label: 'Simulations', path: '/simulation' },
  { label: 'Data Integration', path: '/data-integration' },
  { label: 'Reports', path: '/reports' },
];

// baked in by next.config.js at build time
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Header() {
  const pathname = usePathname();
  return (
    <header style={{
      height: 70, backgroundColor: '#1B5560', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', padding: '0 30px'
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={`${prefix}/securefood-logo.png`}   // -> /SecureFood/securefood-logo.png in prod
          alt="SecureFood"
          style={{ height: 40, width: 'auto', display: 'block' }}
          loading="eager"
        />
      </Link>

      <nav style={{ display: 'flex', gap: 30 }}>
        {items.map(({ label, path }) => {
          const active = pathname === path || (path !== '/' && pathname.startsWith(path));
          return (
            <Link key={path} href={path} style={{
              position: 'relative', color: '#fff', textDecoration: 'none',
              fontSize: 16, fontWeight: 600, opacity: active ? 1 : 0.85
            }}>
              {label}
              {active && <span style={{
                position: 'absolute', left: 0, bottom: -8, height: 3, width: '100%',
                backgroundColor: '#C9A961', borderRadius: 2
              }} />}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
