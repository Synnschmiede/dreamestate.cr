import { Avatar, Box, Typography } from "@mui/material"

export const PropertyDetailsSidebar = () => {
    return (
        <Box sx={
            {
                backgroundColor: "background.paper",
                padding: 4,
                borderRadius: .5
            }
        }>
            <Box sx={{ display: "flex", alignItems: "center",gap: 1 }}>
                <Avatar
                    src="/assets/profile_picture.png"
                    alt="Ralph Edwards"
                    sx={{ width: 58, height: 58 }}
                    variant="rounded"
                />
                <Box>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.secondary"
                    >
                        Ralph Edwards
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.disabled"
                    >
                        email: qHt5S@example.com
                    </Typography>
                    
                </Box>
            </Box>
        </Box>
    )
}