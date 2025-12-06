'use client';

import BackgroundImage from '../ui/BackgroundImage';

export default function ContactsSection() {
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
          Контакты и партнёры
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Левая колонка — контакты */}
          <div className="text-center md:text-left space-y-2">
            <p
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                color: '#FFFFFF',
                letterSpacing: '0.08em'
              }}
            >
              Для связи
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(0.875rem, 1vw, 1rem)'
              }}
            >
              Email:{' '}
              <a
                href="mailto:info@12stulyev-theater.ru"
                style={{ color: '#FBC632', textDecoration: 'underline' }}
              >
                info@12stulyev-theater.ru
              </a>
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(0.875rem, 1vw, 1rem)'
              }}
            >
              Телефон:{' '}
              <a
                href="tel:+74951234567"
                style={{ color: '#FBC632', textDecoration: 'underline' }}
              >
                +7 (495) 123-45-67
              </a>
            </p>
          </div>

          {/* Центральная колонка — логотип */}
          <div className="flex flex-col items-center justify-center">
            <BackgroundImage
              imagePath="/backgrounds/sections/logo100let.png"
              style={{ 
                width: 'clamp(18.75rem, 25vw, 23.75rem)',
                maxWidth: '100%'
              }}
            />
          </div>

          {/* Правая колонка — соцсети и кнопка */}
          <div className="text-center md:text-right space-y-4">
            <p
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                color: '#FFFFFF',
                letterSpacing: '0.08em'
              }}
            >
              Социальные сети
            </p>
            <div className="flex justify-center md:justify-end gap-4">
              {['W', 'TG', 'VK'].map((icon, index) => (
                <div
                  key={index}
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 'clamp(2.5rem, 3vw, 2.75rem)',
                    height: 'clamp(2.5rem, 3vw, 2.75rem)',
                    border: '2px solid #FBC632',
                    color: '#FBC632',
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1rem, 1.125vw, 1.125rem)'
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
            <div className="flex justify-center md:justify-end">
              <button
                className="mt-2 rounded-lg border-2 transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: 'clamp(1rem, 1.125vw, 1.125rem)',
                  letterSpacing: '0.08em',
                  color: '#FBC632',
                  backgroundColor: 'transparent',
                  borderColor: '#FBC632',
                  borderWidth: '2px',
                  padding: 'clamp(0.5rem, 0.75vw, 0.625rem) clamp(2.5rem, 3.5vw, 3.75rem)',
                  boxShadow: '0 0 0.625rem rgba(251, 198, 50, 0.35), 0 0 1.25rem rgba(251, 198, 50, 0.2)'
                }}
              >
                билеты для сотрудников
              </button>
            </div>
          </div>
        </div>

        {/* Нижняя строка с юридической информацией */}
        <div className="mt-10 text-center space-y-1">
          <p
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(0.875rem, 1vw, 1rem)'
            }}
          >
            <span style={{ color: '#D9B682' }}>ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ: </span>
            <span style={{ color: '#FFFFFF' }}>ЛАГУТЕЕВ АЛЕКСАНДР АЛЕКСАНДРОВИЧ</span>
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(0.875rem, 1vw, 1rem)'
            }}
          >
            <span style={{ color: '#D9B682' }}>ИНН: </span>
            <span style={{ color: '#FFFFFF' }}>570700972948</span>
            <span style={{ color: '#D9B682' }}> | ОГРНИП: </span>
            <span style={{ color: '#FFFFFF' }}>324310000057680</span>
          </p>
        </div>
      </div>
    </section>
  );
}

