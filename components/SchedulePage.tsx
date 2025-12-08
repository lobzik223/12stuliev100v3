'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from './Header';
import { scheduleItems } from '../data/schedule';

export default function SchedulePage() {
  const router = useRouter();
  const [selectedScheduleUrl, setSelectedScheduleUrl] = useState<string | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const legalInfoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBuyTicket = (url: string | undefined) => {
    if (url) {
      setSelectedScheduleUrl(url);
      setIsTicketModalOpen(true);
    }
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
    setSelectedScheduleUrl(null);
  };

  // Блокируем прокрутку после раздела "Контакты" - до текста с ИНН и ОГРНИП
  useEffect(() => {
    let rafId: number | null = null;
    let isScrolling = false; // Флаг для предотвращения рекурсивных вызовов
    let maxScrollValue = 0; // Кэшируем максимальное значение скролла

    const calculateMaxScroll = () => {
      if (!legalInfoRef.current || !containerRef.current) return;
      
      // Получаем позицию нижней границы текста с ИНН/ОГРНИП
      const rect = legalInfoRef.current.getBoundingClientRect();
      const legalBottom = window.scrollY + rect.bottom;
      // Добавляем небольшой отступ снизу для визуального комфорта
      const exactHeight = Math.ceil(legalBottom + 20);
      maxScrollValue = Math.max(0, exactHeight - window.innerHeight);
      
      if (document.body && document.documentElement && containerRef.current) {
        // Устанавливаем точную высоту для body, html и контейнера
        // НЕ устанавливаем overflowY на body, чтобы избежать двойного скролла
        document.body.style.height = `${exactHeight}px`;
        document.body.style.maxHeight = `${exactHeight}px`;
        document.body.style.overflowY = 'hidden'; // Убираем скролл с body
        document.documentElement.style.height = `${exactHeight}px`;
        document.documentElement.style.maxHeight = `${exactHeight}px`;
        document.documentElement.style.overflowY = 'auto'; // Скролл только на html
        containerRef.current.style.height = `${exactHeight}px`;
        containerRef.current.style.maxHeight = `${exactHeight}px`;
        containerRef.current.style.overflow = 'hidden'; // Убираем скролл с контейнера
        // Убеждаемся, что фон тоже имеет правильную высоту и обрезается
        const bgElement = containerRef.current.querySelector('[style*="backgroundImage"]') as HTMLElement;
        if (bgElement) {
          bgElement.style.height = `${exactHeight}px`;
          bgElement.style.maxHeight = `${exactHeight}px`;
          bgElement.style.overflow = 'hidden';
        }
      }
    };

    const handleScroll = () => {
      if (!legalInfoRef.current || isScrolling) return;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        if (!legalInfoRef.current || isScrolling) {
          rafId = null;
          return;
        }

        const currentScroll = window.scrollY;
        
        // Пересчитываем максимальный скролл для точности
        const rect = legalInfoRef.current.getBoundingClientRect();
        const legalBottom = window.scrollY + rect.bottom;
        const exactHeight = Math.ceil(legalBottom + 20);
        const calculatedMaxScroll = Math.max(0, exactHeight - window.innerHeight);
        
        // Обновляем кэш
        if (maxScrollValue === 0 || Math.abs(maxScrollValue - calculatedMaxScroll) > 5) {
          maxScrollValue = calculatedMaxScroll;
        }
        
        // Проверяем, не превысил ли пользователь максимальный скролл
        // Используем погрешность в 2px для избежания дрожания
        const threshold = 2;
        if (currentScroll > maxScrollValue + threshold) {
          isScrolling = true; // Устанавливаем флаг перед скроллом
          window.scrollTo({
            top: maxScrollValue,
            behavior: 'auto'
          });
          // Сбрасываем флаг после задержки, чтобы избежать повторных вызовов
          setTimeout(() => {
            isScrolling = false;
          }, 150);
        }
        
        rafId = null;
      });
    };

    // Вычисляем высоту после загрузки контента и изображений
    const initHeight = () => {
      calculateMaxScroll();
      // Повторяем расчет после небольшой задержки для учета загрузки изображений
      setTimeout(() => {
        calculateMaxScroll();
      }, 300);
    };
    
    setTimeout(initHeight, 100);
    
    const handleResize = () => {
      maxScrollValue = 0; // Сбрасываем кэш при изменении размера
      calculateMaxScroll();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      isScrolling = false;
      if (document.body && document.documentElement) {
        document.body.style.height = '';
        document.body.style.maxHeight = '';
        document.body.style.overflowY = '';
        document.documentElement.style.height = '';
        document.documentElement.style.maxHeight = '';
        document.documentElement.style.overflowY = '';
      }
    };
  }, []);

  return (
    <div className="relative w-full bg-black" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
      {/* Шапка как в MainScreen */}
      <Header 
        isVisible={true}
        onTicketsClick={() => router.push('/')}
        onAboutClick={() => router.push('/')}
        onGalleryClick={() => router.push('/')}
        onActorsClick={() => router.push('/')}
        onTeamClick={() => router.push('/')}
        onReviewsClick={() => router.push('/')}
        onContactsClick={() => router.push('/')}
      />

      {/* Тело страницы с фоном section-4.png */}
      <div
        ref={containerRef}
        className="w-full relative"
        style={{
          paddingTop: 'clamp(3.5rem, 4.5vw, 4.5rem)',
          width: '100%'
        }}
      >
        {/* Фон раздела - растянут в длину как в разделе "В ПУТЬ", обрезается на тексте с ИНН/ОГРНИП */}
        <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/section-4.png)',
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: '0',
              left: 0,
              overflow: 'hidden',
              willChange: 'auto' // Оптимизация для браузера
            }}
          />
        </div>
        
        {/* Контент поверх фона */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto" style={{ padding: 'clamp(4rem, 8vh, 6rem) 4%' }}>
          {/* Заголовки */}
          <div className="mb-8 md:mb-12" style={{ textAlign: 'right', paddingRight: 'clamp(2rem, 5vw, 4rem)' }}>
            <p
              className="uppercase mb-4 md:mb-6"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(1.75rem, 2.75vw, 3rem)',
                color: '#FBC632',
                filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
                textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
                letterSpacing: '0.1em'
              }}
            >
              РАСПИСАНИЕ СПЕКТАКЛЕЙ
            </p>
            <p
              className="uppercase mb-4"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
                color: '#FFFFFF',
                filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
                textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
                letterSpacing: '0.05em',
                lineHeight: '1.3',
                paddingRight: 'clamp(1rem, 2vw, 2rem)'
              }}
            >
              ГДЕ МОЖНО ПОСМОТРЕТЬ
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 'clamp(1rem, 2vw, 2rem)' }}>
              <img
                src="/backgrounds/sections/logo100let.png"
                alt="12 СТУЛЬЕВ 100 лет спустя"
                style={{
                  maxWidth: 'clamp(15rem, 30vw, 25rem)',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>

          {/* Сетка карточек расписания (2 колонки, без стрелок) */}
          <div className="grid grid-cols-1 md:grid-cols-2 mt-12" style={{ gap: 'clamp(6.5rem, 10vw, 10rem) clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 'clamp(1100px, 85vw, 1400px)', margin: '0 auto' }}>
            {scheduleItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-stretch h-full"
              >
                <div
                  className="flex-1 rounded-xl border-2 border-[#FBC632] bg-[#682302] px-6 py-6 md:px-10 md:py-8"
                  style={{
                    boxShadow: '0 0 18px rgba(251, 198, 50, 0.35), 0 0 40px rgba(251, 198, 50, 0.18)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div className="w-full h-full flex flex-col justify-between text-center space-y-4 md:space-y-6">
                    <p
                      className="text-xl md:text-2xl lg:text-3xl uppercase"
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        color: '#FBC632',
                        letterSpacing: '0.08em',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Noto Serif Malayalam', serif",
                          fontSize: 'clamp(24px, 2vw, 32px)',
                          fontWeight: 400,
                          lineHeight: 'normal',
                          letterSpacing: 0,
                        }}
                      >
                        12
                      </span>
                      <span> стульев – Москва</span>
                    </p>
                    <p
                      className="text-lg md:text-xl lg:text-2xl uppercase"
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        color: '#FFFFFF',
                        letterSpacing: '0.08em',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Noto Serif Malayalam', serif",
                          fontSize: 'clamp(20px, 1.75vw, 28px)',
                          fontWeight: 400,
                          lineHeight: 'normal',
                          letterSpacing: 0,
                        }}
                      >
                        {item.date.split(' ')[0]}
                      </span>
                      <span> {item.date.split(' ')[1]} | </span>
                      <span
                        style={{
                          fontFamily: "'Noto Serif Malayalam', serif",
                          fontSize: 'clamp(20px, 1.75vw, 28px)',
                          fontWeight: 400,
                          lineHeight: 'normal',
                          letterSpacing: 0,
                        }}
                      >
                        {item.time}
                      </span>
                    </p>
                    <p
                      className="text-sm md:text-base lg:text-lg uppercase"
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        color: '#FFFFFF',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.location}&nbsp;
                      <span
                        style={{
                          fontFamily: "'Noto Serif Malayalam', serif",
                          fontSize: 'clamp(18px, 1.5vw, 24px)',
                          fontWeight: 400,
                          lineHeight: 'normal',
                          letterSpacing: 0,
                        }}
                      >
                        {item.address}
                      </span>
                    </p>

                    <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                      <button
                        onClick={() => router.push(`/details/${item.id}`)}
                        className="px-10 md:px-12 py-2 rounded-md border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
                        style={{
                          fontFamily: "'Playfair Display SC', serif",
                          fontSize: 'clamp(14px, 1vw, 16px)',
                          letterSpacing: '0.05em',
                          color: '#FBC632',
                          backgroundColor: 'transparent',
                          borderColor: '#FBC632',
                          boxShadow: '0 0 10px rgba(251, 198, 50, 0.35), 0 0 20px rgba(251, 198, 50, 0.2)',
                          whiteSpace: 'nowrap',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                        }}
                      >
                        Подробнее
                      </button>
                      <button
                        onClick={() => handleBuyTicket(item.buyTicketUrl)}
                        className="px-16 md:px-20 py-2 rounded-md border-2 transition-all duration-300 hover:scale-105"
                        style={{
                          fontFamily: "'Playfair Display SC', serif",
                          fontSize: 'clamp(14px, 1vw, 16px)',
                          letterSpacing: '0.05em',
                          color: '#682302',
                          backgroundColor: '#FBC632',
                          borderColor: '#FBC632',
                          boxShadow: '0 0 12px rgba(251, 198, 50, 0.4), 0 0 22px rgba(251, 198, 50, 0.2)',
                          whiteSpace: 'nowrap',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                        }}
                        disabled={!item.buyTicketUrl}
                      >
                        Купить билет
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Раздел "Контакты и партнёры" - Финальная секция */}
          <div 
            className="w-full flex flex-col items-center" 
            style={{ 
              marginTop: 'clamp(25rem, 45vh, 55rem)',
              paddingTop: 'clamp(4rem, 8vh, 8rem)',
              paddingBottom: 'clamp(4rem, 8vh, 8rem)',
              width: '100%', 
              paddingLeft: 'clamp(1rem, 4vw, 4rem)',
              paddingRight: 'clamp(1rem, 4vw, 4rem)'
            }}
          >
            {/* Заголовок "Контакты и партнёры" */}
            <p
              className="uppercase text-center mb-8 md:mb-12"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                color: '#FBC632',
                filter: 'drop-shadow(0 0 7.5px rgba(231, 200, 132, 0.6))',
                textShadow: '0 0 15px rgba(231, 200, 132, 0.4), 0 0 30px rgba(231, 200, 132, 0.3)',
                letterSpacing: '0.1em',
                width: '100%',
                marginBottom: 'clamp(3rem, 5vh, 5rem)'
              }}
            >
              Контакты и партнёры
            </p>
            
            {/* Блок контактов и партнёров */}
            <div className="w-full mx-auto text-white" style={{ maxWidth: 'clamp(1200px, 90vw, 1600px)' }}>
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12 xl:gap-16">
                {/* Левая колонка — контакты */}
                <div className="flex-1 w-full lg:w-auto text-center lg:text-left space-y-4" style={{ 
                  minWidth: 'clamp(250px, 25vw, 350px)',
                  maxWidth: '100%'
                }}>
                  <p
                    className="mb-4"
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: 'clamp(1.25rem, 2vw, 2rem)',
                      color: '#FFFFFF',
                      letterSpacing: '0.08em',
                      fontWeight: '600'
                    }}
                  >
                    Для связи
                  </p>
                  <div className="space-y-3">
                    <p
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
                        color: '#D9B682',
                        lineHeight: '1.6'
                      }}
                    >
                      Email:{' '}
                      <a
                        href="mailto:info@12stulyev-theater.ru"
                        className="transition-all duration-300 hover:opacity-80"
                        style={{ 
                          color: '#FBC632', 
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px'
                        }}
                      >
                        info@12stulyev-theater.ru
                      </a>
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
                        color: '#D9B682',
                        lineHeight: '1.6'
                      }}
                    >
                      Телефон:{' '}
                      <a
                        href="tel:+74951234567"
                        className="transition-all duration-300 hover:opacity-80"
                        style={{ 
                          color: '#FBC632', 
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px'
                        }}
                      >
                        +7 (495) 123-45-67
                      </a>
                    </p>
                  </div>
                </div>

                {/* Центральная колонка — логотип */}
                <div className="flex-1 flex flex-col items-center justify-center" style={{ 
                  minWidth: 'clamp(280px, 30vw, 450px)',
                  maxWidth: '100%',
                  padding: 'clamp(1rem, 2vh, 2rem) 0'
                }}>
                  <Image
                    src="/backgrounds/sections/logo100let.png"
                    alt="12 стульев — 100 лет спустя"
                    width={450}
                    height={450}
                    style={{
                      maxWidth: 'clamp(280px, 30vw, 450px)',
                      width: '100%',
                      height: 'auto',
                      filter: 'drop-shadow(0 0 20px rgba(251, 198, 50, 0.3))'
                    }}
                  />
                </div>

                {/* Правая колонка — соцсети и кнопка */}
                <div className="flex-1 w-full lg:w-auto text-center lg:text-right space-y-6" style={{ 
                  minWidth: 'clamp(250px, 25vw, 350px)',
                  maxWidth: '100%'
                }}>
                  <p
                    className="mb-4"
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: 'clamp(1.25rem, 2vw, 2rem)',
                      color: '#FFFFFF',
                      letterSpacing: '0.08em',
                      fontWeight: '600'
                    }}
                  >
                    Социальные сети
                  </p>
                  <div className="flex justify-center lg:justify-end gap-4 md:gap-5">
                    {/* Иконки соцсетей */}
                    <a
                      href="#"
                      className="rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{
                        width: 'clamp(45px, 3.5vw, 55px)',
                        height: 'clamp(45px, 3.5vw, 55px)',
                        border: '2px solid #FBC632',
                        color: '#FBC632',
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(14px, 1.2vw, 18px)',
                        boxShadow: '0 0 10px rgba(251, 198, 50, 0.3)'
                      }}
                    >
                      W
                    </a>
                    <a
                      href="#"
                      className="rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{
                        width: 'clamp(45px, 3.5vw, 55px)',
                        height: 'clamp(45px, 3.5vw, 55px)',
                        border: '2px solid #FBC632',
                        color: '#FBC632',
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(14px, 1.2vw, 18px)',
                        boxShadow: '0 0 10px rgba(251, 198, 50, 0.3)'
                      }}
                    >
                      TG
                    </a>
                    <a
                      href="#"
                      className="rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{
                        width: 'clamp(45px, 3.5vw, 55px)',
                        height: 'clamp(45px, 3.5vw, 55px)',
                        border: '2px solid #FBC632',
                        color: '#FBC632',
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(14px, 1.2vw, 18px)',
                        boxShadow: '0 0 10px rgba(251, 198, 50, 0.3)'
                      }}
                    >
                      VK
                    </a>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-6">
                    <button
                      className="rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                        letterSpacing: '0.08em',
                        color: '#FBC632',
                        backgroundColor: 'transparent',
                        borderColor: '#FBC632',
                        borderWidth: '2px',
                        boxShadow: '0 0 10px rgba(251, 198, 50, 0.35), 0 0 20px rgba(251, 198, 50, 0.2)',
                        whiteSpace: 'nowrap',
                        padding: 'clamp(0.625rem, 0.9vw, 0.75rem) clamp(1.75rem, 3vw, 3.5rem)'
                      }}
                    >
                      билеты для сотрудников
                    </button>
                  </div>
                </div>
              </div>

              {/* Нижняя строка с юридической информацией */}
              <div ref={legalInfoRef} className="text-center space-y-2 pb-4 md:pb-6" style={{ width: '100%', paddingBottom: '0', marginBottom: '0' }}>
                <p
                  style={{ 
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(0.75rem, 1vw, 1rem)',
                    color: '#D9B682',
                    lineHeight: '1.8'
                  }}
                >
                  <span style={{ color: '#D9B682' }}>ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ: </span>
                  <span style={{ color: '#FFFFFF' }}>ЛАГУТЕЕВ АЛЕКСАНДР АЛЕКСАНДРОВИЧ</span>
                </p>
                <p
                  style={{ 
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(0.75rem, 1vw, 1rem)',
                    color: '#D9B682',
                    lineHeight: '1.8'
                  }}
                >
                  <span style={{ color: '#D9B682' }}>ИНН: </span>
                  <span style={{ color: '#FFFFFF' }}>570700972948</span>
                  <span style={{ color: '#D9B682', margin: '0 0.5rem' }}>|</span>
                  <span style={{ color: '#D9B682' }}>ОГРНИП: </span>
                  <span style={{ color: '#FFFFFF' }}>324310000057680</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно с виджетом intickets для покупки билетов */}
      {isTicketModalOpen && selectedScheduleUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)'
          }}
          onClick={closeTicketModal}
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
              onClick={closeTicketModal}
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
              key={`schedule-ticket-${selectedScheduleUrl}`}
              src={selectedScheduleUrl}
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
    </div>
  );
}

