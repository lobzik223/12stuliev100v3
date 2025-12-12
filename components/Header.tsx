'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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
}

export default function Header({ isVisible = true, onTicketsClick, onAboutClick, onGalleryClick, onActorsClick, onTeamClick, onReviewsClick, onContactsClick }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
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
    // Если это "БИЛЕТЫ" и есть функция скролла - используем её
    if (href === '/tickets' && onTicketsClick) {
      e.preventDefault();
      onTicketsClick();
      return;
    }
    // Если это "О СПЕКТАКЛЕ" и есть функция скролла - используем её
    if (href === '/about' && onAboutClick) {
      e.preventDefault();
      onAboutClick();
      return;
    }
    // Если это "ГАЛЕРЕЯ" и есть функция скролла - используем её
    if (href === '/gallery' && onGalleryClick) {
      e.preventDefault();
      onGalleryClick();
      return;
    }
    // Если это "АКТЕРЫ" и есть функция скролла - используем её
    if (href === '/actors' && onActorsClick) {
      e.preventDefault();
      onActorsClick();
      return;
    }
    // Если это "КОМАНДА" и есть функция скролла - используем её
    if (href === '/team' && onTeamClick) {
      e.preventDefault();
      onTeamClick();
      return;
    }
    // Если это "ОТЗЫВЫ" и есть функция скролла - используем её
    if (href === '/reviews' && onReviewsClick) {
      e.preventDefault();
      onReviewsClick();
      return;
    }
    // Если это "КОНТАКТЫ" и есть функция скролла - используем её
    if (href === '/contacts' && onContactsClick) {
      e.preventDefault();
      onContactsClick();
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
    <>
      {isMobile ? (
        /* Только гамбургер-кнопка на мобильных */
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-[10000] flex flex-col justify-center items-center w-11 h-11 cursor-pointer bg-[#682302] rounded-lg shadow-lg"
          style={{ 
            gap: '0.35rem',
            padding: '0.65rem',
            boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isMobileMenuOpen ? (
            /* Красивый симметричный крестик */
            <div className="relative w-5 h-5">
              <span 
                className="absolute top-1/2 left-1/2 bg-white"
                style={{
                  width: '1.25rem',
                  height: '2px',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  transformOrigin: 'center',
                  transition: 'all 0.3s ease'
                }}
              />
              <span 
                className="absolute top-1/2 left-1/2 bg-white"
                style={{
                  width: '1.25rem',
                  height: '2px',
                  transform: 'translate(-50%, -50%) rotate(-45deg)',
                  transformOrigin: 'center',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          ) : (
            /* Гамбургер */
            <>
              <span 
                className="block bg-white transition-all duration-300"
                style={{
                  width: '1.5rem',
                  height: '2px'
                }}
              />
              <span 
                className="block bg-white transition-all duration-300"
                style={{
                  width: '1.5rem',
                  height: '2px'
                }}
              />
              <span 
                className="block bg-white transition-all duration-300"
                style={{
                  width: '1.5rem',
                  height: '2px'
                }}
              />
            </>
          )}
        </button>
      ) : (
        /* Полная шапка на десктопе */
        <header 
          className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
          style={{ 
            padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.5%, 1vw, 1%)',
            zIndex: 9999
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
        </header>
      )}

      {/* Мобильное меню */}
      {isMobile && (
        <div
          className={`mobile-menu-overlay fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
          style={{
            backgroundColor: 'rgba(104, 35, 2, 0.98)',
            backdropFilter: 'blur(10px)',
            paddingTop: '4.5rem',
            paddingBottom: '2rem',
            minHeight: '100vh',
            overflowY: 'auto'
          }}
        >
          <div className="flex flex-col items-center gap-4 px-4">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === '/tickets' && pathname === '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    handleLinkClick(e, item.href);
                    closeMobileMenu();
                  }}
                  className="w-full text-center py-3 rounded transition-all duration-200"
                  style={{ 
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: '1.25rem',
                    letterSpacing: '0.0625rem',
                    color: isActive ? '#FBC632' : 'white',
                    backgroundColor: isActive ? 'rgba(251, 198, 50, 0.1)' : 'transparent',
                    border: isActive ? '1px solid #FBC632' : '1px solid transparent'
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

