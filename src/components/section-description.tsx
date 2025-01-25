import { Typography } from "@mui/material";

import { pxToRem } from "src/theme/styles";

export const SectionDescription = ({ children, sx }: { children: string, sx?: object }) => {
    return (
        <Typography variant="inherit"
            sx={{
                fontSize: { xs: pxToRem(16), sm: pxToRem(18), md: pxToRem(18) },
                fontWeight: 400,
                ...sx
            }}>
            {children}
        </Typography>
    );
};