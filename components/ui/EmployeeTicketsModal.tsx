'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { isProbablyMobile } from '../utils/device';

interface EmployeeTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmployeeTicketsModal({ isOpen, onClose }: EmployeeTicketsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' ? isProbablyMobile() : false;

  // Закрытие по ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Блокировка скролла фона и скрытие header
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('employee-tickets-modal-open');
      // Скрываем header и все его элементы напрямую
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
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('employee-tickets-modal-open');
      // Показываем header обратно
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
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('employee-tickets-modal-open');
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
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - скрываем на мобильной версии, так как модальное окно на весь экран */}
      {!isMobile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          style={{
            animation: 'fadeIn 0.3s ease-out',
            zIndex: 100000,
          }}
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 flex items-center justify-center"
        style={{
          pointerEvents: 'none',
          zIndex: 100001,
          padding: '0',
        }}
        onClick={(e) => {
          if (e.target === modalRef.current && !isMobile) {
            onClose();
          }
        }}
      >
        <div
          ref={contentRef}
          className="relative"
          style={{
            pointerEvents: 'auto',
            animation: 'slideUp 0.4s ease-out',
            width: '100vw',
            maxWidth: '100vw',
            height: '100vh',
            maxHeight: '100vh',
            borderRadius: '0',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Image */}
          <div
            className="relative w-full h-full employee-tickets-modal-bg"
            style={{
              backgroundImage: 'url(/backgrounds/sections/fonsotrud.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100vw',
              height: '100vh',
              minHeight: '100vh',
              padding: isMobile ? 'clamp(2.5rem, 5vh, 3.5rem) clamp(1rem, 3vw, 1.5rem)' : 'clamp(2rem, 3vh, 3rem) clamp(2rem, 3vw, 3rem)',
              paddingTop: isMobile ? 'clamp(3rem, 5vh, 4rem)' : 'clamp(2rem, 3vh, 3rem)',
              paddingBottom: isMobile ? 'clamp(3rem, 5vh, 4rem)' : 'clamp(2rem, 3vh, 3rem)',
              boxSizing: 'border-box',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                top: isMobile ? '0.75rem' : '1rem',
                right: isMobile ? '0.75rem' : '1rem',
                width: isMobile ? '2rem' : '2.5rem',
                height: isMobile ? '2rem' : '2.5rem',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: '2px solid #FBC632',
                color: '#FBC632',
                cursor: 'pointer',
                zIndex: 100002,
              }}
              aria-label="Закрыть"
            >
              <span style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', lineHeight: 1 }}>×</span>
            </button>

            {/* Content Container */}
            <div 
              className="relative w-full h-full flex flex-col items-center" 
              style={{ 
                justifyContent: 'center',
                overflow: 'hidden',
                maxHeight: '100vh',
                padding: 0,
                margin: 0,
              }}
            >
              {/* Logo - показываем на всех версиях */}
              <div
                className="mb-3"
                style={{
                  width: isMobile ? 'clamp(10rem, 50vw, 14rem)' : 'clamp(12rem, 15vw, 16rem)',
                  height: isMobile ? 'clamp(6rem, 30vw, 9rem)' : 'clamp(7rem, 10vw, 10rem)',
                  position: 'relative',
                  marginTop: isMobile ? 'clamp(0.5rem, 1vh, 1rem)' : '0',
                  marginBottom: isMobile ? 'clamp(1rem, 2vh, 1.5rem)' : 'clamp(0.5rem, 1vh, 0.75rem)',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/backgrounds/sections/logo100let.png"
                  alt="12 Стульев 100 лет спустя"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                  priority
                />
              </div>

              {/* Title - увеличенный размер для мобильной версии */}
              <h2
                className="text-center mb-2"
                style={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: isMobile ? 'clamp(1.1rem, 4.5vw, 1.5rem)' : 'clamp(1.3rem, 1.8vw, 1.7rem)',
                  color: '#FBC632',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.6), 0 0 1.875rem rgba(251, 198, 50, 0.4)',
                  filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
                  marginTop: isMobile ? 'clamp(0.5rem, 1vh, 0.75rem)' : '0',
                  marginBottom: isMobile ? 'clamp(0.5rem, 1.5vh, 0.75rem)' : 'clamp(0.5rem, 1vh, 0.75rem)',
                  lineHeight: 1.2,
                  flexShrink: 0,
                }}
              >
                БИЛЕТЫ ДЛЯ СОТРУДНИКОВ
              </h2>

              {/* Decorative Line - показываем на всех версиях, но тоньше на мобильной */}
              <div
                className="w-full flex items-center justify-center mb-3"
                style={{
                  marginBottom: isMobile ? 'clamp(0.75rem, 1.5vh, 1rem)' : 'clamp(0.75rem, 1.5vh, 1rem)',
                  padding: isMobile ? '0 clamp(0.75rem, 2vw, 1.5rem)' : '0 clamp(1rem, 3vw, 2.5rem)',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: isMobile ? '1px' : '2px',
                    background: 'linear-gradient(to right, transparent, #FBC632, transparent)',
                    boxShadow: '0 0 0.625rem rgba(251, 198, 50, 0.6), 0 0 1.25rem rgba(251, 198, 50, 0.4)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: isMobile ? 'clamp(1rem, 2vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2rem)',
                      height: isMobile ? 'clamp(1rem, 2vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2rem)',
                      background: 'radial-gradient(circle, #FBC632 0%, transparent 70%)',
                      borderRadius: '50%',
                      boxShadow: '0 0 1rem rgba(251, 198, 50, 0.8)',
                    }}
                  />
                </div>
              </div>

              {/* Main Title - увеличенный размер для мобильной версии */}
              <h3
                className="text-center mb-1"
                style={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: isMobile ? 'clamp(0.9rem, 3.5vw, 1.15rem)' : 'clamp(1.1rem, 1.6vw, 1.3rem)',
                  color: '#FFFFFF',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  marginBottom: isMobile ? 'clamp(0.4rem, 1vh, 0.6rem)' : 'clamp(0.3rem, 0.8vh, 0.5rem)',
                  lineHeight: 1.25,
                  padding: isMobile ? '0 clamp(0.75rem, 2vw, 1.25rem)' : '0 clamp(0.5rem, 1.5vw, 1rem)',
                  flexShrink: 0,
                }}
              >
                {isMobile ? (
                  <>
                    Корпоративные посещения на{' '}
                    <span
                      style={{
                        color: '#FBC632',
                        fontSize: 'clamp(1rem, 4vw, 1.3rem)',
                        textShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.6), 0 0 1.875rem rgba(251, 198, 50, 0.4)',
                      }}
                    >
                      12 СТУЛЬЕВ
                    </span>
                  </>
                ) : (
                  <>
                    Корпоративные посещения на{' '}
                    <span
                      style={{
                        color: '#FBC632',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        textShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.6), 0 0 1.875rem rgba(251, 198, 50, 0.4)',
                      }}
                    >
                      12 СТУЛЬЕВ
                    </span>
                  </>
                )}
              </h3>

              {/* Subtitle - увеличенный размер для мобильной версии */}
              <p
                className="text-center mb-4"
                style={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: isMobile ? 'clamp(0.75rem, 2.8vw, 0.95rem)' : 'clamp(0.8rem, 1.1vw, 0.9rem)',
                  color: '#FFFFFF',
                  letterSpacing: '0.03em',
                  lineHeight: 1.4,
                  marginBottom: isMobile ? 'clamp(1rem, 2.5vh, 1.5rem)' : 'clamp(0.75rem, 1.5vh, 1rem)',
                  padding: isMobile ? '0 clamp(0.75rem, 2vw, 1.5rem)' : '0 clamp(0.5rem, 1.5vw, 1.25rem)',
                  flexShrink: 0,
                }}
              >
                Идеально для корпоративных групп и больших компаний
              </p>

              {/* Three Columns - на мобильной версии с улучшенными отступами */}
              <div
                className={isMobile ? 'grid grid-cols-3 gap-2 w-full mb-4' : 'grid grid-cols-1 md:grid-cols-3 gap-3 w-full mb-4'}
                style={{
                  gap: isMobile ? 'clamp(0.5rem, 2vw, 1rem)' : 'clamp(1rem, 2vw, 1.5rem)',
                  marginBottom: isMobile ? 'clamp(1rem, 2.5vh, 1.5rem)' : 'clamp(0.75rem, 1.5vh, 1rem)',
                  padding: isMobile ? '0 clamp(0.5rem, 1.5vw, 0.75rem)' : '0 clamp(0.25rem, 1.5vw, 1.25rem)',
                  flexShrink: 0,
                }}
              >
                {/* Column 1 */}
                <div className="text-center" style={{ padding: isMobile ? 'clamp(0.5rem, 1vh, 0.75rem) 0' : '0' }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.85rem, 3.2vw, 1.1rem)' : 'clamp(1.2rem, 1.6vw, 1.5rem)',
                      color: '#FBC632',
                      fontWeight: 400,
                      marginBottom: isMobile ? 'clamp(0.3rem, 0.8vh, 0.5rem)' : 'clamp(0.5rem, 1vh, 0.75rem)',
                      textShadow: '0 0 0.625rem rgba(251, 198, 50, 0.6)',
                      lineHeight: 1.2,
                    }}
                  >
                    {isMobile ? 'Скидка' : 'Скидка 5%'}
                  </div>
                  {isMobile && (
                    <div
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(1.1rem, 4.5vw, 1.5rem)',
                        color: '#FBC632',
                        fontWeight: 400,
                        marginBottom: 'clamp(0.4rem, 1vh, 0.6rem)',
                        textShadow: '0 0 0.625rem rgba(251, 198, 50, 0.6)',
                        lineHeight: 1.2,
                      }}
                    >
                      5%
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.65rem, 2.5vw, 0.85rem)' : 'clamp(0.7rem, 0.9vw, 0.8rem)',
                      color: '#FFFFFF',
                      marginBottom: isMobile ? 'clamp(0.5rem, 1.2vh, 0.75rem)' : 'clamp(0.5rem, 1vh, 0.75rem)',
                      lineHeight: 1.35,
                    }}
                  >
                    {isMobile ? 'От 50 до 100' : 'При покупке от 50 до 100 билетов'}
                  </div>
                  {/* Decorative Line - скрываем на мобильной версии */}
                  {!isMobile && (
                    <div className="flex items-center justify-center mb-3" style={{ marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
                      <div
                        style={{
                          width: '80%',
                          height: '1px',
                          background: 'linear-gradient(to right, transparent, #FBC632, transparent)',
                          boxShadow: '0 0 0.5rem rgba(251, 198, 50, 0.5)',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'clamp(1rem, 2vw, 1.5rem)',
                            height: 'clamp(1rem, 2vw, 1.5rem)',
                            background: 'radial-gradient(circle, #FBC632 0%, transparent 70%)',
                            borderRadius: '50%',
                            boxShadow: '0 0 0.75rem rgba(251, 198, 50, 0.7)',
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.7rem, 2.8vw, 0.9rem)' : 'clamp(0.75rem, 1vw, 0.85rem)',
                      color: '#FBC632',
                      fontWeight: 400,
                      marginBottom: isMobile ? 'clamp(0.3rem, 0.8vh, 0.5rem)' : 'clamp(0.3rem, 0.8vh, 0.5rem)',
                    }}
                  >
                    {isMobile ? 'Сопровождение' : 'Сопровождение'}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.6rem, 2.2vw, 0.8rem)' : 'clamp(0.65rem, 0.85vw, 0.75rem)',
                      color: '#FFFFFF',
                      lineHeight: 1.4,
                    }}
                  >
                    {isMobile ? 'Персональный мессенджер' : 'Персональный мессенджер для вашей группы'}
                  </div>
                </div>

                {/* Column 2 */}
                <div className="text-center" style={{ padding: isMobile ? 'clamp(0.5rem, 1vh, 0.75rem) 0' : '0' }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.85rem, 3.2vw, 1.1rem)' : 'clamp(1.2rem, 1.6vw, 1.5rem)',
                      color: '#FBC632',
                      fontWeight: 400,
                      marginBottom: isMobile ? 'clamp(0.3rem, 0.8vh, 0.5rem)' : 'clamp(0.5rem, 1vh, 0.75rem)',
                      textShadow: '0 0 0.625rem rgba(251, 198, 50, 0.6)',
                      lineHeight: 1.2,
                    }}
                  >
                    {isMobile ? 'Скидка' : 'Скидка 10%'}
                  </div>
                  {isMobile && (
                    <div
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(1.1rem, 4.5vw, 1.5rem)',
                        color: '#FBC632',
                        fontWeight: 400,
                        marginBottom: 'clamp(0.4rem, 1vh, 0.6rem)',
                        textShadow: '0 0 0.625rem rgba(251, 198, 50, 0.6)',
                        lineHeight: 1.2,
                      }}
                    >
                      10%
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.65rem, 2.5vw, 0.85rem)' : 'clamp(0.7rem, 0.9vw, 0.8rem)',
                      color: '#FFFFFF',
                      marginBottom: isMobile ? 'clamp(0.5rem, 1.2vh, 0.75rem)' : 'clamp(0.5rem, 1vh, 0.75rem)',
                      lineHeight: 1.35,
                    }}
                  >
                    {isMobile ? 'От 100 до 200' : 'При покупке от 100 до 200 билетов'}
                  </div>
                  {/* Decorative Line - скрываем на мобильной версии */}
                  {!isMobile && (
                    <div className="flex items-center justify-center mb-3" style={{ marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
                      <div
                        style={{
                          width: '80%',
                          height: '1px',
                          background: 'linear-gradient(to right, transparent, #FBC632, transparent)',
                          boxShadow: '0 0 0.5rem rgba(251, 198, 50, 0.5)',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'clamp(1rem, 2vw, 1.5rem)',
                            height: 'clamp(1rem, 2vw, 1.5rem)',
                            background: 'radial-gradient(circle, #FBC632 0%, transparent 70%)',
                            borderRadius: '50%',
                            boxShadow: '0 0 0.75rem rgba(251, 198, 50, 0.7)',
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.7rem, 2.8vw, 0.9rem)' : 'clamp(0.75rem, 1vw, 0.85rem)',
                      color: '#FBC632',
                      fontWeight: 400,
                      marginBottom: isMobile ? 'clamp(0.3rem, 0.8vh, 0.5rem)' : 'clamp(0.3rem, 0.8vh, 0.5rem)',
                    }}
                  >
                    {isMobile ? 'Специальное предложение' : 'Специальное предложение'}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.6rem, 2.2vw, 0.8rem)' : 'clamp(0.65rem, 0.85vw, 0.75rem)',
                      color: '#FFFFFF',
                      lineHeight: 1.4,
                    }}
                  >
                    {isMobile ? 'Выгодные условия' : 'Выгодные условия для корпоративных клиентов'}
                  </div>
                </div>

                {/* Column 3 */}
                <div className="text-center" style={{ padding: isMobile ? 'clamp(0.5rem, 1vh, 0.75rem) 0' : '0' }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.85rem, 3.2vw, 1.1rem)' : 'clamp(1.2rem, 1.6vw, 1.5rem)',
                      color: '#FBC632',
                      fontWeight: 400,
                      marginBottom: isMobile ? 'clamp(0.3rem, 0.8vh, 0.5rem)' : 'clamp(0.5rem, 1vh, 0.75rem)',
                      textShadow: '0 0 0.625rem rgba(251, 198, 50, 0.6)',
                      lineHeight: 1.2,
                    }}
                  >
                    {isMobile ? 'Скидка' : 'Скидка 15%'}
                  </div>
                  {isMobile && (
                    <div
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(1.1rem, 4.5vw, 1.5rem)',
                        color: '#FBC632',
                        fontWeight: 400,
                        marginBottom: 'clamp(0.4rem, 1vh, 0.6rem)',
                        textShadow: '0 0 0.625rem rgba(251, 198, 50, 0.6)',
                        lineHeight: 1.2,
                      }}
                    >
                      15%
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.65rem, 2.5vw, 0.85rem)' : 'clamp(0.7rem, 0.9vw, 0.8rem)',
                      color: '#FFFFFF',
                      marginBottom: isMobile ? 'clamp(0.5rem, 1.2vh, 0.75rem)' : 'clamp(0.5rem, 1vh, 0.75rem)',
                      lineHeight: 1.35,
                    }}
                  >
                    {isMobile ? 'От 200' : 'При покупке от 200 билетов'}
                  </div>
                  {/* Decorative Line - скрываем на мобильной версии */}
                  {!isMobile && (
                    <div className="flex items-center justify-center mb-3" style={{ marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)' }}>
                      <div
                        style={{
                          width: '80%',
                          height: '1px',
                          background: 'linear-gradient(to right, transparent, #FBC632, transparent)',
                          boxShadow: '0 0 0.5rem rgba(251, 198, 50, 0.5)',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'clamp(1rem, 2vw, 1.5rem)',
                            height: 'clamp(1rem, 2vw, 1.5rem)',
                            background: 'radial-gradient(circle, #FBC632 0%, transparent 70%)',
                            borderRadius: '50%',
                            boxShadow: '0 0 0.75rem rgba(251, 198, 50, 0.7)',
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.7rem, 2.8vw, 0.9rem)' : 'clamp(0.75rem, 1vw, 0.85rem)',
                      color: '#FBC632',
                      fontWeight: 400,
                      marginBottom: isMobile ? 'clamp(0.3rem, 0.8vh, 0.5rem)' : 'clamp(0.3rem, 0.8vh, 0.5rem)',
                    }}
                  >
                    {isMobile ? 'Бронирование' : 'Бронирование'}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: isMobile ? 'clamp(0.6rem, 2.2vw, 0.8rem)' : 'clamp(0.65rem, 0.85vw, 0.75rem)',
                      color: '#FFFFFF',
                      lineHeight: 1.4,
                    }}
                  >
                    {isMobile ? 'Приоритетное бронирование' : 'Приоритетное бронирование билетов'}
                  </div>
                </div>
              </div>

              {/* Button - увеличенный размер для мобильной версии */}
              <button
                onClick={() => {
                  // Здесь можно добавить логику отправки заявки
                  console.log('Оставить заявку');
                }}
                className="rounded-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: isMobile ? 'clamp(0.85rem, 3.2vw, 1.1rem)' : 'clamp(0.8rem, 1.1vw, 0.9rem)',
                  letterSpacing: '0.08em',
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderColor: '#FBC632',
                  borderWidth: '2px',
                  padding: isMobile ? 'clamp(0.75rem, 1.5vh, 1rem) clamp(1.5rem, 5vw, 2.5rem)' : 'clamp(0.6rem, 1vh, 0.75rem) clamp(2rem, 3vw, 2.5rem)',
                  boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.6), 0 0 1.875rem rgba(251, 198, 50, 0.4)',
                  textShadow: '0 0 0.625rem rgba(251, 198, 50, 0.8)',
                  marginTop: isMobile ? 'clamp(1rem, 2vh, 1.5rem)' : 'clamp(0.5rem, 1vh, 0.75rem)',
                  flexShrink: 0,
                }}
              >
                ОСТАВИТЬ ЗАЯВКУ
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
