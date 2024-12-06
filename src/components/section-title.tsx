import { Typography } from "@mui/material";

import { pxToRem } from "src/theme/styles";

export const SectionTitle = ({ children, sx }: { children: string, sx?: object }) => {
    return (
        <Typography
            variant="inherit"
            sx={{
                fontWeight: 700,
                fontSize: { xs: pxToRem(30), sm: pxToRem(40), md: pxToRem(50) },
                lineHeight: 1.2,
                ...sx
            }}
        >
            {children}
        </Typography>
    );
};