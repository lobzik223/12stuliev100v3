'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import ScrollReveal from '../ui/ScrollReveal';
import CounterAnimation from '../ui/CounterAnimation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { events } from '../../data/events';
import { isProbablyMobile } from '../utils/device';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EventsSectionProps {
  navPanelRef?: React.RefObject<HTMLDivElement>;
  activeCategory?: number;
  onViewSchedule?: () => void;
}

const EventsSection = forwardRef<HTMLDivElement, EventsSectionProps>(({ navPanelRef, activeCategory = 0, onViewSchedule }, ref) => {
  const router = useRouter();
  const [selectedEventUrl, setSelectedEventUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavPanelSticky, setIsNavPanelSticky] = useState(false);
  const isMobileUi = typeof window !== 'undefined' ? isProbablyMobile() : false;
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const journeyTextRef = useRef<HTMLDivElement>(null);
  
  // Обновляем isMobile при изменении размера окна
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  // Mobile-only: render card with fixed PNG aspect ratio (prevents real-device vh/viewport stretching)
  const renderEventCardMobile = (event: typeof events[0]) => {
    // plitkanovosti.png actual size: 1016x706
    const aspectRatio = 1016 / 706;

    return (
      <div
        className="event-card-mobile"
        style={{
          width: 'min(86vw, 360px)',
          maxWidth: '100%',
          aspectRatio: String(aspectRatio),
          position: 'relative',
          overflow: 'visible',
          zIndex: 25,
        }}
      >
        {/* Background card image - scales by width, keeps proportions */}
        <img
          src="/backgrounds/sections/plitkanovosti.png"
          alt=""
          className="event-card-mobile__bg"
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'contain',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        {/* Content overlay */}
        <div
          className="event-card-mobile__content"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            // Percent-based padding (NOT vh) => stable on real mobile when address bar changes.
            // Move content a bit UP (as requested) so it sits centered inside the PNG frame
            paddingTop: '14%',
            paddingBottom: '12%',
            paddingLeft: '10%',
            paddingRight: '10%',
            overflow: 'visible',
            boxSizing: 'border-box',
          }}
        >
          <p
            className="text-center"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(0.7rem, 2.8vw, 0.9rem)',
              color: '#682302',
              fontWeight: 400,
              lineHeight: 1.15,
              margin: 0,
              // IMPORTANT: no ellipsis / no hidden overflow => city like “КУРСК” must remain visible.
              whiteSpace: 'normal',
              overflow: 'visible',
              textOverflow: 'clip',
              width: '100%',
            }}
          >
            <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(0.85rem, 3vw, 1rem)' }}>
              {event.date}
            </span>{' '}
            {event.location}
          </p>

          {/* Move ONLY title + tickets + buttons higher (mobile only) */}
          <div
            className="event-card-mobile__lower"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // Pull this block slightly upward without affecting date/city line
              transform: isMobileUi ? 'translateY(-8%)' : 'translateY(-6%)',
            }}
          >
            <h3
              className="text-center"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(1.02rem, 4vw, 1.28rem)',
                color: '#682302',
                fontWeight: 700,
                lineHeight: 1.05,
                marginTop: isMobileUi ? '0.5%' : '4%',
                marginBottom: event.ticketsLeft === 0 ? '8%' : '3.5%',
                position: 'relative',
                width: '100%',
              }}
            >
              <span style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.5rem)', lineHeight: '1.05' }}>12</span> СТУЛЬЕВ

              {event.ticketsLeft === 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translate(-50%, 0) rotate(6deg)',
                    marginTop: '5%',
                    padding: '0.42rem 1.1rem',
                    border: '2px solid #682302',
                    borderRadius: '0.6rem',
                    backgroundColor: 'transparent',
                    boxShadow: '0 2px 8px rgba(104, 35, 2, 0.3)',
                    zIndex: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: 'clamp(0.95rem, 3.8vw, 1.1rem)',
                      fontWeight: 700,
                      color: '#DC2626',
                      margin: 0,
                      lineHeight: 1.05,
                      letterSpacing: '0.05em',
                    }}
                  >
                    ПРОДАНО
                  </p>
                </div>
              )}
            </h3>

          {event.ticketsLeft > 0 && (
            <>
              <div
                style={{
                  backgroundColor: '#682302',
                  /* Mobile: keep pill compact like desktop (no stretching) */
                  padding: '0.3rem 1.05rem',
                  borderRadius: '0.4rem',
                  boxShadow: '0 0 0.625rem rgba(251, 198, 50, 0.3)',
                  // Move tickets label + buttons a bit UP (mobile only)
                  marginBottom: '3%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'fit-content',
                  maxWidth: '92%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <p
                  className="text-white text-center"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(0.66rem, 2.6vw, 0.84rem)',
                    lineHeight: 1.1,
                    margin: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  ОСТАЛОСЬ{' '}
                  <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(0.85rem, 3vw, 1rem)' }}>
                    {event.ticketsLeft}
                  </span>{' '}
                  БИЛЕТОВ
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '0.6rem',
                  justifyContent: 'center',
                  flexWrap: 'nowrap',
                  width: '100%',
                }}
              >
                <button
                  onClick={() => handleBuyTicket(event.buyTicketUrl)}
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    backgroundColor: '#FBC632',
                    color: '#682302',
                    fontWeight: 700,
                    /* Mobile: make the BUTTON smaller in height (not by stretching) */
                    fontSize: 'clamp(0.68rem, 2.7vw, 0.84rem)',
                    padding: isMobileUi ? '0.1rem 0.52rem' : '0.24rem 0.52rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '0 0 auto',
                  }}
                  disabled={!event.buyTicketUrl}
                >
                  КУПИТЬ БИЛЕТ
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    try {
                      router.push(`/details/${event.id}`);
                    } catch (error) {
                      console.error('Navigation error:', error);
                      if (typeof window !== 'undefined') {
                        window.location.href = `/details/${event.id}`;
                      }
                    }
                  }}
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    backgroundColor: 'transparent',
                    borderColor: '#682302',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    color: '#682302',
                    fontWeight: 700,
                    /* Mobile: make the BUTTON smaller in height (not by stretching) */
                    fontSize: 'clamp(0.68rem, 2.7vw, 0.84rem)',
                    padding: isMobileUi ? '0.1rem 0.52rem' : '0.24rem 0.52rem',
                    borderRadius: '0.5rem',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '0 0 auto',
                  }}
                >
                  ПОДРОБНЕЕ
                </button>
              </div>
            </>
          )}
          </div>
        </div>
      </div>
    );
  };

  // Отслеживаем позицию навигационной панели для скрытия когда она "подхватывается"
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!navPanelRef?.current) return;

    const handleScroll = () => {
      if (!navPanelRef?.current) return;
      const rect = navPanelRef.current.getBoundingClientRect();
      // Когда панель достигает верха экрана (100px от верха) - скрываем её (она подхватывается SecondaryNav)
      setIsNavPanelSticky(rect.top <= 100);
    };

    // Ждем полной загрузки DOM
    // MOBILE SCROLL FIX: На мобильных НЕ добавляем touchmove listeners - они мешают нативному скроллу
    const initScroll = () => {
      const isMobile = isProbablyMobile();
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(() => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            // MOBILE SCROLL FIX: touchmove listener мешает нативному скроллу на мобильных
            if (!isMobile) {
              window.addEventListener('touchmove', handleScroll, { passive: true });
            }
            handleScroll();
          }, 200);
        });
      } else {
        setTimeout(() => {
          window.addEventListener('scroll', handleScroll, { passive: true });
          // MOBILE SCROLL FIX: touchmove listener мешает нативному скроллу на мобильных
          if (!isMobile) {
            window.addEventListener('touchmove', handleScroll, { passive: true });
          }
          handleScroll();
        }, 200);
      }
    };

    initScroll();

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
        // MOBILE SCROLL FIX: touchmove listener не добавлялся на мобильных, поэтому не удаляем
        const isMobile = isProbablyMobile();
        if (!isMobile) {
          window.removeEventListener('touchmove', handleScroll);
        }
      }
    };
  }, [navPanelRef]);

  // Анимация появления карточек и текста при скролле для ПК версии
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isMobileUi) return; // Только для ПК версии
    
    const cardsContainer = cardsContainerRef.current;
    const journeyText = journeyTextRef.current;
    
    if (!cardsContainer || !journeyText) return;

    // Анимация для карточек - появляются вместе, когда доскроллили до них
    const cards = Array.from(cardsContainer.children);
    gsap.set(cards, { opacity: 0, y: 50 });
    
    ScrollTrigger.create({
      trigger: cardsContainer,
      start: 'top center',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    });

    // Анимация для текста "В ПУТЬ" - появляется когда доскроллили до него
    gsap.set(journeyText, { opacity: 0, y: 30 });
    
    ScrollTrigger.create({
      trigger: journeyText,
      start: 'top center',
      once: true,
      onEnter: () => {
        gsap.to(journeyText, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === cardsContainer || trigger.vars.trigger === journeyText) {
          trigger.kill();
        }
      });
    };
  }, [isMobileUi]);

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

  // Скрываем header при открытии модального окна на мобильных (БЕЗ блокировки скролла)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isModalOpen && isMobile) {
      // Скрываем header и все его элементы на мобильных
      const header = document.querySelector('header');
      const hamburgerButton = document.querySelector('.mobile-hamburger-button');
      const secondaryNav = document.querySelector('.secondary-nav');
      
      if (header) {
        (header as HTMLElement).style.display = 'none';
        (header as HTMLElement).style.visibility = 'hidden';
        (header as HTMLElement).style.opacity = '0';
        (header as HTMLElement).style.pointerEvents = 'none';
      }
      if (hamburgerButton) {
        (hamburgerButton as HTMLElement).style.display = 'none';
        (hamburgerButton as HTMLElement).style.visibility = 'hidden';
        (hamburgerButton as HTMLElement).style.opacity = '0';
        (hamburgerButton as HTMLElement).style.pointerEvents = 'none';
      }
      if (secondaryNav) {
        (secondaryNav as HTMLElement).style.display = 'none';
        (secondaryNav as HTMLElement).style.visibility = 'hidden';
        (secondaryNav as HTMLElement).style.opacity = '0';
        (secondaryNav as HTMLElement).style.pointerEvents = 'none';
      }
      
      return () => {
        // Показываем header обратно
        if (header) {
          (header as HTMLElement).style.display = '';
          (header as HTMLElement).style.visibility = '';
          (header as HTMLElement).style.opacity = '';
          (header as HTMLElement).style.pointerEvents = '';
        }
        if (hamburgerButton) {
          (hamburgerButton as HTMLElement).style.display = '';
          (hamburgerButton as HTMLElement).style.visibility = '';
          (hamburgerButton as HTMLElement).style.opacity = '';
          (hamburgerButton as HTMLElement).style.pointerEvents = '';
        }
        if (secondaryNav) {
          (secondaryNav as HTMLElement).style.display = '';
          (secondaryNav as HTMLElement).style.visibility = '';
          (secondaryNav as HTMLElement).style.opacity = '';
          (secondaryNav as HTMLElement).style.pointerEvents = '';
        }
      };
    } else if (!isModalOpen && isMobile) {
      // Показываем header обратно при закрытии модального окна
      const header = document.querySelector('header');
      const hamburgerButton = document.querySelector('.mobile-hamburger-button');
      const secondaryNav = document.querySelector('.secondary-nav');
      
      if (header) {
        (header as HTMLElement).style.display = '';
        (header as HTMLElement).style.visibility = '';
        (header as HTMLElement).style.opacity = '';
        (header as HTMLElement).style.pointerEvents = '';
      }
      if (hamburgerButton) {
        (hamburgerButton as HTMLElement).style.display = '';
        (hamburgerButton as HTMLElement).style.visibility = '';
        (hamburgerButton as HTMLElement).style.opacity = '';
        (hamburgerButton as HTMLElement).style.pointerEvents = '';
      }
      if (secondaryNav) {
        (secondaryNav as HTMLElement).style.display = '';
        (secondaryNav as HTMLElement).style.visibility = '';
        (secondaryNav as HTMLElement).style.opacity = '';
        (secondaryNav as HTMLElement).style.pointerEvents = '';
      }
    }
  }, [isModalOpen, isMobile]);

  // Функция для рендеринга карточки события
  const renderEventCard = (event: typeof events[0], withScrollReveal = false) => {
    // Mobile-only: use safe aspect-ratio card. No vh-based layout.
    if (isMobileUi) {
      return renderEventCardMobile(event);
    }

    const cardContent = (
      <div
        className="relative w-full event-card-wrapper"
        style={{
          // Финальные размеры для мобилки задаём в globals.css через .event-card-wrapper (force-mobile / max-device-width)
          // чтобы iOS/Safari не ломал логику по innerWidth.
          maxWidth: '100%',
          overflow: 'visible',
        }}
      >
        <div className="relative w-full h-auto" style={{ overflow: 'visible' }}>
          <div
            className="event-card-bg"
            style={{
              backgroundImage: 'url(/backgrounds/sections/plitkanovosti.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '100%',
              // Мобильный размер правим в CSS через .event-card-bg (force-mobile / max-device-width)
              paddingTop: 'clamp(140%, 160%, 180%)',
            }}
          />
          <div
            className="absolute inset-0 flex flex-col event-card-content"
            style={{
              // Мобильный padding-top правим в CSS через .event-card-content (force-mobile / max-device-width)
              paddingTop: 'clamp(12rem, 20vh, 18.5rem)',
              paddingBottom: 'clamp(1.2rem, 2vh, 2rem)',
              paddingLeft: 'clamp(1.2rem, 2vw, 2rem)',
              paddingRight: 'clamp(1.2rem, 2vw, 2rem)',
              overflow: 'visible',
            }}
          >
          <p 
            className="text-center event-card-date"
            style={{ 
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)',
              color: '#682302',
              fontWeight: '400',
              lineHeight: '1.2',
              marginTop: 'clamp(0.8rem, 1.8vh, 1.5rem)',
              marginBottom: 'clamp(0.1rem, 0.3vh, 0.3rem)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              wordWrap: 'break-word'
            }}
          >
            <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(0.75rem, 1vw, 0.95rem)', lineHeight: '1.2' }}>{event.date}</span>
            {' '}{event.location}
          </p>
          <h3 
            className="text-center event-card-title"
            style={{ 
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
              color: '#682302',
              fontWeight: '700',
              lineHeight: '1.15',
              textShadow: '0 0 0.5rem rgba(104, 35, 2, 0.4)',
              marginBottom: event.ticketsLeft === 0 ? 'clamp(1rem, 1.6vh, 1.6rem)' : 'clamp(0.25rem, 0.5vh, 0.5rem)',
              position: 'relative',
              overflow: 'visible',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              wordWrap: 'break-word'
            }}
          >
            <span style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.7rem)', lineHeight: '1.15' }}>12</span> СТУЛЬЕВ
            {event.ticketsLeft === 0 && (
              <div
                className="sold-out-badge"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translate(-50%, 0) rotate(8deg)',
                  marginTop: 'clamp(0.6rem, 0.9vh, 0.9rem)',
                  padding: 'clamp(0.4rem, 0.6vw, 0.5rem) clamp(1.2rem, 1.8vw, 1.5rem)',
                  border: '2px solid #682302',
                  borderRadius: 'clamp(0.5rem, 0.7vw, 0.6rem)',
                  backgroundColor: 'transparent',
                  boxShadow: '0 2px 8px rgba(104, 35, 2, 0.3)',
                  zIndex: 10,
                  whiteSpace: 'nowrap'
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                    fontWeight: '700',
                    color: '#DC2626',
                    margin: 0,
                    lineHeight: '1.1',
                    whiteSpace: 'nowrap',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                    letterSpacing: '0.05em'
                  }}
                >
                  ПРОДАНО
                </p>
              </div>
            )}
          </h3>
          {event.ticketsLeft > 0 && (
            <>
              <div 
                className="rounded w-fit mx-auto"
                style={{ 
                  backgroundColor: '#682302',
                  padding: '0.3rem 1.1rem',
                  boxShadow: '0 0 0.625rem rgba(251, 198, 50, 0.3)',
                  marginBottom: 'clamp(0.3rem, 0.5vh, 0.5rem)',
                  maxWidth: '90%'
                }}
              >
                <p 
                  className="text-white text-center"
                  style={{ 
                    fontFamily: "'Playfair Display SC', serif", 
                    fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)',
                    lineHeight: '1.2',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  ОСТАЛОСЬ{' '}
                  <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(0.75rem, 1vw, 0.95rem)', lineHeight: '1.2' }}>{event.ticketsLeft}</span>
                  {' '}БИЛЕТОВ
                </p>
              </div>
              <div className="flex gap-2 justify-center flex-wrap" style={{ marginTop: 'clamp(0.1rem, 0.3vh, 0.3rem)' }}>
                <button
                  onClick={() => handleBuyTicket(event.buyTicketUrl)}
                  className="rounded transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    backgroundColor: '#FBC632',
                    color: '#682302',
                    fontWeight: '700',
                    fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)',
                    padding: 'clamp(0.25rem, 0.4rem, 0.3rem) clamp(0.5rem, 0.6rem, 0.6rem)',
                    boxShadow: '0 0 0.5rem rgba(220, 38, 38, 0.4)',
                    border: 'none',
                    whiteSpace: 'nowrap'
                  }}
                  disabled={!event.buyTicketUrl}
                >
                  КУПИТЬ БИЛЕТ
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    try {
                      router.push(`/details/${event.id}`);
                    } catch (error) {
                      console.error('Navigation error:', error);
                      // Fallback на window.location для мобильных
                      if (typeof window !== 'undefined') {
                        window.location.href = `/details/${event.id}`;
                      }
                    }
                  }}
                  className="rounded border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    backgroundColor: 'transparent',
                    borderColor: '#682302',
                    color: '#682302',
                    fontWeight: '700',
                    fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)',
                    padding: 'clamp(0.25rem, 0.4rem, 0.3rem) clamp(0.5rem, 0.6rem, 0.6rem)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  ПОДРОБНЕЕ
                </button>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    );

    if (withScrollReveal) {
      return (
        <ScrollReveal key={event.id} delay={(event.id - 1) * 150}>
          {cardContent}
        </ScrollReveal>
      );
    }

    return cardContent;
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
      {/* Затемнение сверху EventsSection для плавного перехода от section-1.png */}
      <div 
        className="absolute top-0 left-0 right-0 w-full"
        style={{
          height: '6vh',
          width: '100%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 15%, rgba(0, 0, 0, 0.85) 35%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      <div className="w-full max-w-[87.5rem]" style={{ position: 'relative', zIndex: 10 }}>
        {/* Карточки - Grid для десктопа, Swiper для мобильных */}
        {/* Десктопная версия - Grid (скрыта на мобильных) */}
        <div 
          ref={cardsContainerRef}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" 
          style={{ marginTop: 'clamp(-12rem, -18vh, -15rem)', position: 'relative', zIndex: 10, filter: 'none' }}
        >
          {events.map((event) => renderEventCard(event, false))}
        </div>

        {/* Мобильная версия - Swiper карусель (скрыта на десктопе) */}
        <div
          className="md:hidden relative w-full"
          style={{
            // Mobile real devices: avoid vh-based negative offsets (address bar changes => jumps/clipping)
            marginTop: isMobileUi ? '0' : 'clamp(-12rem, -18vh, -15rem)',
            position: 'relative',
            zIndex: 20,
            filter: 'none',
            overflow: 'visible',
          }}
        >
          <Swiper
            modules={[Navigation]}
            speed={800}
            spaceBetween={20}
            loop={true}
            slidesPerView={1}
            slidesPerGroup={1}
            centeredSlides={false}
            grabCursor={true}
            navigation={{
              nextEl: '.swiper-button-next-events',
              prevEl: '.swiper-button-prev-events',
            }}
            className="events-carousel"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <div className="flex justify-center items-center w-full">
                  {renderEventCard(event, false)}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Кнопки навигации Swiper для мобильных */}
          <div 
            className="swiper-button-prev swiper-button-prev-events" 
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: '0.5rem',
              right: 'auto',
              zIndex: 200,
              width: '44px',
              height: '44px',
              pointerEvents: 'auto',
            }}
          ></div>
          <div 
            className="swiper-button-next swiper-button-next-events" 
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '0.5rem',
              left: 'auto',
              zIndex: 200,
              width: '44px',
              height: '44px',
              pointerEvents: 'auto',
            }}
          ></div>
        </div>

        {/* Кнопка расписания */}
        <div
          className="w-full flex justify-center px-4 schedule-button-container"
          style={{
            // Mobile: button closer to card (reduced margin)
            marginTop: isMobileUi ? 'clamp(0.5rem, 1vh, 0.75rem)' : 'clamp(-6rem, -10vh, -7rem)',
            position: 'relative',
            zIndex: 30,
          }}
        >
          <ScrollReveal delay={450}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Кнопка нажата, onViewSchedule:', onViewSchedule);
                if (onViewSchedule) {
                  onViewSchedule();
                } else {
                  try {
                    router.push('/schedule');
                  } catch (error) {
                    console.error('Navigation error:', error);
                    // Fallback на window.location для мобильных
                    if (typeof window !== 'undefined') {
                      window.location.href = '/schedule';
                    }
                  }
                }
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              className="rounded-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(0.875rem, 1.5vw, 1.25rem)',
                letterSpacing: '0.0625rem',
                color: 'white',
                backgroundColor: '#682302',
                borderColor: '#FBC632',
                borderWidth: '3px',
                padding: 'clamp(0.5rem, 0.75vw, 0.625rem) clamp(2rem, 8vw, 7.5rem)',
                boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.4)',
                pointerEvents: 'auto',
                cursor: 'pointer',
                zIndex: 100,
                position: 'relative',
                whiteSpace: 'nowrap'
              }}
            >
              ПОСМОТРЕТЬ РАСПИСАНИЕ
            </button>
          </ScrollReveal>
        </div>

        {/* Логотип и статистика */}
        <ScrollReveal delay={200}>
          <div className={`${isMobileUi ? 'mt-14' : 'mt-16'} flex justify-center`}>
            {isMobileUi ? (
              <img
                className="events-logo100let-img"
                src="/backgrounds/sections/logo100let.png"
                alt=""
                loading="eager"
                style={{
                  display: 'block',
                  height: 'auto',
                  maxWidth: '100%',
                  filter: 'drop-shadow(0 0 1.25rem rgba(255,255,255,0.3))',
                }}
              />
            ) : (
              <div
                className="events-logo100let"
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
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <div className="text-center text-white events-subtitle-block" style={{ marginTop: 'clamp(-4rem, -5vh, -3.5rem)' }}>
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
        <div className="flex items-center justify-center gap-8" style={{ marginTop: 'clamp(2.5rem, 4vh, 3rem)', gap: isMobileUi ? 'clamp(2rem, 3vw, 3.5rem)' : 'clamp(3rem, 5vw, 5rem)', flexWrap: 'nowrap' }}>
          {[
            { number: 5, label: 'СТРАН' },
            { number: 27, label: 'ГОРОДОВ' },
            { number: 26350, label: 'ЗРИТЕЛЕЙ' }
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <div 
                className="rounded-full flex flex-col items-center justify-center"
                style={{
                  width: isMobileUi ? 'clamp(6rem, 8vw, 10rem)' : 'clamp(7rem, 9vw, 12rem)',
                  height: isMobileUi ? 'clamp(6rem, 8vw, 10rem)' : 'clamp(7rem, 9vw, 12rem)',
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
                    fontSize: isMobileUi ? 'clamp(1.5rem, 2.5vw, 2.5rem)' : 'clamp(1.5rem, 2.25vw, 2.5rem)',
                    fontWeight: 400,
                    color: 'white'
                  }}
                />
                <span
                  className="uppercase mt-1"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: isMobileUi ? 'clamp(0.75rem, 1vw, 1rem)' : 'clamp(0.7rem, 0.95vw, 0.95rem)',
                    color: '#FBC632',
                    fontWeight: 400
                  }}
                >
                  {stat.label}
                </span>
              </div>
              </div>
          ))}
        </div>

        {/* Заголовок "В ПУТЬ" */}
        <div ref={journeyTextRef} className="text-center text-white mt-16 space-y-4">
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

        {/* Навигационная панель под текстом "ТЕАТРАЛЬНОЕ ПУТЕШЕСТВИЕ" */}
        <div 
          ref={navPanelRef} 
          className={`hidden md:flex w-full justify-center mt-8 transition-opacity duration-300 ${
            isNavPanelSticky ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="relative w-full mx-auto" style={{ maxWidth: '98vw', padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.5%, 1vw, 1%)' }}>
            <div className="relative w-full" style={{ height: 'clamp(4rem, 5vw, 5rem)' }}>
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1728 81"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter
                    id="filter0_d_events"
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
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_events" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_events" result="shape" />
                  </filter>
                </defs>
                <g filter="url(#filter0_d_events)">
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
        </div>
      </div>

      {/* Модальное окно с виджетом intickets для покупки билетов */}
      {isModalOpen && selectedEventUrl && (
        <>
          {/* Desktop версия - рендерим как обычно */}
          {!isMobile && (
            <div
              className="fixed inset-0 z-[9999]"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(5px)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh'
              }}
              onClick={closeModal}
            >
              <div
                className="relative bg-white overflow-hidden"
                style={{
                  width: '90vw',
                  height: '85vh',
                  maxWidth: '1200px',
                  maxHeight: '800px',
                  borderRadius: '0.5rem',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  margin: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Кнопка закрытия - черный крестик в белом круге */}
                <button
                  onClick={closeModal}
                  className="absolute z-[10000] bg-white rounded-full transition-all hover:bg-gray-100"
                  style={{
                    top: '1rem',
                    right: '1rem',
                    width: '2.5rem',
                    height: '2.5rem',
                    padding: '0.5rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                {/* Iframe с виджетом intickets */}
                <iframe
                  key={`ticket-${selectedEventUrl}-${Date.now()}`}
                  src={selectedEventUrl}
                  className="w-full border-0"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '600px',
                    flex: '1',
                    display: 'block',
                    border: 'none'
                  }}
                  allow="payment"
                  allowFullScreen
                  title="Покупка билетов"
                />
              </div>
            </div>
          )}

          {/* Mobile версия - рендерим через Portal в document.body */}
          {isMobile && typeof document !== 'undefined' && createPortal(
            <div
              className="intickets-mobile-overlay"
              onClick={closeModal}
            >
              <div
                className="intickets-mobile-modal"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Кнопка закрытия - черный крестик в белом круге */}
                <button
                  onClick={closeModal}
                  className="absolute z-[10000] bg-white rounded-full transition-all hover:bg-gray-100"
                  style={{
                    top: 'clamp(0.5rem, 1.5vh, 0.75rem)',
                    right: 'clamp(0.5rem, 1.5vh, 0.75rem)',
                    width: 'clamp(2.5rem, 6vw, 3rem)',
                    height: 'clamp(2.5rem, 6vw, 3rem)',
                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <svg
                    width="clamp(20px, 5vw, 24px)"
                    height="clamp(20px, 5vw, 24px)"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                {/* Iframe с виджетом intickets */}
                <iframe
                  key={`ticket-${selectedEventUrl}-${Date.now()}`}
                  src={selectedEventUrl}
                  className="w-full border-0"
                  style={{
                    width: '100%',
                    height: 'calc(100dvh - 24px - clamp(3.5rem, 7vh, 4.5rem))',
                    minHeight: 'calc(100dvh - 24px - clamp(3.5rem, 7vh, 4.5rem))',
                    flex: '1',
                    display: 'block',
                    border: 'none'
                  }}
                  allow="payment"
                  allowFullScreen
                  title="Покупка билетов"
                />
              </div>
            </div>,
            document.body
          )}
        </>
      )}
    </section>
  );
});

EventsSection.displayName = 'EventsSection';

export default EventsSection;

