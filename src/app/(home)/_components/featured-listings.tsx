"use client"

import { SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Scrollbar, Navigation, Pagination } from 'swiper/modules';

import { Box } from '@mui/material';

import { SliderWrapper } from 'src/components/slider/slider-wrapper';

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
        <SliderWrapper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            breakpoints={{
                0: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
            }}
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
        </SliderWrapper>
    );
};