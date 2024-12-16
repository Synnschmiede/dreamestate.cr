import { Box, Divider, Typography } from "@mui/material";

export const PropertyCountByCategory = ({ title, dataArr }: { title: string, dataArr: { key: string, value: number }[] }) => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                p: 2,
                borderRadius: 1,
                mb: 2
            }}
        >
            <Typography variant="h6">{title}</Typography>
            <Box>
                {dataArr.map((item) => (
                    <Box key={item.key} sx={{ mt: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2">{item.key} </Typography>
                            <Typography variant="body2" color={"text.disabled"}>({item.value})</Typography>
                        </Box>
                        <Divider sx={{ mt: 1 }} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
};