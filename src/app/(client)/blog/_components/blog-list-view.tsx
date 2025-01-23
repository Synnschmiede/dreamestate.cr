'use client';

import { Grid } from '@mui/material';

import { useRouter } from 'next/navigation';
import { IBlog } from 'src/app/dashboard/blog/_lib/blog.types';
import { BlogListCard } from './blog-list-card';

export const BlogListView = ({ data }: { data: IBlog[] }) => {
    const router = useRouter();

    const hanldeRedirect = (slug: string) => {
        router.push(`/properties/${slug}`);
    };

    return (
        <Grid container spacing={2}>
            {data?.length > 0 &&
                data.map((item: any) => (
                    <Grid item xs={12} onClick={() => hanldeRedirect(item.slug)} sx={{ cursor: 'pointer' }}>
                        <BlogListCard data={item} />
                    </Grid>
                ))}
        </Grid>
    );
};
