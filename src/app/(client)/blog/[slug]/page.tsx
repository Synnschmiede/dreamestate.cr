import { Box } from '@mui/material';
import { CONFIG } from 'src/config-global';
import { BlogDetailsView } from '../blog-details-view';

export const metadata = {
    title: `Post details | ${CONFIG.appName}`,
    description:
        'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function PropertyDetailsPage({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/posts?slug=${slug}`);
    const data = await res.json();

    const blog = data.data[0];

    return (
        <Box sx={{ background: '#f8f8f8', py: { xs: 4, md: 6 } }}>
            <BlogDetailsView blog={blog} />
        </Box>
    );
}
