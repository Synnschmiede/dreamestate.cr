import { Stack } from "@mui/material"

import { Iconify } from "src/components/iconify"
import { SectionDescription } from "src/components/section-description"

export const IconWithText = ({ icon, text }: { icon: string, text: string }) => {
    return (
        <Stack direction="row" alignItems="center" justifyContent="start" spacing={.5} sx={{ marginTop: 1 }}>
            <Iconify width={20} icon={icon} />
            <SectionDescription
                sx={{
                    color: 'text.disabled',
                    fontSize: 16
                }}>
                {text}
            </SectionDescription>
        </Stack>
    )
}