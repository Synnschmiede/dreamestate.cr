"use client"

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Scrollbar, Navigation, Pagination } from 'swiper/modules';

import { Box } from '@mui/material';

export const FeaturedListings = () => {
    const logos = [
        "/assets/home/brand_1.svg",
        "/assets/home/brand_2.svg",
        "/assets/home/brand_3.svg",
        "/assets/home/brand_4.svg",
        "/assets/home/brand_5.svg",
        "/assets/home/brand_6.svg",
    ];
    return (
        <Box>
            <Swiper
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={5}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {logos.map((logo, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            component="img"
                            src={logo}
                            alt={`Brand ${index + 1}`}
                            sx={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                margin: "0 auto",
                                maxHeight: 60,
                                objectFit: "contain",
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};