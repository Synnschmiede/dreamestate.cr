'use client';

import { Grid } from '@mui/material';

import { IBlog } from 'src/app/dashboard/blog/_lib/blog.types';
import { BlogListCard } from './blog-list-card';

export const BlogListView = ({ data }: { data: IBlog[] }) => {

    return (
        <Grid container spacing={2}>
            {data?.length > 0 &&
                data.map((item: any) => (
                    <Grid item xs={12}>
                        <BlogListCard data={item} />
                    </Grid>
                ))}
        </Grid>
    );
};
