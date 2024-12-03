"use client"

import { Box, Grid, Container, Typography } from "@mui/material";

import { pxToRem } from "src/theme/styles";

import { Iconify } from "src/components/iconify";
import { SectionTitle } from "src/components/section-title";
import { RoundedButton } from "src/components/rounded-button";
import { AnimatedShape } from "src/components/animated-shape";
import { SectionTopText } from "src/components/section-toptext";
import { SectionDescription } from "src/components/section-description";

import { IconWithText } from "./icon-with-text";

export const AboutUs = () => {
    return (
        <Box
            sx={{
                background: "#A4B5BA",
                minHeight: pxToRem(300),
                pt: { xs: pxToRem(100), md: pxToRem(200) },
                pb: { xs: pxToRem(40), md: pxToRem(80) },
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={0} alignItems="center" >
                    {/* Left Section */}
                    <Grid item xs={12} md={6} pr={4}>
                        <SectionTopText sx={{
                            color: "text.primary",
                        }}>
                            About us
                        </SectionTopText>
                        <SectionTitle sx={{
                            color: 'text.secondary',
                        }}>
                            We Are Simply What You Haven’t Imagined Yet.
                        </SectionTitle>

                        <SectionDescription
                            sx={{
                                color: 'text.secondary',
                                marginTop: pxToRem(10),
                                fontSize: { xs: pxToRem(16), sm: pxToRem(18), md: pxToRem(20) },
                            }}>
                            Though we have a great deal of commercial expertise under our belt, our firm is primarily focused on high-end residential projects. As a distinct reaction to the customer and the environment, each of our projects takes shape.
                        </SectionDescription>

                        <Grid container spacing={2} sx={{ marginTop: pxToRem(10) }}>
                            <Grid item xs={12} md={6}>
                                <IconWithText
                                    icon="prime:check-circle"
                                    text="Quality real estate services"
                                    iconSize={24}
                                    sx={{ color: "text.secondary", fontSize: 20 }}
                                />
                                <IconWithText
                                    icon="prime:check-circle"
                                    text="100% Satisfaction guarantee"
                                    iconSize={24}
                                    sx={{ color: "text.secondary", fontSize: 20 }}
                                />
                                <IconWithText
                                    icon="prime:check-circle"
                                    text="Highly professional team"
                                    iconSize={24}
                                    sx={{ color: "text.secondary", fontSize: 20 }}
                                />
                                <IconWithText
                                    icon="prime:check-circle"
                                    text="Dealing always on time"
                                    iconSize={24}
                                    sx={{ color: "text.secondary", fontSize: 20 }}
                                />
                                <RoundedButton
                                    endIcon={<Iconify width={22} icon="guidance:left-2-short-arrow" />}
                                    variant='contained'
                                    sx={{mt: 4}}
                                >
                                    More About Dreamesate
                                </RoundedButton>
                            </Grid>

                            <Grid item xs={12} md={6}
                                sx={{ borderLeft: "1px solid var(--light_bg)" }}>
                                <Iconify
                                    icon="material-symbols-light:phone-in-talk-outline"
                                    width={44}
                                    sx={{
                                        color: "white",
                                        backgroundColor: "text.secondary",
                                        borderRadius: "50%",
                                        padding: 1,
                                    }}
                                />
                                <Typography variant="h6" sx={{ color: "text.secondary" }} mt={1}>Call Us 24/7</Typography>
                                <Typography
                                    variant="h3"
                                    color="text.secondary"
                                >
                                    +01 234 56789
                                </Typography>
                            </Grid>
                            <AnimatedShape
                                shape="\assets\core\shape_1.png"
                                animationType="topToBottom"
                                parentSize={{ width: 400, height: 100 }}
                            />
                        </Grid>
                    </Grid>
                    {/* Right Section */}
                    <Grid item xs={12} md={6} mt={{ xs: pxToRem(20), md: 0 }}>
                        <Box
                            component="img"
                            src="\assets\home\hero_thumb_4_1.png"
                            sx={{
                                maxWidth: '100%',
                                borderRadius: "5%",
                            }}
                        />
                    </Grid>
                </Grid>
                
            </Container>
        </Box>
    );
};