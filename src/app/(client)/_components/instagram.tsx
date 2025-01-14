'use client';

import type { Swiper as SwiperClass } from 'swiper';

import React from 'react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { Box } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { SliderWrapper } from 'src/components/slider/slider-wrapper';

import { TestimonialCard } from './testimonial-card';
import { InstagramCard } from './instagram-card';

export const InstagramSection = () => {
  const swiperRef = React.useRef<SwiperClass | null>(null);

  const handleSwiper = (swiper: any) => {
    swiperRef.current = swiper;
  };

  return (
    <Box
      sx={{
        background: (theme) => theme.palette.custom.darker_bg,
        paddingY: { xs: pxToRem(40), md: pxToRem(120) },
        paddingX: { xs: pxToRem(15), md: pxToRem(0) },
      }}
    >
      <SliderWrapper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        speed={2000}
        onSwiper={handleSwiper}
      >
        <SwiperSlide>
          <InstagramCard />
        </SwiperSlide>
        <SwiperSlide>
          <InstagramCard />
        </SwiperSlide>
        <SwiperSlide>
          <InstagramCard />
        </SwiperSlide>
        <SwiperSlide>
          <InstagramCard />
        </SwiperSlide>
        <SwiperSlide>
          <InstagramCard />
        </SwiperSlide>
        <SwiperSlide>
          <InstagramCard />
        </SwiperSlide>
      </SliderWrapper>
    </Box>
  );
};
