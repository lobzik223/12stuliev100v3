'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import './GalleryView.css';

const GalleryView: React.FC = () => {
  const router = useRouter();
  const images = [
    '/photo/Fotoset-22.JPG',
    '/photo/Fotoset-32.JPG',
    '/photo/Fotoset-38.JPG',
    '/photo/Fotoset-43 (2).JPG',
    '/photo/Fotoset-48.JPG',
    '/photo/Fotoset-51.JPG',
    '/photo/Fotoset-52.JPG',
    '/photo/Fotoset-55.JPG',
    '/photo/Fotoset-60 (1).JPG',
    '/photo/Fotoset-61.JPG',
    '/photo/Fotoset-62.JPG',
    '/photo/Fotoset-64 (1).JPG',
    '/photo/Fotoset-67.JPG',
    '/photo/Fotoset-68.JPG',
    '/photo/Fotoset-69.JPG',
    '/photo/Fotoset-71.JPG',
    '/photo/Fotoset-76.JPG',
    '/photo/Fotoset-89.JPG',
    '/photo/Fotoset-106.JPG',
  ];

  return (
    <div className="gallery-container">
      {/* Шапка как в MainScreen */}
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
        }}
      >
        ЗАГЛЯНИ ЗА КУЛИСЬЕ
      </div>
      
      <div className="hart-wrapper">
        <div className="hart-cluster">
          {images.map((src, idx) => (
            <div key={idx} className={`hart-item item-${idx + 1}`}>
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
                  display: 'block'
                }}
                unoptimized={false} // Включаем оптимизацию Next.js
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryView;

