'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Страница галереи не должна открываться - перенаправляем на главную
const GalleryPage: React.FC = () => {
  const router = useRouter();

  // Перенаправляем на главную страницу сразу
  useEffect(() => {
    router.replace('/');
    // После небольшой задержки скроллим к разделу галереи
    setTimeout(() => {
      const gallerySection = document.querySelector('[data-gallery-section]');
      if (gallerySection) {
        const elementPosition = gallerySection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 100;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  }, [router]);

  // Не рендерим ничего, пока идет редирект
  return null;
};

export default GalleryPage;
