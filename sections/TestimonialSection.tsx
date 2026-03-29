'use client'

import { TestimonialCard } from "@/components/cards";
import { MaxWidthWrapper, SectionWrapper } from '@/components/layout';
import { SectionHeader } from "@/components/shared";
import { testimonials } from "@/data";
import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // 1. Responsive Items Per View Logic
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerView);

  // 2. Navigation Logic
  const paginate = useCallback((newIndex: number) => {
    const validatedIndex = (newIndex + totalPages) % totalPages;
    setCurrentIndex(validatedIndex);
  }, [totalPages]);

  // 3. 5-Second Auto-Timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => paginate(currentIndex + 1), 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, paginate]);

  // 4. Drag Handler (Swipe Logic)
  const onDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      paginate(currentIndex + 1);
    } else if (info.offset.x > swipeThreshold) {
      paginate(currentIndex - 1);
    }
  };

  // Responsive indicator widths
  const getIndicatorWidth = (isActive: boolean) => {
    if (windowWidth === 0) return isActive ? '64px' : '32px';
    
    if (windowWidth < 640) {
      return isActive ? '32px' : '20px';
    } else if (windowWidth < 768) {
      return isActive ? '40px' : '24px';
    } else if (windowWidth < 1024) {
      return isActive ? '56px' : '28px';
    } else {
      return isActive ? '64px' : '32px';
    }
  };

  const getIndicatorHeight = () => {
    if (windowWidth === 0) return 'h-2';
    
    if (windowWidth < 640) {
      return 'h-1';
    } else if (windowWidth < 768) {
      return 'h-1.5';
    } else {
      return 'h-2';
    }
  };

  // Get gap between cards based on screen size
  const getCardGap = () => {
    if (windowWidth === 0) return 24;
    return windowWidth < 640 ? 16 : 24;
  };

  return (
    <SectionWrapper fullHeight variant="light" id="testimonials" className="py-24 select-none overflow-hidden">
      <MaxWidthWrapper className="flex flex-col items-center">
        <SectionHeader
          eyebrow="Testimonial"
          heading="What People Says About us"
          accentWord="Says"
          description="We are a digital agency that specializes in web design and SEO. Our team delivers customized solutions."
          align="center"
        />

        <div 
          className="w-full mt-24 relative overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={containerRef}
        >
          <motion.div
            className="flex w-full pb-8"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div 
                key={pageIndex} 
                className="flex shrink-0 w-full gap-4 sm:gap-6 px-2 sm:px-4"
              >
                {testimonials
                  .slice(pageIndex * itemsPerView, pageIndex * itemsPerView + itemsPerView)
                  .map((t) => {
                    const cardGap = getCardGap();
                    return (
                      <div 
                        key={t.id} 
                        className="w-full"
                        style={{ 
                          flex: `0 0 calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * cardGap / itemsPerView}px)` 
                        }}
                      >
                        <TestimonialCard testimonial={t} />
                      </div>
                    );
                  })}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Responsive Segmented Indicators */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mt-12 sm:mt-16">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`group relative rounded-full overflow-hidden bg-primary/10 transition-all duration-500 ${getIndicatorHeight()}`}
              style={{ 
                width: getIndicatorWidth(currentIndex === i)
              }}
            >
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: currentIndex === i ? 1 : 0 }}
                transition={{ 
                  duration: currentIndex === i ? 5 : 0.2, 
                  ease: "linear" 
                }}
              />
            </button>
          ))}
        </div>
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}