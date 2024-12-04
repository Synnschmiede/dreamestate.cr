import { Box, Divider, Typography } from "@mui/material";

import { pxToRem } from "src/theme/styles";

export const SectionTopText = ({ children, sx, dividerSx }: { children: string, sx?: object, dividerSx?: object }) => {
    return (
        <Box>
            <Divider
                color="#1C2D37"
                sx={{
                    width: { xs: "2rem", md: "4rem" },
                    ...dividerSx
                }} />
            <Typography
                variant="inherit"
                sx={{
                    color: "text.secondary",
                    fontWeight: 400,
                    fontSize: pxToRem(16),
                    ...sx
                }}
            >
                {children}
            </Typography>
            <Divider
                color="#1C2D37"
                sx={{
                    width: { xs: "2rem", md: "4rem" },
                    marginTop: .4, 
                    ...dividerSx
                }} />
        </Box>
    );
};