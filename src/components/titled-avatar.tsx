import { Stack, Avatar, Typography } from "@mui/material"

export const TitledAvatar = ({ path, title }: { path: string, title: string }) => {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Avatar alt="Travis Howard" src={path} />
            <Typography variant="body2">{title}</Typography>
        </Stack>
    )
}