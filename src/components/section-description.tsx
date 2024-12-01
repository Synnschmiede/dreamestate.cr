import { Typography } from "@mui/material";

import { pxToRem } from "src/theme/styles";

export const SectionDescription = ({ children }: { children: string }) => {
    return (
        <Typography variant="inherit"
            sx={{
                color: 'text.secondary',
                fontSize: { xs: pxToRem(16), sm: pxToRem(18), md: pxToRem(20) },
                fontWeight: 400,
                // mb: { xs: 0, md: -2 }
            }}>
            {children}
        </Typography>
    );
};