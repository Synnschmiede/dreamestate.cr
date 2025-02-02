import { Box, Button, ButtonGroup, Divider, Grid, Stack, Typography } from '@mui/material';

import { IBlog } from 'src/app/dashboard/blog/_lib/blog.types';
import { RedirectButton } from 'src/components/button/redirect-button';
import { CustomChip } from 'src/components/custom-chip';
import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { TitledAvatar } from 'src/components/titled-avatar';
import { fDateTime, fToNow, isDate24HoursPast } from 'src/utils/format-time';

export const BlogListCard = ({ data }: { data: IBlog }) => {
    const {
        title,
        slug,
        thumbnail,
        tags,
        content,
        featured,
        author,
        updated_at
    } = data;

    return (
        <Grid
            container
            sx={{
                borderRadius: '4px',
                '&:hover': {
                    boxShadow: (theme) => theme.customShadows.card,
                    '& .property-image': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease-in-out',
                    },
                },
            }}
        >
            {/* IMAGE SECTION */}
            <Grid
                item
                xs={12}
                md={5}
                sx={{ position: 'relative', overflow: 'hidden' }}
            >
                <Box
                    className="property-image"
                    component="img"
                    height="310px"
                    width="100%"
                    src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${thumbnail}`}
                    alt="Property image"
                    sx={{ objectFit: 'cover', borderRadius: { xs: '4px 4px 0 0', md: '4px 0 0 4px' } }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        // height: "150px",
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
                        zIndex: 1,
                    }}
                />

                {featured && (
                    <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 1 }}>
                        <CustomChip label='FEATURED' color="info" size="small" />
                    </Box>
                )}
            </Grid>

            {/* CONTENT SECTION */}
            <Grid
                item
                xs={12}
                md={7}
                sx={{
                    backgroundColor: 'common.white',
                    px: { xs: 2, md: 3 },
                    pt: { xs: 2, md: 3 },
                    borderRadius: { xs: '0 0 4px 4px', md: '0 4px 4px 0' },
                }}
            >
                <Stack direction='column' justifyContent='space-between' sx={{ height: '100%' }}>
                    <Stack direction='column' alignItems='flex-start'>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {title}
                        </Typography>
                        <Stack direction='row' alignItems='center' gap={1}>
                            <Iconify icon="clarity:date-line" sx={{ color: 'primary.main' }} />
                            <Typography variant="caption" color="primary.main">
                                {isDate24HoursPast(new Date(updated_at)) ? fDateTime(updated_at) : `${fToNow(updated_at)} ago`}
                            </Typography>
                        </Stack>

                        <Markdown
                            children={content.length > 50 ? `${content.substring(0, 174)}...` : content}
                            sx={{
                                color: 'text.disabled',
                                fontSize: 16,
                            }}
                        />
                        <RedirectButton path={`/blog/${slug}`} title="Read more" sx={{ borderColor: 'divider', color: 'text.primary' }} />
                    </Stack>

                    <Stack>
                        <Divider sx={{ mx: 'auto', width: '100%', my: 2 }} />

                        {/* FOOTER SECTION */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pb: 2 }}>
                            <TitledAvatar
                                path={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${author.profile_pic}`}
                                title={`${author.first_name} ${author.last_name}`}
                            />

                            {/* Buttons */}
                            <ButtonGroup
                                sx={{
                                    '& .MuiButton-root': {
                                        borderColor: '#DDDDDD',
                                        color: '#333',
                                    },
                                }}
                                size="small"
                            >
                                <Button>
                                    <Iconify icon="material-symbols:share" />
                                </Button>
                            </ButtonGroup>
                        </Stack>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
};
