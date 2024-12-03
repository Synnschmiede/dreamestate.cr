import { Stack } from "@mui/material"

import { Iconify } from "src/components/iconify"
import { SectionDescription } from "src/components/section-description"

export const IconWithText = ({ icon, text, sx, iconSize = 20 }: { icon: string, text: string, sx?: object, iconSize?: number }) => {
    return (
        <Stack direction="row" alignItems="center" justifyContent="start" spacing={.5} sx={{ marginTop: 1 }}>
            <Iconify width={iconSize} icon={icon} />
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