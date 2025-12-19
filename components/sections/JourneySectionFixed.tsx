'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';
import { isProbablyMobile } from '../utils/device';

// Only register GSAP on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface JourneySectionProps {
  sectionEndRef: React.RefObject<HTMLDivElement>;
  finalTextRef?: React.RefObject<HTMLDivElement>;
  navPanelRef?: React.RefObject<HTMLDivElement>;
  officeRef?: React.RefObject<HTMLDivElement>;
  psychushkaRef?: React.RefObject<HTMLDivElement>;
  kisaRef?: React.RefObject<HTMLDivElement>;
  yaryginaRef?: React.RefObject<HTMLDivElement>;
}

// Cache-busting version для изображений vput
const VPUT_IMAGES_VERSION = '?v=2.0';

export default function JourneySection({ sectionEndRef, finalTextRef, officeRef, psychushkaRef, kisaRef, yaryginaRef }: JourneySectionProps) {
  const vputSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const psihuskaVideoRef = useRef<HTMLVideoElement>(null);
  const mobilePsihuskaVideoRef = useRef<HTMLVideoElement>(null);
  const kvartiraVideoRef = useRef<HTMLVideoElement>(null);
  const mobileKvartiraVideoRef = useRef<HTMLVideoElement>(null);
  const babkaVideoRef = useRef<HTMLVideoElement>(null);
  const mobileBabkaVideoRef = useRef<HTMLVideoElement>(null);
  // CRITICAL FIX: Initialize with mobile detection for SSR-safe rendering
  // On mobile, we default to mobile=true to ensure content always renders
  const [isMobileDevice, setIsMobileDevice] = useState<boolean | null>(() => {
    if (typeof window === 'undefined') {
      // SSR: Default to mobile to ensure content renders
      return true;
    }
    return isProbablyMobile();
  });
  const [isClient, setIsClient] = useState(() => typeof window !== 'undefined');

  // Client-side only rendering to prevent SSR/hydration mismatches
  useEffect(() => {
    setIsClient(true);
    // Update mobile detection on client, but don't block rendering
    setIsMobileDevice(isProbablyMobile());
  }, []);

  // PRODUCTION FIX: Гарантируем видимость всех видео (desktop и mobile) - периодическая проверка
  useEffect(() => {
    if (!isClient) return;

    const ensureAllVideosVisible = () => {
      // Desktop videos
      const desktopVideos = [
        videoRef.current,
        psihuskaVideoRef.current,
        kvartiraVideoRef.current,
        babkaVideoRef.current,
      ].filter(Boolean) as HTMLVideoElement[];

      // Mobile videos
      const mobileVideos = [
        mobileVideoRef.current,
        mobilePsihuskaVideoRef.current,
        mobileKvartiraVideoRef.current,
        mobileBabkaVideoRef.current,
      ].filter(Boolean) as HTMLVideoElement[];

      const allVideos = [...desktopVideos, ...mobileVideos];

      allVideos.forEach(video => {
        // PRODUCTION FIX: Принудительно устанавливаем видимость
        video.style.setProperty('display', 'block', 'important');
        video.style.setProperty('visibility', 'visible', 'important');
        video.style.setProperty('opacity', '1', 'important');
        video.style.setProperty('background-color', '#000', 'important');
        
        // Загружаем первое изображение, если видео еще не загружено
        if (video.readyState === 0) {
          video.load();
        }
        
        // Показываем первый кадр
        if (video.readyState >= 2 && video.currentTime === 0) {
          video.currentTime = 0;
        }
      });
    };

    // Запускаем сразу и периодически
    ensureAllVideosVisible();
    const intervalId = setInterval(ensureAllVideosVisible, 1000); // Проверяем каждую секунду
    
    // Также слушаем события загрузки
    const handleVideoEvent = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      video.style.setProperty('display', 'block', 'important');
      video.style.setProperty('visibility', 'visible', 'important');
      video.style.setProperty('opacity', '1', 'important');
    };

    const allVideoRefs = [
      videoRef.current,
      psihuskaVideoRef.current,
      kvartiraVideoRef.current,
      babkaVideoRef.current,
      mobileVideoRef.current,
      mobilePsihuskaVideoRef.current,
      mobileKvartiraVideoRef.current,
      mobileBabkaVideoRef.current,
    ].filter(Boolean) as HTMLVideoElement[];

    allVideoRefs.forEach(video => {
      video.addEventListener('loadedmetadata', handleVideoEvent);
      video.addEventListener('canplay', handleVideoEvent);
      video.addEventListener('loadeddata', handleVideoEvent);
    });

    return () => {
      clearInterval(intervalId);
      allVideoRefs.forEach(video => {
        video.removeEventListener('loadedmetadata', handleVideoEvent);
        video.removeEventListener('canplay', handleVideoEvent);
        video.removeEventListener('loadeddata', handleVideoEvent);
      });
    };
  }, [isClient]);

  // IntersectionObserver для автоплея видео при скролле (desktop)
  useEffect(() => {
    if (!isClient || !videoRef.current) return;

    const video = videoRef.current;
    
    // PRODUCTION FIX: Гарантируем видимость перед настройкой observer
    video.style.setProperty('display', 'block', 'important');
    video.style.setProperty('visibility', 'visible', 'important');
    video.style.setProperty('opacity', '1', 'important');
    
    // Обработчик загрузки видео
    video.addEventListener('loadeddata', () => {
      console.log('Desktop video loaded');
      video.style.setProperty('display', 'block', 'important');
      video.style.setProperty('visibility', 'visible', 'important');
      video.style.setProperty('opacity', '1', 'important');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Desktop video error:', e);
      // PRODUCTION FIX: Даже при ошибке видео должно быть видимым
      video.style.setProperty('display', 'block', 'important');
      video.style.setProperty('visibility', 'visible', 'important');
      video.style.setProperty('opacity', '1', 'important');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log('Video autoplay failed:', err);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px',
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [isClient]);

  // CRITICAL FIX: Ensure videos are always visible on mobile, regardless of observer state
  useEffect(() => {
    if (!isClient || !isMobileDevice) return;
    
    // Ensure all videos are visible immediately on mount and load first frame
    const ensureVideosVisible = () => {
      const videos = [
        mobileVideoRef.current,
        mobilePsihuskaVideoRef.current,
        mobileKvartiraVideoRef.current,
        mobileBabkaVideoRef.current,
      ].filter(Boolean) as HTMLVideoElement[];
      
      videos.forEach(video => {
        if (video) {
          // CRITICAL: Force visibility
          video.style.display = 'block';
          video.style.visibility = 'visible';
          video.style.opacity = '1';
          video.style.backgroundColor = '#000';
          
          // CRITICAL: Load first frame so video is visible even when paused
          // This ensures videos show their first frame immediately
          if (video.readyState === 0) {
            video.load();
          }
          
          // Force video to show first frame by seeking to 0
          if (video.readyState >= 2) {
            video.currentTime = 0;
          }
        }
      });
    };
    
    // Run immediately and after delays to ensure visibility
    ensureVideosVisible();
    const timeoutId1 = setTimeout(ensureVideosVisible, 100);
    const timeoutId2 = setTimeout(ensureVideosVisible, 500);
    
    // Also listen for video loadedmetadata events
    const videos = [
      mobileVideoRef.current,
      mobilePsihuskaVideoRef.current,
      mobileKvartiraVideoRef.current,
      mobileBabkaVideoRef.current,
    ].filter(Boolean) as HTMLVideoElement[];
    
    const handleLoadedMetadata = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      video.style.display = 'block';
      video.style.visibility = 'visible';
      video.style.opacity = '1';
      video.currentTime = 0; // Show first frame
    };
    
    videos.forEach(video => {
      if (video) {
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
      }
    });
    
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      videos.forEach(video => {
        if (video) {
          video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      });
    };
  }, [isClient, isMobileDevice]);

  // CRITICAL PERFORMANCE FIX: Optimized IntersectionObserver for mobile videos
  // Immediate pause when scrolled away to prevent scroll freeze
  useEffect(() => {
    if (!isClient || !isMobileDevice) return;
    
    const videos = [
      mobileVideoRef.current,
      mobilePsihuskaVideoRef.current,
      mobileKvartiraVideoRef.current,
      mobileBabkaVideoRef.current,
    ].filter(Boolean) as HTMLVideoElement[];

    if (videos.length === 0) return;

    // CRITICAL: Pause immediately when scrolled away, but play immediately when scrolled into view
    const handlePlay = (video: HTMLVideoElement) => {
      // Play immediately when video comes into view - no debouncing
      // This ensures videos start playing as soon as user scrolls to them
      if (video.paused) {
        video.play().catch(() => {
          // Silently fail - autoplay may be blocked
        });
      }
    };

    const handlePause = (video: HTMLVideoElement) => {
      // CRITICAL: Pause immediately - no debouncing
      // This prevents videos from continuing to play when scrolled away, which causes lag
      if (!video.paused) {
        video.pause();
        // Don't reset currentTime - let video continue from where it was when scrolled back
        // video.currentTime = 0;
      }
    };

    // Track last intersection ratios (4 videos only; cheap) and decide play/pause from that.
    const lastRatio = new Map<HTMLVideoElement, number>();
    const PLAY_THRESHOLD = 0.35; // start as soon as user scrolls to the video
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          lastRatio.set(entry.target as HTMLVideoElement, entry.intersectionRatio);
        });

        // Always react immediately (user requested immediate start on scroll-to-video).
        requestAnimationFrame(() => {
          videos.forEach((video) => {
            const r = lastRatio.get(video) ?? 0;
            if (r >= PLAY_THRESHOLD) {
              handlePlay(video);
            } else {
              handlePause(video);
            }
          });
        });
      },
      {
        // Keep callback frequency reasonable; ratios are tracked in a map anyway
        threshold: [0, 0.15, 0.35, 0.6, 1],
        rootMargin: '0px',
      }
    );

    // PRODUCTION FIX: Store event handlers for proper cleanup
    interface VideoHandlers {
      canplay?: () => void;
      loadedmetadata?: () => void;
      error?: (e: Event) => void;
    }
    const videoHandlers = new Map<HTMLVideoElement, VideoHandlers>();
    
    videos.forEach(video => {
      // CRITICAL: Ensure videos are always visible, regardless of observer state
      video.style.display = 'block';
      video.style.visibility = 'visible';
      video.style.opacity = '1';
      // Ensure videos are muted and have playsInline
      video.muted = true;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.controls = false;
      // CRITICAL: Use preload="metadata" to show first frame, but don't auto-play
      // This ensures videos are visible even when paused
      video.preload = 'metadata';
      // Force load first frame
      if (video.readyState === 0) {
        video.load();
      }
      video.removeAttribute('autoplay');
      
      // PRODUCTION FIX: Add lightweight event listeners with error handling
      // getBoundingClientRect() causes layout thrashing and scroll lag
      const handleCanPlay = () => {
        // Video is ready - let IntersectionObserver handle play/pause
        // PRODUCTION FIX: Guarantee visibility
        video.style.display = 'block';
        video.style.visibility = 'visible';
        video.style.opacity = '1';
      };

      const handleLoadedMetadata = () => {
        // PRODUCTION FIX: Guarantee visibility after metadata loaded
        video.style.display = 'block';
        video.style.visibility = 'visible';
        video.style.opacity = '1';
      };

      const handleError = (e: Event) => {
        // PRODUCTION FIX: Handle errors without blocking rendering
        console.warn('Video load error (non-critical):', e);
        video.style.display = 'block';
        video.style.visibility = 'visible';
        video.style.opacity = '1';
      };
      
      // Store handlers for cleanup
      const handlers: VideoHandlers = { canplay: handleCanPlay, loadedmetadata: handleLoadedMetadata, error: handleError };
      videoHandlers.set(video, handlers);
      
      // PRODUCTION FIX: Listen to multiple events for guaranteed loading
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);
      
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
      // PRODUCTION FIX: Ensure all videos are paused on cleanup and remove event listeners
      videos.forEach(video => {
        video.pause();
        const handlers = videoHandlers.get(video);
        if (handlers) {
          if (handlers.canplay) video.removeEventListener('canplay', handlers.canplay);
          if (handlers.loadedmetadata) video.removeEventListener('loadedmetadata', handlers.loadedmetadata);
          if (handlers.error) video.removeEventListener('error', handlers.error);
        }
      });
    };
  }, [isClient, isMobileDevice]);

  // IntersectionObserver для автоплея видео psihuska.mp4 при скролле (desktop)
  useEffect(() => {
    if (!isClient || !psihuskaVideoRef.current) return;

    const video = psihuskaVideoRef.current;
    
    // PRODUCTION FIX: Гарантируем видимость перед настройкой observer
    video.style.setProperty('display', 'block', 'important');
    video.style.setProperty('visibility', 'visible', 'important');
    video.style.setProperty('opacity', '1', 'important');
    
    // Обработчик загрузки видео
    video.addEventListener('loadeddata', () => {
      console.log('Desktop psihuska video loaded');
      video.style.setProperty('display', 'block', 'important');
      video.style.setProperty('visibility', 'visible', 'important');
      video.style.setProperty('opacity', '1', 'important');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Desktop psihuska video error:', e);
      // PRODUCTION FIX: Даже при ошибке видео должно быть видимым
      video.style.setProperty('display', 'block', 'important');
      video.style.setProperty('visibility', 'visible', 'important');
      video.style.setProperty('opacity', '1', 'important');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log('Psihuska video autoplay failed:', err);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px',
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [isClient]);

  // Removed - now handled by consolidated mobile video observer above

  // IntersectionObserver для автоплея видео kvartira.mp4 при скролле (desktop)
  useEffect(() => {
    if (!isClient || !kvartiraVideoRef.current) return;

    const video = kvartiraVideoRef.current;
    
    // PRODUCTION FIX: Гарантируем видимость перед настройкой observer
    video.style.setProperty('display', 'block', 'important');
    video.style.setProperty('visibility', 'visible', 'important');
    video.style.setProperty('opacity', '1', 'important');
    
    video.addEventListener('loadeddata', () => {
      console.log('Desktop kvartira video loaded');
      video.style.setProperty('display', 'block', 'important');
      video.style.setProperty('visibility', 'visible', 'important');
      video.style.setProperty('opacity', '1', 'important');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Desktop kvartira video error:', e);
      // PRODUCTION FIX: Даже при ошибке видео должно быть видимым
      video.style.setProperty('display', 'block', 'important');
      video.style.setProperty('visibility', 'visible', 'important');
      video.style.setProperty('opacity', '1', 'important');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log('Kvartira video autoplay failed:', err);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px',
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [isClient]);

  // Removed - now handled by consolidated mobile video observer above

  // IntersectionObserver для автоплея видео babka.mp4 при скролле (desktop)
  useEffect(() => {
    if (!isClient || !babkaVideoRef.current) return;

    const video = babkaVideoRef.current;
    
    // PRODUCTION FIX: Гарантируем видимость перед настройкой observer
    video.style.setProperty('display', 'block', 'important');
    video.style.setProperty('visibility', 'visible', 'important');
    video.style.setProperty('opacity', '1', 'important');
    
    video.addEventListener('loadeddata', () => {
      console.log('Desktop babka video loaded');
      video.style.setProperty('display', 'block', 'important');
      video.style.setProperty('visibility', 'visible', 'important');
      video.style.setProperty('opacity', '1', 'important');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Desktop babka video error:', e);
      // PRODUCTION FIX: Даже при ошибке видео должно быть видимым
      video.style.setProperty('display', 'block', 'important');
      video.style.setProperty('visibility', 'visible', 'important');
      video.style.setProperty('opacity', '1', 'important');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log('Babka video autoplay failed:', err);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px',
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [isClient]);

  // Removed - now handled by consolidated mobile video observer above

  // Mobile-only version - simple, no parallax, no 400vh containers
  const MobileJourney = () => {
    const scenes = [
      {
        key: 'office',
        title: 'ОФИС ЛОТЕРЕИ «БИМ-БОМ-26»',
        desc: 'ТОЧКА, ГДЕ НАЧИНАЕТСЯ АФЕРА И РАСКРЫВАЕТСЯ ХАКЕРСКАЯ МАХИНАЦИЯ.',
        img: `/backgrounds/sections/vput.png${VPUT_IMAGES_VERSION}`,
      },
      {
        key: 'psy',
        title: 'ПСИХУШКА',
        desc: 'СИМВОЛ БЕЗУМИЯ ПРОГРЕССА — ЗДЕСЬ СКРЫТ ГЕНИЙ-ХАКЕР, ВЗЛОМАВШИЙ СИСТЕМУ.',
        img: `/backgrounds/sections/vput2.png${VPUT_IMAGES_VERSION}`,
      },
      {
        key: 'kisa',
        title: 'КВАРТИРА КИСЫ',
        desc: 'ЛИЧНОЕ УБЕЖИЩЕ И ШТАБ ОПЕРАЦИИ, ГДЕ СТАЛКИВАЮТСЯ ЖАДНОСТЬ И СОВЕСТЬ.',
        img: `/backgrounds/sections/vput3.png${VPUT_IMAGES_VERSION}`,
      },
      {
        key: 'yarygina',
        title: 'КВАРТИРА СТАРУХИ ЯРЫГИНОЙ',
        desc: 'ФИНАЛ ОХОТЫ — ЛОГОВО «БАБКИ-ХАКЕРА», УПРАВЛЯЮЩЕЙ МИЛЛИАРДАМИ ИЗ КРЕСЛА.',
        img: `/backgrounds/sections/vput4.png${VPUT_IMAGES_VERSION}`,
      },
    ];

    return (
      <div
        className="relative w-full mobile-journey-section"
        style={{
          width: '100%',
          minHeight: 'auto',
          height: 'auto',
          backgroundImage: 'url(/backgrounds/sections/mobile/section-4-mobile.png?v=10)',
          // Mobile: изображение растянуто на 5% в файле (507x1134)
          backgroundSize: '100% 100%',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          padding: 'clamp(4rem, 8vh, 6rem) 0',
          paddingBottom: 'clamp(6rem, 10vh, 8rem)',
          paddingLeft: '0',
          paddingRight: '0',
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          overflow: 'visible',
          overflowX: 'visible',
          overflowY: 'visible',
          boxSizing: 'border-box',
        }}
      >
        <div className="w-full max-w-[120rem] mx-auto flex flex-col items-center" style={{ 
          gap: 'clamp(3rem, 8vh, 5rem)',
          overflow: 'visible',
          overflowX: 'visible',
          overflowY: 'visible',
          width: '100%',
          paddingLeft: 'clamp(2rem, 4vw, 3rem)',
          paddingRight: 'clamp(2rem, 4vw, 3rem)',
          boxSizing: 'border-box',
        }}>
          {scenes.map((s, idx) => (
            <div
              key={s.key}
              ref={idx === 0 ? officeRef : idx === 1 ? psychushkaRef : idx === 2 ? kisaRef : yaryginaRef}
              className={`w-full flex flex-col items-center text-center mobile-scene-card ${idx === 3 ? 'yarygina-mobile-scene' : ''}`}
              style={{ 
                maxWidth: '100%',
                width: '100%',
                marginBottom: idx === 3 ? 'clamp(6rem, 12vh, 8rem)' : 'clamp(3rem, 6vh, 4rem)',
                paddingBottom: 'clamp(2rem, 4vh, 3rem)',
                marginTop: idx === 3 ? 'clamp(0rem, 1vh, 0.5rem)' : '0',
                paddingTop: idx === 3 ? 'clamp(0.5rem, 1vh, 1rem)' : '0',
                marginLeft: '0',
                marginRight: '0',
                overflow: 'visible',
                overflowX: 'visible',
                overflowY: 'visible',
                boxSizing: 'border-box',
                position: 'relative',
              }}
            >
              <div style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: idx === 2 ? 'flex-start' : 'center',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
                marginBottom: idx === 0 ? 'clamp(2.5rem, 4vh, 3.5rem)' : 'clamp(1.5rem, 3vh, 2rem)',
                paddingBottom: idx === 0 ? 'clamp(1rem, 2vh, 1.5rem)' : '0',
                overflow: 'visible',
                overflowX: 'visible',
                overflowY: 'visible',
                paddingLeft: idx === 2 ? 'clamp(0.5rem, 2vw, 1rem)' : 'clamp(1rem, 3vw, 2rem)',
                paddingRight: idx === 2 ? 'clamp(0.5rem, 2vw, 1rem)' : 'clamp(1rem, 3vw, 2rem)',
                boxSizing: 'border-box',
              }}>
                {/* Для idx === 0: сначала vput.png слева с видео внутри, потом tiraj.png справа */}
                {/* Для idx === 1: vput2.png с видео psihuska.mp4 внутри */}
                {/* Для idx === 2: только vput3.png (pamat15.png перемещен ниже текста) */}
                {idx === 0 ? (
                  <div
                    className="mobile-scene-image"
                    style={{
                      flex: '0 1 auto',
                      maxWidth: '100%',
                      width: 'auto',
                      minWidth: 'clamp(520px, 100vw, 700px)',
                      height: '0',
                      paddingTop: 'clamp(52%, 56%, 60%)',
                      paddingBottom: 'clamp(2rem, 4vh, 3rem)',
                      position: 'relative',
                      display: 'block',
                      visibility: 'visible',
                      overflow: 'visible',
                      boxSizing: 'border-box',
                      margin: '0 auto',
                      transform: 'translateX(clamp(1.5rem, 3vw, 2.5rem)) translateY(clamp(-3.5rem, -5vh, -3rem))',
                    }}
                  >
                    {/* Видео внутри рамки для мобильной версии */}
                    <video
                      ref={mobileVideoRef}
                      src="/backgrounds/sections/bimbom.mp4"
                      muted
                      loop
                      playsInline
                      controls={false}
                      preload="metadata"
                      style={{
                        position: 'absolute',
                        top: 'calc(50% + clamp(1rem, 2vh, 1.5rem))',
                        left: 'calc(50% - clamp(0.5rem, 1vw, 0.8rem))',
                        transform: 'translate(-50%, -50%) scale(0.78) scaleY(0.92)',
                        width: 'calc(100% - clamp(26rem, 52vw, 38rem))',
                        height: 'auto',
                        aspectRatio: '16 / 9',
                        objectFit: 'contain',
                        zIndex: 1,
                        pointerEvents: 'none',
                        outline: 'none',
                        display: 'block',
                        visibility: 'visible',
                        opacity: 1,
                        backgroundColor: '#000'
                      }}
                    />
                    {/* Рамка поверх видео */}
                    <div
                      style={{
                        backgroundImage: `url(${s.img})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: idx === 0 ? 'center top' : 'center center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: idx === 0 ? 'calc(100% + clamp(2rem, 4vh, 3rem))' : '100%',
                        zIndex: 2,
                        pointerEvents: 'none'
                      }}
                    />
                  </div>
                ) : idx === 1 ? (
                  <div
                    className="mobile-scene-image mobile-vput2-with-video"
                    style={{
                      flex: '0 1 auto',
                      maxWidth: '100%',
                      width: 'auto',
                      minWidth: 'clamp(520px, 100vw, 700px)',
                      height: '0',
                      paddingTop: 'clamp(52%, 56%, 60%)',
                      paddingBottom: 'clamp(2rem, 4vh, 3rem)',
                      position: 'relative',
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      overflow: 'visible',
                      boxSizing: 'border-box',
                      margin: '0 auto',
                      transform: 'translateX(clamp(0.5rem, 1vw, 1rem)) translateY(clamp(-3.5rem, -5vh, -3rem))',
                    }}
                  >
                    {/* Видео psihuska.mp4 внутри рамки для мобильной версии */}
                    <video
                      ref={mobilePsihuskaVideoRef}
                      src="/photo/psihuska.mp4"
                      muted
                      loop
                      playsInline
                      controls={false}
                      preload="metadata"
                      style={{
                        position: 'absolute',
                        top: 'calc(50% + clamp(1rem, 2vh, 1.5rem))',
                        left: 'calc(50% - clamp(0.3rem, 0.8vw, 0.6rem))',
                        transform: 'translate(calc(-50% + clamp(0.5rem, 1.5vw, 1rem)), -50%) scale(0.55)',
                        width: 'calc(55% - clamp(1rem, 2vw, 1.5rem))',
                        height: 'auto',
                        aspectRatio: '16 / 9',
                        objectFit: 'contain',
                        zIndex: 1,
                        pointerEvents: 'none',
                        outline: 'none',
                        display: 'block',
                        visibility: 'visible',
                        opacity: 1,
                        backgroundColor: '#000'
                      }}
                    />
                    {/* Рамка поверх видео */}
                    <div
                      style={{
                        backgroundImage: `url(${s.img})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: idx === 1 ? 'center top' : 'center center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: idx === 1 ? 'calc(100% + clamp(2rem, 4vh, 3rem))' : '100%',
                        zIndex: 2,
                        pointerEvents: 'none'
                      }}
                    />
                  </div>
                ) : idx === 2 ? (
                  <div
                    className="mobile-scene-image vput3-mobile-position"
                    style={{
                      flex: '0 1 auto',
                      maxWidth: '100%',
                      width: 'auto',
                      minWidth: 'clamp(280px, 80vw, 400px)',
                      height: '0',
                      paddingTop: 'clamp(22%, 26%, 30%)',
                      position: 'relative',
                      display: 'block',
                      visibility: 'visible',
                      overflow: 'visible',
                      boxSizing: 'border-box',
                      marginLeft: 'clamp(0.5rem, 2vw, 1rem)',
                      marginRight: 'clamp(0.5rem, 2vw, 1rem)',
                      transform: 'translateY(clamp(-5rem, -8vh, -4rem)) translateX(clamp(-1rem, -2vw, -0.5rem))',
                    }}
                  >
                    {/* Видео kvartira.mp4 внутри рамки для мобильной версии - КРИТИЧНО: должно быть видно */}
                    <video
                      ref={mobileKvartiraVideoRef}
                      src="/photo/kvartira.mp4"
                      muted
                      loop
                      playsInline
                      controls={false}
                      preload="metadata"
                      style={{
                        position: 'absolute',
                        top: 'calc(50% + clamp(1rem, 2vh, 1.5rem))',
                        left: 'calc(50% - clamp(0.5rem, 1vw, 0.8rem))',
                        transform: 'translate(-50%, -50%) scale(0.86) scaleY(0.92)',
                        width: 'calc(100% - clamp(22rem, 44vw, 34rem))',
                        height: 'auto',
                        aspectRatio: '16 / 9',
                        objectFit: 'contain',
                        zIndex: 1,
                        pointerEvents: 'none',
                        outline: 'none',
                        display: 'block',
                        visibility: 'visible',
                        opacity: 1,
                        backgroundColor: '#000'
                      }}
                    />
                    {/* Рамка поверх видео */}
                    <div
                      style={{
                        backgroundImage: `url(${s.img})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 2,
                        pointerEvents: 'none'
                      }}
                    />
                  </div>
                ) : idx === 3 ? (
                  <div
                    className="mobile-scene-image"
                    style={{
                      flex: '0 1 auto',
                      maxWidth: '100%',
                      width: 'auto',
                      minWidth: 'clamp(380px, 95vw, 520px)',
                      height: '0',
                      paddingTop: 'clamp(32%, 36%, 40%)',
                      paddingBottom: 'clamp(8%, 9%, 10%)', /* Увеличено padding-bottom, чтобы нижняя часть рамки была видна полностью */
                      position: 'relative',
                      display: 'block',
                      visibility: 'visible',
                      overflow: 'visible', /* Изменено на visible, чтобы рамка была полностью видна */
                      boxSizing: 'border-box',
                      backgroundColor: 'transparent', /* Убираем черный фон */
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    {/* Видео babka.mp4 внутри рамки для мобильной версии */}
                    <video
                      ref={mobileBabkaVideoRef}
                      src="/photo/babka.mp4"
                      muted
                      loop
                      playsInline
                      controls={false}
                      preload="metadata"
                      style={{
                        position: 'absolute',
                        top: '55%', /* Опущено ниже на мобильной версии */
                        left: '50%',
                        // Видео: формат 16:9, одинаковый размер на всех устройствах
                        transform: 'translate(-50%, -50%) scale(1, 0.97)', /* Чуть уменьшено в длину */
                        aspectRatio: '16 / 9', /* Альбомный горизонтальный формат */
                        width: 'clamp(290px, 77vw, 330px)', /* Чуть увеличена ширина на всех устройствах */
                        height: 'auto', /* Высота вычисляется автоматически из aspect-ratio */
                        maxWidth: 'clamp(290px, 77vw, 330px)',
                        maxHeight: 'calc(clamp(290px, 77vw, 330px) * 9 / 16)', /* Высота из соотношения 16:9 */
                        minWidth: 'clamp(290px, 77vw, 330px)',
                        objectFit: 'cover', /* Cover для заполнения без черных полос */
                        zIndex: 1,
                        pointerEvents: 'none',
                        outline: 'none',
                        display: 'block',
                        visibility: 'visible',
                        opacity: 1,
                        backgroundColor: 'transparent'
                      }}
                    />
                    {/* Рамка поверх видео */}
                    <div
                      style={{
                        backgroundImage: `url(${s.img})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center bottom', /* Изменено на bottom, чтобы нижняя часть рамки была видна */
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 'calc(100% + clamp(8%, 9%, 10%))', /* Увеличена высота, чтобы нижняя часть была видна */
                        zIndex: 2,
                        pointerEvents: 'none'
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="mobile-scene-image"
                    style={{
                      flex: '0 1 auto',
                      maxWidth: '100%',
                      width: 'auto',
                      minWidth: 'clamp(200px, 70vw, 350px)',
                      height: 'clamp(200px, 35vh, 300px)',
                      paddingTop: '0',
                      backgroundImage: `url(${s.img})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center center',
                      display: 'block',
                      visibility: 'visible',
                      overflow: 'visible',
                      boxSizing: 'border-box',
                      position: 'relative',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                )}
                {/* tiraj.png перемещен вниз, рядом с flash.png - удален отсюда */}
              </div>
              {/* For ПСИХУШКА (idx === 1) and КВАРТИРА СТАРУХИ ЯРЫГИНОЙ (idx === 3): image on left, text on right */}
              {idx === 1 || idx === 3 ? (
                <div className={idx === 3 ? 'yarygina-content-wrapper' : ''} style={{ 
                  width: '100%', 
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 'clamp(1rem, 3vw, 2rem)',
                  marginTop: idx === 3 ? 'clamp(5rem, 10vh, 7rem)' : 'clamp(-1.2rem, -2vh, -0.8rem)',
                  paddingLeft: 'clamp(1rem, 3vw, 2rem)',
                  paddingRight: 'clamp(1rem, 3vw, 2rem)',
                }}>
                  {/* Image on the left */}
                  <div
                    className={idx === 3 ? 'computer-mobile-image' : ''}
                    style={{
                      flex: '0 0 auto',
                      width: idx === 1 ? 'clamp(100px, 25vw, 140px)' : 'clamp(120px, 30vw, 170px)',
                      height: idx === 1 ? 'clamp(100px, 25vw, 140px)' : 'clamp(120px, 30vw, 170px)',
                      backgroundImage: `url(${idx === 1 ? '/backgrounds/sections/stul100let.png' : '/backgrounds/sections/computer.png'})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      flexShrink: 0,
                      marginLeft: idx === 1 ? 'clamp(-2.5rem, -6vw, -2rem)' : '0',
                      marginTop: idx === 1 ? 'clamp(4.5rem, 7vh, 6rem)' : idx === 3 ? 'clamp(3rem, 6vh, 4.5rem)' : '0',
                    }}
                  />
                  {/* Text on the right */}
                  <div style={{ 
                    flex: '1 1 auto',
                    textAlign: idx === 1 && isMobileDevice ? 'center' : 'right',
                    paddingLeft: idx === 1 && isMobileDevice ? 'clamp(0.5rem, 1.5vw, 1rem)' : idx === 1 ? 'clamp(2rem, 5vw, 3rem)' : 'clamp(1rem, 3vw, 2rem)',
                    paddingRight: idx === 1 && isMobileDevice ? 'clamp(0.5rem, 1.5vw, 1rem)' : '0',
                    marginLeft: idx === 1 && isMobileDevice ? '0' : idx === 1 ? 'clamp(1rem, 3vw, 2rem)' : '0',
                    marginRight: idx === 1 && isMobileDevice ? '0' : undefined,
                  }}>
                    <p
                      className="uppercase mb-2"
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
                        color: '#FFFDFD',
                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                        letterSpacing: '0.08em',
                        lineHeight: '1.3',
                        marginBottom: '1rem',
                        textAlign: idx === 1 && isMobileDevice ? 'center' : undefined,
                        marginLeft: idx === 1 && isMobileDevice ? 'clamp(2rem, 4vw, 2.5rem)' : undefined,
                        marginRight: idx === 1 && isMobileDevice ? 'auto' : undefined,
                      }}
                    >
                      {s.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: idx === 1 && isMobileDevice ? 'clamp(0.85rem, 3vw, 1rem)' : 'clamp(1rem, 4vw, 1.25rem)',
                        color: '#FBC632',
                        textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                        letterSpacing: '0.03em',
                        lineHeight: '1.4',
                        maxWidth: idx === 1 && isMobileDevice ? 'calc(100vw - clamp(4rem, 10vw, 6rem))' : undefined,
                        margin: idx === 1 && isMobileDevice ? '0 auto 0 clamp(-3rem, -7vw, -2.5rem)' : undefined,
                        width: idx === 1 && isMobileDevice ? 'fit-content' : undefined,
                      }}
                    >
                      {idx === 1 ? (
                        isMobileDevice ? (
                          <>
                            <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'inherit' }}>СИМВОЛ БЕЗУМИЯ ПРОГРЕССА</span>
                            <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'inherit' }}>— ЗДЕСЬ СКРЫТ ГЕНИЙ-ХАКЕР,</span>
                            <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'inherit' }}>ВЗЛОМАВШИЙ СИСТЕМУ.</span>
                          </>
                        ) : (
                          s.desc
                        )
                      ) : (
                        s.desc
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ 
                  marginTop: idx === 2 ? 'clamp(-2rem, -3.5vh, -1.5rem)' : 'clamp(-1.2rem, -2vh, -0.8rem)', 
                  transform: idx === 0 ? 'translateX(clamp(2rem, 5vw, 3.5rem))' : undefined,
                  width: '100%', 
                  padding: idx === 0 ? '0 clamp(0.5rem, 1.5vw, 1rem) 0 clamp(1rem, 2.5vw, 1.5rem)' : idx === 2 ? '0 clamp(2rem, 6vw, 4rem) 0 1rem' : '0 1rem',
                  paddingBottom: idx === 2 ? '0' : undefined,
                  textAlign: idx === 0 ? 'right' : idx === 2 ? 'right' : 'center'
                }}>
                  <p
                    className="uppercase mb-2"
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
                      color: '#FFFDFD',
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                      letterSpacing: '0.08em',
                      lineHeight: '1.3',
                      marginBottom: '1rem',
                      whiteSpace: idx === 0 ? 'nowrap' : 'normal',
                      textAlign: idx === 1 && isMobileDevice ? 'center' : undefined,
                      marginLeft: idx === 1 && isMobileDevice ? 'clamp(2rem, 4vw, 2.5rem)' : undefined,
                      marginRight: idx === 1 && isMobileDevice ? 'auto' : undefined,
                    }}
                  >
                    {s.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: idx === 1 && isMobileDevice ? 'clamp(0.85rem, 3vw, 1rem)' : 'clamp(1rem, 4vw, 1.25rem)',
                      color: '#FBC632',
                      textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                      letterSpacing: '0.03em',
                      lineHeight: '1.4',
                      maxWidth: idx === 1 && isMobileDevice ? 'calc(100vw - clamp(4rem, 10vw, 6rem))' : undefined,
                      margin: idx === 1 && isMobileDevice ? '0 auto 0 clamp(-3rem, -7vw, -2.5rem)' : undefined,
                      width: idx === 1 && isMobileDevice ? 'fit-content' : undefined,
                    }}
                  >
                    {idx === 0 ? (
                      <>
                        ТОЧКА, ГДЕ НАЧИНАЕТСЯ АФЕРА И<br />
                        РАСКРЫВАЕТСЯ ХАКЕРСКАЯ МАХИНАЦИЯ.
                      </>
                    ) : idx === 1 ? (
                      isMobileDevice ? (
                        <>
                          <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'inherit' }}>СИМВОЛ БЕЗУМИЯ ПРОГРЕССА</span>
                          <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'inherit' }}>— ЗДЕСЬ СКРЫТ ГЕНИЙ-ХАКЕР,</span>
                          <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'inherit' }}>ВЗЛОМАВШИЙ СИСТЕМУ.</span>
                        </>
                      ) : (
                        s.desc
                      )
                    ) : (
                      s.desc
                    )}
                  </p>
                </div>
              )}
              
              {/* Изображение pamat15.png ниже текста "КВАРТИРА КИСЫ" на мобильной версии */}
              {idx === 2 && (
                <div
                  className="pamat15-wrapper-mobile"
                  style={{
                    width: 'auto',
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 'clamp(6rem, 8vh, 7rem)',
                    left: 'clamp(-4rem, -7vw, -3rem)',
                    transform: 'none',
                    paddingLeft: '0',
                    paddingRight: '0',
                    overflow: 'visible',
                    boxSizing: 'border-box',
                    zIndex: 10,
                    visibility: 'visible',
                    opacity: 1,
                  }}
                >
                  <img
                    src="/backgrounds/sections/pamat15.png"
                    alt="Архив памяти"
                    className="pamat15-mobile-position"
                    style={{
                      width: 'clamp(200px, 50vw, 320px)',
                      height: 'auto',
                      maxWidth: '100%',
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      position: 'relative',
                      zIndex: 10,
                      objectFit: 'contain',
                    }}
                    loading="eager"
                    onError={(e) => {
                      console.error('Ошибка загрузки pamat15.png:', e);
                    }}
                    onLoad={() => {
                      console.log('pamat15.png загружено успешно');
                    }}
                  />
                </div>
              )}
              
              {/* Add flash.png and tiraj.png side by side below ОФИС ЛОТЕРЕИ text (idx === 0) */}
              {idx === 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'clamp(1rem, 3vw, 2rem)',
                    marginTop: 'clamp(1.5rem, 3vh, 2rem)',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '100%',
                    maxWidth: '100%',
                  }}
                >
                  {/* flash.png слева */}
                  <div
                    style={{
                      width: 'clamp(150px, 40vw, 250px)',
                      height: 'clamp(150px, 40vw, 250px)',
                      backgroundImage: 'url(/backgrounds/sections/flash.png)',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      flexShrink: 0,
                    }}
                  />
                  {/* tiraj.png справа от flash.png */}
                  <div
                    className="mobile-journey-tiraj"
                    style={{
                      width: 'min(30vw, 120px)',
                      height: 'clamp(90px, 18vh, 130px)',
                      backgroundImage: 'url(/backgrounds/sections/tiraj.png)',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      flexShrink: 0,
                      display: 'block',
                      visibility: 'visible',
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Mobile markers for scroll tracking */}
        <div ref={sectionEndRef} className="absolute left-0 w-full" style={{ bottom: 0, height: '1px', pointerEvents: 'none' }} />
        {finalTextRef && <div ref={finalTextRef} className="absolute left-0 w-full" style={{ bottom: '1px', height: '1px', pointerEvents: 'none' }} />}
      </div>
    );
  };

  // Desktop GSAP parallax effect - ONLY run when confirmed desktop
  useEffect(() => {
    // Guard: only run on desktop, only after client mount
    if (!isClient || isMobileDevice === null || isMobileDevice) return;
    
    // Additional safety check
    if (typeof window === 'undefined' || isProbablyMobile()) return;

    const cleanup: (() => void)[] = [];

    try {
      if (vputSectionRef.current) {
        const parallaxObjects = Array.from(vputSectionRef.current.querySelectorAll('[data-animate="vput"]'));
        const imageObjects = parallaxObjects.filter((el) => {
          const isText = el.textContent && el.textContent.trim().length > 0;
          return !isText;
        });

        imageObjects.forEach((el, index) => {
          const speedAttr = el.getAttribute('data-speed');
          const parallaxSpeed = speedAttr ? parseFloat(speedAttr) : 0.3;

          if (el instanceof HTMLElement) {
            el.style.willChange = 'transform';
            gsap.set(el, { force3D: true });
          }

          const direction = index % 2 === 0 ? -1 : 1;
          const parallaxAmount = parallaxSpeed * 100;

          const scrollTriggerInstance = gsap.to(el, {
            y: direction * parallaxAmount,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              refreshPriority: -1,
              onLeave: () => {
                if (el instanceof HTMLElement) {
                  el.style.willChange = 'auto';
                }
              },
              onEnterBack: () => {
                if (el instanceof HTMLElement) {
                  el.style.willChange = 'transform';
                }
              }
            }
          });

          cleanup.push(() => {
            if (scrollTriggerInstance.scrollTrigger) {
              scrollTriggerInstance.scrollTrigger.kill();
            }
            scrollTriggerInstance.kill();
          });
        });
      }
    } catch (error) {
      console.error('GSAP ScrollTrigger error:', error);
    }

    return () => {
      cleanup.forEach(fn => fn());
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger) {
          trigger.kill();
        }
      });
    };
  }, [isClient, isMobileDevice]);

  // CRITICAL FIX: Always render content, never show empty placeholder
  // Default to mobile layout if detection hasn't completed yet (prevents blank sections)
  const shouldRenderMobile = isMobileDevice !== false; // true or null -> render mobile
  
  // Mobile device - simple layout (or fallback if detection pending)
  if (shouldRenderMobile) {
    return (
      <section 
        ref={vputSectionRef}
        className="relative w-full journey-section-container"
        style={{ 
          width: '100vw', 
          maxWidth: '100vw',
          marginTop: 0, 
          paddingTop: 0,
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          overflow: 'visible',
          overflowX: 'visible',
          overflowY: 'visible',
          position: 'relative',
        }}
      >
        <MobileJourney />
      </section>
    );
  }

  // Desktop device - complex parallax layout
  return (
    <section 
      ref={vputSectionRef}
      className="relative w-full journey-section-container"
      style={{ width: '100%', marginTop: 0, paddingTop: 0, overflow: 'visible', position: 'relative' }}
    >
      {/* Desktop composition - 400vh parallax version */}
      <div className="desktop-journey" style={{ display: 'block', visibility: 'visible', position: 'relative', overflow: 'visible' }}>
        {/* Background */}
        <div className="relative w-full z-0 journey-bg-wrapper" style={{ minHeight: '400vh', height: '400vh', width: '100%' }}>
          <div
            className="journey-bg-desktop"
            style={{
              backgroundImage: 'url(/backgrounds/sections/section-4.png)',
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              minHeight: '400vh',
              willChange: 'auto'
            }}
          />
          {/* Блюр-градиент прямо под конец section-4.png для скрытия граней на ПК */}
          <div
            className="section-4-end-blur"
            style={{
              position: 'absolute',
              bottom: 'clamp(1vh, 2vh, 3vh)',
              left: 0,
              right: 0,
              width: '100%',
              height: 'clamp(12vh, 15vh, 18vh)',
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.25) 30%, rgba(0, 0, 0, 0.15) 70%, rgba(0, 0, 0, 0) 100%)',
              backdropFilter: 'blur(50px)',
              WebkitBackdropFilter: 'blur(50px)',
              zIndex: 10,
              pointerEvents: 'none',
              display: 'block',
              visibility: 'visible',
              opacity: 1
            }}
          />
        </div>

        {/* Office - vput.png с видео bimbom.mp4 внутри */}
        <div 
          ref={officeRef}
          className="absolute z-[5] desktop-vput-container"
          style={{
            top: '-8vh',
            left: 'clamp(2rem, 4vw, 5rem)',
            maxWidth: 'calc(100vw - clamp(4rem, 8vw, 10rem))',
            width: 'clamp(25rem, 38vw, 45rem)',
            overflow: 'visible',
            position: 'absolute',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            zIndex: 5
          }}
        >
          {/* Контейнер для рамки и видео */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(18.75rem, 28.5vw, 33.75rem)',
              maxWidth: '100%',
              minWidth: 'clamp(20rem, 30vw, 35rem)',
              overflow: 'hidden'
            }}
          >
            {/* Видео внутри рамки - уменьшенный размер и смещение влево для ПК */}
            <video
              ref={videoRef}
              src="/backgrounds/sections/bimbom.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              preload="auto"
              style={{
                position: 'absolute',
                top: '50%',
                left: 'calc(50% - clamp(0.5rem, 1vw, 1rem))',
                transform: 'translate(-50%, -50%) scaleX(1.08)',
                width: 'calc(100% - clamp(8.5rem, 13vw, 16rem))',
                height: 'calc(100% - clamp(8.5rem, 13vw, 16rem))',
                objectFit: 'cover',
                zIndex: 1,
                pointerEvents: 'none',
                outline: 'none',
                display: 'block',
                visibility: 'visible',
                opacity: 1
              }}
            />
            {/* Рамка поверх видео */}
            <div
              style={{
                backgroundImage: `url(/backgrounds/sections/vput.png${VPUT_IMAGES_VERSION})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
                pointerEvents: 'none',
                display: 'block',
                visibility: 'visible',
                opacity: 1
              }}
            />
          </div>
        </div>

        {/* Tiraj.png */}
        <div 
          className="absolute z-[5]"
          data-animate="vput"
          data-speed="0.3"
          style={{
            top: 'clamp(10vh, 18vh, 25vh)',
            right: 'clamp(22.5rem, 30vw, 28.125rem)'
          }}
        >
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/tiraj.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'clamp(18rem, 24vw, 30rem)',
              height: 'clamp(13.5rem, 18vw, 22.5rem)',
              maxWidth: '100%'
            }}
          />
        </div>

        {/* Flash.png */}
        <div 
          className="absolute z-[5]"
          data-animate="vput"
          data-speed="0.5"
          style={{
            top: 'clamp(10.5vh, 19vh, 26vh)',
            right: 'clamp(0.5rem, 1vw, 1.5rem)'
          }}
        >
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/flash.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'clamp(18rem, 24vw, 30rem)',
              height: 'clamp(13.5rem, 18vw, 22.5rem)',
              maxWidth: '100%'
            }}
          />
        </div>

        {/* Office Text */}
        <div 
          className="absolute z-[5] text-center"
          style={{
            top: 'clamp(40vh, 50vh, 60vh)',
            right: 'clamp(4rem, 6vw, 7rem)',
            paddingLeft: 'clamp(1rem, 2vw, 2rem)',
            paddingRight: 'clamp(1rem, 2vw, 2rem)',
            maxWidth: 'clamp(20rem, 40vw, 40rem)'
          }}
        >
          <p
            className="uppercase mb-2"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.25rem, 1.875vw, 1.875rem)',
              color: '#FFFDFD',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.1em'
            }}
          >
            ОФИС ЛОТЕРЕИ «БИМ-БОМ-26»
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.05em',
              lineHeight: '1.2'
            }}
          >
            ТОЧКА, ГДЕ НАЧИНАЕТСЯ АФЕРА И<br />
            РАСКРЫВАЕТСЯ ХАКЕРСКАЯ МАХИНАЦИЯ.
          </p>
        </div>

        {/* Изображение stul100let.png слева от vput2.png */}
        <div 
          className="absolute z-[5]"
          data-animate="vput"
          data-speed="0.4"
          style={{
            top: 'clamp(87vh, 105vh, 124vh)',
            left: 'clamp(0rem, 0.5vw, 3.125rem)'
          }}
        >
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/stul100let.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'clamp(28rem, 38vw, 42rem)',
              height: 'clamp(21rem, 28.5vw, 31.5rem)',
              maxWidth: '100%'
            }}
          />
        </div>
        {/* Psychushka - vput2.png с видео psihuska.mp4 внутри */}
        <div 
          ref={psychushkaRef}
          className="absolute z-[5] desktop-vput2-container"
          style={{
            top: 'clamp(85vh, 100vh, 120vh)',
            left: 'clamp(26rem, 34vw, 40rem)',
            position: 'absolute',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            zIndex: 5,
            maxWidth: 'calc(100vw - clamp(4rem, 8vw, 10rem))',
            width: 'clamp(25rem, 38vw, 45rem)',
            overflow: 'visible'
          }}
        >
          {/* Контейнер для рамки и видео */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(18.75rem, 28.5vw, 33.75rem)',
              maxWidth: '100%',
              minWidth: 'clamp(20rem, 30vw, 35rem)',
              overflow: 'hidden'
            }}
          >
            {/* Видео внутри рамки */}
            <video
              ref={psihuskaVideoRef}
              src="/photo/psihuska.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              preload="auto"
              style={{
                position: 'absolute',
                top: '50%',
                left: 'calc(50% + clamp(0.1rem, 0.3vw, 0.3rem))',
                transform: 'translate(-50%, -50%) scaleX(1.08)',
                width: 'calc(100% - clamp(7rem, 11vw, 14rem))',
                height: 'calc(100% - clamp(8.5rem, 13vw, 16rem))',
                objectFit: 'cover',
                zIndex: 1,
                pointerEvents: 'none',
                outline: 'none',
                display: 'block',
                visibility: 'visible',
                opacity: 1
              }}
            />
            {/* Рамка поверх видео */}
            <div
              style={{
                backgroundImage: `url(/backgrounds/sections/vput2.png${VPUT_IMAGES_VERSION})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
                pointerEvents: 'none',
                display: 'block',
                visibility: 'visible',
                opacity: 1
              }}
            />
          </div>
        </div>

        {/* Изображение analiz.png справа от vput2.png */}
        <div 
          className="absolute z-[5]"
          data-animate="vput"
          data-speed="0.7"
          style={{
            top: 'clamp(84vh, 102vh, 122vh)',
            left: 'clamp(52rem, 68vw, 85rem)'
          }}
        >
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/analiz.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'clamp(20rem, 26vw, 30rem)',
              height: 'clamp(15rem, 19.5vw, 22.5rem)',
              maxWidth: '100%'
            }}
          />
        </div>

        {/* Текст "Психушка" ниже analiz.png */}
        <div 
          className="absolute z-[5] text-center"
          style={{
            top: 'clamp(115.625vh, 143.75vh, 156.25vh)',
            left: 'clamp(55rem, 71vw, 88rem)',
            maxWidth: 'clamp(22rem, 28vw, 32rem)'
          }}
        >
          <p
            className="uppercase mb-2"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.25rem, 1.875vw, 1.875rem)',
              color: '#FFFDFD',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.1em'
            }}
          >
            ПСИХУШКА
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.05em',
              lineHeight: '1.5'
            }}
          >
            СИМВОЛ БЕЗУМИЯ ПРОГРЕССА — ЗДЕСЬ СКРЫТ ГЕНИЙ-ХАКЕР, ВЗЛОМАВШИЙ СИСТЕМУ.
          </p>
        </div>

        {/* Изображение pamat15.png слева от vput3.png */}
        <div 
          className="absolute z-[5]"
          data-animate="vput"
          data-speed="0.3"
          style={{
            top: 'clamp(175vh, 207.5vh, 200vh)',
            left: 'clamp(0rem, 2vw, 5rem)' /* Сдвинуто правее на ПК версиях */
          }}
        >
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/pamat15.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'clamp(28rem, 35vw, 35rem)',
              height: 'clamp(21rem, 26.25vw, 26.25rem)',
              maxWidth: '100%'
            }}
          />
        </div>

        {/* Текст "КВАРТИРА КИСЫ" ниже pamat15.png */}
        <div 
          className="absolute z-[5] text-center"
          style={{
            top: 'clamp(238vh, 272.5vh, 250vh)',
            left: 'clamp(6rem, 11vw, 21rem)',
            maxWidth: 'clamp(20rem, 32.5vw, 32.5rem)'
          }}
        >
          <p
            className="uppercase mb-4"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.25rem, 1.875vw, 1.875rem)',
              color: '#FFFFFF',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.1em'
            }}
          >
            КВАРТИРА КИСЫ
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.05em',
              lineHeight: '1.2'
            }}
          >
            ЛИЧНОЕ УБЕЖИЩЕ И ШТАБ<br />
            ОПЕРАЦИИ, ГДЕ СТАЛКИВАЮТСЯ<br />
            ЖАДНОСТЬ И СОВЕСТЬ.
          </p>
        </div>

        {/* Изображение computer.png ниже текста "Личное убежище..." */}
        <div 
          className="absolute z-[5] computer-desktop-mobile-adjust"
          data-animate="vput"
          data-speed="0.5"
          style={{
            top: 'clamp(270vh, 325vh, 295vh)', /* Поднято еще выше на ПК версиях */
            left: 'clamp(3.5rem, 6.75vw, 14.5rem)'
          }}
        >
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/computer.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'clamp(21rem, 28vw, 29rem)',
              height: 'clamp(15.75rem, 21vw, 21.75rem)',
              maxWidth: '100%'
            }}
          />
        </div>

        {/* Kisa - vput3.png с видео kvartira.mp4 внутри */}
        <div 
          ref={kisaRef}
          className="absolute z-[5] desktop-vput3-container"
          style={{
            top: 'clamp(180vh, 215vh, 205vh)',
            left: 'clamp(50rem, 59vw, 66rem)',
            position: 'absolute',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            zIndex: 5,
            maxWidth: 'calc(100vw - clamp(4rem, 8vw, 10rem))',
            width: 'clamp(28rem, 42vw, 50rem)',
            overflow: 'visible'
          }}
        >
          {/* Контейнер для рамки и видео */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(21rem, 32vw, 37.5rem)',
              maxWidth: '100%',
              minWidth: 'clamp(22rem, 33vw, 38rem)',
              overflow: 'visible'
            }}
          >
            {/* Видео внутри рамки - уменьшенный размер */}
            <video
              ref={kvartiraVideoRef}
              src="/photo/kvartira.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              preload="auto"
              style={{
                position: 'absolute',
                top: '48%',
                left: 'calc(50% + clamp(0.1rem, 0.3vw, 0.2rem))',
                transform: 'translate(-50%, -50%) scaleX(1.08)',
                width: 'calc(100% - clamp(9rem, 14vw, 18rem))', /* Уменьшены отступы для увеличения размера видео на ПК */
                height: 'calc(100% - clamp(10rem, 15vw, 20rem))', /* Уменьшены отступы для увеличения размера видео на ПК */
                objectFit: 'cover',
                zIndex: 1,
                pointerEvents: 'none',
                outline: 'none',
                display: 'block',
                visibility: 'visible',
                opacity: 1
              }}
            />
            {/* Рамка поверх видео - полная видимость без обрезки */}
            <div
              style={{
                backgroundImage: `url(/backgrounds/sections/vput3.png${VPUT_IMAGES_VERSION})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
                pointerEvents: 'none',
                display: 'block',
                visibility: 'visible',
                opacity: 1,
                overflow: 'visible'
              }}
            />
          </div>
        </div>

        {/* Yarygina - vput4.png с видео babka.mp4 внутри */}
        <div 
          ref={yaryginaRef}
          className="absolute z-[5] desktop-vput4-container"
          style={{
            top: 'clamp(262vh, 315vh, 288vh)',
            left: 'clamp(43rem, 53vw, 70rem)',
            position: 'absolute',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            zIndex: 5,
            maxWidth: 'calc(100vw - clamp(4rem, 8vw, 10rem))',
            width: 'clamp(25rem, 38vw, 45rem)',
            overflow: 'visible'
          }}
        >
          {/* Контейнер для рамки и видео */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(18.75rem, 28.5vw, 33.75rem)',
              maxWidth: '100%',
              minWidth: 'clamp(20rem, 30vw, 35rem)',
              overflow: 'hidden'
            }}
          >
            {/* Видео внутри рамки */}
            <video
              ref={babkaVideoRef}
              src="/photo/babka.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              preload="auto"
              style={{
                position: 'absolute',
                top: '50%',
                left: 'calc(50% - clamp(0.2rem, 0.5vw, 0.4rem))', /* Сдвинуто левее на ПК версиях */
                // Формат 16:9 для всех устройств
                aspectRatio: '16 / 9',
                transform: 'translate(-50%, -50%)',
                width: 'calc(100% - clamp(6rem, 9vw, 12rem))', /* Увеличена ширина видео на ПК версиях */
                height: 'auto',
                objectFit: 'contain',
                zIndex: 1,
                pointerEvents: 'none',
                outline: 'none',
                display: 'block',
                visibility: 'visible',
                opacity: 1
              }}
            />
            {/* Рамка поверх видео */}
            <div
              style={{
                backgroundImage: `url(/backgrounds/sections/vput4.png${VPUT_IMAGES_VERSION})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
                pointerEvents: 'none',
                display: 'block',
                visibility: 'visible',
                opacity: 1
              }}
            />
          </div>
        </div>

        {/* Текст "КВАРТИРА СТАРУХИ ЯРЫГИНОЙ" ниже computer.png */}
        <div 
          ref={finalTextRef}
          className="absolute z-[5] text-center yarygina-text-desktop-mobile-adjust"
          style={{
            top: 'clamp(320vh, 385vh, 345vh)',
            left: 'clamp(2rem, 5.75vw, 12rem)',
            maxWidth: 'clamp(20rem, 31.25vw, 43.75rem)'
          }}
        >
          <p
            className="uppercase mb-4"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.25rem, 1.875vw, 1.875rem)',
              color: '#FFFFFF',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.1em'
            }}
          >
            КВАРТИРА СТАРУХИ ЯРЫГИНОЙ
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.125rem, 1.25vw, 1.25rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.05em',
              lineHeight: '1.2'
            }}
          >
            ФИНАЛ ОХОТЫ — ЛОГОВО<br />
            «БАБКИ-ХАКЕРА», УПРАВЛЯЮЩЕЙ<br />
            МИЛЛИАРДАМИ ИЗ КРЕСЛА.
          </p>
        </div>

        {/* Изображение tabletki.png ниже vput4.png */}
        <div 
          className="absolute z-[5]"
          data-animate="vput"
          data-speed="0.8"
          style={{
            top: 'clamp(304vh, 370vh, 345vh)', /* Опущено еще ниже на ПК версиях */
            left: 'clamp(52rem, 66vw, 86rem)' /* Сдвинуто правее на ПК версиях */
          }}
        >
          <div
            style={{
              backgroundImage: 'url(/backgrounds/sections/tabletki.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'clamp(14rem, 19vw, 20rem)',
              height: 'clamp(10.5rem, 14.25vw, 15rem)',
              maxWidth: '100%'
            }}
          />
        </div>

        {/* Section end marker */}
        <div 
          ref={sectionEndRef}
          className="absolute left-0 w-full"
          style={{ 
            top: 'clamp(212.5vh, 282.5vh, 237.5vh)',
            height: '1px',
            pointerEvents: 'none'
          }}
        />
        
        {/* Блюр-градиент в конце desktop-journey для плавного перехода к section-3.png на ПК */}
        <div 
          className="absolute bottom-0 left-0 w-full desktop-journey-blur-transition"
          style={{
            pointerEvents: 'none',
            zIndex: 5,
            display: 'block',
            visibility: 'visible',
            opacity: 1,
          }}
        />
        
        {/* ДОПОЛНИТЕЛЬНЫЙ блюр-градиент прямо под конец section-4.png для скрытия граней на ПК - ВНЕШНИЙ */}
        <div
          className="section-4-end-blur-external"
          style={{
            position: 'absolute',
            bottom: 'clamp(1vh, 2vh, 3vh)',
            left: 0,
            right: 0,
            width: '100%',
            height: 'clamp(15vh, 18vh, 20vh)',
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.35) 25%, rgba(0, 0, 0, 0.25) 60%, rgba(0, 0, 0, 0) 100%)',
            backdropFilter: 'blur(60px)',
            WebkitBackdropFilter: 'blur(60px)',
            zIndex: 15,
            pointerEvents: 'none',
            display: 'block',
            visibility: 'visible',
            opacity: 1
          }}
        />
      </div>
    </section>
  );
}
