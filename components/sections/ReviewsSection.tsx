'use client';

import BackgroundImage from '../ui/BackgroundImage';

export default function ReviewsSection() {
  return (
    <section 
      className="relative w-full"
      style={{
        backgroundImage: 'url(/backgrounds/sections/section-4.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: 'clamp(4rem, 8vh, 6rem) 4%'
      }}
    >
      <div className="w-full max-w-[120rem] mx-auto">
        <p 
          className="text-center mb-10 uppercase"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)',
            color: '#FBC632',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.1em'
          }}
        >
          ОТЗЫВЫ
        </p>
        
        <div className="flex items-center justify-center gap-4 overflow-x-auto">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex-shrink-0" style={{ width: 'clamp(15rem, 20vw, 25rem)' }}>
              <BackgroundImage
                imagePath="/backgrounds/sections/otzivi.png"
                style={{ width: '100%', aspectRatio: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

