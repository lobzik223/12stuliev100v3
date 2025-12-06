'use client';

import { useState, useEffect } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import CounterAnimation from '../ui/CounterAnimation';
import { events } from '../../data/events';

export default function EventsSection() {
  const [selectedEventUrl, setSelectedEventUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyTicket = (url: string | undefined) => {
    if (url) {
      setSelectedEventUrl(url);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventUrl(null);
  };


  return (
    <section 
      className="relative w-full min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: 'url(/backgrounds/sections/section-2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 'clamp(2rem, 5vh, 4rem) 4%'
      }}
    >
      <div className="w-full max-w-[87.5rem]">
        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginTop: 'clamp(-12rem, -15vh, -11.5rem)' }}>
          {events.map((event) => (
            <ScrollReveal key={event.id} delay={(event.id - 1) * 150}>
              <div className="relative w-full" style={{ maxWidth: 'clamp(32rem, 42vw, 40rem)' }}>
                <div className="relative w-full h-auto">
                  <div
                    style={{
                      backgroundImage: 'url(/backgrounds/sections/plitkanovosti.png)',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      width: '100%',
                      paddingTop: 'clamp(140%, 160%, 180%)'
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col" style={{ paddingTop: 'clamp(15rem, 26vh, 20.5rem)', paddingBottom: 'clamp(1.5rem, 2vh, 2rem)', paddingLeft: 'clamp(1.5rem, 2vw, 2rem)', paddingRight: 'clamp(1.5rem, 2vw, 2rem)' }}>
                  <p 
                    className="text-center"
                    style={{ 
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                      color: '#682302',
                      fontWeight: '400',
                      marginTop: 'clamp(2rem, 3vh, 2.5rem)',
                      marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)'
                    }}
                  >
                    <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(0.85rem, 1vw, 0.95rem)' }}>{event.date}</span>
                    {' '}{event.location}
                  </p>
                  <h3 
                    className="text-center"
                    style={{ 
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)',
                      color: '#682302',
                      fontWeight: '700',
                      textShadow: '0 0 0.5rem rgba(104, 35, 2, 0.4)',
                      marginBottom: 'clamp(0.5rem, 0.75vh, 0.75rem)'
                    }}
                  >
                    <span style={{ fontSize: 'clamp(1.4rem, 1.8vw, 1.7rem)' }}>12</span> СТУЛЬЕВ
                  </h3>
                  <div 
                    className="rounded w-fit mx-auto"
                    style={{ 
                      backgroundColor: '#682302',
                      padding: '0.375rem 1.25rem',
                      boxShadow: '0 0 0.625rem rgba(251, 198, 50, 0.3)',
                      marginBottom: 'clamp(0.5rem, 0.75vh, 0.75rem)'
                    }}
                  >
                    <p 
                      className="text-white text-center whitespace-nowrap"
                      style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)' }}
                    >
                      ОСТАЛОСЬ{' '}
                      <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(0.85rem, 1vw, 0.95rem)' }}>{event.ticketsLeft}</span>
                      {' '}БИЛЕТОВ
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center" style={{ marginTop: 'clamp(0.25rem, 0.5vh, 0.5rem)' }}>
                    <button
                      onClick={() => handleBuyTicket(event.buyTicketUrl)}
                      className="rounded transition-all duration-300 hover:scale-105 cursor-pointer"
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        backgroundColor: '#FBC632',
                        color: '#682302',
                        fontWeight: '700',
                        fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                        padding: '0.3rem 0.6rem',
                        boxShadow: '0 0 0.5rem rgba(220, 38, 38, 0.4)',
                        border: 'none'
                      }}
                      disabled={!event.buyTicketUrl}
                    >
                      КУПИТЬ БИЛЕТ
                    </button>
                    <button
                      className="rounded border transition-all duration-300 hover:scale-105"
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        backgroundColor: 'transparent',
                        borderColor: '#682302',
                        color: '#682302',
                        fontWeight: '700',
                        fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                        padding: '0.3rem 0.6rem'
                      }}
                    >
                      ПОДРОБНЕЕ
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Кнопка расписания */}
        <ScrollReveal delay={450}>
          <div className="w-full flex justify-center" style={{ marginTop: 'clamp(-6rem, -10vh, -5.5rem)' }}>
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
                padding: 'clamp(0.375rem, 0.75vw, 0.625rem) clamp(6rem, 8vw, 7.5rem)',
                boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.4)'
              }}
            >
              ПОСМОТРЕТЬ РАСПИСАНИЕ
            </button>
          </div>
        </ScrollReveal>

        {/* Логотип и статистика */}
        <ScrollReveal delay={200}>
          <div className="mt-16 flex justify-center">
            <div
              style={{
                backgroundImage: 'url(/backgrounds/sections/logo100let.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: 'clamp(20rem, 31.25vw, 25rem)',
                height: 'clamp(13rem, 20vw, 16rem)',
                filter: 'drop-shadow(0 0 1.25rem rgba(255,255,255,0.3))'
              }}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <div className="text-center text-white" style={{ marginTop: 'clamp(-4rem, -5vh, -3.5rem)' }}>
            <p 
              className="uppercase"
              style={{ 
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(1.125rem, 1.5625vw, 1.5rem)',
                color: '#FBC632',
                filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
                textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)'
              }}
            >
              Погрузитесь в атмосферу театральной магии
            </p>
          </div>
        </ScrollReveal>

        {/* Статистика */}
        <div className="flex flex-wrap items-center justify-center gap-8" style={{ marginTop: 'clamp(2.5rem, 4vh, 3rem)', gap: 'clamp(5rem, 7vw, 7rem)' }}>
          {[
            { number: 5, label: 'СТРАН' },
            { number: 27, label: 'ГОРОДОВ' },
            { number: 26350, label: 'ЗРИТЕЛЕЙ' }
          ].map((stat, index) => (
            <ScrollReveal key={index} delay={300 + index * 50}>
              <div className="flex flex-col items-center justify-center">
              <div 
                className="rounded-full flex flex-col items-center justify-center"
                style={{
                  width: 'clamp(8rem, 12.5vw, 14rem)',
                  height: 'clamp(8rem, 12.5vw, 14rem)',
                  border: '2px solid #FBC632',
                  boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.6)',
                  backgroundColor: 'transparent'
                }}
              >
                <CounterAnimation
                  end={stat.number}
                  duration={1500 + index * 500}
                  delay={index * 200}
                  style={{
                    fontFamily: "'Noto Serif Malayalam', serif",
                    fontSize: 'clamp(2rem, 3vw, 3rem)',
                    fontWeight: 400,
                    color: 'white'
                  }}
                />
                <span
                  className="uppercase mt-1"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(0.875rem, 1.125vw, 1.25rem)',
                    color: '#FBC632',
                    fontWeight: 400
                  }}
                >
                  {stat.label}
                </span>
              </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Заголовок "В ПУТЬ" */}
        <div className="text-center text-white mt-16 space-y-4">
          <p 
            className="uppercase"
            style={{ 
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.15em'
            }}
          >
            В ПУТЬ
          </p>
          <p 
            className="uppercase"
            style={{ 
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.125rem, 1.5625vw, 1.5rem)',
              color: '#D9B682',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)'
            }}
          >
            ТЕАТРАЛЬНОЕ ПУТЕШЕСТВИЕ
          </p>
        </div>
      </div>

      {/* Модальное окно с виджетом intickets для покупки билетов */}
      {isModalOpen && selectedEventUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)'
          }}
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden"
            style={{
              width: '90vw',
              height: '85vh',
              maxWidth: '1200px',
              maxHeight: '800px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[10000] bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Iframe с виджетом intickets */}
            <iframe
              key={`ticket-${selectedEventUrl}`}
              src={selectedEventUrl}
              className="w-full h-full border-0"
              style={{
                minHeight: '600px'
              }}
              allow="payment"
              title="Покупка билетов"
            />
          </div>
        </div>
      )}
    </section>
  );
}

