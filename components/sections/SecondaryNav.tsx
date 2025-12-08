'use client';

interface SecondaryNavProps {
  isVisible: boolean;
  activeCategory?: number;
}

export default function SecondaryNav({ isVisible, activeCategory = 0 }: SecondaryNavProps) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
      style={{ padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.5%, 1vw, 1%)' }}
    >
      <div className="relative w-full mx-auto" style={{ maxWidth: '98vw', height: 'clamp(4rem, 5vw, 5rem)' }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1728 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="filter0_d_secondary"
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
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_secondary" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_secondary" result="shape" />
            </filter>
          </defs>
          <g filter="url(#filter0_d_secondary)">
            <rect x="15" y="15" width="1698" height="51" rx="10" fill="#682302" />
            <rect x="16" y="16" width="1696" height="49" rx="9" stroke="#955E0C" strokeWidth="2" />
          </g>
        </svg>

        <div className="relative h-full flex items-center justify-center" style={{ padding: '0 2%' }}>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 'clamp(2rem, 5vw, 3rem)' }}>
            {[
              { name: 'ОФИС ЛОТЕРЕИ «БИМ-БОМ-26»', index: 0 },
              { name: 'ПСИХУШКА', index: 1 },
              { name: 'КВАРТИРА КИСЫ', index: 2 },
              { name: 'КВАРТИРА СТАРУХИ ЯРЫГИНОЙ', index: 3 }
            ].map((item) => {
              const isActive = activeCategory === item.index;
              return (
              <div key={item.index} className="flex flex-col items-center">
                <div 
                  className="rounded-full mb-2"
                  style={{
                    width: 'clamp(0.5rem, 0.7vw, 0.7rem)',
                    height: 'clamp(0.5rem, 0.7vw, 0.7rem)',
                    backgroundColor: isActive ? '#FBC632' : 'transparent',
                    border: isActive ? 'none' : '1.5px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: isActive ? '0 0 0.5rem rgba(251, 198, 50, 0.8)' : 'none'
                  }}
                />
                <p
                  className="text-center uppercase"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
                    letterSpacing: '0.05rem',
                    color: 'white'
                  }}
                >
                  {item.name}
                </p>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

