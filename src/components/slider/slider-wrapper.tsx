"use client"

import type { ReactNode } from "react";
import type { SwiperProps } from "swiper/react";

import "swiper/css";
import React from "react";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper } from "swiper/react";

import { Box } from "@mui/material";

interface SliderWrapperProps extends SwiperProps {
    children: ReactNode;
    loop?: boolean;
    autoplay?: { delay: number; disableOnInteraction: boolean } | boolean;
    pauseOnHover?: boolean;
}

export const SliderWrapper: React.FC<SliderWrapperProps> = ({
    children,
    loop = true,
    autoplay = { delay: 3000, disableOnInteraction: false },
    spaceBetween = 50,
    slidesPerView = 3,
    navigation = false,
    pauseOnHover = false,
    ...restProps }) => {
    const swiperRef = React.useRef<any>(null);

    const handleMouseEnter = () => {
        if (pauseOnHover) {
            swiperRef.current?.autoplay.stop();
        }
    };

    const handleMouseLeave = () => {
        if (pauseOnHover) {
            swiperRef.current?.autoplay.start();
        }
    };

    const handleSwiper = (swiper: any) => {
        swiperRef.current = swiper;
    };
    
    return (
        <Box
            sx={{ overflow: "hidden" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Swiper
                loop={loop}
                autoplay={autoplay}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                navigation={navigation}
                onSwiper={handleSwiper}
                {...restProps}
            >
                {children}
            </Swiper>
        </Box>
    )
}