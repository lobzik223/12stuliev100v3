'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Header from "./Header";
import SecondaryNav from "./sections/SecondaryNav";
import HeroSection from "./sections/HeroSection";
import EventsSection from "./sections/EventsSection";
import JourneySection from "./sections/JourneySection";
import ActorsSection from "./sections/ActorsSection";
import TrailerSection from "./sections/TrailerSection";
import { useRouter } from 'next/navigation';

export default function MainScreen() {
  const router = useRouter();
  const [isMainHeaderVisible, setIsMainHeaderVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0); // 0: ОФИС, 1: ПСИХУШКА, 2: КВАРТИРА КИСЫ, 3: КВАРТИРА СТАРУХИ
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
      // Проверяем что мы в браузере (не на сервере)
      if (typeof window === 'undefined') return;

      const handleScroll = () => {
      if (!navPanelRef.current) return;
        
      const navPanelRect = navPanelRef.current.getBoundingClientRect();
      const finalTextRect = finalTextRef.current?.getBoundingClientRect();
        
      // Когда навигационная панель из EventsSection достигает верха экрана - "подхватываем" её
      if (navPanelRect.top <= 100) {
        // Проверяем, прошли ли мы текст "ФИНАЛ ОХОТЫ"
        if (finalTextRect && finalTextRect.top < window.innerHeight * 0.3) {
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
      const activationThreshold = window.innerHeight * 0.3;
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
      };

      // Ждем полной загрузки DOM и всех ресурсов на мобильных
      const initScrollHandler = () => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;
        
        // Проверяем что DOM готов
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
              window.addEventListener('scroll', handleScroll, { passive: true });
              window.addEventListener('touchmove', handleScroll, { passive: true });
              handleScroll();
            }, 200);
          });
        } else {
          // DOM уже загружен, но ждем еще немного для гарантии
          setTimeout(() => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('touchmove', handleScroll, { passive: true });
            handleScroll();
          }, 200);
        }
      };

      // Также слушаем событие app-ready из layout.tsx
      const handleAppReady = () => {
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('touchmove', handleScroll, { passive: true });
            handleScroll();
          }
        }, 100);
      };

      window.addEventListener('app-ready', handleAppReady);
      initScrollHandler();

      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('touchmove', handleScroll);
          window.removeEventListener('app-ready', handleAppReady);
        }
      };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black" style={{ overflowX: 'hidden' }}>
      {/* Скрытые изображения для принудительной загрузки на мобильных устройствах */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
        <img src="/backgrounds/sections/section-1.png" alt="" loading="eager" fetchPriority="high" />
        <img src="/backgrounds/sections/section-2.png" alt="" loading="eager" fetchPriority="high" />
        <img src="/backgrounds/sections/section-3.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/section-4.png" alt="" loading="eager" fetchPriority="high" />
        <img src="/backgrounds/sections/logo100let.png" alt="" loading="eager" fetchPriority="high" />
        <img src="/backgrounds/sections/plitkanovosti.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/vput.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/vput2.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/vput3.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/vput4.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/tiraj.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/flash.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/stul100let.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/analiz.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/pamat15.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/computer.png" alt="" loading="eager" />
        <img src="/backgrounds/sections/tabletki.png" alt="" loading="eager" />
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
      
      <div className="min-h-screen">
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
        <div ref={journeySectionRef}>
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

        {/* Небольшой блюр для плавного перехода между section-4.png и section-3.png */}
        <div 
          className="relative w-full transition-gradient-blur"
          style={{
            height: '8vh',
            width: '100%',
            background: 'transparent',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 10,
            position: 'relative'
          }}
        />

        {/* Раздел с фоном section-3.png */}
        <section 
          className="relative w-full"
          style={{
            width: '100%'
          }}
        >
          {/* Фон раздела - покрывает ActorsSection и TrailerSection до конца раздела "Контакты и партнёры" */}
          <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
            <div
              style={{
                backgroundImage: 'url(/backgrounds/sections/section-3.png)',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0',
                left: 0,
                bottom: 0,
                willChange: 'auto' // Оптимизация для браузера
              }}
            />
          </div>
          {/* Небольшой блюр над фоном section-3.png для плавного перехода */}
          <div 
            className="absolute top-0 left-0 w-full section3-blur-gradient"
            style={{
              height: '10vh',
              width: '100%',
              background: 'transparent',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 2,
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
    </main>
  );
}

