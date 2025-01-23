'use client';
import { Grid, Pagination } from '@mui/material';
import React from 'react';
import { IBlog } from 'src/app/dashboard/blog/_lib/blog.types';
import { TGetResponse } from 'src/types/common';
import { BlogFilterToolbar } from './_components/blog-filter-toolbar';
import { BlogGridView } from './_components/blog-grid-view';
import { BlogListView } from './_components/blog-list-view';

type Props = {
    blog_response: TGetResponse<IBlog>
}

export const BlogView = ({ blog_response }: Props) => {
    const [propertyView, setPropertyView] = React.useState<string>('grid');
    const handleChangeView = React.useCallback(
        (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
            if (newView !== null) {
                setPropertyView(newView);
                localStorage.setItem('propertyView', newView);
            }
        },
        []
    );

    React.useEffect(() => {
        const view = localStorage.getItem('propertyView');
        if (view) {
            setPropertyView(view);
        }
    }, []);

    return (
        <>
            <BlogFilterToolbar view={propertyView} handleChangeView={handleChangeView} />
            <Grid container spacing={2} sx={{ my: { xs: 1, md: 2 } }}>
                {/* property list */}
                <Grid item xs={12} md={8}>
                    {propertyView === 'list' ? (
                        <BlogListView data={blog_response.data} />
                    ) : (
                        <BlogGridView data={blog_response.data} />
                    )}
                    <Pagination sx={{ mt: 2 }} count={5} variant="outlined" shape="rounded" />
                </Grid>
            </Grid>
        </>
    );
};
