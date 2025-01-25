"use client";

import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { Box } from "@mui/material";

import { pxToRem } from "src/theme/styles";

import { AnimatedShape } from 'src/components/animated-shape';
import { Iconify } from 'src/components/iconify';
import { SectionDescription } from "src/components/section-description";
import { SectionTitle } from "src/components/section-title";
import { SectionTopText } from "src/components/section-toptext";
import { SliderWrapper } from "src/components/slider/slider-wrapper";

import { RoundedButton } from 'src/components/button/rounded-button';
import { OngoingProjectCard } from './ongoing-project-card';

export const OngoingProjects = () => {
    return (
        <Box sx={{
            minHeight: pxToRem(300),
            py: { xs: pxToRem(40), md: pxToRem(120) },
            px: { xs: pxToRem(15), md: pxToRem(0) },
            position: "relative",
        }}>
            <AnimatedShape
                animationType="spin"
                size={{ width: 100, height: 100 }}
                duration={16}
                sx={{
                    position: "absolute",
                    top: 20,
                    left: 0,
                    m: 4,
                    display: { xs: "none", md: "block" }
                }}
            >
                <Box
                    component="img"
                    src="\assets\core\shape_2.png"
                    alt="animated shape"
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </AnimatedShape>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: { xs: pxToRem(20), md: pxToRem(50) },
                }}
            >
                <SectionTopText sx={{
                    color: "text.primary",
                    dividerSx: { mx: "auto" }
                }}>
                    Best Proejct
                </SectionTopText>
                <SectionTitle sx={{
                    color: 'text.secondary',
                }}>
                    Ongoing Projects
                </SectionTitle>

                <SectionDescription
                    sx={{
                        color: 'text.secondary',
                        marginTop: pxToRem(10),
                        fontSize: { xs: pxToRem(16), sm: pxToRem(18), md: pxToRem(20) },
                        maxWidth: { xs: "100%", md: "50%" },
                        textAlign: "center"
                    }}>
                    Quis nulla blandit vulputate morbi adipiscing sem vestibulum. Nulla turpis integer dui sed posuere sem. Id molestie mi arcu gravida lorem potenti.
                </SectionDescription>
                <RoundedButton
                    endIcon={<Iconify width={22} icon="guidance:left-2-short-arrow" />}
                    variant='contained'
                    sx={{ mt: 4 }}
                    handleClick={() => console.log('clicked')}
                >
                    Browse All Project
                </RoundedButton>
            </Box>
            {/* sliders */}
            <Box>
                <SliderWrapper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    autoplay={{ delay: 5000, disableOnInteraction: true }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    speed={2000}
                >
                    <SwiperSlide>
                        <OngoingProjectCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <OngoingProjectCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <OngoingProjectCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <OngoingProjectCard />
                    </SwiperSlide>
                </SliderWrapper>
            </Box>

            <AnimatedShape
                animationType="topToBottom"
                size={{ width: 100, height: 100 }}
                duration={3}
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 20,
                    m: 4,
                    display: { xs: "none", md: "block" }
                }}
            >
                <Box
                    component="img"
                    src="\assets\core\shape_1.png"
                    alt="animated shape"
                />
            </AnimatedShape>
        </Box>
    )
};