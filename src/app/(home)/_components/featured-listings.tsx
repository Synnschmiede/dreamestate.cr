"use client"

// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Scrollbar, Navigation, Pagination } from 'swiper/modules';

import { Box } from '@mui/material';

export const FeaturedListings = () => {
    return (
        <Box>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        </Box>
    );
};