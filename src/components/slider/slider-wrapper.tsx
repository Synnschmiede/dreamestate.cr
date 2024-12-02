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
}

export const SliderWrapper: React.FC<SliderWrapperProps> = ({
    children,
    loop = true,
    autoplay = { delay: 3000, disableOnInteraction: false },
    spaceBetween = 50,
    slidesPerView = 3,
    navigation = false,
    ...restProps }) => {
    return (
        <Box>
            <Swiper
                loop={loop}
                autoplay={autoplay}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                navigation={navigation}
                {...restProps}
            >
                {children}
            </Swiper>
        </Box>
    )
}