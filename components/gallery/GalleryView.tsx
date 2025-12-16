'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import './GalleryView.css';

const GalleryView: React.FC = () => {
  const router = useRouter();
  const images = [
    '/photo/Fotoset-22.jpg',
    '/photo/Fotoset-32.jpg',
    '/photo/Fotoset-38.jpg',
    '/photo/Fotoset-43 (2).jpg',
    '/photo/Fotoset-48.jpg',
    '/photo/Fotoset-51.jpg',
    '/photo/Fotoset-52.jpg',
    '/photo/Fotoset-55.jpg',
    '/photo/Fotoset-60 (1).jpg',
    '/photo/Fotoset-61.jpg',
    '/photo/Fotoset-62.jpg',
    '/photo/Fotoset-64 (1).jpg',
    '/photo/Fotoset-67.jpg',
    '/photo/Fotoset-68.jpg',
    '/photo/Fotoset-69.jpg',
    '/photo/Fotoset-71.jpg',
    '/photo/Fotoset-76.jpg',
    '/photo/Fotoset-89.JPG',
    '/photo/Fotoset-106.jpg',
  ];

  const newImages = [
    '/photo/Fotoset-6 (1).jpg',
    '/photo/Fotoset-16.jpg',
    '/photo/Fotoset-25 (1).jpg',
    '/photo/Fotoset-24 (1).jpg',
    '/photo/Fotoset-26.jpg',
    '/photo/Fotoset-28 (1).jpg',
    '/photo/Fotoset-27.jpg',
    '/photo/Fotoset-31.jpg',
    '/photo/Fotoset-33 (2).jpg',
    '/photo/Fotoset-34.jpg',
    '/photo/Fotoset-36.jpg',
  ];

  // Компактная область для кучки фотографий
  const areaWidth = 600;
  const areaHeight = 380;

  // Фиксированные позиции для компактной кучки с умеренным наложением
  const newPositions = [
    { width: 180, left: 10, top: 10, rotation: -2.5 },
    { width: 170, left: 160, top: 20, rotation: 2 },
    { width: 190, left: 300, top: 5, rotation: -1.8 },
    { width: 160, left: 460, top: 30, rotation: 2.5 },
    { width: 175, left: 40, top: 80, rotation: -2 },
    { width: 165, left: 180, top: 95, rotation: 1.5 },
    { width: 185, left: 310, top: 110, rotation: -2.2 },
    { width: 170, left: 470, top: 125, rotation: 1.8 },
    { width: 160, left: 70, top: 190, rotation: -1.5 },
    { width: 175, left: 210, top: 205, rotation: 2.3 },
    { width: 165, left: 350, top: 220, rotation: -1.8 },
  ];

  // Фотографии для кучки справа от actor-22.png
  const actor22Images = [
    '/photo/Fotoset-162.jpg',
    '/photo/Fotoset-160.jpg',
    '/photo/Fotoset-154.jpg',
    '/photo/Fotoset-143.jpg',
    '/photo/Fotoset-114.jpg',
    '/photo/Fotoset-69.jpg',
    '/photo/Fotoset-43 (2).jpg',
    '/photo/Fotoset-22.jpg',
    '/photo/Fotoset-32.jpg',
    '/photo/Fotoset-38.jpg',
    '/photo/Fotoset-48.jpg',
    '/photo/Fotoset-51.jpg',
  ];

  // Позиции для кучки фотографий справа от actor-22.png
  const actor22Positions = [
    { width: 180, left: 10, top: 10, rotation: -2.5 },
    { width: 170, left: 160, top: 20, rotation: 2 },
    { width: 190, left: 300, top: 5, rotation: -1.8 },
    { width: 160, left: 460, top: 30, rotation: 2.5 },
    { width: 175, left: 40, top: 80, rotation: -2 },
    { width: 165, left: 180, top: 95, rotation: 1.5 },
    { width: 185, left: 310, top: 110, rotation: -2.2 },
    { width: 170, left: 470, top: 125, rotation: 1.8 },
    { width: 160, left: 70, top: 190, rotation: -1.5 },
    { width: 175, left: 210, top: 205, rotation: 2.3 },
    { width: 165, left: 350, top: 220, rotation: -1.8 },
    { width: 180, left: 480, top: 240, rotation: 2 },
  ];

  // Фотографии для кучки справа от actor-4.png
  const actor4Images = [
    '/photo/Fotoset-6 (2).jpg',
    '/photo/Fotoset-7.jpg',
    '/photo/Fotoset-101.jpg',
    '/photo/Fotoset-270.jpg',
    '/photo/Fotoset-198.jpg',
    '/photo/Fotoset-117.JPG',
  ];

  // Позиции для кучки фотографий справа от actor-4.png
  const actor4Positions = [
    { width: 180, left: 10, top: 10, rotation: -2.5 },
    { width: 170, left: 200, top: 25, rotation: 2 },
    { width: 190, left: 380, top: 10, rotation: -1.8 },
    { width: 175, left: 60, top: 100, rotation: -2 },
    { width: 165, left: 250, top: 120, rotation: 1.5 },
    { width: 185, left: 420, top: 135, rotation: -2.2 },
  ];

  // Фотографии для кучки справа от actor-333.png
  const actor333Images = [
    '/photo/Fotoset-6.jpg',
    '/photo/Fotoset-2.jpg',
    '/photo/Fotoset-17.jpg',
    '/photo/Fotoset-15.jpg',
    '/photo/Fotoset-46.jpg',
    '/photo/Fotoset-64.jpg',
    '/photo/Fotoset-94.jpg',
  ];

  // Позиции для кучки фотографий справа от actor-333.png
  const actor333Positions = [
    { width: 180, left: 10, top: 10, rotation: -2.5 },
    { width: 170, left: 160, top: 20, rotation: 2 },
    { width: 190, left: 300, top: 5, rotation: -1.8 },
    { width: 160, left: 460, top: 30, rotation: 2.5 },
    { width: 175, left: 40, top: 80, rotation: -2 },
    { width: 165, left: 180, top: 95, rotation: 1.5 },
    { width: 185, left: 310, top: 110, rotation: -2.2 },
  ];

  // Фотографии для кучки справа от actor-5.png
  const actor5Images = [
    '/photo/Fotoset-215.jpg',
    '/photo/Fotoset-222.jpg',
    '/photo/Fotoset-172.jpg',
    '/photo/Fotoset-177.jpg',
    '/photo/Fotoset-167.jpg',
  ];

  // Позиции для кучки фотографий справа от actor-5.png
  const actor5Positions = [
    { width: 180, left: 10, top: 10, rotation: -2.5 },
    { width: 170, left: 160, top: 20, rotation: 2 },
    { width: 190, left: 300, top: 5, rotation: -1.8 },
    { width: 175, left: 40, top: 80, rotation: -2 },
    { width: 165, left: 180, top: 95, rotation: 1.5 },
  ];

  return (
    <>
      {/* Шапка вынесена из контейнера для правильного z-index */}
      <Header 
        isVisible={true}
        onTicketsClick={() => router.push('/')}
        onAboutClick={() => router.push('/')}
        onGalleryClick={() => router.push('/gallery')}
        onActorsClick={() => router.push('/')}
        onTeamClick={() => router.push('/')}
        onReviewsClick={() => router.push('/')}
        onContactsClick={() => router.push('/')}
        hideMobileButton={true}
        hideCloseButton={true}
      />
      
      <div className="gallery-page-wrapper">
        <div className="gallery-container">
          <div
            className="gallery-title"
            style={{
              position: 'absolute',
              top: '12%',
              left: '68%',
              fontFamily: 'Playfair Display SC, serif',
              fontWeight: 400,
              fontSize: '36px',
              letterSpacing: '0%',
              lineHeight: '1.1',
              color: '#d9a857',
              textShadow: `
                0 0 6px rgba(255, 200, 120, 0.4),
                0 0 12px rgba(255, 180, 80, 0.3)
              `,
              zIndex: 1,
            }}
          >
            ЗАГЛЯНИ ЗА КУЛИСЬЕ
          </div>
          
          <div className="hart-wrapper">
            <div className="hart-cluster">
              {images.map((src, idx) => (
                <div key={idx} className={`hart-item item-${idx + 1}`} style={{ zIndex: 1 }}>
                  <Image 
                    src={src} 
                    alt={`Гость ${idx + 1}`}
                    width={300}
                    height={225}
                    loading={idx < 6 ? 'eager' : 'lazy'}
                    priority={idx < 3}
                    quality={idx < 6 ? 90 : 75}
                    sizes="(max-width: 768px) 140px, (max-width: 1200px) 180px, 280px"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      display: 'block',
                      position: 'relative',
                      zIndex: 1
                    }}
                    unoptimized={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="artists-title"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '5%',
            fontFamily: 'Playfair Display SC, serif',
            fontWeight: 400,
            fontSize: '36px',
            letterSpacing: '0%',
            lineHeight: '1.1',
            color: '#d9a857',
            textShadow: `
              0 0 6px rgba(255, 200, 120, 0.4),
              0 0 12px rgba(255, 180, 80, 0.3)
            `,
            maxWidth: '500px',
            zIndex: 20
          }}
        >
          Артисты которыми восхищаются и мотивируются
        </div>
      </div>
      <div 
        className="bottom-section"
        style={{
          backgroundImage: 'url(/photo/section-34839282.png)',
          backgroundSize: '100% 400vh',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          width: '100%',
          height: '400vh',
          position: 'relative',
          willChange: 'auto'
        }}
      >
        <div
          className="actor-image"
          style={{
            position: 'absolute',
            top: '80px',
            left: '12%',
            zIndex: 10,
            display: 'inline-block',
            width: '400px',
            maxWidth: '400px'
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '400px' }}>
            <Image 
              src="/photo/action-11.png" 
              alt="Артист" 
              width={400}
              height={600}
              loading="eager"
              priority
              quality={90}
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                display: 'block',
                position: 'relative',
                zIndex: 2,
                objectFit: 'contain'
              }}
              unoptimized={false}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '80px',
                background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
          </div>
        </div>
        <div
          className="new-photos-cluster"
          style={{
            position: 'absolute',
            top: '80px',
            left: 'calc(7% + 550px)',
            width: `${areaWidth}px`,
            height: `${areaHeight}px`,
            zIndex: 10
          }}
        >
          {newImages.map((src, i) => {
            const p = newPositions[i];
            return (
              <div
                key={i}
                className={`new-photo-item new-item-${i + 1}`}
                style={{
                  position: 'absolute',
                  width: `${p.width}px`,
                  left: `${p.left}px`,
                  top: `${p.top}px`,
                  transform: `rotate(${p.rotation}deg)`,
                  '--rotation': `${p.rotation}deg`
                } as React.CSSProperties & { '--rotation': string }}
              >
                <Image 
                  src={src} 
                  alt={`Фото ${i + 1}`}
                  width={p.width}
                  height={Math.round(p.width * 0.75)}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  quality={i < 6 ? 85 : 75}
                  sizes={`${p.width}px`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                  unoptimized={false}
                />
              </div>
            );
          })}
        </div>
        <div
          className="actor-image-2"
          style={{
            position: 'absolute',
            top: '700px',
            left: '4%',
            zIndex: 10,
            display: 'inline-block',
            width: '400px',
            maxWidth: '400px'
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '400px' }}>
            <Image 
              src="/photo/actor-22.png" 
              alt="Артист 2" 
              width={400}
              height={600}
              loading="eager"
              quality={90}
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                display: 'block',
                position: 'relative',
                zIndex: 2,
                objectFit: 'contain'
              }}
              unoptimized={false}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '80px',
                background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
          </div>
        </div>
        <div
          className="new-photos-cluster-2"
          style={{
            position: 'absolute',
            top: '700px',
            left: 'calc(4% + 500px)',
            width: `${areaWidth}px`,
            height: `${areaHeight}px`,
            zIndex: 10
          }}
        >
          {actor22Images.map((src, i) => {
            const p = actor22Positions[i];
            return (
              <div
                key={i}
                className={`new-photo-item new-item-${i + 1}`}
                style={{
                  position: 'absolute',
                  width: `${p.width}px`,
                  left: `${p.left}px`,
                  top: `${p.top}px`,
                  transform: `rotate(${p.rotation}deg)`,
                  '--rotation': `${p.rotation}deg`
                } as React.CSSProperties & { '--rotation': string }}
              >
                <Image 
                  src={src} 
                  alt={`Фото ${i + 1}`}
                  width={p.width}
                  height={Math.round(p.width * 0.75)}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  quality={i < 6 ? 85 : 75}
                  sizes={`${p.width}px`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                  unoptimized={false}
                />
              </div>
            );
          })}
        </div>
        <div
          className="actor-image-3"
          style={{
            position: 'absolute',
            top: '1200px',
            right: '4%',
            zIndex: 10,
            display: 'inline-block',
            width: '350px',
            maxWidth: '350px'
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '350px' }}>
            <Image 
              src="/photo/actor-333.png" 
              alt="Артист 3" 
              width={350}
              height={525}
              loading="eager"
              quality={90}
              style={{
                width: '100%',
                maxWidth: '350px',
                height: 'auto',
                display: 'block',
                position: 'relative',
                zIndex: 2,
                objectFit: 'contain'
              }}
              unoptimized={false}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '80px',
                background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
          </div>
        </div>
        <div
          className="new-photos-cluster-4"
          style={{
            position: 'absolute',
            top: '1200px',
            right: 'calc(4% + 400px)',
            width: `${areaWidth}px`,
            height: `${areaHeight}px`,
            zIndex: 10
          }}
        >
          {actor333Images.map((src, i) => {
            const p = actor333Positions[i];
            return (
              <div
                key={i}
                className={`new-photo-item new-item-${i + 1}`}
                style={{
                  position: 'absolute',
                  width: `${p.width}px`,
                  left: `${p.left}px`,
                  top: `${p.top}px`,
                  transform: `rotate(${p.rotation}deg)`,
                  '--rotation': `${p.rotation}deg`
                } as React.CSSProperties & { '--rotation': string }}
              >
                <Image 
                  src={src} 
                  alt={`Фото ${i + 1}`}
                  width={p.width}
                  height={Math.round(p.width * 0.75)}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  quality={i < 6 ? 85 : 75}
                  sizes={`${p.width}px`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                  unoptimized={false}
                />
              </div>
            );
          })}
        </div>
        <div
          className="actor-image-4"
          style={{
            position: 'absolute',
            top: '1700px',
            left: '4%',
            zIndex: 10,
            display: 'inline-block',
            width: '400px',
            maxWidth: '400px'
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '400px' }}>
            <Image 
              src="/photo/actor-4.png" 
              alt="Артист 4" 
              width={400}
              height={600}
              loading="eager"
              quality={90}
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                display: 'block',
                position: 'relative',
                zIndex: 2,
                objectFit: 'contain'
              }}
              unoptimized={false}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '80px',
                background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
          </div>
        </div>
        <div
          className="new-photos-cluster-3"
          style={{
            position: 'absolute',
            top: '1700px',
            left: 'calc(4% + 500px)',
            width: `${areaWidth}px`,
            height: `${areaHeight}px`,
            zIndex: 10
          }}
        >
          {actor4Images.map((src, i) => {
            const p = actor4Positions[i];
            return (
              <div
                key={i}
                className={`new-photo-item new-item-${i + 1}`}
                style={{
                  position: 'absolute',
                  width: `${p.width}px`,
                  left: `${p.left}px`,
                  top: `${p.top}px`,
                  transform: `rotate(${p.rotation}deg)`,
                  '--rotation': `${p.rotation}deg`
                } as React.CSSProperties & { '--rotation': string }}
              >
                <Image 
                  src={src} 
                  alt={`Фото ${i + 1}`}
                  width={p.width}
                  height={Math.round(p.width * 0.75)}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  quality={i < 6 ? 85 : 75}
                  sizes={`${p.width}px`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                  unoptimized={false}
                />
              </div>
            );
          })}
        </div>
        <div
          className="actor-image-5"
          style={{
            position: 'absolute',
            top: '2150px',
            right: '12%',
            zIndex: 10,
            display: 'inline-block',
            width: '400px',
            maxWidth: '400px'
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '400px' }}>
            <Image 
              src="/photo/actor-5.png" 
              alt="Артист 5" 
              width={400}
              height={600}
              loading="eager"
              quality={90}
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                display: 'block',
                position: 'relative',
                zIndex: 2,
                objectFit: 'contain'
              }}
              unoptimized={false}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '80px',
                background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
          </div>
        </div>
        <div
          className="new-photos-cluster-5"
          style={{
            position: 'absolute',
            top: '2150px',
            right: 'calc(12% + 450px)',
            width: `${areaWidth}px`,
            height: `${areaHeight}px`,
            zIndex: 10
          }}
        >
          {actor5Images.map((src, i) => {
            const p = actor5Positions[i];
            return (
              <div
                key={i}
                className={`new-photo-item new-item-${i + 1}`}
                style={{
                  position: 'absolute',
                  width: `${p.width}px`,
                  left: `${p.left}px`,
                  top: `${p.top}px`,
                  transform: `rotate(${p.rotation}deg)`,
                  '--rotation': `${p.rotation}deg`
                } as React.CSSProperties & { '--rotation': string }}
              >
                <Image 
                  src={src} 
                  alt={`Фото ${i + 1}`}
                  width={p.width}
                  height={Math.round(p.width * 0.75)}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  quality={i < 6 ? 85 : 75}
                  sizes={`${p.width}px`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                  unoptimized={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GalleryView;
