'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Header from "./Header";
import SecondaryNav from "./sections/SecondaryNav";
import HeroSection from "./sections/HeroSection";
import EventsSection from "./sections/EventsSection";
import JourneySection from "./sections/JourneySectionFixed";
import ActorsSection from "./sections/ActorsSection";
import TrailerSection from "./sections/TrailerSection";
import GalleryView from "./gallery/GalleryView";
import { useRouter } from 'next/navigation';
import { isProbablyMobile } from "./utils/device";

export default function MainScreen({ initialDebug = false, ssrIsIOS = false }: { initialDebug?: boolean; ssrIsIOS?: boolean } = {}) {
  const router = useRouter();
  const [isMainHeaderVisible, setIsMainHeaderVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0); // 0: ОФИС, 1: ПСИХУШКА, 2: КВАРТИРА КИСЫ, 3: КВАРТИРА СТАРУХИ
  const [debugEnabled, setDebugEnabled] = useState(initialDebug);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isProbablyMobile();
  });

  // Обновляем isMobile при изменении размера окна
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(isProbablyMobile());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);
  const journeySectionRef = useRef<HTMLDivElement>(null);
  const eventsSectionRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const actorsSectionRef = useRef<HTMLDivElement>(null);
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const reviewsSectionRef = useRef<HTMLDivElement>(null);
  const contactsSectionRef = useRef<HTMLDivElement>(null);
  const navPanelRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const sectionEndRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);
  const psychushkaRef = useRef<HTMLDivElement>(null);
  const kisaRef = useRef<HTMLDivElement>(null);
  const yaryginaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!debugEnabled) return;
    if (typeof window === 'undefined') return;

    const fmtRect = (el: HTMLElement | null) => {
      if (!el) return 'null';
      const r = el.getBoundingClientRect();
      return `t:${Math.round(r.top)} b:${Math.round(r.bottom)} h:${Math.round(r.height)}`;
    };

    const tick = () => {
      try {
        const docEl = document.documentElement;
        const vv = window.visualViewport?.width ?? 0;
        const info = [
          `ua:${navigator.userAgent}`,
          `forceMobile:${docEl.classList.contains('force-mobile')}`,
          `inner:${window.innerWidth}x${window.innerHeight}`,
          `screen:${window.screen?.width}x${window.screen?.height}`,
          `vv:${Math.round(vv)}`,
          `scrollY:${Math.round(window.scrollY)}`,
          `mainH:${document.querySelector('main')?.scrollHeight ?? 0}`,
          `events:${fmtRect(eventsSectionRef.current)}`,
          `journey:${fmtRect(journeySectionRef.current)}`,
          `actors:${fmtRect(actorsSectionRef.current)}`,
          `team:${fmtRect(teamSectionRef.current)}`,
          `reviews:${fmtRect(reviewsSectionRef.current)}`,
          `contacts:${fmtRect(contactsSectionRef.current)}`,
        ].join('\n');
        setDebugInfo(info);
      } catch (e) {
        setDebugInfo(String(e));
      }
    };

    tick();
    const id = window.setInterval(tick, 600);
    return () => window.clearInterval(id);
  }, [debugEnabled]);

  useEffect(() => {
      // Проверяем что мы в браузере (не на сервере)
      if (typeof window === 'undefined') return;
      // CRITICAL MOBILE FIX:
      // На реальных мобильных браузерах (iOS Safari / Android Chrome) viewport height меняется во время скролла
      // (адресная строка), что ломает любые \"секционные\" расчёты на базе innerHeight/getBoundingClientRect.
      // На мобильных отключаем этот scroll-handler полностью и оставляем нативный скролл.
      // CRITICAL: Early return - NO scroll listeners on mobile to prevent freeze
      // CRITICAL: NO state updates during scroll on mobile - they cause re-renders and scroll lag
      if (isProbablyMobile()) {
        // Ensure body/html are never locked on mobile
        if (typeof document !== 'undefined') {
          document.body.style.overflow = '';
          document.body.style.overflowY = '';
          document.body.style.position = '';
          document.body.style.height = '';
          document.body.style.maxHeight = '';
          document.documentElement.style.overflow = '';
          document.documentElement.style.overflowY = '';
          document.documentElement.style.height = '';
          document.documentElement.style.maxHeight = '';
        }
        // CRITICAL: On mobile, don't update state during scroll to prevent re-render storms
        // Keep default values (isMainHeaderVisible=true, activeCategory=0) and don't change them
        return;
      }

      // PERFORMANCE: Используем requestAnimationFrame и debouncing для предотвращения layout thrashing
      let rafId: number | null = null;
      let lastScrollTime = 0;
      const SCROLL_THROTTLE_MS = 16; // ~60fps
      
      const handleScroll = () => {
        // PERFORMANCE: Throttle scroll events для предотвращения избыточных вычислений
        const now = Date.now();
        if (now - lastScrollTime < SCROLL_THROTTLE_MS) {
          return;
        }
        lastScrollTime = now;
        
        // PERFORMANCE: Используем requestAnimationFrame для синхронизации с браузером
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
        
        rafId = requestAnimationFrame(() => {
          if (!navPanelRef.current) {
            rafId = null;
            return;
          }
            
          const navPanelRect = navPanelRef.current.getBoundingClientRect();
          const finalTextRect = finalTextRef.current?.getBoundingClientRect();
            
          // Когда навигационная панель из EventsSection достигает верха экрана - "подхватываем" её
          if (navPanelRect.top <= 100) {
            // Проверяем, прошли ли мы текст "ФИНАЛ ОХОТЫ"
            const vh = window.visualViewport?.height ?? window.innerHeight;
            if (finalTextRect && finalTextRect.top < vh * 0.3) {
              // Прошли текст "ФИНАЛ ОХОТЫ" - возвращаем главную шапку
              setIsMainHeaderVisible(true);
            } else {
              // Еще не прошли текст "ФИНАЛ ОХОТЫ" - показываем вторичную шапку (подхватываем навигационную панель)
              setIsMainHeaderVisible(false);
            }
          } else {
            // Навигационная панель еще не достигла верха - показываем главную шапку
            setIsMainHeaderVisible(true);
          }

          // Определяем активную категорию на основе позиции объектов
          // Объект считается активным, когда его верхняя часть достигает верхней трети экрана
          const activationThreshold = (window.visualViewport?.height ?? window.innerHeight) * 0.3;
          const refs = [
            { ref: officeRef, index: 0 },
            { ref: psychushkaRef, index: 1 },
            { ref: kisaRef, index: 2 },
            { ref: yaryginaRef, index: 3 }
          ];

          // Проверяем объекты сверху вниз, находим последний который прошел порог активации
          let activeIndex = 0;
          
          for (let i = refs.length - 1; i >= 0; i--) {
            const { ref, index } = refs[i];
            if (ref.current) {
              const rect = ref.current.getBoundingClientRect();
              // Если верх объекта достиг порога активации - это активный объект
              if (rect.top <= activationThreshold && rect.bottom > 0) {
                activeIndex = index;
                break;
              }
            }
          }

          setActiveCategory(activeIndex);
          rafId = null;
        });
      };

      // MOBILE SCROLL FIX: На мобильных НЕ добавляем scroll/touchmove listeners - используем только нативный скролл
      // Ждем полной загрузки DOM и всех ресурсов
      const initScrollHandler = () => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;
        
        // Проверяем что DOM готов
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
              // Только scroll listener, НЕ touchmove (touchmove может мешать нативному скроллу на мобильных)
              window.addEventListener('scroll', handleScroll, { passive: true });
              handleScroll();
            }, 200);
          });
        } else {
          // DOM уже загружен, но ждем еще немного для гарантии
          setTimeout(() => {
            // Только scroll listener, НЕ touchmove
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
          }, 200);
        }
      };

      // Также слушаем событие app-ready из layout.tsx
      const handleAppReady = () => {
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            // Только scroll listener, НЕ touchmove
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
          }
        }, 100);
      };

      window.addEventListener('app-ready', handleAppReady);
      initScrollHandler();

      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('scroll', handleScroll);
          // touchmove listener не добавлялся, поэтому не удаляем
          window.removeEventListener('app-ready', handleAppReady);
          // PERFORMANCE: Отменяем pending requestAnimationFrame
          if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black" style={{ overflowX: 'hidden', overflowY: 'visible' }}>
      {debugEnabled && (
        <pre
          className="fixed bottom-2 left-2 right-2 z-[99999] max-h-[45vh] overflow-auto rounded-md border border-yellow-400/60 bg-black/80 p-2 text-[10px] leading-snug text-yellow-200"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {debugInfo}
        </pre>
      )}
      {/* Оптимизированная загрузка изображений: критичные загружаются сразу, остальные - лениво на мобильных */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
        {/* Критичные изображения - всегда загружаются сразу */}
        <img src="/backgrounds/sections/section-1.png" alt="" loading="eager" fetchPriority="high" />
        <img src="/backgrounds/sections/mobile/section-1-mobile.png" alt="" loading="eager" fetchPriority="high" />
        <img src="/backgrounds/sections/section-2.png" alt="" loading="eager" fetchPriority="high" />
        <img src="/backgrounds/sections/logo100let.png" alt="" loading="eager" fetchPriority="high" />
        
        {/* На мобильных: остальные изображения загружаются лениво */}
        {!isMobile ? (
          <>
            <img src="/backgrounds/sections/section-3.png" alt="" loading="eager" />
            <img src="/backgrounds/sections/section-4.png" alt="" loading="eager" fetchPriority="high" />
            <img src="/backgrounds/sections/mobile/section-3-mobile.png" alt="" loading="eager" />
            <img src="/backgrounds/sections/mobile/section-4-mobile.png?v=10" alt="" loading="eager" fetchPriority="high" />
            <img src="/backgrounds/sections/plitkanovosti.png" alt="" loading="eager" />
            <img src="/backgrounds/sections/vput.png?v=2.0" alt="" loading="eager" />
            <img src="/backgrounds/sections/vput2.png?v=2.0" alt="" loading="eager" />
            <img src="/backgrounds/sections/vput3.png?v=2.0" alt="" loading="eager" />
            <img src="/backgrounds/sections/vput4.png?v=2.0" alt="" loading="eager" />
            <img src="/backgrounds/sections/tiraj.png" alt="" loading="eager" />
            <img src="/backgrounds/sections/flash.png" alt="" loading="eager" />
            <img src="/backgrounds/sections/stul100let.png" alt="" loading="eager" />
            <img src="/backgrounds/sections/analiz.png" alt="" loading="eager" />
            <img src="/backgrounds/sections/pamat15.png" alt="" loading="eager" />
            <img src="/backgrounds/sections/computer.png" alt="" loading="eager" />
            <img src="/backgrounds/sections/tabletki.png" alt="" loading="eager" />
          </>
        ) : (
          <>
            {/* CRITICAL PERFORMANCE FIX: Optimized loading strategy for mobile */}
            {/* Preload section-4 (Journey section) as it appears early - CRITICAL for smooth scroll */}
            <img src="/backgrounds/sections/mobile/section-4-mobile.png?v=10" alt="" loading="eager" fetchPriority="high" />
            {/* Preload plitkanovosti (Events cards) as it's above the fold */}
            <img src="/backgrounds/sections/plitkanovosti.png" alt="" loading="eager" fetchPriority="high" />
            {/* Preload first Journey scene image (vput.png) - appears early in Journey section */}
            <img src="/backgrounds/sections/vput.png?v=2.0" alt="" loading="eager" fetchPriority="high" />
            {/* IMPORTANT: section-3-mobile is the large background after "Актёры".
                Load it eagerly on mobile to avoid decode/jank spikes when reaching Actors/Trailer. */}
            <img src="/backgrounds/sections/mobile/section-3-mobile.png" alt="" loading="eager" fetchPriority="high" />
            {/* Lazy load remaining Journey section images - load as user approaches */}
            <img src="/backgrounds/sections/vput2.png?v=2.0" alt="" loading="lazy" />
            <img src="/backgrounds/sections/vput3.png?v=2.0" alt="" loading="lazy" />
            <img src="/backgrounds/sections/vput4.png?v=2.0" alt="" loading="lazy" />
            {/* Lazy load decorative images (appear later) */}
            <img src="/backgrounds/sections/tiraj.png" alt="" loading="lazy" />
            <img src="/backgrounds/sections/flash.png" alt="" loading="lazy" />
            <img src="/backgrounds/sections/stul100let.png" alt="" loading="lazy" />
            <img src="/backgrounds/sections/analiz.png" alt="" loading="lazy" />
            <img src="/backgrounds/sections/pamat15.png" alt="" loading="lazy" />
            <img src="/backgrounds/sections/computer.png" alt="" loading="lazy" />
            <img src="/backgrounds/sections/tabletki.png" alt="" loading="lazy" />
          </>
        )}
      </div>
      <Header 
        isVisible={isMainHeaderVisible}
        onTicketsClick={() => {
          if (typeof window === 'undefined') return;
          if (eventsSectionRef.current) {
            const element = eventsSectionRef.current;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // Отступ для header
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }}
        onAboutClick={() => {
          if (typeof window === 'undefined') return;
          if (journeySectionRef.current) {
            const element = journeySectionRef.current;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // Отступ для header
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }}
        onGalleryClick={() => {
          if (typeof window === 'undefined') return;
          if (gallerySectionRef.current) {
            const element = gallerySectionRef.current;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // Отступ для header
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }}
        onActorsClick={() => {
          if (typeof window === 'undefined') return;
          if (actorsSectionRef.current) {
            const element = actorsSectionRef.current;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // Отступ для header
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }}
        onTeamClick={() => {
          if (typeof window === 'undefined') return;
          if (teamSectionRef.current) {
            const element = teamSectionRef.current;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // Отступ для header
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }}
        onReviewsClick={() => {
          if (typeof window === 'undefined') return;
          if (reviewsSectionRef.current) {
            const element = reviewsSectionRef.current;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // Отступ для header
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }}
        onContactsClick={() => {
          if (typeof window === 'undefined') return;
          if (contactsSectionRef.current) {
            const element = contactsSectionRef.current;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // Отступ для header
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }}
      />
      <SecondaryNav isVisible={!isMainHeaderVisible} activeCategory={activeCategory} />
      
      <div className="min-h-screen" style={{ position: 'relative', overflow: 'visible' }}>
        {/* Раздел 1 - Hero */}
        <HeroSection onStartJourney={() => {
          if (typeof window === 'undefined') return;
          if (journeySectionRef.current) {
            const element = journeySectionRef.current;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // Отступ для header
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }} />

        {/* Раздел 2 - Карточки событий (под текстами Hero) */}
        <div ref={eventsSectionRef}>
          <EventsSection 
            navPanelRef={navPanelRef} 
            activeCategory={activeCategory}
            onViewSchedule={() => {
              try {
                router.push('/schedule');
              } catch (error) {
                console.error('Navigation error:', error);
                // Fallback на window.location для мобильных
                if (typeof window !== 'undefined') {
                  window.location.href = '/schedule';
                }
              }
            }}
          />
        </div>

        {/* Раздел "В ПУТЬ" */}
        <div ref={journeySectionRef} style={{ position: 'relative' }}>
          <JourneySection 
            sectionEndRef={sectionEndRef} 
            finalTextRef={finalTextRef} 
            navPanelRef={navPanelRef}
            officeRef={officeRef}
            psychushkaRef={psychushkaRef}
            kisaRef={kisaRef}
            yaryginaRef={yaryginaRef}
          />
        </div>

        {/* Блюр-градиент для плавного перехода между section-4.png и section-3.png (мобильная версия) */}
        <div 
          className="relative w-full transition-gradient-blur mobile-section-transition"
          style={{
            pointerEvents: 'none',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
          }}
        />

        {/* Черный блюр-градиент на линии соприкосновения section-4 и section-3 - только для ПК, чуть выше раздела АКТЕРЫ */}
        <div 
          className="desktop-pc-blur-transition"
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            top: '-100vh',
            height: 'clamp(60vh, 70vh, 80vh)',
            width: '100%',
            left: 0,
            right: 0,
            zIndex: 5,
          }}
        />

        {/* Blur градиент blur67.png между section-4.png и section-3.png для скрытия линии пересечения */}
        <div 
          className="relative w-full puull-gradient-between-sections"
          style={{
            pointerEvents: 'none',
            zIndex: 5,
            width: '130vw',
            maxWidth: '130vw',
            minWidth: '130vw',
            position: 'absolute',
            top: '-90vh',
            height: 'clamp(50vh, 60vh, 70vh)',
            left: '50%',
            transform: 'translateX(-50%)',
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingRight: 0,
            boxSizing: 'border-box',
          }}
        >
          <Image 
            src="/backgrounds/sections/blur67.png" 
            alt="Blur градиент между секциями" 
            width={1920}
            height={1080}
            quality={80}
            loading="lazy"
            unoptimized
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>

        {/* Раздел с фоном section-3.png */}
        <section 
          className="relative w-full section-3-wrapper"
          style={{
            width: '100%',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          
          {/* Фон раздела - покрывает ActorsSection и TrailerSection до конца раздела "Контакты и партнёры" */}
          <div className="absolute inset-0 z-0 mobile-section-3-bg" style={{ width: '100%', pointerEvents: 'none' }}>
            <div
              className="mobile-section-3-background"
              style={{
                // Mobile-only: ensure the correct mobile background is used even if CSS media queries fail on real devices
                backgroundImage: isMobile
                  ? 'url(/backgrounds/sections/mobile/section-3-mobile.png)'
                  : 'url(/backgrounds/sections/section-3.png)',
                backgroundSize: isMobile ? '120% auto' : '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                willChange: 'auto', // Оптимизация для браузера
                pointerEvents: 'none'
              }}
            />
          </div>
          
          {/* Небольшой блюр над фоном section-3.png для плавного перехода */}
          <div 
            className="absolute top-0 left-0 w-full section3-blur-gradient desktop-section3-blur"
            style={{
              pointerEvents: 'none'
            }}
          />
          {/* Контейнер для контента */}
          <div className="relative w-full" style={{ zIndex: 15 }}>
            {/* Раздел "АКТЕРЫ" */}
            <div ref={actorsSectionRef} className="relative w-full actors-section-wrapper-mobile" style={{ zIndex: 15, marginTop: 'clamp(-10rem, -18vh, -8rem)' }}>
              <ActorsSection />
            </div>
            
            {/* Раздел "ТРЕЙЛЕР" */}
            <div className="relative w-full trailer-section-wrapper-mobile">
              <TrailerSection 
                gallerySectionRef={gallerySectionRef}
                teamSectionRef={teamSectionRef}
                reviewsSectionRef={reviewsSectionRef}
                contactsSectionRef={contactsSectionRef}
                ssrIsIOS={ssrIsIOS}
                onGalleryClick={() => {
                  // Открываем GalleryView только на ПК версии
                  if (!isMobile) {
                    setIsGalleryOpen(true);
                  }
                }}
                onViewSchedule={() => {
              try {
                router.push('/schedule');
              } catch (error) {
                console.error('Navigation error:', error);
                // Fallback на window.location для мобильных
                if (typeof window !== 'undefined') {
                  window.location.href = '/schedule';
                }
              }
            }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* GalleryView - открывается только на ПК версии при клике на кнопку "ФОТО СО СПЕКТАКЛЯ" */}
      {isGalleryOpen && !isMobile && (
        <div 
          className="fixed inset-0 z-[10000] bg-black"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'auto'
          }}
        >
          <GalleryView />
        </div>
      )}
    </main>
  );
}

