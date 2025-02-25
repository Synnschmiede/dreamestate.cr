import { Box, Chip, Stack, Typography } from "@mui/material";


import { IBlog } from "src/app/dashboard/blog/_lib/blog.types";
import { RedirectButton } from "src/components/button/redirect-button";
import { CONFIG } from "src/config-global";
import { fDateTime, fToNow, isDate24HoursPast } from "src/utils/format-time";
import { IconWithText } from "./icon-with-text";

type Props = {
    blog: IBlog
}

export const NewsArticleCard = ({ blog }: Props) => {
    const { title, slug, thumbnail, tags, updated_at } = blog;

    return (
        <Stack
            sx={{
                width: '33%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 2,
                overflow: 'hidden',
                height: '100%',
                marginBottom: 1,
                backgroundColor: 'text.white',
                zIndex: 100
            }}
        >
            <Box
                component="img"
                src={`${CONFIG.bucketUrl}/${thumbnail}`}
                alt={title}
                sx={{ objectFit: 'cover', width: '100%', height: '280px' }}
            />
            <Box sx={{
                px: 4,
                pb: 1
            }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' gap={2} sx={{ mt: 2, mb: 1 }}>
                    <IconWithText
                        icon="clarity:date-line"
                        text={(isDate24HoursPast(new Date(updated_at)) ? fDateTime(updated_at) : `${fToNow(updated_at)} ago`) || ''}
                        sx={{ color: "#1C2D37" }}
                        iconColor="#1C2D37"
                    />
                    <Stack direction='row' gap={1}>
                        {
                            tags && tags.map((t) => (
                                <Chip size="small" color="primary" variant="outlined" key={t} label={t} sx={{ textTransform: 'capitalize', borderRadius: '20px' }} />
                            ))
                        }
                    </Stack>
                </Stack>
                <Typography
                    variant="h4"
                    color="#1C2D37"

                >
                    {title}
                </Typography>

                <RedirectButton path={`/blog/${slug}`} title='Read more' sx={{ borderColor: '#1C2D37', color: '#1C2D37' }} />
            </Box>
        </Stack>
    )
};