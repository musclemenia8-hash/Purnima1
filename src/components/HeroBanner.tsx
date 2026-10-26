import React, { useState, useEffect, useCallback } from 'react';
import { useShop } from '../context/ShopContext';
import { HERO_SLIDES } from '../data/products';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { language, setCurrentView, setSelectedCategory } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleCta = (category: 'Necklaces' | 'Earrings' | 'Pendants & Chains') => {
    setSelectedCategory(category);
    setCurrentView('category');
  };

  return (
    <section
      className="relative w-full bg-[#1C1917] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Jewellery Campaign Carousel"
    >
      {/* Slides Container */}
      <div className="relative h-[480px] sm:h-[560px] md:h-[620px] lg:h-[680px] w-full">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Campaign Image with Scrim */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center scale-100 transition-transform duration-7000 ease-out"
                style={{
                  transform: isActive ? 'scale(1.03)' : 'scale(1.0)',
                }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Scrim Overlay for Contrast & Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20 md:bg-gradient-to-r md:from-black/75 md:via-black/35 md:to-transparent" />

              {/* Slide Content Box */}
              <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-end md:justify-center pb-14 md:pb-0">
                <div className="max-w-xl text-white">
                  <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#F4E8EC] font-semibold mb-3 border-b border-[#B96F88]/60 pb-1">
                    {language === 'hi' ? 'विशेष हस्तनिर्मित आभूषण' : 'Official Campaign Series'}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-tight font-normal text-white mb-3 text-balance">
                    {language === 'hi' ? slide.titleHi : slide.title}
                  </h1>
                  <p className="text-sm sm:text-base text-[#FAF7F5]/85 font-light mb-6 leading-relaxed max-w-md">
                    {language === 'hi' ? slide.subtitleHi : slide.subtitle}
                  </p>
                  <div>
                    <button
                      onClick={() => handleCta(slide.category)}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#A95372] hover:bg-[#933E5D] text-white text-xs sm:text-sm tracking-wider uppercase font-medium rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>{language === 'hi' ? slide.ctaTextHi : slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center gap-3">
        {/* Indicators */}
        <div className="flex items-center gap-2 mr-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? 'w-8 bg-[#FAF7F5]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs p-1 rounded-full border border-white/20">
          <button
            onClick={prevSlide}
            className="p-2 text-white hover:text-[#FAF7F5] hover:bg-white/10 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 text-white hover:text-[#FAF7F5] hover:bg-white/10 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
