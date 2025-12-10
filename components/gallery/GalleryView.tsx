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
      />
      
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
            zIndex: 1, /* Ниже шапки (9999) */
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
                  priority={idx < 3} // Приоритет для первых 3 изображений
                  quality={idx < 6 ? 90 : 75} // Выше качество для видимых изображений
                  sizes="(max-width: 768px) 140px, (max-width: 1200px) 180px, 280px"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    display: 'block',
                    position: 'relative',
                    zIndex: 1 // Явно указываем z-index для изображения
                  }}
                  unoptimized={true} // Отключаем оптимизацию для совместимости с Vercel
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryView;

