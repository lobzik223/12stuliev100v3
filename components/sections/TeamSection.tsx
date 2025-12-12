'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { teamMembers } from '../../data/team';

export default function TeamSection() {
  return (
    <section 
      className="relative w-full"
      style={{
        backgroundImage: 'url(/backgrounds/sections/section-4.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: 'clamp(4rem, 8vh, 6rem) 4%'
      }}
    >
      <div className="w-full max-w-[120rem] mx-auto">
        <p 
          className="text-center mb-10 uppercase"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)',
            color: '#FBC632',
            filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
            textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
            letterSpacing: '0.1em'
          }}
        >
          Команда
        </p>

        {/* Блок команды с каруселью Swiper */}
        <div className="relative w-full mt-10" style={{ padding: '2rem 0' }}>
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
              nextEl: '.swiper-button-next-team-section',
              prevEl: '.swiper-button-prev-team-section',
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
            className="team-section-carousel"
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
                    className="relative"
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
          
          {/* Кнопки навигации Swiper - меньшие и тусклые */}
          <div 
            className="swiper-button-prev swiper-button-prev-team-section" 
            style={{ 
              color: '#FBC632',
              top: '50%',
              transform: 'translateY(-50%)',
              position: 'absolute',
              zIndex: 30,
              left: '-1rem',
              width: 'clamp(1.5rem, 2vw, 2rem)',
              height: 'clamp(1.5rem, 2vw, 2rem)',
              opacity: 0.5
            }}
          ></div>
          <div 
            className="swiper-button-next swiper-button-next-team-section" 
            style={{ 
              color: '#FBC632',
              top: '50%',
              transform: 'translateY(-50%)',
              position: 'absolute',
              zIndex: 30,
              right: '-1rem',
              width: 'clamp(1.5rem, 2vw, 2rem)',
              height: 'clamp(1.5rem, 2vw, 2rem)',
              opacity: 0.5
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}

