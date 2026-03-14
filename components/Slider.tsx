
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps {
  items: {
    id: string;
    image: string;
    title?: string;
    subtitle?: string;
    ctaLabel?: string;
    onCtaClick?: () => void;
  }[];
  height?: string;
  interval?: number;
  showOverlay?: boolean;
}

export const Slider: React.FC<SliderProps> = ({ 
  items, 
  height = "h-[500px]", 
  interval = 10000,
  showOverlay = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [nextSlide, interval]);

  if (!items || items.length === 0) return null;

  return (
<div className={`relative w-full overflow-hidden group ${height} sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]}`}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={item.image}
            alt={item.title || "Slide"}
            className="w-full h-full object-cover"
          />
          {showOverlay && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6 text-white">
              {item.title && (
<h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 animate-fadeInDown">
                  {item.title}
                </h2>
              )}
              {item.subtitle && (
<p className="text-sm md:text-base lg:text-lg max-w-2xl mb-8 opacity-90">
                  {item.subtitle}
                </p>
              )}
              {item.ctaLabel && (
<button
  onClick={item.onCtaClick}
  className="bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-2 px-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg sm:py-3 sm:px-8"
>
                  {item.ctaLabel}
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Controls */}
<button
  onClick={prevSlide}
  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-[#F97316] p-1.5 rounded-full backdrop-blur-sm transition-colors text-white sm:left-4 sm:p-2 hidden group-hover:block"
>
        <ChevronLeft size={32} />
      </button>
<button
  onClick={nextSlide}
  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-[#F97316] p-1.5 rounded-full backdrop-blur-sm transition-colors text-white sm:right-4 sm:p-2 hidden group-hover:block"
>
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
<div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1 sm:space-x-2">
        {items.map((_, index) => (
<button
  key={index}
  onClick={() => setCurrentIndex(index)}
  className={`w-2 h-2 rounded-full transition-all sm:w-3 sm:h-3 ${
    index === currentIndex ? 'bg-[#F97316] w-6 sm:w-8' : 'bg-white/50'
  }`}
/>
        ))}
      </div>
    </div>
  );
};
