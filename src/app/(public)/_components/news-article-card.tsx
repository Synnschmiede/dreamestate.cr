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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 2,
                overflow: 'hidden',
                height: '100%',
                width: '50%',
                marginBottom: 1
            }}
        >
            <Box
                component="img"
                height="250"
                src={`${CONFIG.bucketUrl}/${thumbnail}`}
                alt={title}
                sx={{ objectFit: 'cover', width: '100%', height: '400px' }}
            />
            <Box sx={{
                px: 4
            }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' gap={2} sx={{ mt: 2, mb: 1 }}>
                    <IconWithText
                        icon="clarity:date-line"
                        text={(isDate24HoursPast(new Date(updated_at)) ? fDateTime(updated_at) : `${fToNow(updated_at)} ago`) || ''}
                        sx={{ color: "white" }}
                        iconColor="white"
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
                    color="text.white"

                >
                    {title}
                </Typography>

                <RedirectButton path={`/blog/${slug}`} title='Read more' />
            </Box>
        </Box>
    )
};