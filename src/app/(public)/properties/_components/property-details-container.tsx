import { Box } from "@mui/material"

export const PropertyDetailsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={
            {
                my: { xs: 2, md: 4 },
                backgroundColor: "background.paper",
                padding: 4,
                borderRadius: .5
            }
        }>
            {children}
        </Box>
    )
}