'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { reviews } from '../../data/reviews';
import { scheduleItems } from '../../data/schedule';
import { teamMembers } from '../../data/team';

interface TrailerSectionProps {
  gallerySectionRef?: React.RefObject<HTMLDivElement>;
  teamSectionRef?: React.RefObject<HTMLDivElement>;
  reviewsSectionRef?: React.RefObject<HTMLDivElement>;
  contactsSectionRef?: React.RefObject<HTMLDivElement>;
  onViewSchedule?: () => void;
  ssrIsIOS?: boolean;
}

export default function TrailerSection({ gallerySectionRef, teamSectionRef, reviewsSectionRef, contactsSectionRef, onViewSchedule, ssrIsIOS = false }: TrailerSectionProps) {
  const router = useRouter();
  const [selectedScheduleUrl, setSelectedScheduleUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBuyTicket = (url: string | undefined) => {
    if (url) {
      setSelectedScheduleUrl(url);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedScheduleUrl(null);
  };

  // Блокируем скролл body при открытии модального окна на мобильных
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isMobile = window.innerWidth <= 768;
    
    if (isModalOpen && isMobile) {
      // Сохраняем текущую позицию скролла
      const scrollY = window.scrollY;
      // Блокируем скролл body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Восстанавливаем скролл при закрытии
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isModalOpen]);


  return (
    <section 
      className="relative w-full"
      style={{
        minHeight: '100vh',
        padding: 'clamp(4rem, 8vh, 6rem) 4%'
      }}
    >
      <div className="w-full max-w-[120rem] mx-auto">
        {/* Заголовок "ТРЕЙЛЕР" */}
        <div className="text-center mb-8 md:mb-12">
          <p
            className="uppercase mb-4 md:mb-6"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.1em'
            }}
          >
            ТРЕЙЛЕР
          </p>
          <p
            className="uppercase"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
              color: '#FFFFFF',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.05em',
              lineHeight: '1.3',
              padding: '0 clamp(1rem, 2vw, 2rem)'
            }}
          >
            ПОГРУЗИТЕСЬ В АТМОСФЕРУ АФЕРЫ, ЮМОРА И БЛЕСТЯЩИХ НАХОДОК!
          </p>
        </div>

        {/* Видео блок под текстом */}
        <div className="flex justify-center mb-6 md:mb-8 mt-6 md:mt-8 px-2">
          <Image
            src="/backgrounds/sections/video.png"
            alt="Видео"
            width={1200}
            height={675}
            style={{ 
              width: 'clamp(20rem, 70vw, 75rem)', 
              maxWidth: '100%',
              height: 'auto'
            }}
            unoptimized
          />
        </div>

        {/* Кнопка "СМОТРЕТЬ ТРЕЙЛЕР" */}
        <div className="flex justify-center mb-16 md:mb-20">
          <button
            className="rounded-lg border-2 transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
              letterSpacing: '0.0625rem',
              color: 'white',
              backgroundColor: '#682302',
              borderColor: '#FBC632',
              borderWidth: '3px',
              padding: 'clamp(0.5rem, 0.75vw, 0.625rem) clamp(5rem, 8vw, 6.25rem)',
              boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.4)',
              whiteSpace: 'nowrap'
            }}
          >
            СМОТРЕТЬ ТРЕЙЛЕР
          </button>
        </div>

        {/* Раздел "ГАЛЕРЕЯ" */}
        <div ref={gallerySectionRef} className="text-center mb-8 md:mb-12 gallery-section-mobile">
          <p
            className="uppercase mb-4 md:mb-6"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.1em',
              marginTop: 'clamp(10rem, 16vh, 20rem)'
            }}
          >
            Галерея
          </p>
          <p
            className="uppercase mb-8 md:mb-12"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              lineHeight: '1.3',
              textAlign: 'center',
              padding: '0 clamp(1rem, 2vw, 2rem)',
              marginTop: 'clamp(1rem, 2vh, 2rem)'
            }}
          >
            Сцены из спектакля, костюмы, декорации и моменты за кулисами
          </p>
        </div>

        {/* Кнопка "ФОТО СО СПЕКТАКЛЯ" */}
        <div className="flex justify-center mb-8 md:mb-12 gallery-button-mobile" style={{ marginTop: 'clamp(6rem, 10vh, 10rem)' }}>
          <button
            onClick={() => router.push('/gallery')}
            className="rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
              letterSpacing: '0.0625rem',
              color: 'white',
              backgroundColor: '#682302',
              borderColor: '#FBC632',
              borderWidth: '3px',
              padding: 'clamp(0.5rem, 0.75vw, 0.625rem) clamp(5rem, 8vw, 6.25rem)',
              boxShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.4)',
              whiteSpace: 'nowrap',
              pointerEvents: 'auto'
            }}
          >
            ФОТО СО СПЕКТАКЛЯ
          </button>
        </div>

        {/* Кинолента 1 */}
        <div className="w-full flex justify-start overflow-x-visible kinolenta-container-mobile" style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', marginTop: '-4rem' }}>
          <Image
            src="/backgrounds/sections/kinolenta.png"
            alt="Кинолента"
            width={3840}
            height={200}
            className="max-w-none h-auto kinolenta-animation"
            style={{ width: '200vw', minWidth: '200vw' }}
            unoptimized
          />
        </div>

        {/* Кинолента 2 */}
        <div className="w-full flex justify-start overflow-x-visible kinolenta2-container-mobile" style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', marginTop: '-12rem' }}>
          <Image
            src="/backgrounds/sections/kinolenta2.png"
            alt="Кинолента 2"
            width={3840}
            height={200}
            className="max-w-none h-auto kinolenta2-animation"
            style={{ width: '200vw', minWidth: '200vw' }}
            unoptimized
          />
        </div>

        {/* Раздел "КОМАНДА" */}
        <div ref={teamSectionRef} className="w-full flex flex-col items-center" style={{ marginTop: 'clamp(4rem, 8vh, 6rem)' }}>
          <p 
            className="text-2xl md:text-3xl lg:text-4xl uppercase mb-2 md:mb-12"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              color: '#FBC632',
              filter: 'drop-shadow(0 0 7.5px rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 15px rgba(231, 200, 132, 0.4), 0 0 30px rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.1em',
              textAlign: 'center',
            }}
          >
            Команда
          </p>

          {/* Блок команды с каруселью Swiper - по логике отзывов */}
          <div className="relative w-full mt-2 md:mt-10 team-carousel-mobile-wrapper" style={{ padding: '1rem 0' }}>
            {ssrIsIOS && !mounted ? (
              <div className="flex flex-col items-center">
                <p className="text-center" style={{ fontFamily: "'Playfair Display SC', serif", color: '#FBC632' }}>
                  Команда
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4" style={{ width: '100%', maxWidth: '500px' }}>
                  {teamMembers.filter(member => member.date).slice(0, 1).map((member) => (
                    <div key={member.id} className="flex flex-col items-center">
                      <div className="relative" style={{ width: '100%', maxWidth: 'clamp(350px, 30vw, 500px)' }}>
                        <Image
                          src="/backgrounds/sections/command.png"
                          alt={member.name}
                          width={2800}
                          height={1867}
                          className="h-auto w-full"
                          style={{ objectFit: 'contain', display: 'block' }}
                          unoptimized
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ 
                          pointerEvents: 'none',
                          color: '#8B4513',
                          fontFamily: 'serif',
                          paddingTop: 'clamp(2rem, 5vh, 4rem)',
                          paddingBottom: 'clamp(1.5rem, 4vh, 3.5rem)',
                          paddingLeft: 'clamp(2.2rem, 5.5vw, 4.5rem)',
                          paddingRight: 'clamp(2.2rem, 5.5vw, 4.5rem)',
                        }}>
                          <p style={{ fontSize: 'clamp(0.7rem, 1.3vw, 1.3rem)', fontWeight: 'bold', marginBottom: 'clamp(0.25rem, 0.6vw, 0.6rem)' }}>
                            {member.name}
                          </p>
                          <p style={{ fontSize: 'clamp(0.55rem, 1vw, 1rem)', marginBottom: 'clamp(0.5rem, 1.2vw, 1.2rem)', color: '#000000' }}>
                            {member.position}
                          </p>
                          <p style={{ fontSize: 'clamp(0.6rem, 1vw, 0.95rem)', fontStyle: 'italic' }}>
                            &ldquo;{member.quote}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
            <Swiper
              modules={[Navigation]}
              speed={800}
              spaceBetween={0}
              loop={true}
              slidesPerView={3}
              slidesPerGroup={1}
              centeredSlides={false}
              grabCursor={true}
              navigation={{
                nextEl: '.swiper-button-next-team',
                prevEl: '.swiper-button-prev-team',
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
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
              }}
              className="team-carousel"
            >
              {teamMembers.filter(member => member.date).map((member) => (
                <SwiperSlide key={member.id}>
                  <div
                    className="flex flex-col items-center"
                    style={{
                      width: '100%',
                      padding: '0'
                    }}
                  >
                    {/* Карточка с текстом внутри */}
                    <div
                      className="relative team-card-mobile"
                      style={{
                        width: '100%',
                        maxWidth: 'clamp(350px, 30vw, 500px)',
                        pointerEvents: 'auto'
                      }}
                    >
                      <Image
                        src="/backgrounds/sections/command.png"
                        alt={member.name}
                        width={2800}
                        height={1867}
                        className="h-auto w-full"
                        style={{ 
                          objectFit: 'contain',
                          display: 'block',
                          pointerEvents: 'none'
                        }}
                        unoptimized
                      />
                      
                      {/* Текст поверх карточки */}
                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-center text-center"
                        style={{ 
                          pointerEvents: 'none',
                          color: '#8B4513',
                          fontFamily: 'serif',
                          paddingTop: 'clamp(2rem, 5vh, 4rem)',
                          paddingBottom: 'clamp(1.5rem, 4vh, 3.5rem)',
                          paddingLeft: 'clamp(2.2rem, 5.5vw, 4.5rem)',
                          paddingRight: 'clamp(2.2rem, 5.5vw, 4.5rem)',
                          overflow: 'hidden',
                          boxSizing: 'border-box'
                        }}
                      >
                        {/* Имя */}
                        <p 
                          style={{ 
                            fontSize: 'clamp(0.7rem, 1.3vw, 1.3rem)',
                            fontWeight: 'bold',
                            marginBottom: 'clamp(0.25rem, 0.6vw, 0.6rem)',
                            lineHeight: '1.2',
                            maxWidth: '90%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordWrap: 'break-word',
                            wordBreak: 'break-word',
                            hyphens: 'auto',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {member.name}
                        </p>
                        {/* Должность */}
                        <p 
                          style={{ 
                            fontSize: 'clamp(0.55rem, 1vw, 1rem)',
                            marginBottom: 'clamp(0.5rem, 1.2vw, 1.2rem)',
                            lineHeight: '1.3',
                            color: '#000000',
                            maxWidth: '85%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordWrap: 'break-word',
                            wordBreak: 'break-word',
                            hyphens: 'auto',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {member.position}
                        </p>
                        {/* Цитата */}
                        <p 
                          style={{ 
                            fontSize: 'clamp(0.6rem, 1vw, 0.95rem)',
                            lineHeight: '1.3',
                            maxWidth: 'clamp(160px, 22vw, 300px)',
                            fontStyle: 'italic',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordWrap: 'break-word',
                            wordBreak: 'break-word',
                            hyphens: 'auto',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            paddingLeft: '0.3rem',
                            paddingRight: '0.3rem'
                          }}
                        >
                          &ldquo;{member.quote}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            )}
            
            {/* Кнопки навигации Swiper - меньшие и тусклые на десктопе, яркие на мобильных */}
            {(!ssrIsIOS || mounted) && (
            <>
            <div 
              className="swiper-button-prev swiper-button-prev-team" 
              style={{ 
                color: '#FBC632',
                top: '50%',
                transform: 'translateY(-50%)',
                position: 'absolute',
                zIndex: 30,
                left: '-1rem'
              }}
            ></div>
            <div 
              className="swiper-button-next swiper-button-next-team" 
              style={{ 
                color: '#FBC632',
                top: '50%',
                transform: 'translateY(-50%)',
                position: 'absolute',
                zIndex: 30,
                right: '-1rem'
              }}
            ></div>
            </>
            )}
          </div>

          {/* Раздел "ОТЗЫВЫ" */}
          <div ref={reviewsSectionRef} className="w-full flex flex-col items-center mt-14 md:mt-16 lg:mt-20">
            <p 
              className="text-2xl md:text-3xl lg:text-4xl uppercase mb-2 md:mb-12"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                color: '#FBC632',
                filter: 'drop-shadow(0 0 7.5px rgba(231, 200, 132, 0.6))',
                textShadow: '0 0 15px rgba(231, 200, 132, 0.4), 0 0 30px rgba(231, 200, 132, 0.3)',
                letterSpacing: '0.1em',
                textAlign: 'center',
              }}
            >
              ОТЗЫВЫ
            </p>

            {/* Блок отзывов с каруселью Swiper */}
            <div className="relative w-full mt-2 md:mt-10 reviews-carousel-mobile-wrapper" style={{ padding: '1rem 0' }}>
              {ssrIsIOS && !mounted ? (
                <div className="grid grid-cols-1 gap-4" style={{ width: '100%' }}>
                  {reviews.slice(0, 1).map((review) => (
                    <div key={review.id} className="flex flex-col items-center">
                      <div className="relative review-card-mobile" style={{ width: '100%', maxWidth: 'clamp(550px, 42vw, 900px)' }}>
                        <Image
                          src="/backgrounds/sections/otzivi.png"
                          alt={`Отзыв от ${review.name}`}
                          width={900}
                          height={600}
                          className="h-auto w-full"
                          style={{ objectFit: 'contain', display: 'block' }}
                          unoptimized
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{
                          padding: 'clamp(1rem, 2vw, 2rem)',
                          zIndex: 1,
                          transform: 'translateY(-3%)',
                        }}>
                          <p style={{
                            fontFamily: "'Playfair Display SC', serif",
                            fontSize: 'clamp(0.875rem, 1.1vw, 1.1rem)',
                            color: '#682302',
                            fontWeight: 'bold',
                            marginBottom: 'clamp(0.25rem, 0.5vw, 0.5rem)',
                          }}>
                            {review.name}
                          </p>
                          <div className="flex justify-center gap-1" style={{ marginBottom: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                viewBox="0 0 24 24"
                                fill={index < review.rating ? '#682302' : 'none'}
                                stroke="#682302"
                                strokeWidth="2"
                                style={{ width: 'clamp(12px, 1vw, 16px)', height: 'clamp(12px, 1vw, 16px)' }}
                              >
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                              </svg>
                            ))}
                          </div>
                          <p style={{
                            fontFamily: "'Playfair Display SC', serif",
                            fontSize: 'clamp(0.55rem, 0.65vw, 0.7rem)',
                            color: '#1a1a1a',
                            lineHeight: '1.3',
                            maxWidth: 'clamp(140px, 12vw, 220px)',
                            margin: '0 auto',
                          }}>
                            {review.text}
                          </p>
                          <p style={{
                            fontFamily: "'Playfair Display SC', serif",
                            fontSize: 'clamp(0.65rem, 0.8vw, 0.8rem)',
                            color: '#8B7355',
                            fontStyle: 'italic',
                            marginTop: 'clamp(0.5rem, 0.75vw, 0.75rem)',
                          }}>
                            {review.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
              <Swiper
                modules={[Navigation]}
                speed={800}
                spaceBetween={0}
                loop={true}
                slidesPerView={4}
                slidesPerGroup={1}
                centeredSlides={false}
                grabCursor={true}
                navigation={{
                  nextEl: '.swiper-button-next-reviews',
                  prevEl: '.swiper-button-prev-reviews',
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
                        className="relative review-card-mobile"
                        style={{
                          width: '100%',
                          maxWidth: 'clamp(550px, 42vw, 900px)',
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
              )}
              
              {/* Кнопки навигации Swiper */}
              {(!ssrIsIOS || mounted) && (
              <>
              <div 
                className="swiper-button-prev swiper-button-prev-reviews" 
                style={{ 
                  color: '#FBC632',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  position: 'absolute',
                  zIndex: 30,
                  left: '-1rem',
                  width: 'clamp(2rem, 3vw, 3rem)',
                  height: 'clamp(2rem, 3vw, 3rem)'
                }}
              ></div>
              <div 
                className="swiper-button-next swiper-button-next-reviews" 
                style={{ 
                  color: '#FBC632',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  position: 'absolute',
                  zIndex: 30,
                  right: '-1rem',
                  width: 'clamp(2rem, 3vw, 3rem)',
                  height: 'clamp(2rem, 3vw, 3rem)'
                }}
              ></div>
              </>
              )}
            </div>
          </div>

          {/* Раздел "РАСПИСАНИЕ СПЕКТАКЛЕЙ" */}
          <div className="w-full flex flex-col items-center mt-20 md:mt-24 lg:mt-28">
            <p 
              className="text-2xl md:text-3xl lg:text-4xl uppercase text-center schedule-title-mobile"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                color: '#FBC632',
                filter: 'drop-shadow(0 0 7.5px rgba(231, 200, 132, 0.6))',
                textShadow: '0 0 15px rgba(231, 200, 132, 0.4), 0 0 30px rgba(231, 200, 132, 0.3)',
                letterSpacing: '0.1em',
              }}
            >
              РАСПИСАНИЕ СПЕКТАКЛЕЙ
            </p>
            <p 
              className="mt-4 text-base md:text-lg lg:text-xl uppercase text-center"
              style={{
                fontFamily: "'Playfair Display SC', serif",
                color: '#FFFFFF',
                letterSpacing: '0.05em',
                lineHeight: '1.3',
              }}
            >
              Где можно посмотреть
            </p>

            {/* Карусель расписания спектаклей */}
            <div className="relative w-full mt-10 schedule-carousel-wrapper" style={{ padding: '2rem clamp(2rem, 4vw, 3rem)', overflow: 'visible' }}>
              {ssrIsIOS && !mounted ? (
                <div className="grid grid-cols-1 gap-4" style={{ width: '100%' }}>
                  {scheduleItems.slice(0, 1).map((item) => (
                    <div key={item.id} className="flex flex-col items-stretch h-full" style={{ padding: '0 0.5rem' }}>
                      <div className="flex-1 rounded-xl border-2 border-[#FBC632] bg-[#682302] px-6 py-6" style={{ boxShadow: 'none' }}>
                        <div className="w-full h-full flex flex-col justify-between text-center space-y-4">
                          <p className="text-xl uppercase" style={{ fontFamily: "'Playfair Display SC', serif", color: '#FBC632' }}>
                            <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(24px, 2vw, 32px)' }}>12</span>
                            <span> стульев – {item.title.replace('12 стульев – ', '')}</span>
                          </p>
                          <p className="text-lg uppercase" style={{ fontFamily: "'Playfair Display SC', serif", color: '#FFFFFF' }}>
                            <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(20px, 1.75vw, 28px)' }}>{item.date.split(' ')[0]}</span>
                            <span> {item.date.split(' ')[1]} | </span>
                            <span style={{ fontFamily: "'Noto Serif Malayalam', serif", fontSize: 'clamp(20px, 1.75vw, 28px)' }}>{item.time}</span>
                          </p>
                          <p className="text-sm uppercase" style={{ fontFamily: "'Playfair Display SC', serif", color: '#FFFFFF' }}>
                            {item.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
              <Swiper
                modules={[Navigation]}
                speed={800}
                spaceBetween={0}
                loop={true}
                slidesPerView={2}
                slidesPerGroup={1}
                centeredSlides={false}
                grabCursor={true}
                navigation={{
                  nextEl: '.swiper-button-next-schedule',
                  prevEl: '.swiper-button-prev-schedule',
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                }}
                className="schedule-carousel"
              >
                {scheduleItems.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div
                      className="flex flex-col items-stretch h-full"
                      style={{
                        padding: '0 0.5rem',
                        width: '100%',
                        maxWidth: '100%'
                      }}
                    >
                        <div
                          className="flex-1 rounded-xl border-2 border-[#FBC632] bg-[#682302] px-6 py-6 md:px-10 md:py-8"
                          style={{
                            boxShadow: 'none',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            width: '100%',
                            maxWidth: '100%',
                            minWidth: 0
                          }}
                        >
                        <div className="w-full h-full flex flex-col justify-between text-center space-y-4 md:space-y-6" style={{ width: '100%', maxWidth: '100%', minWidth: 0 }}>
                          <p
                            className="text-xl md:text-2xl lg:text-3xl uppercase"
                            style={{
                              fontFamily: "'Playfair Display SC', serif",
                              color: '#FBC632',
                              letterSpacing: '0.08em',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'Noto Serif Malayalam', serif",
                                fontSize: 'clamp(24px, 2vw, 32px)',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: 0,
                              }}
                            >
                              12
                            </span>
                            <span> стульев – {item.title.replace('12 стульев – ', '')}</span>
                          </p>
                          <p
                            className="text-lg md:text-xl lg:text-2xl uppercase"
                            style={{
                              fontFamily: "'Playfair Display SC', serif",
                              color: '#FFFFFF',
                              letterSpacing: '0.08em',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'Noto Serif Malayalam', serif",
                                fontSize: 'clamp(20px, 1.75vw, 28px)',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: 0,
                              }}
                            >
                              {item.date.split(' ')[0]}
                            </span>
                            <span> {item.date.split(' ')[1]} | </span>
                            <span
                              style={{
                                fontFamily: "'Noto Serif Malayalam', serif",
                                fontSize: 'clamp(20px, 1.75vw, 28px)',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: 0,
                              }}
                            >
                              {item.time}
                            </span>
                          </p>
                          <p
                            className="text-sm md:text-base lg:text-lg uppercase"
                            style={{
                              fontFamily: "'Playfair Display SC', serif",
                              color: '#FFFFFF',
                              letterSpacing: '0.05em',
                              wordWrap: 'break-word',
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word',
                              hyphens: 'auto',
                              maxWidth: '100%',
                              lineHeight: '1.4',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {item.location}
                            {item.address && (
                              <>
                                &nbsp;
                                <span
                                  style={{
                                    fontFamily: "'Noto Serif Malayalam', serif",
                                    fontSize: 'clamp(18px, 1.5vw, 24px)',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    letterSpacing: 0,
                                  }}
                                >
                                  {item.address}
                                </span>
                              </>
                            )}
                          </p>

                          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                try {
                                  router.push(`/details/${item.id}`);
                                } catch (error) {
                                  console.error('Navigation error:', error);
                                  // Fallback на window.location для мобильных
                                  if (typeof window !== 'undefined') {
                                    window.location.href = `/details/${item.id}`;
                                  }
                                }
                              }}
                              className="px-10 md:px-12 py-2 rounded-md border-2 transition-all duration-300 hover:scale-105 cursor-pointer schedule-details-button-mobile"
                              style={{
                                fontFamily: "'Playfair Display SC', serif",
                                fontSize: 'clamp(14px, 1vw, 16px)',
                                letterSpacing: '0.05em',
                                color: '#FBC632',
                                backgroundColor: 'transparent',
                                borderColor: '#FBC632',
                                boxShadow: '0 0 10px rgba(251, 198, 50, 0.35), 0 0 20px rgba(251, 198, 50, 0.2)',
                                whiteSpace: 'nowrap',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                              }}
                            >
                              Подробнее
                            </button>
                            <button
                              onClick={() => handleBuyTicket(item.buyTicketUrl)}
                              className="px-16 md:px-20 py-2 rounded-md border-2 transition-all duration-300 hover:scale-105"
                              style={{
                                fontFamily: "'Playfair Display SC', serif",
                                fontSize: 'clamp(14px, 1vw, 16px)',
                                letterSpacing: '0.05em',
                                color: '#682302',
                                backgroundColor: '#FBC632',
                                borderColor: '#FBC632',
                                boxShadow: '0 0 12px rgba(251, 198, 50, 0.4), 0 0 22px rgba(251, 198, 50, 0.2)',
                                whiteSpace: 'nowrap',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                              }}
                              disabled={!item.buyTicketUrl}
                            >
                              Купить билет
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              )}
              
              {/* Кнопки навигации Swiper */}
              {(!ssrIsIOS || mounted) && (
              <>
              <div 
                className="swiper-button-prev swiper-button-prev-schedule schedule-nav-arrow-mobile" 
                style={{ 
                  color: '#FBC632',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  position: 'absolute',
                  zIndex: 30,
                  width: 'clamp(2rem, 3vw, 3rem)',
                  height: 'clamp(2rem, 3vw, 3rem)'
                }}
              ></div>
              <div 
                className="swiper-button-next swiper-button-next-schedule schedule-nav-arrow-mobile" 
                style={{ 
                  color: '#FBC632',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  position: 'absolute',
                  zIndex: 30,
                  width: 'clamp(2rem, 3vw, 3rem)',
                  height: 'clamp(2rem, 3vw, 3rem)'
                }}
              ></div>
              </>
              )}
            </div>

            {/* Кнопка "ПОСМОТРЕТЬ РАСПИСАНИЕ" под карточками расписания */}
            <div className="w-full max-w-7xl mt-8 md:mt-10 flex justify-center">
              <button
                onClick={onViewSchedule}
                className="px-28 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Playfair Display SC', serif",
                  fontSize: 'clamp(16px, 1.125vw, 18px)',
                  letterSpacing: '1px',
                  color: 'white',
                  backgroundColor: '#682302',
                  borderColor: '#FBC632',
                  borderWidth: '3px',
                  boxShadow: '0 0 15px rgba(251, 198, 50, 0.4)',
                  whiteSpace: 'nowrap',
                  padding: 'clamp(0.5rem, 0.75vw, 0.625rem) clamp(5rem, 8vw, 7rem)'
                }}
              >
                ПОСМОТРЕТЬ РАСПИСАНИЕ
              </button>
            </div>
          </div>

          {/* Раздел "Контакты и партнёры" */}
          <div ref={contactsSectionRef} className="w-full flex flex-col items-center mt-32 md:mt-40 lg:mt-48" style={{ width: '100%', padding: '0 clamp(1rem, 4vw, 4rem)' }}>
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
              <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8 lg:gap-12">
                {/* Левая колонка — контакты */}
                <div className="flex-1 text-center md:text-left space-y-2 contacts-info-mobile" style={{ 
                  marginLeft: 'clamp(-4rem, -6vw, -2rem)', 
                  paddingLeft: 'clamp(1rem, 3vw, 2rem)',
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
                      href="mailto:info@12stulyev-theater.ru"
                      style={{ color: '#FBC632', textDecoration: 'underline' }}
                    >
                      info@12stulyev-theater.ru
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
                      href="tel:+74951234567"
                      style={{ color: '#FBC632', textDecoration: 'underline' }}
                    >
                      +7 (495) 123-45-67
                    </a>
                  </p>
                </div>

                {/* Центральная колонка — логотип */}
                <div className="flex-1 flex flex-col items-center justify-center contacts-logo-mobile" style={{ 
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
                  marginRight: 'clamp(-4rem, -6vw, -2rem)', 
                  paddingRight: 'clamp(1rem, 3vw, 2rem)',
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
                      className="mt-2 rounded-lg border-2 transition-all duration-300 hover:scale-105"
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
              <div className="mt-10 text-center space-y-1 pb-4 md:pb-6" style={{ width: '100%' }}>
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
        </div>
      </div>

      {/* Модальное окно с виджетом intickets для покупки билетов */}
      {isModalOpen && selectedScheduleUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)'
          }}
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden"
            style={{
              width: '90vw',
              height: '85vh',
              maxWidth: '1200px',
              maxHeight: '800px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[10000] bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Iframe с виджетом intickets */}
            <iframe
              key={`schedule-ticket-${selectedScheduleUrl}`}
              src={selectedScheduleUrl}
              className="w-full h-full border-0"
              style={{
                minHeight: '600px'
              }}
              allow="payment"
              title="Покупка билетов"
            />
          </div>
        </div>
      )}
    </section>
  );
}

