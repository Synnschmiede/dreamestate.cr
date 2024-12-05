import type { FC } from "react";

import { Box, Avatar, Typography } from "@mui/material";

export const TestimonialCard: FC = () => {
    return (
        <Box sx={{ position: "relative", width: "100%", maxWidth: 1200, mx: "auto" }}>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: 2,
                }}
            >
                <Box
                    component="img"
                    src="/assets/home/hero_thumb_4_1.png"
                    alt="Modern House"
                    sx={{
                        width: "90%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 2,
                    }}
                />
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    top: { xs: 32, lg: 48 },
                    right: -10,
                    backgroundColor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 3,
                    width: { xs: "90%", md: "60%" },
                    p: 4,
                    zIndex: 2,
                }}
            >

                <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Box key={index} component="span">
                            ⭐
                        </Box>
                    ))}
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Home is where love resides, memories are created, and dreams are
                    nurtured. I have found my sanctuary in this beautiful property.
                    Finding the perfect that resonates with your own.
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                        src="/assets/profile_picture.png"
                        alt="Ralph Edwards"
                        sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Ralph Edwards
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Property Expert
                        </Typography>
                    </Box>
                </Box>

                <Typography
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        fontSize: 80,
                        color: "text.disabled",
                        opacity: 0.2,
                        lineHeight: 1,
                    }}
                >
                    &ldquo;
                </Typography>
            </Box>
        </Box>
    );
};
