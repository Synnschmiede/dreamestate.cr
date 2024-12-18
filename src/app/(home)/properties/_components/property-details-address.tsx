import { Typography } from "@mui/material"
import { IPropertyLocation } from "../_lib/property.interface"
import { PropertyDetailsAccordion } from "./property-details-accordion"
import { PropertyDetailsContainer } from "./property-details-container"

export const PropertyDetailsAddress = ({ data }: { data: IPropertyLocation }) => {

    return (
        <PropertyDetailsContainer>
            <PropertyDetailsAccordion
                pannelId="address"
                title="Address"
                expanded
                isLight
            >
                <Typography variant="body2">Address</Typography>
            </PropertyDetailsAccordion>
        </PropertyDetailsContainer>
    )
}