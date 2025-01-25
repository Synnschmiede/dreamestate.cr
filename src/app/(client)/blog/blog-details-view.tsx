import { Box, Chip, Container, Divider, Grid, Stack, Typography } from "@mui/material"
import { IBlog } from "src/app/dashboard/blog/_lib/blog.types"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs/custom-breadcrumbs"
import { ContactForm } from "src/components/form-components/contact-form"
import { CONFIG } from "src/config-global"
import { fDateTime, fToNow, isDate24HoursPast } from "src/utils/format-time"

type Props = {
    blog: IBlog
}
export const BlogDetailsView = ({ blog }: Props) => {
    const { title, thumbnail, content, images, updated_at, tags, author } = blog;

    return (
        <Container maxWidth="xl">
            <CustomBreadcrumbs
                heading={title}
                links={[
                    { name: 'Home', href: '/' },
                    { name: 'Blog', href: '/blog' },
                    { name: title || '' },
                ]}
            />
            <Grid container spacing={4} sx={{ my: 2 }}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: 440,
                            borderRadius: 1,
                            overflow: "hidden",
                        }}
                    >
                        <Box component='img' src={`${CONFIG.bucketUrl}/${thumbnail}`} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        {images.map((image) => (
                            <Grid key={image} item xs={6}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        height: 210,
                                        borderRadius: 1,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box component='img' src={`${CONFIG.bucketUrl}/${image}`} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
            <Stack direction='row' gap={5}>
                <Stack sx={{ width: '70%' }}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant="caption" color='text.secondary' sx={{ fontSize: '1rem' }}>
                            {isDate24HoursPast(new Date(updated_at)) ? fDateTime(updated_at) : `${fToNow(updated_at)} ago`} by {`${author.first_name} ${author.last_name}`}
                        </Typography>
                        <Stack direction='row' gap={1}>
                            {
                                tags && tags.split(",").map((t) => (
                                    <Chip size='small' color="primary" variant="outlined" key={t} label={t} sx={{ textTransform: 'capitalize', borderRadius: '20px' }} />
                                ))
                            }
                        </Stack>
                    </Stack>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </Stack>
                <Stack sx={{ width: '30%' }}>
                    <ContactForm author={author} />
                </Stack>
            </Stack>
        </Container>
    )
}