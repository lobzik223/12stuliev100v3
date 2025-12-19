'use client';

import React, { useState, useRef, useEffect } from 'react';
import './DetailsView.css';
import TypingText from '../ui/TypingText';
import CounterAnimation from '../ui/CounterAnimation';
import ActorsSection from '../sections/ActorsSection';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { reviews } from '../../data/reviews';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../Header';
import { useRouter } from 'next/navigation';
import EmployeeTicketsModal from '../ui/EmployeeTicketsModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DetailsViewProps {
  city?: string;
  dateTime?: string | { __html: string };
  buyTicketUrl?: string;
  address?: string;
}

const DetailsView: React.FC<DetailsViewProps> = ({ 
  city = 'Нижнем Новгороде', 
  dateTime,
  buyTicketUrl,
  address
}) => {
  const router = useRouter();
  // PRODUCTION FIX: Обрабатываем dateTime - может быть строкой или объектом с HTML
  // Используем переданное значение, если оно есть, иначе дефолтное
  const defaultDateTime = '24 НОЯБРЯ | 19:00';
  // Проверяем, что dateTime не undefined и не null
  const dateTimeValue = (dateTime !== undefined && dateTime !== null) ? dateTime : defaultDateTime;
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isEmployeeTicketsModalOpen, setIsEmployeeTicketsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });
  // Trailer (treiler.mp4) in place of ramka widget (match MainScreen Trailer section behavior)
  const trailerRef = useRef<HTMLVideoElement>(null);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const lastMobileTouchTsRef = useRef(0);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleBuyTicket = () => {
    if (buyTicketUrl) {
      setIsTicketModalOpen(true);
    }
  };

  const toggleTrailerPlayback = () => {
    const v = trailerRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {
        // Autoplay/tap restrictions are OK to ignore silently
      });
    } else {
      try {
        v.pause();
      } catch {
        // ignore
      }
    }
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
  };

  // Ref для раздела "Контакты" - footer
  const contactsSectionRef = useRef<HTMLDivElement>(null);
  const legalInfoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Инициализация isMobile при монтировании и изменении размера окна
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  // PRODUCTION FIX: Гарантированная инициализация видео для стабильной загрузки
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const video = trailerRef.current;
    if (!video) return;

    // Устанавливаем атрибуты для стабильной работы на всех устройствах
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.muted = true;
    
    // Обработчики для гарантированной загрузки
    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
      // Гарантируем видимость видео
      video.style.display = 'block';
      video.style.visibility = 'visible';
      video.style.opacity = '1';
    };

    const handleCanPlay = () => {
      setIsVideoReady(true);
    };

    const handleError = (e: Event) => {
      console.warn('Video load error (non-critical):', e);
      // Не блокируем рендеринг при ошибке загрузки видео
      setIsVideoReady(true);
    };

    // Если видео уже загружено
    if (video.readyState >= 2) {
      setIsVideoReady(true);
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Принудительная загрузка метаданных
    if (video.readyState === 0) {
      video.load();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Блокируем скролл body при открытии модального окна на мобильных и скрываем header
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isTicketModalOpen && isMobile) {
      // Сохраняем текущую позицию скролла
      const scrollY = window.scrollY;
      // Блокируем скролл body, сохраняя позицию
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      // Добавляем класс для CSS правил
      document.body.classList.add('modal-scroll-locked');
      
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
        // Восстанавливаем скролл при закрытии
        const savedScrollY = parseInt(document.body.style.top || '0', 10) * -1 || scrollY;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.classList.remove('modal-scroll-locked');
        
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
        
        // Используем requestAnimationFrame для плавного восстановления
        requestAnimationFrame(() => {
          window.scrollTo(0, savedScrollY);
        });
      };
    } else if (!isTicketModalOpen && isMobile) {
      // Убеждаемся что стили очищены даже если модальное окно закрылось другим способом
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.classList.remove('modal-scroll-locked');
      
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
  }, [isTicketModalOpen, isMobile]);

  // УПРОЩЕННАЯ логика скролла - на мобильных используем нативный скролл без ограничений
  // MOBILE SCROLL FIX: Полностью отключаем любую логику скролла на мобильных и обеспечиваем правильную высоту
  useEffect(() => {
    // На мобильных отключаем все ограничения скролла - используем нативный скролл
    if (isMobile) {
      // CRITICAL: Keep mobile scrolling native and lightweight.
      // Previous implementation scanned children with getBoundingClientRect() and re-ran on scroll,
      // which can freeze scrolling on real phones.
      const restoreNativeScroll = () => {
        // Do not fight active modal scroll-lock (it manages its own styles)
        if (document.body?.classList.contains('modal-scroll-locked')) return;
        if (document.body && document.documentElement) {
          document.body.style.height = '';
          document.body.style.maxHeight = '';
          document.body.style.overflowY = '';
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.documentElement.style.height = '';
          document.documentElement.style.maxHeight = '';
          document.documentElement.style.overflowY = '';
          document.documentElement.style.overflow = '';
        }

        if (containerRef.current) {
          containerRef.current.style.height = '';
          containerRef.current.style.maxHeight = '';
          containerRef.current.style.minHeight = '';
          containerRef.current.style.overflow = '';
          containerRef.current.style.overflowY = '';
          containerRef.current.style.overflowX = '';
          containerRef.current.style.position = '';
          containerRef.current.style.display = 'block';
        }
      };

      restoreNativeScroll();

      // CRITICAL: Ensure the page is scrollable to the very bottom on mobile.
      // A lot of DetailsView content is absolutely positioned, so it may not contribute to document height.
      // We set a min-height based on the bottom-most anchor (contacts/legal block) with minimal layout reads.
      const ensureScrollableHeight = () => {
        if (document.body?.classList.contains('modal-scroll-locked')) return;
        const container = containerRef.current;
        const anchor = contactsSectionRef.current || legalInfoRef.current;
        if (!container || !anchor) return;

        const rect = anchor.getBoundingClientRect();
        const bottom = window.scrollY + rect.bottom;
        const minHeight = Math.ceil(bottom + 120); // small safe buffer
        if (minHeight > 0) {
          container.style.minHeight = `${minHeight}px`;
        }
      };

      // Run a few times during initial load (images/fonts) without attaching scroll listeners.
      ensureScrollableHeight();
      const t1 = window.setTimeout(ensureScrollableHeight, 200);
      const t2 = window.setTimeout(ensureScrollableHeight, 600);
      const t3 = window.setTimeout(ensureScrollableHeight, 1200);

      const handleResize = () => restoreNativeScroll();
      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('orientationchange', handleResize, { passive: true });

      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.clearTimeout(t3);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
        ensureScrollableHeight();
        restoreNativeScroll();
      };
    }

    // Для десктопа оставляем ограничение скролла
    let rafId: number | null = null;
    let isScrolling = false;
    let maxScrollValue = 0;
    let observer: IntersectionObserver | null = null;

    const calculateMaxScroll = () => {
      const targetRef = legalInfoRef.current || contactsSectionRef.current;
      if (!targetRef || !containerRef.current) return;
      
      const rect = targetRef.getBoundingClientRect();
      const targetBottom = window.scrollY + rect.bottom;
      const exactHeight = Math.ceil(targetBottom + 40);
      maxScrollValue = Math.max(0, exactHeight - window.innerHeight);
      
      if (document.body && document.documentElement && containerRef.current) {
        document.body.style.height = `${exactHeight}px`;
        document.body.style.maxHeight = `${exactHeight}px`;
        document.body.style.overflowY = 'hidden';
        document.documentElement.style.height = `${exactHeight}px`;
        document.documentElement.style.maxHeight = `${exactHeight}px`;
        document.documentElement.style.overflowY = 'auto';
        containerRef.current.style.height = `${exactHeight}px`;
        containerRef.current.style.maxHeight = `${exactHeight}px`;
        containerRef.current.style.overflow = 'hidden';
        
        const backgroundHeightVh = 600;
        const blackBgStart = backgroundHeightVh * window.innerHeight / 100;
        const blackBgHeight = Math.max(0, exactHeight - blackBgStart);
        containerRef.current.style.setProperty('--after-height', blackBgHeight > 0 ? `${blackBgHeight}px` : '0px');
      }
    };

    const handleScroll = () => {
      const targetRef = legalInfoRef.current || contactsSectionRef.current;
      if (!targetRef || isScrolling) return;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        if (!targetRef || isScrolling) {
          rafId = null;
          return;
        }

        const currentScroll = window.scrollY;
        const rect = targetRef.getBoundingClientRect();
        const targetBottom = window.scrollY + rect.bottom;
        const exactHeight = Math.ceil(targetBottom + 40);
        const calculatedMaxScroll = Math.max(0, exactHeight - window.innerHeight);
        
        if (maxScrollValue === 0 || Math.abs(maxScrollValue - calculatedMaxScroll) > 5) {
          maxScrollValue = calculatedMaxScroll;
        }
        
        const threshold = 2;
        if (currentScroll > maxScrollValue + threshold) {
          isScrolling = true;
          window.scrollTo({
            top: maxScrollValue,
            behavior: 'auto'
          });
          setTimeout(() => {
            isScrolling = false;
          }, 150);
        }
        
        rafId = null;
      });
    };

    const initHeight = () => {
      calculateMaxScroll();
      setTimeout(() => calculateMaxScroll(), 300);
      setTimeout(() => calculateMaxScroll(), 600);
      setTimeout(() => calculateMaxScroll(), 1000);
    };
    
    if (legalInfoRef.current) {
      observer = new IntersectionObserver(() => {
        setTimeout(() => calculateMaxScroll(), 100);
      }, { threshold: 0.1 });
      observer.observe(legalInfoRef.current);
    }
    
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(() => calculateMaxScroll(), 200);
      }
    };
    
    setTimeout(initHeight, 100);
    
    const handleResize = () => {
      maxScrollValue = 0;
      calculateMaxScroll();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (observer) {
        observer.disconnect();
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
  }, [isMobile]);

  // Refs для анимации PNG объектов
  const quoteTextRef = useRef<HTMLDivElement>(null);
  const longQuoteTextRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const reviewsSectionRef = useRef<HTMLDivElement>(null);
  const buyTicketButtonRef = useRef<HTMLButtonElement>(null);
  const venueWidgetRef = useRef<HTMLDivElement>(null);
  const mobileBlurOverlayRef = useRef<HTMLDivElement>(null);
  
  // Фиксируем позицию треугольника сразу после монтирования
  useEffect(() => {
    if (triangleRef.current) {
      // Устанавливаем фиксированную позицию сразу, до всех анимаций
      triangleRef.current.style.position = 'absolute';
      triangleRef.current.style.top = '52%'; // Немного ниже центра
      triangleRef.current.style.transform = 'translateY(-50%)';
      triangleRef.current.style.left = '0';
    }
  }, []); // Выполняется только один раз при монтировании
  
  // Refs для раздела "Наши преимущества"
  const advantagesTitleRef = useRef<HTMLDivElement>(null);
  const starImageRef = useRef<HTMLDivElement>(null);
  const darkOverlayDuplicateRef = useRef<HTMLDivElement>(null);
  const logoInStarRef = useRef<HTMLDivElement>(null);
  const comedyQualityTextRef = useRef<HTMLDivElement>(null);
  const premiumSegmentTextRef = useRef<HTMLDivElement>(null);
  const artistsIconRef = useRef<HTMLDivElement>(null);
  const bestArtistsTextRef = useRef<HTMLDivElement>(null);
  const directorIconRef = useRef<HTMLDivElement>(null);
  const topDirectorTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ОТКЛЮЧАЕМ ВСЕ АНИМАЦИИ НА МОБИЛЬНЫХ ДЛЯ ИСПРАВЛЕНИЯ БАГОВ
    if (isMobile) {
      // На мобильных просто показываем элементы без анимаций
      const elements = [
        quoteTextRef.current,
        longQuoteTextRef.current,
        triangleRef.current,
        advantagesTitleRef.current,
        starImageRef.current,
        logoInStarRef.current,
        comedyQualityTextRef.current,
        premiumSegmentTextRef.current,
        artistsIconRef.current,
        bestArtistsTextRef.current,
        directorIconRef.current,
        topDirectorTextRef.current
      ];
      
      elements.forEach(el => {
        if (el) {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = '';
          (el as HTMLElement).style.visibility = 'visible';
        }
      });
      
      // КРИТИЧНО: Отключаем ScrollTrigger полностью на мобильных для предотвращения проблем со скроллом
      if (typeof window !== 'undefined' && ScrollTrigger) {
        // Убиваем все существующие триггеры
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        // Отключаем обновления ScrollTrigger на мобильных
        ScrollTrigger.config({ 
          autoRefreshEvents: 'none'
        });
      }
      
      return;
    }

    // Анимации только для десктопа
    // Анимация для короткой цитаты (text1.png)
    if (quoteTextRef.current) {
      gsap.fromTo(quoteTextRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteTextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Анимация для длинной цитаты (text55.png)
    if (longQuoteTextRef.current) {
      gsap.fromTo(longQuoteTextRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: longQuoteTextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.2
        }
      );
    }

    // Анимация для треугольника (treygol.png) - без смещения по Y для стабильности
    if (triangleRef.current) {
      // Убеждаемся, что позиция зафиксирована перед анимацией
      gsap.set(triangleRef.current, {
        y: 0, // Фиксируем Y на 0, чтобы не было смещений
        top: '52%', // Немного ниже центра
        transform: 'translateY(-50%)' // Сохраняем центрирование
      });
      
      // Анимация только прозрачности, масштаба и поворота - НЕ трогаем позицию
      gsap.fromTo(triangleRef.current,
        {
          opacity: 0,
          scale: 0.9,
          rotation: -10
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0, // Явно фиксируем Y на 0
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: triangleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            // Отключаем любые изменения позиции через ScrollTrigger
            invalidateOnRefresh: false
          },
          delay: 0.1,
          // Убеждаемся, что позиция не меняется
          onUpdate: function() {
            if (triangleRef.current) {
              triangleRef.current.style.top = '52%'; // Немного ниже центра
              triangleRef.current.style.transform = 'translateY(-50%)';
            }
          }
        }
      );
    }

    // Анимации для раздела "Наши преимущества"
    // Заголовок "Наши преимущества"
    if (advantagesTitleRef.current) {
      gsap.fromTo(advantagesTitleRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: advantagesTitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Звезда (yildiz.png)
    if (starImageRef.current) {
      gsap.fromTo(starImageRef.current,
        {
          opacity: 0,
          scale: 0.9,
          rotation: -90
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.4,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: starImageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.15
        }
      );
    }

    // Логотип в звезде (logo2.png)
    if (logoInStarRef.current) {
      gsap.fromTo(logoInStarRef.current,
        {
          opacity: 0,
          scale: 0.5
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: logoInStarRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.5
        }
      );
    }

    // Текст "КОМЕДИЯ ВЫСАЧАЙШЕГО КАЧЕСТВА"
    if (comedyQualityTextRef.current) {
      gsap.fromTo(comedyQualityTextRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: comedyQualityTextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.3
        }
      );
    }

    // Текст "Спектакль премиум сегмента"
    if (premiumSegmentTextRef.current) {
      gsap.fromTo(premiumSegmentTextRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: premiumSegmentTextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.4
        }
      );
    }

    // Иконка театральной маски (artisti.png)
    if (artistsIconRef.current) {
      gsap.fromTo(artistsIconRef.current,
        {
          opacity: 0,
          x: -50,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: artistsIconRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.2
        }
      );
    }

    // Текст "Лучшие артисты"
    if (bestArtistsTextRef.current) {
      gsap.fromTo(bestArtistsTextRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bestArtistsTextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.4
        }
      );
    }

    // Иконка кинокамеры (rejiser.png)
    if (directorIconRef.current) {
      gsap.fromTo(directorIconRef.current,
        {
          opacity: 0,
          x: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: directorIconRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.2
        }
      );
    }

    // Текст "Топовый режиссер"
    if (topDirectorTextRef.current) {
      gsap.fromTo(topDirectorTextRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: topDirectorTextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.4
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  // УПРОЩЕННОЕ позиционирование для мобильных - БЕЗ СЛОЖНЫХ ВЫЧИСЛЕНИЙ
  useEffect(() => {
    if (!isMobile) return;

    // Простое позиционирование элементов без сложных вычислений
    // Используем CSS для позиционирования, а не JavaScript вычисления
    
    if (advantagesTitleRef.current) {
      advantagesTitleRef.current.style.display = 'block';
      advantagesTitleRef.current.style.visibility = 'visible';
      advantagesTitleRef.current.style.opacity = '1';
    }
    
    if (starImageRef.current) {
      starImageRef.current.style.display = 'block';
      starImageRef.current.style.visibility = 'visible';
      starImageRef.current.style.opacity = '1';
    }
    
    if (darkOverlayDuplicateRef.current) {
      darkOverlayDuplicateRef.current.style.display = 'block';
      darkOverlayDuplicateRef.current.style.visibility = 'visible';
      darkOverlayDuplicateRef.current.style.opacity = '1';
    }

    // На мобильной версии кнопка и виджет позиционируются в потоке документа, не требуется JavaScript позиционирование
  }, [isMobile]);

  // На мобильной версии элементы позиционируются последовательно в потоке документа
  // Не требуется специальное позиционирование через JavaScript

  // Блюр убран на мобильной версии, так как черный фон убран

  return (
    <div ref={containerRef} className="details-container">
      <Header 
        isVisible={true}
        // Mobile: Header уже показывает крестик внутри кнопки-бургера при открытом меню.
        // Убираем второй крестик (кнопку закрытия) внутри overlay, чтобы не было дублей.
        hideCloseButton={true}
        onTicketsClick={() => {
          router.push('/');
        }}
        onAboutClick={() => {
          router.push('/');
        }}
        onGalleryClick={() => {
          router.push('/gallery');
        }}
        onActorsClick={() => {
          router.push('/');
        }}
        onTeamClick={() => {
          router.push('/');
        }}
        onReviewsClick={() => {
          router.push('/');
        }}
        onContactsClick={() => {
          router.push('/');
        }}
      />
      {/* Рамка - сначала на мобильных, потом на десктопе */}
      <div className={`frame-widget ${isMobile ? 'frame-widget-mobile-first' : ''}`}>
        {/* Видео psihuska.mp4 - автозапуск без звука, без плеера */}
        <div className="details-trailer-square">
          <video
            ref={trailerRef}
            className="details-trailer-video"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
              backgroundColor: '#000',
              display: 'block',
              visibility: 'visible',
              opacity: 1,
            }}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            onLoadedMetadata={() => {
              // PRODUCTION FIX: Гарантируем видимость после загрузки
              if (trailerRef.current) {
                trailerRef.current.style.display = 'block';
                trailerRef.current.style.visibility = 'visible';
                trailerRef.current.style.opacity = '1';
              }
            }}
            onError={(e) => {
              // PRODUCTION FIX: Обработка ошибок без блокировки рендеринга
              console.warn('Video error (non-critical):', e);
              if (trailerRef.current) {
                trailerRef.current.style.display = 'block';
                trailerRef.current.style.visibility = 'visible';
                trailerRef.current.style.opacity = '1';
              }
            }}
          >
            <source src="/photo/psihuska.mp4" type="video/mp4" />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        </div>
      </div>
      <div className="date-time-box">
        <svg 
          className="calendar-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
        </svg>
        {typeof dateTimeValue === 'string' ? (
          <span className="date-time-text">{dateTimeValue}</span>
        ) : (
          <span className="date-time-text" dangerouslySetInnerHTML={dateTimeValue} />
        )}
      </div>
      <div className="logo-container">
        <Image 
          src="/photo/logo12stuliev.png" 
          alt="12 СТУЛЬЕВ" 
          width={500}
          height={200}
          className="logo-image"
          priority
          quality={90}
          loading="eager"
          unoptimized
        />
      </div>
      <div className="location-text">
        <TypingText 
          text={`в ${city}`}
          speed={50}
          delay={300}
        />
      </div>
      <div className="description-text">
        <TypingText 
          text="Хитрость, азарт и театральная магия —"
          speed={50}
          delay={800}
        />
        <br />
        <TypingText 
          text="отправьтесь вместе с героями на захватывающее"
          speed={50}
          delay={2800}
        />
        <br />
        <TypingText 
          text="путешествие за сокровищем."
          speed={50}
          delay={4800}
        />
      </div>
      {/* На мобильной версии кнопка и виджет идут между текстом описания и кругами */}
      {isMobile ? (
        <>
          <button 
            ref={buyTicketButtonRef}
            className="buy-ticket-button"
            onClick={handleBuyTicket}
            disabled={!buyTicketUrl}
          >
            Купить билет
          </button>
          <div 
            ref={venueWidgetRef}
            className="venue-widget"
          >
            <svg 
              className="venue-icon" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                fill="currentColor"
              />
            </svg>
            <div className="venue-text">
              {address || 'Академический театр оперы и балета'}
            </div>
          </div>
          {/* Контейнер с затемнением temno11.png - начинается с кругов, заканчивается с textmibile.png - только на мобильной версии */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              marginTop: 'clamp(3.5rem, 7vh, 4.5rem)',
              marginBottom: 'clamp(2rem, 4vh, 3rem)',
              zIndex: 1
            }}
          >
            {/* Затемнение temno11.png - растягивается на всю высоту контейнера */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                overflow: 'hidden'
              }}
            >
              <Image 
                src="/photo/temno11.png" 
                alt="Затемнение" 
                width={1200}
                height={800}
                style={{ 
                  width: '100%', 
                  height: '100%',
                  objectFit: 'cover', /* Растягиваем на всю высоту контейнера */
                  opacity: 0.8,
                  display: 'block'
                }}
                unoptimized
              />
            </div>
            {/* Круги (статистика) */}
            <div style={{ height: 'clamp(4rem, 8vh, 5.5rem)', width: '100%', position: 'relative', zIndex: 2 }} />
            <div className="stats-circles" style={{ position: 'relative', zIndex: 2 }}>
            <div className="stat-circle">
              <div className="stat-number">
                <CounterAnimation
                  end={5}
                  duration={1500}
                  delay={200}
                  style={{
                    fontFamily: "'Noto Serif Malayalam', serif",
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit'
                  }}
                />
              </div>
              <div className="stat-label">СТРАН</div>
            </div>
            <div className="stat-circle">
              <div className="stat-number">
                <CounterAnimation
                  end={27}
                  duration={2000}
                  delay={400}
                  style={{
                    fontFamily: "'Noto Serif Malayalam', serif",
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit'
                  }}
                />
              </div>
              <div className="stat-label">ГОРОДОВ</div>
            </div>
            <div className="stat-circle">
              <div className="stat-number">
                <CounterAnimation
                  end={26350}
                  duration={2500}
                  delay={600}
                  style={{
                    fontFamily: "'Noto Serif Malayalam', serif",
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit'
                  }}
                />
              </div>
              <div className="stat-label">ЗРИТЕЛЕЙ</div>
            </div>
            </div>
            {/* text1.png */}
            <div ref={quoteTextRef} className="quote-text-overlay" style={{ position: 'relative', zIndex: 2 }}>
              <Image 
                src="/photo/text1.png" 
                alt="Текст цитаты" 
                width={800}
                height={400}
                loading="eager"
                priority
                style={{ width: 'auto', height: 'auto', maxWidth: '90%', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                unoptimized
              />
            </div>
            {/* textmibile.png */}
            <div ref={longQuoteTextRef} className="long-quote-text-overlay" style={{ position: 'relative', zIndex: 2 }}>
              <Image 
                src="/photo/textmibile.png" 
                alt="Длинный текст цитаты" 
                width={800}
                height={600}
                loading="eager"
                priority
                style={{ width: 'auto', height: 'auto', maxWidth: '90%', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                unoptimized
              />
            </div>
          </div>
        </>
      ) : (
            /* На ПК версии кнопка и виджет позиционируются абсолютно */
            <>
              <button 
                ref={buyTicketButtonRef}
                className="buy-ticket-button"
                onClick={handleBuyTicket}
                disabled={!buyTicketUrl}
              >
                Купить билет
              </button>
              <div 
                ref={venueWidgetRef}
                className="venue-widget"
              >
                <svg 
                  className="venue-icon" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                    fill="currentColor"
                  />
                </svg>
                <div className="venue-text">
                  {address || 'Академический театр оперы и балета'}
                </div>
              </div>
              {/* На ПК версии используем dark-overlay */}
              <div className="dark-overlay">
                <Image 
                  src="/photo/temno11.png" 
                  alt="Затемнение" 
                  width={1920}
                  height={1080}
                  className="dark-overlay-image"
                  priority
                  quality={80}
                  loading="eager"
                  unoptimized
                />
          <div ref={triangleRef} className="triangle-overlay">
            <Image 
              src="/photo/treygol.png" 
              alt="Треугольник" 
              width={200}
              height={200}
              loading="eager"
              priority
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              unoptimized
            />
          </div>
          <div className="stats-circles">
            <div className="stat-circle">
              <div className="stat-number">
                <CounterAnimation
                  end={5}
                  duration={1500}
                  delay={200}
                  style={{
                    fontFamily: "'Noto Serif Malayalam', serif",
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit'
                  }}
                />
              </div>
              <div className="stat-label">СТРАН</div>
            </div>
            <div className="stat-circle">
              <div className="stat-number">
                <CounterAnimation
                  end={27}
                  duration={2000}
                  delay={400}
                  style={{
                    fontFamily: "'Noto Serif Malayalam', serif",
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit'
                  }}
                />
              </div>
              <div className="stat-label">ГОРОДОВ</div>
            </div>
            <div className="stat-circle">
              <div className="stat-number">
                <CounterAnimation
                  end={26350}
                  duration={2500}
                  delay={600}
                  style={{
                    fontFamily: "'Noto Serif Malayalam', serif",
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit'
                  }}
                />
              </div>
              <div className="stat-label">ЗРИТЕЛЕЙ</div>
            </div>
          </div>
          <div ref={quoteTextRef} className="quote-text-overlay">
            <Image 
              src="/photo/text1.png" 
              alt="Текст цитаты" 
              width={800}
              height={400}
              loading="eager"
              priority
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              unoptimized
            />
          </div>
          <div ref={longQuoteTextRef} className="long-quote-text-overlay">
            <Image 
              src="/photo/text55.png" 
              alt="Длинный текст цитаты" 
              width={800}
              height={600}
              loading="eager"
              priority
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              unoptimized
            />
          </div>
        </div>
        </>
      )}
      {!isMobile && (
      <div ref={darkOverlayDuplicateRef} className="dark-overlay-duplicate">
        <Image 
          src="/photo/temno11.png" 
          alt="Затемнение дубликат" 
          width={1920}
          height={1080}
          className="dark-overlay-image"
          quality={80}
          loading="lazy"
          unoptimized
        />
        <div ref={advantagesTitleRef} className="advantages-title">Наши преимущества</div>
        <div ref={starImageRef} className="star-image">
          <Image 
            src="/photo/yildiz.png" 
            alt="Звезда" 
            width={300}
            height={300}
            loading="eager"
            priority
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            unoptimized
          />
        </div>
        <div ref={logoInStarRef} className="logo-in-star">
          <Image 
            src="/photo/logo2.png" 
            alt="Логотип 12 стульев" 
            width={150}
            height={150}
            loading="eager"
            priority
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            unoptimized
          />
        </div>
        <div ref={comedyQualityTextRef} className="comedy-quality-text">КОМЕДИЯ ВЫСАЧАЙШЕГО КАЧЕСТВА</div>
        <div ref={premiumSegmentTextRef} className="premium-segment-text">
          Спектакль премиум<br />
          сегмента
        </div>
        <div ref={artistsIconRef} className="artists-icon">
          <Image 
            src="/photo/artisti.png" 
            alt="Иконка театральной маски" 
            width={100}
            height={100}
            loading="eager"
            priority
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            unoptimized
          />
        </div>
        <div ref={bestArtistsTextRef} className="best-artists-text">Лучшие артисты</div>
        <div ref={directorIconRef} className="director-icon">
          <Image 
            src="/photo/rejiser.png" 
            alt="Иконка кинокамеры" 
            width={100}
            height={100}
            loading="eager"
            priority
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            unoptimized
          />
        </div>
        <div ref={topDirectorTextRef} className="top-director-text">Топовый режиссер</div>
        <button 
          className="buy-ticket-button-bottom"
          onClick={handleBuyTicket}
          disabled={!buyTicketUrl}
        >
          Купить билет
        </button>
      </div>
      )}

      {/* Градиент блюра между фоном section-34839282.png и черным фоном перед разделом актеров - только для ПК */}
      {!isMobile && (
        <div 
          className="actors-blur-gradient-pc"
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 19
          }}
        />
      )}

      {/* Раздел "Актеры" - только для ПК */}
      {!isMobile && (
      <div 
        className="actors-section-details" 
        style={{ 
          width: '100%', 
          position: 'relative',
          zIndex: 20
        }}
      >
        <ActorsSection />
      </div>
      )}

      {/* Блюр убран на мобильной версии - черный фон убран */}

      {/* Раздел "ОТЗЫВЫ" - на мобильной версии идет после PNG изображений */}
      <div ref={reviewsSectionRef} className="w-full flex flex-col items-center reviews-section-details" style={{
        marginTop: isMobile ? 'clamp(4rem, 8vh, 5.5rem)' : 'clamp(8rem, 12vh, 10rem)',
        width: '100%', 
        position: 'relative',
        zIndex: 20,
        paddingTop: isMobile ? 'clamp(2rem, 4vh, 3rem)' : 'clamp(3rem, 6vh, 5rem)',
        paddingBottom: 'clamp(2rem, 4vh, 3rem)'
      }}>
        <p 
          className="text-2xl md:text-3xl lg:text-4xl uppercase"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            color: '#FBC632',
            filter: 'drop-shadow(0 0 7.5px rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 15px rgba(231, 200, 132, 0.4), 0 0 30px rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.1em',
            textAlign: 'center',
            marginBottom: isMobile ? '0' : '2.5rem', // Убран отступ на мобильной версии для максимальной близости к карточкам
          }}
        >
          ОТЗЫВЫ
        </p>

        {/* Блок отзывов с каруселью Swiper */}
        <div className="relative w-full mt-10" style={{ 
          marginTop: isMobile ? '-1.5rem' : undefined, // Отрицательный отступ на мобильной версии, чтобы заголовок был ближе к карточкам
          padding: '2rem 0', 
          paddingLeft: 'clamp(2.5rem, 4vw, 3.5rem)', 
          paddingRight: 'clamp(2.5rem, 4vw, 3.5rem)' 
        }}>
          <Swiper
            modules={[Navigation]}
            speed={800}
            spaceBetween={0}
            loop={true}
            slidesPerView={4}
            slidesPerGroup={1}
            centeredSlides={false}
            grabCursor={true}
            // MOBILE: do not block vertical page scrolling (no "inner scroll" feeling)
            touchStartPreventDefault={!isMobile}
            touchMoveStopPropagation={false}
            passiveListeners={true}
            navigation={{
              nextEl: '.swiper-button-next-reviews-details',
              prevEl: '.swiper-button-prev-reviews-details',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
            }}
            className="reviews-carousel"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div
                  className="flex flex-col items-center"
                  style={{
                    width: '100%',
                    padding: '0'
                  }}
                >
                  {/* Карточка с текстом внутри - единое целое */}
                  <div
                    className="relative"
                    style={{
                      width: '100%',
                      maxWidth: 'clamp(350px, 28vw, 600px)', /* Уменьшено с 450px-750px до 350px-600px */
                      pointerEvents: 'auto'
                    }}
                  >
                    <Image
                      src="/backgrounds/sections/otzivi.png"
                      alt={`Отзыв от ${review.name}`}
                      width={900}
                      height={600}
                      className="h-auto w-full"
                      style={{ 
                        objectFit: 'contain',
                        display: 'block',
                        pointerEvents: 'none'
                      }}
                      unoptimized
                    />
                    
                    {/* Текст по центру карточки - часть единого целого */}
                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center text-center"
                      style={{
                        padding: 'clamp(1rem, 2vw, 2rem)',
                        zIndex: 1,
                        transform: 'translateY(-3%)',
                        pointerEvents: 'none'
                      }}
                    >
                      {/* Имя */}
                      <p
                        style={{
                          fontFamily: "'Playfair Display SC', serif",
                          fontSize: 'clamp(0.875rem, 1.1vw, 1.1rem)',
                          color: '#682302',
                          fontWeight: 'bold',
                          marginBottom: 'clamp(0.25rem, 0.5vw, 0.5rem)',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {review.name}
                      </p>
                      
                      {/* Звездочки */}
                      <div 
                        className="flex justify-center gap-1"
                        style={{
                          marginBottom: 'clamp(0.25rem, 0.5vw, 0.5rem)'
                        }}
                      >
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            viewBox="0 0 24 24"
                            fill={index < review.rating ? '#682302' : 'none'}
                            stroke="#682302"
                            strokeWidth="2"
                            style={{
                              width: 'clamp(12px, 1vw, 16px)',
                              height: 'clamp(12px, 1vw, 16px)'
                            }}
                          >
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                        ))}
                      </div>
                      
                      {/* Текст отзыва */}
                      <p
                        style={{
                          fontFamily: "'Playfair Display SC', serif",
                          fontSize: 'clamp(0.55rem, 0.65vw, 0.7rem)',
                          color: '#1a1a1a',
                          lineHeight: '1.3',
                          letterSpacing: '0.02em',
                          maxWidth: 'clamp(140px, 12vw, 220px)',
                          margin: '0 auto',
                          marginBottom: '0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {review.text}
                      </p>
                      
                      {/* Дата */}
                      <p
                        style={{
                          fontFamily: "'Playfair Display SC', serif",
                          fontSize: 'clamp(0.65rem, 0.8vw, 0.8rem)',
                          color: '#8B7355',
                          letterSpacing: '0.02em',
                          fontStyle: 'italic',
                          marginTop: 'clamp(0.5rem, 0.75vw, 0.75rem)',
                          marginBottom: '0'
                        }}
                      >
                        {review.date}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Кнопки навигации Swiper - полностью видны */}
          <div 
            className="swiper-button-prev swiper-button-prev-reviews-details" 
            style={{ 
              color: '#FBC632',
              top: '50%',
              transform: 'translateY(-50%)',
              position: 'absolute',
              zIndex: 30,
              left: 'clamp(0.5rem, 1vw, 1rem)', /* Небольшой отступ от края для видимости */
              width: 'clamp(2rem, 3vw, 2.5rem)',
              height: 'clamp(2rem, 3vw, 2.5rem)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          ></div>
          <div 
            className="swiper-button-next swiper-button-next-reviews-details" 
            style={{ 
              color: '#FBC632',
              top: '50%',
              transform: 'translateY(-50%)',
              position: 'absolute',
              zIndex: 30,
              right: 'clamp(0.5rem, 1vw, 1rem)', /* Небольшой отступ от края для видимости */
              width: 'clamp(2rem, 3vw, 2.5rem)',
              height: 'clamp(2rem, 3vw, 2.5rem)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          ></div>
        </div>
      </div>

      {/* Блюр между разделами "ОТЗЫВЫ" и "Данные спектакля" - скрывает черную линию между изображением и черным фоном */}
      <div 
        style={{
          position: 'absolute',
          top: isMobile ? '380vh' : '580vh', /* calc(400vh - 20vh) для мобильных, calc(600vh - 20vh) для десктопа - начинается за 20vh до конца изображения */
          left: 0,
          height: '20vh',
          width: '100%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.8) 70%, rgba(0, 0, 0, 1) 100%)',
          backdropFilter: isMobile ? 'none' : 'blur(15px)', /* Убираем блюр в мобильной версии */
          WebkitBackdropFilter: isMobile ? 'none' : 'blur(15px)', /* Убираем блюр в мобильной версии */
          display: isMobile ? 'none' : 'block', /* Скрываем элемент в мобильной версии */
          zIndex: 15, /* Выше фонов (::before и ::after имеют z-index: -1), но ниже контента */
          pointerEvents: 'none'
        }}
      />

      {/* Блюр на границе между фоном section-34839282.png и черным экраном, где начинается раздел "Отзывы" - убран на мобильной версии */}

      {/* Раздел "Данные спектакля" */}
      <div 
        className="w-full flex flex-col items-center justify-center"
        style={{ 
          marginTop: isMobile ? '0.5rem' : 'clamp(4rem, 7vh, 6rem)', /* Еще больше уменьшен margin-top на мобильной версии */
          paddingTop: 'clamp(1.5rem, 3vh, 2rem)',
          paddingBottom: 'clamp(2rem, 4vh, 3rem)',
          ...(isMobile ? {} : { backgroundColor: '#000000' }), /* Убираем фон полностью на мобильной версии */
          width: '100%',
          position: 'relative',
          zIndex: 20,
          minHeight: '60vh'
        }}
      >
        <div className="w-full max-w-[120rem] mx-auto flex flex-col items-center" style={{ padding: '0 clamp(1rem, 4vw, 4rem)' }}>
          {/* Логотип */}
          <div className="mb-8 md:mb-12">
            <Image
              src="/backgrounds/sections/logo100let.png"
              alt="12 СТУЛЬЕВ 100 лет спустя"
              width={450}
              height={450}
              style={{
                maxWidth: 'clamp(200px, 25vw, 350px)',
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
              unoptimized
            />
          </div>

          {/* Город */}
          <p
            className="uppercase text-center mb-3 md:mb-4"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.25rem, 2vw, 2rem)',
              color: '#FBC632',
              fontWeight: '600',
              letterSpacing: '0.08em'
            }}
          >
            В {city.charAt(0).toUpperCase() + city.slice(1)}
          </p>

          {/* Адрес театра */}
          <p
            className="text-center mb-3 md:mb-4"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
              color: '#D9B682',
              letterSpacing: '0.05em',
              lineHeight: '1.6'
            }}
          >
            {address || 'Академический театр оперы и балета | пл. Куйбышева 1'}
          </p>

          {/* Дата и время */}
          <div
            className="text-center mb-8 md:mb-10 date-time-text"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
              color: '#D9B682',
              fontWeight: '700',
              letterSpacing: '0.08em'
            }}
          >
            {typeof dateTimeValue === 'string' ? (
              <span>{dateTimeValue}</span>
            ) : (
              <span dangerouslySetInnerHTML={dateTimeValue} />
            )}
          </div>

          {/* Кнопки */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <button
              onClick={handleBuyTicket}
              disabled={!buyTicketUrl}
              className="rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                letterSpacing: '0.05em',
                color: '#FFFFFF',
                backgroundColor: '#682302',
                borderColor: '#FBC632',
                borderWidth: '2px',
                padding: 'clamp(0.75rem, 1vw, 1rem) clamp(2rem, 3vw, 3rem)',
                boxShadow: '0 0 10px rgba(251, 198, 50, 0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              Купить билет
            </button>
            <button
              onClick={() => window.location.href = '/schedule'}
              className="rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                letterSpacing: '0.05em',
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                borderColor: '#FBC632',
                borderWidth: '2px',
                padding: 'clamp(0.75rem, 1vw, 1rem) clamp(2rem, 3vw, 3rem)',
                boxShadow: '0 0 10px rgba(251, 198, 50, 0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              ПОСМОТРЕТЬ РАСПИСАНИЕ
            </button>
          </div>
        </div>
      </div>

      {/* Раздел "Контакты и партнёры" - FOOTER */}
      <div ref={contactsSectionRef} className="w-full flex flex-col items-center contacts-section-no-overlay" style={{ width: '100%', padding: '0 clamp(1rem, 4vw, 4rem)', marginTop: 'clamp(2rem, 4vh, 3rem)', paddingBottom: 'clamp(2rem, 4vh, 3rem)', marginBottom: '0', position: 'relative', zIndex: 25 }}>
        {/* Заголовок "Контакты и партнёры" */}
        <p
          className="uppercase text-center"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            color: '#FBC632',
            filter: 'drop-shadow(0 0 7.5px rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 15px rgba(231, 200, 132, 0.4), 0 0 30px rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.1em',
            width: '100%'
          }}
        >
          Контакты и партнёры
        </p>
        
        {/* Блок контактов и партнёров */}
        <div className="mt-8 md:mt-12 w-full mx-auto text-white" style={{ maxWidth: 'clamp(1200px, 90vw, 1600px)' }}>
          <div className={`flex flex-col md:flex-row ${isMobile ? 'items-center' : 'items-start'} justify-between gap-6 md:gap-8 lg:gap-12`}>
            {/* Левая колонка — контакты */}
            <div className="flex-1 text-center md:text-left space-y-2" style={{ 
              marginLeft: isMobile ? '0' : 'clamp(-4rem, -6vw, -2rem)', 
              paddingLeft: isMobile ? '0' : 'clamp(1rem, 3vw, 2rem)',
              minWidth: 'clamp(200px, 20vw, 300px)'
            }}>
              <p
                style={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: 'clamp(1.25rem, 2vw, 2rem)',
                  color: '#FFFFFF',
                  letterSpacing: '0.08em',
                }}
              >
                Для связи
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                }}
              >
                Email:{' '}
                <a
                  href="mailto:BELGORODKONCERT@YANDEX.RU"
                  style={{ color: '#FBC632', textDecoration: 'underline' }}
                >
                  BELGORODKONCERT@YANDEX.RU
                </a>
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                }}
              >
                Телефон:{' '}
                <a
                  href="tel:+79045329444"
                  style={{ color: '#FBC632', textDecoration: 'underline' }}
                >
                  +7-904-532-94-44
                </a>
              </p>
            </div>

            {/* Центральная колонка — логотип */}
            <div className="flex-1 flex flex-col items-center justify-center" style={{ 
              marginTop: 'clamp(1rem, 2vh, 2rem)',
              minWidth: 'clamp(250px, 25vw, 400px)'
            }}>
              <Image
                src="/backgrounds/sections/logo100let.png"
                alt="12 стульев — 100 лет спустя"
                width={450}
                height={450}
                style={{
                  maxWidth: 'clamp(280px, 25vw, 450px)',
                  width: '100%',
                  height: 'auto'
                }}
                unoptimized
              />
            </div>

            {/* Правая колонка — соцсети и кнопка */}
            <div className="flex-1 text-center md:text-right space-y-4" style={{ 
              marginRight: isMobile ? '0' : 'clamp(-4rem, -6vw, -2rem)', 
              paddingRight: isMobile ? '0' : 'clamp(1rem, 3vw, 2rem)',
              minWidth: 'clamp(200px, 20vw, 300px)'
            }}>
              <p
                style={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: 'clamp(1.25rem, 2vw, 2rem)',
                  color: '#FFFFFF',
                  letterSpacing: '0.08em',
                }}
              >
                Социальные сети
              </p>
              <div className="flex justify-center md:justify-end gap-4">
                {/* Условные иконки соцсетей в стиле примера */}
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 'clamp(40px, 3vw, 50px)',
                    height: 'clamp(40px, 3vw, 50px)',
                    border: '2px solid #FBC632',
                    color: '#FBC632',
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(14px, 1.2vw, 18px)',
                  }}
                >
                  W
                </div>
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 'clamp(40px, 3vw, 50px)',
                    height: 'clamp(40px, 3vw, 50px)',
                    border: '2px solid #FBC632',
                    color: '#FBC632',
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(14px, 1.2vw, 18px)',
                  }}
                >
                  TG
                </div>
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 'clamp(40px, 3vw, 50px)',
                    height: 'clamp(40px, 3vw, 50px)',
                    border: '2px solid #FBC632',
                    color: '#FBC632',
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(14px, 1.2vw, 18px)',
                  }}
                >
                  VK
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <button
                  onClick={() => setIsEmployeeTicketsModalOpen(true)}
                  className="mt-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(12px, 1vw, 16px)',
                    letterSpacing: '0.08em',
                    color: '#FBC632',
                    backgroundColor: 'transparent',
                    borderColor: '#FBC632',
                    borderWidth: '2px',
                    boxShadow: '0 0 10px rgba(251, 198, 50, 0.35), 0 0 20px rgba(251, 198, 50, 0.2)',
                    whiteSpace: 'nowrap',
                    padding: 'clamp(0.5rem, 0.75vw, 0.625rem) clamp(1.5rem, 2.5vw, 3rem)'
                  }}
                >
                  билеты для сотрудников
                </button>
              </div>
            </div>
          </div>

          {/* Нижняя строка с юридической информацией */}
          <div ref={legalInfoRef} className="mt-10 text-center space-y-1" style={{ width: '100%', paddingBottom: '0', marginBottom: '0' }}>
            <p
              style={{ 
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(0.75rem, 1vw, 1rem)'
              }}
            >
              <span style={{ color: '#D9B682' }}>ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ: </span>
              <span style={{ color: '#FFFFFF' }}>ЛАГУТЕЕВ АЛЕКСАНДР АЛЕКСАНДРОВИЧ</span>
            </p>
            <p
              style={{ 
                fontFamily: "'Playfair Display SC', serif",
                fontSize: 'clamp(0.75rem, 1vw, 1rem)'
              }}
            >
              <span style={{ color: '#D9B682' }}>ИНН: </span>
              <span style={{ color: '#FFFFFF' }}>570700972948</span>
              <span style={{ color: '#D9B682' }}> | ОГРНИП: </span>
              <span style={{ color: '#FFFFFF' }}>324310000057680</span>
            </p>
          </div>
        </div>
      </div>

      {/* Модальное окно с виджетом intickets для покупки билетов */}
      {isTicketModalOpen && buyTicketUrl && (
        <div
          className="fixed inset-0 z-[9999]"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: isMobile ? 'none' : 'blur(5px)',
            padding: isMobile ? 'clamp(1rem, 2vh, 1.5rem)' : '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh'
          }}
          onClick={closeTicketModal}
        >
          <div
            className="relative bg-white overflow-hidden"
            style={{
              width: isMobile ? '95vw' : '90vw',
              height: isMobile ? '90vh' : '85vh',
              maxWidth: isMobile ? '95vw' : '1200px',
              maxHeight: isMobile ? '90vh' : '800px',
              borderRadius: isMobile ? 'clamp(0.75rem, 2vw, 1rem)' : '0.5rem',
              boxShadow: isMobile ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 20px 60px rgba(0, 0, 0, 0.5)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              margin: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия - черный крестик в белом круге */}
            <button
              onClick={closeTicketModal}
              className="absolute z-[10000] bg-white rounded-full transition-all hover:bg-gray-100"
              style={{
                top: isMobile ? 'clamp(0.5rem, 1.5vh, 0.75rem)' : '1rem',
                right: isMobile ? 'clamp(0.5rem, 1.5vh, 0.75rem)' : '1rem',
                width: isMobile ? 'clamp(2.5rem, 6vw, 3rem)' : '2.5rem',
                height: isMobile ? 'clamp(2.5rem, 6vw, 3rem)' : '2.5rem',
                padding: isMobile ? 'clamp(0.5rem, 1.5vw, 0.75rem)' : '0.5rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              <svg
                width={isMobile ? 'clamp(20px, 5vw, 24px)' : '24'}
                height={isMobile ? 'clamp(20px, 5vw, 24px)' : '24'}
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

            {/* Iframe с виджетом intickets - оптимизирован для мобильных */}
            <iframe
              key={`details-ticket-${buyTicketUrl}-${Date.now()}`}
              src={buyTicketUrl}
              className="w-full border-0"
              style={{
                width: '100%',
                height: isMobile ? 'calc(90vh - clamp(3.5rem, 7vh, 4.5rem))' : '100%',
                minHeight: isMobile ? 'calc(90vh - clamp(3.5rem, 7vh, 4.5rem))' : '600px',
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
      
      <EmployeeTicketsModal isOpen={isEmployeeTicketsModalOpen} onClose={() => setIsEmployeeTicketsModalOpen(false)} />
    </div>
  );
};

export default DetailsView;

