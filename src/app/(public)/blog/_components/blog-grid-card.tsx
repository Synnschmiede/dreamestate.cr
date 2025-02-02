import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import { IBlog } from 'src/app/dashboard/blog/_lib/blog.types';
import { RedirectButton } from 'src/components/button/redirect-button';
import { CustomChip } from 'src/components/custom-chip';
import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { TitledAvatar } from 'src/components/titled-avatar';
import { CONFIG } from 'src/config-global';
import { fDateTime, fToNow, isDate24HoursPast } from 'src/utils/format-time';

export const BlogGridCard = ({ data }: { data: IBlog }) => {
    const {
        title,
        slug,
        thumbnail,
        content,
        author,
        featured,
        updated_at
    } = data;

    const router = useRouter();

    const handleRedirect = (slug: string) => {
        router.push(`/blog/${slug}`);
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1,
                boxShadow: 3,
                overflow: 'hidden',
                height: '100%',
                marginBottom: 1,
                '&:hover': {
                    boxShadow: (theme) => theme.customShadows.card,
                    '& .MuiCardMedia-root': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease-in-out',
                    },
                },
            }}
        >
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    height="250"
                    image={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${thumbnail}`}
                    alt={title}
                    sx={{ objectFit: 'cover' }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60px',
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
                        zIndex: 1,
                    }}
                />
                {
                    featured && (
                        <CustomChip
                            label='FEATURED'
                            color="primary"
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                            }}
                        />
                    )
                }
            </Box>
            <CardContent sx={{ flexGrow: 1, px: 3 }}>
                <Typography variant="h5" color="text.secondary">
                    {title}
                </Typography>
                <Stack direction='row' alignItems='center' gap={1}>
                    <Iconify icon="clarity:date-line" sx={{ color: 'primary.main' }} />
                    <Typography variant="caption" color="primary.main">
                        {isDate24HoursPast(new Date(updated_at)) ? fDateTime(updated_at) : `${fToNow(updated_at)} ago`}
                    </Typography>
                </Stack>
                <Markdown
                    children={content.length > 50 ? `${content.substring(0, 200)}...` : content}
                    sx={{
                        color: 'text.disabled',
                        fontSize: 16,
                    }}
                />
                <RedirectButton path={`/blog/${slug}`} title="Read more" sx={{ borderColor: 'divider', color: 'text.primary' }} />
            </CardContent>

            <Divider
                sx={{
                    mx: 'auto',
                    width: '80%',
                }}
            />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ px: 4, py: 2 }}
            >
                <TitledAvatar
                    path={author?.profile_pic ? `${CONFIG.bucketUrl}/${author?.profile_pic}` : ''}
                    title={`${author?.first_name} ${author?.last_name}`}
                />
                <ButtonGroup
                    sx={{
                        '& .MuiButton-root': {
                            borderColor: '#DDDDDD',
                            color: '#333',
                        },
                    }}
                    size="small"
                >
                    <Button key="one">
                        <Iconify icon="material-symbols:share" />
                    </Button>
                </ButtonGroup>
            </Stack>
        </Card>
    );
};
