import { Avatar, Stack, Typography } from "@mui/material"

export const TitledAvatar = ({ path, title }: { path: string, title: string }) => {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ width: 32, height: 32 }} alt={title} src={path} />
            <Typography variant="body2">{title}</Typography>
        </Stack>
    )
}