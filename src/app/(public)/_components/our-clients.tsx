"use client"

import { SwiperSlide } from 'swiper/react';
import { A11y, Scrollbar, Navigation, Pagination } from 'swiper/modules';

import { Box, useTheme , Container } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { SliderWrapper } from 'src/components/slider/slider-wrapper';



export const OurClients = () => {
    const theme = useTheme();
    const logos = [
        "/assets/home/brand_white_1.png",
        "/assets/home/brand_white_2.png",
        "/assets/home/brand_white_3.png",
        "/assets/home/brand_white_4.png",
        "/assets/home/brand_white_5.png",
        "/assets/home/brand_white_6.png",
        "/assets/home/brand_white_3.png",
    ];
    return (
        <Box
            sx={{
                // background: theme.palette.custom.dark_bg,
                backgroundColor: "#1C2D37",
                width: '100%',
                paddingY: { xs: pxToRem(40), md: pxToRem(120) },
            }}
        >
            <Container maxWidth="xl">
                <SliderWrapper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 6 },
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
                                    maxHeight: 120,
                                    objectFit: "contain",
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
                
            </Container>
        </Box>
    );
};



