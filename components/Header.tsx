'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isProbablyMobile } from './utils/device';

const navItems = [
  { name: 'БИЛЕТЫ', href: '/tickets' },
  { name: 'О СПЕКТАКЛЕ', href: '/about' },
  { name: 'ГАЛЕРЕЯ', href: '/gallery' },
  { name: 'АКТЕРЫ', href: '/actors' },
  { name: 'КОМАНДА', href: '/team' },
  { name: 'ОТЗЫВЫ', href: '/reviews' },
  { name: 'КОНТАКТЫ', href: '/contacts' },
];

interface HeaderProps {
  isVisible?: boolean;
  onTicketsClick?: () => void;
  onAboutClick?: () => void;
  onGalleryClick?: () => void;
  onActorsClick?: () => void;
  onTeamClick?: () => void;
  onReviewsClick?: () => void;
  onContactsClick?: () => void;
  hideMobileButton?: boolean;
  hideCloseButton?: boolean;
}

export default function Header({ isVisible = true, onTicketsClick, onAboutClick, onGalleryClick, onActorsClick, onTeamClick, onReviewsClick, onContactsClick, hideMobileButton = false, hideCloseButton = false }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  // Не полагаемся на isMobile для рендера (на iOS при проблемах с гидрацией иначе остаётся “десктопная” шапка).
  // isMobile используем только для поведения (overlay/body class).
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? isProbablyMobile() : true));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      const mobile = isProbablyMobile();
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };
    
    // Ждем полной загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkMobile);
    } else {
      checkMobile();
    }
    
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
        window.removeEventListener('orientationchange', checkMobile);
      }
      document.removeEventListener('DOMContentLoaded', checkMobile);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Устанавливаем активный раздел
    setActiveSection(href);
    
    // Если это "БИЛЕТЫ" и есть функция скролла - используем её
    if (href === '/tickets' && onTicketsClick) {
      e.preventDefault();
      onTicketsClick();
      if (isMobile) {
        closeMobileMenu();
      }
      return;
    }
    // Если это "О СПЕКТАКЛЕ" и есть функция скролла - используем её
    if (href === '/about' && onAboutClick) {
      e.preventDefault();
      onAboutClick();
      if (isMobile) {
        closeMobileMenu();
      }
      return;
    }
    // Если это "ГАЛЕРЕЯ" - всегда предотвращаем переход на отдельную страницу
    if (href === '/gallery') {
      e.preventDefault();
      // Если есть функция скролла - используем её (для MainScreen)
      if (onGalleryClick) {
        onGalleryClick();
      } else {
        // Если нет функции (не на главной странице) - перенаправляем на главную
        if (typeof window !== 'undefined') {
          window.location.href = '/';
          // После загрузки главной страницы скроллим к галерее
          setTimeout(() => {
            const gallerySection = document.querySelector('[data-gallery-section]');
            if (gallerySection) {
              const elementPosition = gallerySection.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - 100;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }, 500);
        }
      }
      if (isMobile) {
        closeMobileMenu();
      }
      return;
    }
    // Если это "АКТЕРЫ" и есть функция скролла - используем её
    if (href === '/actors' && onActorsClick) {
      e.preventDefault();
      onActorsClick();
      if (isMobile) {
        closeMobileMenu();
      }
      return;
    }
    // Если это "КОМАНДА" и есть функция скролла - используем её
    if (href === '/team' && onTeamClick) {
      e.preventDefault();
      onTeamClick();
      if (isMobile) {
        closeMobileMenu();
      }
      return;
    }
    // Если это "ОТЗЫВЫ" и есть функция скролла - используем её
    if (href === '/reviews' && onReviewsClick) {
      e.preventDefault();
      onReviewsClick();
      if (isMobile) {
        closeMobileMenu();
      }
      return;
    }
    // Если это "КОНТАКТЫ" и есть функция скролла - используем её
    if (href === '/contacts' && onContactsClick) {
      e.preventDefault();
      onContactsClick();
      if (isMobile) {
        closeMobileMenu();
      }
      return;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Добавляем/убираем класс на body для CSS селекторов
  useEffect(() => {
    if (isMobile) {
      if (isMobileMenuOpen) {
        document.body.classList.add('mobile-menu-open');
      } else {
        document.body.classList.remove('mobile-menu-open');
      }
    }
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobile, isMobileMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[9999] w-full"
      style={{ pointerEvents: 'none' }}
    >
      {/* Mobile hamburger (всегда в DOM; видимость контролируется CSS + force-mobile) */}
      {!hideMobileButton && (
      <button
        onClick={toggleMobileMenu}
        className="mobile-hamburger-button md:hidden fixed top-4 left-4 z-[10000] flex flex-col justify-center items-center w-14 h-14 cursor-pointer bg-[#682302] rounded-xl shadow-lg hover:bg-[#7a2a03] active:bg-[#5a1f01] transition-all duration-300"
        style={{ 
          padding: '0.875rem',
          boxShadow: isMobileMenuOpen 
            ? '0 0 1.5rem rgba(251, 198, 50, 0.7), inset 0 0 0.5rem rgba(251, 198, 50, 0.2)' 
            : '0 0 1rem rgba(251, 198, 50, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
          border: '2px solid rgba(251, 198, 50, 0.4)',
          outline: 'none',
        }}
        aria-label="Меню"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          /* Красивый симметричный крестик */
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span 
              className="absolute bg-white rounded-full"
              style={{
                width: '1.5rem',
                height: '3px',
                transform: 'rotate(45deg)',
                transformOrigin: 'center',
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)'
              }}
            />
            <span 
              className="absolute bg-white rounded-full"
              style={{
                width: '1.5rem',
                height: '3px',
                transform: 'rotate(-45deg)',
                transformOrigin: 'center',
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)'
              }}
            />
          </div>
        ) : (
          /* Красивый гамбургер с тремя полосками - ВСЕГДА ВИДИМЫ */
          <div 
            className="hamburger-icon"
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '1.5rem',
              height: '1.125rem',
              gap: '0.375rem',
            }}
          >
            <span 
              className="hamburger-line"
              style={{
                display: 'block',
                width: '100%',
                height: '3px',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
              }}
            />
            <span 
              className="hamburger-line"
              style={{
                display: 'block',
                width: '100%',
                height: '3px',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
              }}
            />
            <span 
              className="hamburger-line"
              style={{
                display: 'block',
                width: '100%',
                height: '3px',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
              }}
            />
          </div>
        )}
      </button>
      )}

      {/* Desktop header (всегда в DOM; видимость контролируется CSS + force-mobile) */}
      <div
        className={`hidden md:block transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        style={{
          padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.5%, 1vw, 1%)',
          pointerEvents: 'auto',
        }}
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
            <div className="flex flex-wrap items-center justify-center w-full" style={{ gap: 'clamp(1rem, 2vw, 2rem)' }}>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === '/tickets' && pathname === '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="px-2 py-1 rounded transition-all duration-200 hover:bg-black/20"
                    style={{ 
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: 'clamp(0.875rem, 1.0625vw, 1.0625rem)',
                      letterSpacing: '0.0625rem',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`md:hidden mobile-menu-overlay fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        style={{
          backgroundColor: 'rgba(104, 35, 2, 0.98)',
          backdropFilter: 'blur(10px)',
          paddingTop: 'calc(max(env(safe-area-inset-top, 0px), 0) + 2.75rem + 1rem)',
          paddingBottom: '2rem',
          paddingRight: 'max(1rem, env(safe-area-inset-right, 0px) + 1rem)',
          paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px) + 1rem)',
          // Mobile reliability: avoid iOS 100vh bugs (address bar)
          minHeight: 'calc(var(--vvh, 1vh) * 100)',
          maxHeight: 'calc(var(--vvh, 1vh) * 100)',
          overflowY: 'auto'
        }}
      >
        {/* Кнопка закрытия мобильного меню - в самом верху, не заслоняет виджеты */}
        {!hideCloseButton && (
          <button
            onClick={closeMobileMenu}
            className="absolute z-[10000] flex items-center justify-center cursor-pointer bg-[#682302] rounded-xl shadow-lg hover:bg-[#7a2a03] active:bg-[#5a1f01] transition-all duration-300"
            style={{ 
              top: 'max(env(safe-area-inset-top, 0px), 0)',
              right: 'max(1rem, env(safe-area-inset-right, 0px) + 1rem)',
              width: '2.75rem',
              height: '2.75rem',
              minWidth: '2.75rem',
              minHeight: '2.75rem',
              boxShadow: '0 0 1rem rgba(251, 198, 50, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)',
              border: '2px solid rgba(251, 198, 50, 0.4)',
              outline: 'none',
              pointerEvents: 'auto',
              padding: '0.5rem',
            }}
            aria-label="Закрыть меню"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#FFFFFF' }}>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        
        <div className="flex flex-col items-center gap-3 px-4" style={{ marginTop: '1.5rem' }}>
          {navItems.map((item) => {
            const isActive =
              activeSection === item.href ||
              pathname === item.href ||
              (item.href === '/tickets' && pathname === '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleLinkClick(e, item.href);
                }}
                className="w-full text-center py-4 rounded-lg transition-all duration-300 relative overflow-hidden group"
                style={{ 
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: '1.25rem',
                  letterSpacing: '0.0625rem',
                  color: isActive ? '#FBC632' : 'white',
                  backgroundColor: isActive ? 'rgba(251, 198, 50, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: isActive ? '2px solid #FBC632' : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isActive 
                    ? '0 0 1.25rem rgba(251, 198, 50, 0.4), inset 0 0 1.25rem rgba(251, 198, 50, 0.1)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.2)',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  fontWeight: isActive ? '700' : '400',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'scale(1.01)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                {/* Декоративный эффект для активного элемента */}
                {isActive && (
                  <span
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(251, 198, 50, 0.3), transparent)',
                      animation: 'shimmer 2s infinite',
                    }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

