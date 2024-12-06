
import { alpha, Box, useTheme } from "@mui/material";

import { Iconify } from "src/components/iconify";

export const InstagramCard = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                borderRadius: 2,
                "&:hover .hover-ig-layer": {
                    opacity: 1,
                    visibility: "visible",
                },
            }}
        >
            <Box
                component="img"
                src="/assets/home/hero_thumb_4_1.png"
                alt="Modern House"
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: { xs: "16px 16px 0 0", md: 2 },
                }}
            />
            <Box sx={{
                position: "absolute",
                top: 10,
                right: 10
            }}>
                <Iconify icon="mdi:instagram" width={30} height={40} sx={{ color: "text.white" }} />
            </Box>
            <Box
                className="hover-ig-layer"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: alpha(theme.palette.text.secondary, 0.6),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 2,
                    opacity: 0,
                    visibility: "hidden",
                    transition: "opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease",
                    transform: "scale(1)",
                    "&:hover": {
                        transform: "scale(.95)",
                        borderRadius: 2
                    },

                }}
            >
                {/* Social Icons */}
                <Iconify
                    title="View Post"
                    icon="mdi:instagram"
                    width={32}
                    sx={{ color: "white", cursor: "pointer" }}
                />
            </Box>
        </Box>
    );
};
