'use client';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import { SliderWrapper } from 'src/components/slider/slider-wrapper';
import { A11y, Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import { SwiperClass, SwiperSlide } from 'swiper/react';

export const PropertyDetailsImageCarousel = ({ images }: { images: string[] }) => {
  const swiperRef = React.useRef<SwiperClass | null>(null);

  const handleSwiper = (swiper: any) => {
    swiperRef.current = swiper;
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        '& .swiper-pagination-bullet-active': {
          backgroundColor: 'primary.main',
        },
      }}
    >
      {/* Left Arrow */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 10,
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '10%',
          color: '#fff',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'primary.main' },
        }}
      >
        <Iconify icon="ep:arrow-left-bold" />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 10,
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '10%',
          color: '#fff',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'primary.main' },
        }}
      >
        <Iconify icon="ep:arrow-right-bold" />
      </IconButton>
      <SliderWrapper
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        speed={2000}
        onSwiper={handleSwiper}
        pagination={{ clickable: true }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${image}`}
              alt={image}
              borderRadius={0.5}
              sx={{
                width: '100%',
                height: '100%',
                display: 'block',
                margin: '0 auto',
                maxHeight: 560,
                objectFit: 'cover',
                borderRadius: 0.5,
              }}
            />
          </SwiperSlide>
        ))}
      </SliderWrapper>
    </Box>
  );
};
