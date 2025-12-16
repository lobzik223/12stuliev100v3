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
  const [isMobileDevice, setIsMobileDevice] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Client-side only rendering to prevent SSR/hydration mismatches
  useEffect(() => {
    setIsClient(true);
    setIsMobileDevice(isProbablyMobile());
  }, []);

  // IntersectionObserver для автоплея видео при скролле (desktop)
  useEffect(() => {
    if (!isClient || !videoRef.current) return;

    const video = videoRef.current;
    
    // Обработчик загрузки видео
    video.addEventListener('loadeddata', () => {
      console.log('Desktop video loaded');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Desktop video error:', e);
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

  // IntersectionObserver для автоплея видео при скролле (mobile)
  useEffect(() => {
    if (!isClient || !mobileVideoRef.current) return;

    const video = mobileVideoRef.current;
    
    // Обработчик загрузки видео
    video.addEventListener('loadeddata', () => {
      console.log('Mobile video loaded');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Mobile video error:', e);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log('Mobile video autoplay failed:', err);
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

  // IntersectionObserver для автоплея видео psihuska.mp4 при скролле (desktop)
  useEffect(() => {
    if (!isClient || !psihuskaVideoRef.current) return;

    const video = psihuskaVideoRef.current;
    
    // Обработчик загрузки видео
    video.addEventListener('loadeddata', () => {
      console.log('Desktop psihuska video loaded');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Desktop psihuska video error:', e);
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

  // IntersectionObserver для автоплея видео psihuska.mp4 при скролле (mobile)
  useEffect(() => {
    if (!isClient || !mobilePsihuskaVideoRef.current) return;

    const video = mobilePsihuskaVideoRef.current;
    
    // Обработчик загрузки видео
    video.addEventListener('loadeddata', () => {
      console.log('Mobile psihuska video loaded');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Mobile psihuska video error:', e);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log('Mobile psihuska video autoplay failed:', err);
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

  // IntersectionObserver для автоплея видео kvartira.mp4 при скролле (desktop)
  useEffect(() => {
    if (!isClient || !kvartiraVideoRef.current) return;

    const video = kvartiraVideoRef.current;
    
    video.addEventListener('loadeddata', () => {
      console.log('Desktop kvartira video loaded');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Desktop kvartira video error:', e);
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

  // IntersectionObserver для автоплея видео kvartira.mp4 при скролле (mobile)
  useEffect(() => {
    if (!isClient || !mobileKvartiraVideoRef.current) return;

    const video = mobileKvartiraVideoRef.current;
    
    video.addEventListener('loadeddata', () => {
      console.log('Mobile kvartira video loaded');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Mobile kvartira video error:', e);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log('Mobile kvartira video autoplay failed:', err);
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

  // IntersectionObserver для автоплея видео babka.mp4 при скролле (desktop)
  useEffect(() => {
    if (!isClient || !babkaVideoRef.current) return;

    const video = babkaVideoRef.current;
    
    video.addEventListener('loadeddata', () => {
      console.log('Desktop babka video loaded');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Desktop babka video error:', e);
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

  // IntersectionObserver для автоплея видео babka.mp4 при скролле (mobile)
  useEffect(() => {
    if (!isClient || !mobileBabkaVideoRef.current) return;

    const video = mobileBabkaVideoRef.current;
    
    video.addEventListener('loadeddata', () => {
      console.log('Mobile babka video loaded');
    });
    
    video.addEventListener('error', (e) => {
      console.error('Mobile babka video error:', e);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log('Mobile babka video autoplay failed:', err);
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
          backgroundImage: 'url(/backgrounds/sections/mobile/section-4-mobile.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
                marginTop: idx === 3 ? 'clamp(12rem, 20vh, 15rem)' : '0',
                paddingTop: idx === 3 ? 'clamp(4rem, 8vh, 6rem)' : '0',
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
                marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
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
                      minWidth: 'clamp(200px, 60vw, 300px)',
                      height: '0',
                      paddingTop: 'clamp(22%, 26%, 30%)',
                      position: 'relative',
                      display: 'block',
                      visibility: 'visible',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Видео внутри рамки для мобильной версии */}
                    <video
                      ref={mobileVideoRef}
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
                        left: 'calc(50% - clamp(0.3rem, 1vw, 0.5rem))',
                        transform: 'translate(-50%, -50%) scaleX(0.96)',
                        width: 'calc(100% - clamp(5rem, 11vw, 7.5rem))',
                        height: 'calc(100% - clamp(5rem, 11vw, 7.5rem))',
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
                ) : idx === 1 ? (
                  <div
                    className="mobile-scene-image mobile-vput2-with-video"
                    style={{
                      flex: '0 1 auto',
                      maxWidth: '100%',
                      width: 'auto',
                      minWidth: 'clamp(200px, 60vw, 300px)',
                      height: '0',
                      paddingTop: 'clamp(22%, 26%, 30%)',
                      position: 'relative',
                      display: 'block',
                      visibility: 'visible',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                      transform: 'none',
                      marginLeft: '0',
                      marginRight: '0',
                    }}
                  >
                    {/* Видео psihuska.mp4 внутри рамки для мобильной версии */}
                    <video
                      ref={mobilePsihuskaVideoRef}
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
                        left: 'calc(50% + clamp(0.2rem, 0.8vw, 0.5rem))',
                        transform: 'translate(-50%, -50%) scaleX(0.94)',
                        width: 'calc(100% - clamp(2.5rem, 6vw, 4rem))',
                        height: 'calc(100% - clamp(5rem, 11vw, 7.5rem))',
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
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                      marginLeft: 'clamp(0.5rem, 2vw, 1rem)',
                      marginRight: 'clamp(0.5rem, 2vw, 1rem)',
                      transform: 'translateY(clamp(-2.5rem, -5vh, -2rem)) translateX(clamp(-1rem, -2vw, -0.5rem))',
                    }}
                  >
                    {/* Видео kvartira.mp4 внутри рамки для мобильной версии */}
                    <video
                      ref={mobileKvartiraVideoRef}
                      src="/photo/kvartira.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls={false}
                      preload="auto"
                      style={{
                        position: 'absolute',
                        top: '47%',
                        left: 'calc(50% + clamp(0.05rem, 0.2vw, 0.15rem))',
                        transform: 'translate(-50%, -50%) scaleX(0.96)',
                        width: 'calc(100% - clamp(4.5rem, 10vw, 7.5rem))',
                        height: 'calc(100% - clamp(4.5rem, 10vw, 7.5rem))',
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
                      minWidth: 'clamp(200px, 60vw, 300px)',
                      height: '0',
                      paddingTop: 'clamp(22%, 26%, 30%)',
                      position: 'relative',
                      display: 'block',
                      visibility: 'visible',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Видео babka.mp4 внутри рамки для мобильной версии */}
                    <video
                      ref={mobileBabkaVideoRef}
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
                        left: 'calc(50% - clamp(0.3rem, 1vw, 0.5rem))',
                        transform: 'translate(-50%, -50%) scaleX(0.94)',
                        width: 'calc(100% - clamp(2.5rem, 6vw, 4rem))',
                        height: 'calc(100% - clamp(5rem, 11vw, 7.5rem))',
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
                {idx === 0 && (
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
                      transform: 'translateY(clamp(-0.5rem, -1vh, -0.3rem)) translateX(clamp(1rem, 3vw, 2rem))',
                      marginLeft: '0',
                    }}
                  />
                )}
              </div>
              {/* For ПСИХУШКА (idx === 1) and КВАРТИРА СТАРУХИ ЯРЫГИНОЙ (idx === 3): image on left, text on right */}
              {idx === 1 || idx === 3 ? (
                <div className={idx === 3 ? 'yarygina-content-wrapper' : ''} style={{ 
                  width: '100%', 
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 'clamp(1rem, 3vw, 2rem)',
                  marginTop: idx === 3 ? 'clamp(14rem, 26vh, 17rem)' : 'clamp(-1.2rem, -2vh, -0.8rem)',
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
                      marginTop: idx === 1 ? 'clamp(-1.5rem, -3vh, -1rem)' : idx === 3 ? 'clamp(6rem, 12vh, 8rem)' : '0',
                    }}
                  />
                  {/* Text on the right */}
                  <div style={{ 
                    flex: '1 1 auto',
                    textAlign: 'right',
                    paddingLeft: idx === 1 ? 'clamp(2rem, 5vw, 3rem)' : 'clamp(1rem, 3vw, 2rem)',
                    paddingRight: '0',
                    marginLeft: idx === 1 ? 'clamp(1rem, 3vw, 2rem)' : '0',
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
                      }}
                    >
                      {s.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                        color: '#FBC632',
                        textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                        letterSpacing: '0.03em',
                        lineHeight: '1.4',
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ 
                  marginTop: idx === 2 ? 'clamp(-2rem, -3.5vh, -1.5rem)' : 'clamp(-1.2rem, -2vh, -0.8rem)', 
                  width: '100%', 
                  padding: idx === 0 ? '0 1rem 0 clamp(5rem, 12vw, 7rem)' : idx === 2 ? '0 clamp(2rem, 6vw, 4rem) 0 1rem' : '0 1rem',
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
                    }}
                  >
                    {s.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Playfair Display SC', serif",
                      fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                      color: '#FBC632',
                      textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                      letterSpacing: '0.03em',
                      lineHeight: '1.4',
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              )}
              
              {/* Изображение pamat15.png ниже текста "КВАРТИРА КИСЫ" на мобильной версии */}
              {idx === 2 && (
                <div
                  className="pamat15-wrapper-mobile"
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 'clamp(2.5rem, 5vh, 4rem)',
                    marginBottom: 'clamp(2rem, 4vh, 3rem)',
                    paddingTop: 'clamp(1.5rem, 3vh, 2.5rem)',
                    paddingLeft: 'clamp(1rem, 3vw, 2rem)',
                    paddingRight: 'clamp(1rem, 3vw, 2rem)',
                    overflow: 'visible',
                    boxSizing: 'border-box',
                    position: 'relative',
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
              
              {/* Add flash.png below ОФИС ЛОТЕРЕИ text (idx === 0) */}
              {idx === 0 && (
                <div
                  style={{
                    width: 'clamp(150px, 40vw, 250px)',
                    height: 'clamp(150px, 40vw, 250px)',
                    backgroundImage: 'url(/backgrounds/sections/flash.png)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    marginTop: 'clamp(1.5rem, 3vh, 2rem)',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />
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

  // Loading state - show nothing until we know device type
  if (!isClient || isMobileDevice === null) {
    return (
      <section className="relative w-full" style={{ minHeight: '100vh', backgroundColor: '#000' }}>
        {/* Placeholder to prevent layout shift */}
      </section>
    );
  }

  // Mobile device - simple layout
  if (isMobileDevice) {
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
            СИМВОЛ БЕЗУМИЯ ПРОГРЕССА — ЗДЕСЬ<br />
            СКРЫТ ГЕНИЙ-ХАКЕР, ВЗЛОМАВШИЙ СИСТЕМУ.
          </p>
        </div>

        {/* Изображение pamat15.png слева от vput3.png */}
        <div 
          className="absolute z-[5]"
          data-animate="vput"
          data-speed="0.3"
          style={{
            top: 'clamp(175vh, 207.5vh, 200vh)',
            left: 'clamp(-2rem, 0vw, 3rem)'
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
            top: 'clamp(280vh, 335vh, 305vh)',
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
            top: 'clamp(173vh, 206vh, 198vh)',
            left: 'clamp(50rem, 59vw, 66rem)',
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
                opacity: 1
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
                left: 'calc(50% + clamp(0.1rem, 0.3vw, 0.2rem))',
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
            top: 'clamp(312vh, 375vh, 353vh)',
            left: 'clamp(50rem, 64vw, 83.875rem)'
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
      </div>
    </section>
  );
}
