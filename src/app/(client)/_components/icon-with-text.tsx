import { Stack } from "@mui/material";

import { Iconify } from "src/components/iconify";
import { SectionDescription } from "src/components/section-description";

export const IconWithText = ({ icon, text, sx, iconSize = 20, iconColor = 'text.secondary' }: { icon: string, text: string, sx?: object, iconSize?: number, iconColor?: string }) => {
    return (
        <Stack direction="row" alignItems='center' justifyContent="start" gap={1}>
            <Iconify width={iconSize} icon={icon} color={iconColor} />
            <SectionDescription
                sx={{
                    color: 'text.disabled',
                    fontSize: 16,
                    ...sx
                }}>
                {text}
            </SectionDescription>
        </Stack>
    )
}