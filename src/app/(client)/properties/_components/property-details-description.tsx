import { Typography } from "@mui/material"
import { SectionDescription } from "src/components/section-description"
import { PropertyDetailsContainer } from "./property-details-container"

export const PropertyDetailsDescription = ({ data }: { data: string }) => {

    return (
        <PropertyDetailsContainer>
            <Typography variant="h6">Description</Typography>
            <SectionDescription
                sx={{
                    color: 'text.disabled',
                    fontSize: 16,
                    marginTop: 2
                }}>
                {data}
            </SectionDescription>
        </PropertyDetailsContainer>
    )
}