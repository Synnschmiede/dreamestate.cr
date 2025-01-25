import { Box, Typography } from "@mui/material"
import { PropertyDetailsContainer } from "./property-details-container"

export const PropertyDetailsDescription = ({ data }: { data: string }) => {

    return (
        <PropertyDetailsContainer>
            <Typography variant="h6">Description</Typography>
            <Box sx={{
                color: 'text.disabled',
                fontSize: 16,
                marginTop: 2
            }}>
                <div dangerouslySetInnerHTML={{ __html: data }} />
            </Box>
        </PropertyDetailsContainer>
    )
}