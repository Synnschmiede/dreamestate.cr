import { Box } from "@mui/material";
import { CONFIG } from "src/config-global";
import { IProperty } from "../_lib/property.interface";
import { PropertyDetailsView } from "../property-details-view";

export const metadata = {
    title: `${CONFIG.appName} | Property Details`,
    description: 'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function PropertyDetailsPage({ params: { slug } }: { params: { slug: string } }) {

    const data: IProperty = {
        title: "Modern Apartment in Downtown",
        slug: "modern-apartment-in-downtown",
        description: "A beautiful and modern apartment located in the heart of the city.",
        price: 1200000,
        property_type: "APARTMENT",
        status: "AVAILABLE",
        feature_image: "https://via.placeholder.com/800x600?text=Apartment+Feature+Image",
        images: [
            "https://via.placeholder.com/400x300?text=Apartment+Image+1",
            "https://via.placeholder.com/400x300?text=Apartment+Image+2"
        ],
        "tags": [
            "Modern",
            "City Center",
            "Convenient Location"
        ],
        "overview": {
            "updated_on": "2024-12-14",
            "bedrooms": 3,
            "bathrooms": 2,
            "area_size": 1500,
            "garage": 1
        },
        "contactInfo": {
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "phone": "+1-555-123-4567"
        },
        "documents": [
            "https://example.com/documents/sample-lease-agreement.pdf"
        ],
        "location": {
            "city": "New York",
            "state": "NY",
            "country": "USA",
            "postalCode": "10001",
            "addressLine1": "123 Main Street",
            "latitude": 40.7128,
            "longitude": -74.006
        },
        "property_details": {
            "id": "a1b2c3d4",
            "size": 1500,
            "bedrooms": 3,
            "garage": 1,
            "available_from": "2024-01-01",
            "price": 1200000,
            "property_lot_size": "2000 sqft",
            "bathrooms": "2",
            "year_build": "2020",
            "structure_type": "High-rise",
            "price_info": "Negotiable",
            "rooms": 5,
            "garage_size": "300 sqft"
        },
        "features": {
            "interior_details": [
                "Hardwood floors",
                "Open kitchen",
                "Walk-in closets"
            ],
            "outdoor_details": [
                "Balcony",
                "Swimming pool"
            ],
            "utilities": [
                "Water",
                "Electricity",
                "Internet"
            ],
            "other_features": [
                "24-hour security",
                "Elevator access"
            ]
        }
    }
    return (
        <Box sx={{ background: "#f8f8f8", py: { xs: 4, md: 6 } }}>
            <PropertyDetailsView data={data} slug={slug} />
        </Box>
    )
}