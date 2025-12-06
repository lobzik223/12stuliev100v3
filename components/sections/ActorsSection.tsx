'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { actors } from '../../data/actors';

export default function ActorsSection() {

  return (
    <section 
      className="relative w-full"
      style={{
        minHeight: '100vh',
        padding: '0 4% clamp(4rem, 8vh, 6rem) 4%',
        marginTop: 'clamp(-7rem, -12vh, -6rem)',
        zIndex: 20,
        position: 'relative'
      }}
    >
      <div className="w-full max-w-[120rem] mx-auto">
        {/* Заголовок "Актеры" */}
        <div className="text-center mb-12">
          <p
            className="uppercase mb-4"
            style={{
              fontFamily: "'Playfair Display SC', serif",
              fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)',
              color: '#FBC632',
              filter: 'drop-shadow(0 0 0.46875rem rgba(231, 200, 132, 0.6))',
              textShadow: '0 0 0.9375rem rgba(231, 200, 132, 0.4), 0 0 1.875rem rgba(231, 200, 132, 0.3)',
              letterSpacing: '0.1em'
            }}
          >
            АКТЕРЫ
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
              lineHeight: '1.3'
            }}
          >
            ТАЛАНТЛИВЫЕ АКТЁРЫ, КОТОРЫЕ ВОПЛОЩАЮТ НА СЦЕНЕ<br />
            КЛАССИЧЕСКИХ ПЕРСОНАЖЕЙ
          </p>
        </div>

        {/* Карусель актеров Swiper */}
        <div className="relative w-full" style={{ minHeight: '600px', padding: '2rem 0' }}>
          <Swiper
            modules={[Navigation]}
            speed={800}
            spaceBetween={40}
            loop={true}
            slidesPerView={3}
            slidesPerGroup={1}
            centeredSlides={true}
            grabCursor={true}
            navigation={{
              nextEl: '.swiper-button-next-actors',
              prevEl: '.swiper-button-prev-actors',
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="actors-carousel"
          >
            {actors.map((actor, index) => {
              return (
                <SwiperSlide key={actor.id}>
                  <div className="flex flex-col items-center w-full actor-slide-content">
                      {/* Фото актера */}
              <div 
                        className="relative w-full rounded-lg overflow-hidden actor-card-image"
                style={{
                  maxWidth: 'clamp(15.625rem, 20vw, 18.75rem)',
                  aspectRatio: '3/5',
                  border: '3px solid #D9D9D9',
                  boxShadow: '0 0 1.5625rem rgba(217, 217, 217, 0.6), inset 0 0 0.625rem rgba(217, 217, 217, 0.2)'
                }}
              >
                        <div className="w-full h-full bg-gray-900">
                          {actor.image && (
                            <img 
                              src={actor.image} 
                              alt={actor.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          )}
                        </div>
              </div>
                      
                      {/* Линия под фото */}
              <div 
                        className="w-full relative -mt-0.5 actor-card-line"
                style={{
                  maxWidth: 'clamp(21.25rem, 27vw, 27.5rem)',
                  height: '2px',
                  backgroundColor: '#D9D9D9',
                  boxShadow: '0 0 0.625rem rgba(217, 217, 217, 0.6)'
                }}
              />
                      
                      {/* Имя и роль */}
                      <div className="text-center mt-3 actor-card-text" style={{ maxWidth: 'clamp(15.625rem, 20vw, 18.75rem)' }}>
                <p 
                          className="mb-1 actor-card-name"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
                    color: '#FBC632',
                    fontWeight: 'normal',
                    letterSpacing: '0.05em',
                    filter: 'drop-shadow(0 0 0.46875rem rgba(251, 198, 50, 0.6))',
                    textShadow: '0 0 0.9375rem rgba(251, 198, 50, 0.4), 0 0 1.875rem rgba(251, 198, 50, 0.3)'
                  }}
                >
                          {actor.fullName ? (
                            <>
                              {actor.name}<br />
                              {actor.fullName}
                            </>
                          ) : (
                            actor.name
                          )}
                </p>
                <p 
                          className="actor-card-role"
                  style={{
                    fontFamily: "'Playfair Display SC', serif",
                    fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                    color: '#D9D9D9',
                    letterSpacing: '0.05em'
                  }}
                >
                          {actor.role}
                </p>
              </div>
            </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          
          {/* Кнопки навигации Swiper */}
          <div 
            className="swiper-button-prev swiper-button-prev-actors" 
                  style={{
                    color: '#FBC632',
              top: '38%',
              left: '2rem',
              transform: 'translateY(-50%)',
              position: 'absolute',
              zIndex: 30
                  }}
          ></div>
          <div 
            className="swiper-button-next swiper-button-next-actors" 
                  style={{
                    color: '#FBC632',
              top: '38%',
              right: '2rem',
              transform: 'translateY(-50%)',
              position: 'absolute',
              zIndex: 30
                  }}
          ></div>
        </div>
      </div>
    </section>
  );
}

