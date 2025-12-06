'use client';

export default function ScheduleSection() {
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
          className="text-center mb-4 uppercase"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)',
            color: '#FBC632',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.1em'
          }}
        >
          РАСПИСАНИЕ СПЕКТАКЛЕЙ
        </p>
        <p 
          className="text-center mb-10 uppercase"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
            color: '#FFFFFF',
            letterSpacing: '0.05em',
            lineHeight: '1.3'
          }}
        >
          Где можно посмотреть
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="rounded-xl border-2 bg-[#682302] flex flex-col justify-between"
              style={{
                borderColor: '#FBC632',
                padding: 'clamp(1.5rem, 2vw, 2.5rem)',
                boxShadow: '0 0 1.125rem rgba(251, 198, 50, 0.35), 0 0 2.5rem rgba(251, 198, 50, 0.18)'
              }}
            >
              <div className="text-center space-y-4 mb-6">
                <p
                  className="uppercase"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1.25rem, 1.875vw, 1.875rem)',
                    color: '#FBC632',
                    letterSpacing: '0.08em'
                  }}
                >
                  <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(2rem, 2.5vw, 2.5rem)' }}>12</span>
                  {' '}стульев – Москва
                </p>
                <p
                  className="uppercase"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1.125rem, 1.5625vw, 1.5625rem)',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em'
                  }}
                >
                  <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(1.75rem, 2vw, 2rem)' }}>15</span>
                  {' '}ноября | {' '}
                  <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(1.75rem, 2vw, 2rem)' }}>22:00</span>
                </p>
                <p
                  className="uppercase"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(0.875rem, 1.125vw, 1.125rem)',
                    color: '#FFFFFF',
                    letterSpacing: '0.05em'
                  }}
                >
                  Театр драмы, ул. Ленина,{' '}
                  <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(1.5rem, 1.75vw, 1.75rem)' }}>23</span>
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button
                  className="rounded-md border-2 transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1rem, 1.125vw, 1.125rem)',
                    letterSpacing: '0.05em',
                    color: '#FBC632',
                    backgroundColor: 'transparent',
                    borderColor: '#FBC632',
                    padding: 'clamp(0.625rem, 0.75vw, 0.75rem) clamp(2.5rem, 3.5vw, 3.75rem)',
                    boxShadow: '0 0 0.625rem rgba(251, 198, 50, 0.35), 0 0 1.25rem rgba(251, 198, 50, 0.2)'
                  }}
                >
                  Подробнее
                </button>
                <button
                  className="rounded-md border-2 transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1rem, 1.125vw, 1.125rem)',
                    letterSpacing: '0.05em',
                    color: '#682302',
                    backgroundColor: '#FBC632',
                    borderColor: '#FBC632',
                    padding: 'clamp(0.625rem, 0.75vw, 0.75rem) clamp(4rem, 5.5vw, 5.625rem)',
                    boxShadow: '0 0 0.75rem rgba(251, 198, 50, 0.4), 0 0 1.375rem rgba(251, 198, 50, 0.2)'
                  }}
                >
                  Купить билет
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="rounded-lg border-2 transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
              letterSpacing: '0.0625rem',
              color: 'white',
              backgroundColor: '#682302',
              borderColor: '#FBC632',
              borderWidth: '3px',
              padding: 'clamp(0.5rem, 0.75vw, 0.625rem) clamp(7rem, 10vw, 8rem)',
              boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.4)'
            }}
          >
            ПОСМОТРЕТЬ РАСПИСАНИЕ
          </button>
        </div>
      </div>
    </section>
  );
}

