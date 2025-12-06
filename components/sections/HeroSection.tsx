'use client';

import TypingText from '../ui/TypingText';

export default function HeroSection() {
  return (
    <section 
      className="relative w-full min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url(/backgrounds/sections/section-1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Контент раздела */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start" style={{ padding: '0 4%', paddingTop: 'clamp(0.5rem, 1vh, 1rem)' }}>
        {/* Логотип по центру сверху */}
        <div className="flex justify-center w-full" style={{ marginTop: '0', marginBottom: '0' }}>
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/logo100let.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'clamp(12rem, 35vw, 30rem)',
              height: 'clamp(8rem, 25vw, 22rem)',
              maxWidth: '100%',
              filter: 'drop-shadow(0 0 1.25rem rgba(255,255,255,0.3))'
            }}
          />
        </div>

        {/* Текст под логотипом */}
        <div className="text-center text-white w-full" style={{ marginTop: 'clamp(-7rem, -12vh, -6.5rem)' }}>
          <p 
            className="uppercase"
            style={{ 
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(0.875rem, 1.5vw, 1.5rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              padding: '0 clamp(1rem, 2vw, 2rem)',
              marginBottom: '0'
            }}
          >
            <TypingText 
              text="ТЕАТРАЛЬНОЕ ПУТЕШЕСТВИЕ ИЛЬФА И ПЕТРОВА"
              speed={50}
              delay={500}
            />
          </p>
          
          {/* Текст "СЛЕДУЙ ЗА БЕНДЕРОМ!" под текстом, под серединой */}
          <div 
            className="flex justify-center text-white w-full"
            style={{ 
              marginTop: '0',
              paddingLeft: 'clamp(1rem, 2vw, 2rem)',
              paddingRight: 'clamp(1rem, 2vw, 2rem)'
            }}
          >
            <p 
              className="uppercase"
              style={{ 
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(0.75rem, 1.125vw, 1.125rem)',
                textShadow: '0 0 0.625rem rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                textAlign: 'center',
                paddingLeft: 'clamp(8.5rem, 21vw, 30rem)'
              }}
            >
              <TypingText 
                text="СЛЕДУЙ ЗА БЕНДЕРОМ!"
                speed={50}
                delay={2500}
              />
            </p>
          </div>
        </div>

        {/* Кнопка снизу слева */}
        <div 
          className="flex w-full"
          style={{ 
            position: 'absolute',
            bottom: 'clamp(6rem, 15vh, 15rem)',
            left: '0',
            paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
            paddingRight: 'clamp(1rem, 4vw, 4rem)',
            justifyContent: 'flex-start'
          }}
        >
          <button
            className="rounded-lg border-2 transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(0.875rem, 1.25vw, 1.25rem)',
              letterSpacing: '0.0625rem',
              color: '#FBC632',
              backgroundColor: 'transparent',
              borderColor: '#FBC632',
              padding: 'clamp(0.75rem, 1.25vw, 1.25rem) clamp(1.5rem, 2.5vw, 2.5rem)',
              boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.6), 0 0 1.875rem rgba(251, 198, 50, 0.4)',
              textShadow: '0 0 0.625rem rgba(251, 198, 50, 0.8), 0 0 1.25rem rgba(251, 198, 50, 0.5)',
              whiteSpace: 'nowrap'
            }}
          >
            НАЧАТЬ ПУТЬ
          </button>
        </div>
      </div>
    </section>
  );
}

