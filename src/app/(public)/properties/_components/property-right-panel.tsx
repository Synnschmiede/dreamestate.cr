"use client"

import { Box, Divider, Stack, Typography } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { TFeatureGroup } from "src/app/dashboard/feature-and-tag/_lib/feature-and-tag-types"

type Props = {
    feature_group: TFeatureGroup
}

export const PropertyRightPanel = ({ feature_group }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFeatureClick = (featureName: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentFeatures = params.get("feature")?.split(",") || [];

        if (currentFeatures.includes(featureName)) {

            // Remove the feature
            const updatedFeatures = currentFeatures.filter(f => f !== featureName);
            if (updatedFeatures.length === 0) {
                params.delete("feature");
            } else {
                params.set("feature", updatedFeatures.join(","));
            }
        } else {
            // Add the feature
            currentFeatures.push(featureName);
            params.set("feature", currentFeatures.join(","));
        }

        // Update the URL
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                p: 2,
                borderRadius: 1,
                mb: 2
            }}
        >
            <Typography variant="h6">{feature_group.name}</Typography>
            <Stack direction='column' divider={<Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />} sx={{ mt: 0.6 }}>
                {feature_group.feature.map((f) => {
                    const isSelected = searchParams.get("feature")?.split(",").includes(f.name);

                    return (
                        <Typography
                            component='button'
                            key={f.id}
                            variant="body2"
                            sx={{
                                cursor: "pointer",
                                color: "text.secondary",
                                backgroundColor: isSelected ? "action.hover" : "transparent",
                                borderRadius: 1,
                                px: 1,
                                py: 0.5,
                                textAlign: 'left',
                                border: 'none',
                                transition: "background-color 0.3s ease, color 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "action.hover",
                                },
                            }}
                            onClick={() => handleFeatureClick(f.name)}
                        >
                            {f.name}
                        </Typography>
                    );
                })}
            </Stack>
        </Box>
    )
}