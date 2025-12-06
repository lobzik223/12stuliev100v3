'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'БИЛЕТЫ', href: '/tickets' },
  { name: 'СПЕКТАКЛИ', href: '/about' },
  { name: 'ГАЛЕРЕЯ', href: '/gallery' },
  { name: 'АКТЕРЫ', href: '/actors' },
  { name: 'КОМАНДА', href: '/team' },
  { name: 'ОТЗЫВЫ', href: '/reviews' },
  { name: 'КОНТАКТЫ', href: '/contacts' },
];

export default function Header({ isVisible = true }: { isVisible?: boolean }) {
  const pathname = usePathname();

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
      style={{ padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.5%, 1vw, 1%)' }}
    >
      <div className="relative w-full mx-auto" style={{ maxWidth: '93.75vw', height: 'clamp(3.5rem, 4.25vw, 4.25rem)' }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1728 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="filter0_d_header"
              x="0"
              y="0"
              width="1728"
              height="81"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="7.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.984314 0 0 0 0 0.776471 0 0 0 0 0.196078 0 0 0 0.6 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_header" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_header" result="shape" />
            </filter>
          </defs>
          <g filter="url(#filter0_d_header)">
            <rect x="15" y="15" width="1698" height="51" rx="10" fill="#682302" />
            <rect x="16" y="16" width="1696" height="49" rx="9" stroke="#955E0C" strokeWidth="2" />
          </g>
        </svg>

        <nav className="relative h-full flex items-center justify-center" style={{ padding: '0 2%' }}>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 'clamp(1rem, 2vw, 2rem)' }}>
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === '/tickets' && pathname === '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-1 rounded transition-all duration-200 ${
                    isActive
                      ? 'bg-black/30'
                      : 'hover:bg-black/20'
                  }`}
                  style={{ 
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(0.875rem, 1.0625vw, 1.0625rem)',
                    letterSpacing: '0.0625rem',
                    color: 'white'
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}

