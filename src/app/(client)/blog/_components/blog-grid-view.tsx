'use client';

import { Grid } from '@mui/material';

import { IBlog } from 'src/app/dashboard/blog/_lib/blog.types';
import { BlogGridCard } from './blog-grid-card';

export const BlogGridView = ({ data }: { data: IBlog[] }) => {
    return (
        <Grid container spacing={2}>
            {data?.length > 0 &&
                data.map((item: IBlog) => (
                    <Grid
                        key={item.id}
                        item
                        xs={12}
                        md={6}
                    >
                        <BlogGridCard data={item} />
                    </Grid>
                ))}
        </Grid>
    );
};
