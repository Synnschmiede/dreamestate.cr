import { Box, Divider, Typography } from "@mui/material";

import { pxToRem } from "src/theme/styles";

export const SectionTopText = ({ children, sx }: { children: string, sx?: object }) => {
    return (
        <Box>
            <Divider
                color="#1C2D37"
                sx={{
                    width: { xs: "10%", md: "3%"},
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
                    width: { xs: "10%", md: "3%" },
                    marginTop: .4
                }} />
        </Box>
    );
};