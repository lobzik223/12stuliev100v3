'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TypingText from '../ui/TypingText';
import { isProbablyMobile } from '../utils/device';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  onStartJourney?: () => void;
}

export default function HeroSection({ onStartJourney }: HeroSectionProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? isProbablyMobile() : false));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(isProbablyMobile());
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

  useEffect(() => {
    // На мобильных (особенно iOS) GSAP/ScrollTrigger часто даёт “пропадающий контент”.
    // Для мобилки оставляем статичный рендер без анимаций.
    if (isProbablyMobile()) {
      // Убиваем все существующие ScrollTrigger анимации для hero section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger) {
          const triggerEl = trigger.vars.trigger;
          if (triggerEl === logoRef.current || 
              triggerEl === textRef.current || 
              triggerEl === buttonContainerRef.current ||
              (triggerEl instanceof Element && triggerEl.closest('.hero-section-bg'))) {
            trigger.kill();
          }
        }
      });
      
      // Фиксируем элементы без анимаций и без движения
      if (logoRef.current) {
        logoRef.current.style.opacity = '1';
        logoRef.current.style.transform = 'none';
        logoRef.current.style.transition = 'none';
        logoRef.current.style.animation = 'none';
      }
      if (textRef.current) {
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'none';
        textRef.current.style.transition = 'none';
        textRef.current.style.animation = 'none';
      }
      if (buttonContainerRef.current) {
        buttonContainerRef.current.style.opacity = '1';
        buttonContainerRef.current.style.transform = 'none';
        buttonContainerRef.current.style.transition = 'none';
        buttonContainerRef.current.style.animation = 'none';
        buttonContainerRef.current.style.position = 'fixed';
        buttonContainerRef.current.style.willChange = 'auto';
        buttonContainerRef.current.style.top = 'auto';
        buttonContainerRef.current.style.bottom = 'clamp(4rem, 12vh, 15rem)';
      }
      if (buttonRef.current) {
        buttonRef.current.style.transform = 'none';
        buttonRef.current.style.transition = 'none';
        buttonRef.current.style.animation = 'none';
        buttonRef.current.style.willChange = 'auto';
      }
      
      // Блокируем любые будущие изменения через MutationObserver
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const el = mutation.target as HTMLElement;
            if (el === logoRef.current || el === textRef.current || el === buttonContainerRef.current || el === buttonRef.current) {
              if (el.style.transform && el.style.transform !== 'none') {
                el.style.transform = 'none';
              }
              if (el.style.opacity && el.style.opacity !== '1') {
                el.style.opacity = '1';
              }
              if (el === buttonContainerRef.current && el.style.position !== 'fixed') {
                el.style.position = 'fixed';
              }
            }
          }
        });
      });
      
      [logoRef.current, textRef.current, buttonContainerRef.current, buttonRef.current].forEach(ref => {
        if (ref) {
          observer.observe(ref, { attributes: true, attributeFilter: ['style'] });
        }
      });
      
      return () => {
        observer.disconnect();
      };
    }

    // Анимация для логотипа
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: logoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Анимация для текста
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.1
        }
      );
    }

    // Анимация для кнопки (только на десктопе)
    if (buttonContainerRef.current && !isProbablyMobile()) {
      gsap.fromTo(buttonContainerRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buttonContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.2
        }
      );
    } else if (buttonContainerRef.current && isProbablyMobile()) {
      // На мобильных кнопка сразу видна без анимации
      gsap.set(buttonContainerRef.current, {
        opacity: 1,
        y: 0,
        scale: 1
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col items-center justify-center hero-section-bg"
      style={{
        backgroundImage: isMobile ? 'url(/backgrounds/sections/mobile/section-1-mobile.png)' : 'url(/backgrounds/sections/section-1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        willChange: 'auto' // Оптимизация для браузера
      }}
    >
      {/* Контент раздела */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start" style={{ padding: '0 4%', paddingTop: 'clamp(0.5rem, 1vh, 1rem)', pointerEvents: 'auto' }}>
        {/* Логотип по центру сверху */}
        <div ref={logoRef} className="flex justify-center w-full hero-logo-container" style={{ marginTop: 'clamp(-2rem, -4vh, -1rem)', marginBottom: '0' }}>
          <div className="hero-logo-image"
            style={{
              backgroundImage: 'url(/backgrounds/sections/logo100let.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'clamp(10rem, 35vw, 30rem)',
              height: 'clamp(6.5rem, 25vw, 22rem)',
              maxWidth: '100%',
              filter: 'drop-shadow(0 0 1.25rem rgba(255,255,255,0.3))'
            }}
          />
        </div>

        {/* Текст под логотипом */}
        <div ref={textRef} className="text-center text-white w-full hero-text-container" style={{ marginTop: 'clamp(-6rem, -12vh, -8.5rem)' }}>
          <p 
            className="uppercase hero-text-subtitle"
            style={{ 
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(0.7rem, 1.5vw, 1.5rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              padding: '0 clamp(0.75rem, 2vw, 2rem)',
              marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
              lineHeight: '1.4'
            }}
          >
            {isMobile ? (
              <>
                <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                  <TypingText 
                    text="ТЕАТРАЛЬНОЕ ПУТЕШЕСТВИЕ"
                    speed={50}
                    delay={500}
                  />
                </span>
                <br />
                <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                  <TypingText 
                    text="ИЛЬФА И ПЕТРОВА"
                    speed={50}
                    delay={2500}
                  />
                </span>
              </>
            ) : (
              <TypingText 
                text="ТЕАТРАЛЬНОЕ ПУТЕШЕСТВИЕ ИЛЬФА И ПЕТРОВА"
                speed={50}
                delay={500}
              />
            )}
          </p>
          
          {/* Текст "СЛЕДУЙ ЗА БЕНДЕРОМ!" под текстом */}
          <p 
            className="uppercase text-white hero-text-cta"
            style={{ 
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(0.65rem, 1.125vw, 1.125rem)',
              textShadow: '0 0 0.625rem rgba(255,255,255,0.2)',
              color: '#FFFFFF',
              textAlign: 'center',
              padding: '0 clamp(0.75rem, 2vw, 2rem)',
              marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)',
              lineHeight: '1.5'
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
      
      {/* Кнопка снизу слева - вынесена за пределы контейнера для гарантии кликабельности */}
      {!isMobile && (
      <div 
        ref={buttonContainerRef}
        className="flex w-full hero-start-button"
        style={{ 
          position: 'absolute',
          bottom: 'clamp(4rem, 12vh, 15rem)',
          left: '0',
          paddingLeft: 'clamp(1rem, 5vw, 5rem)',
          paddingRight: 'clamp(1rem, 4vw, 4rem)',
          width: '100%',
          maxWidth: 'none',
          display: 'flex',
          justifyContent: 'flex-start',
          zIndex: 9999,
          pointerEvents: 'auto',
          isolation: 'isolate'
        }}
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Кнопка НАЧАТЬ ПУТЬ нажата, onStartJourney:', onStartJourney);
            // Прямой вызов функции прокрутки
            if (onStartJourney) {
              try {
                onStartJourney();
              } catch (error) {
                console.error('Ошибка при вызове onStartJourney:', error);
              }
            } else {
              console.warn('onStartJourney не передан!');
            }
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onStartJourney) {
              onStartJourney();
            }
          }}
          className="rounded-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(0.75rem, 1.25vw, 1.25rem)',
            letterSpacing: '0.0625rem',
            color: '#FBC632',
            backgroundColor: 'transparent',
            borderColor: '#FBC632',
            padding: 'clamp(0.6rem, 1.25vw, 1.25rem) clamp(1.2rem, 2.5vw, 2.5rem)',
            boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.6), 0 0 1.875rem rgba(251, 198, 50, 0.4)',
            textShadow: '0 0 0.625rem rgba(251, 198, 50, 0.8), 0 0 1.25rem rgba(251, 198, 50, 0.5)',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            pointerEvents: 'auto',
            zIndex: 10000,
            position: 'relative',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            width: 'auto',
            maxWidth: 'none'
          }}
        >
          НАЧАТЬ ПУТЬ
        </button>
      </div>
      )}
      
      {/* Затемнение внизу HeroSection для плавного перехода к section-2.png */}
      <div 
        className="absolute bottom-0 left-0 right-0 w-full"
        style={{
          height: '6vh',
          width: '100%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 20%, rgba(0, 0, 0, 0.6) 45%, rgba(0, 0, 0, 0.85) 70%, rgba(0, 0, 0, 1) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </section>
  );
}

