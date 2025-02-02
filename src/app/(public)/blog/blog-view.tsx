'use client';
import { Grid } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { IBlog } from 'src/app/dashboard/blog/_lib/blog.types';
import { ContactForm } from 'src/components/form-components/contact-form';
import PagePagination from 'src/components/pagination/page-pagination';
import { TGetResponse } from 'src/types/common';
import { IUploader } from '../properties/_lib/property.interface';
import { BlogFilterToolbar } from './_components/blog-filter-toolbar';
import { BlogGridView } from './_components/blog-grid-view';
import { BlogListView } from './_components/blog-list-view';

type Props = {
    blog_response: TGetResponse<IBlog>
}

export const BlogView = ({ blog_response }: Props) => {
    const searchParams = useSearchParams();

    const [blogView, setBlogView] = React.useState<string>('grid');
    const [currentPage, setCurrentPage] = React.useState<number>(Number(searchParams.get('page')) || 1);

    const router = useRouter();
    const pathname = usePathname();

    const handleChangeView = React.useCallback(
        (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
            if (newView !== null) {
                setBlogView(newView);
                localStorage.setItem('blogView', newView);
            }
        },
        []
    );

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        const param = new URLSearchParams(window.location.search);
        param.set('page', value.toString());
        router.push(`${pathname}?${param.toString()}`);
        setCurrentPage(value);
    }

    React.useEffect(() => {
        const view = localStorage.getItem('propertyView');
        if (view) {
            setBlogView(view);
        }
    }, []);

    const author: IUploader = {
        first_name: "John",
        last_name: "Doe",
        email: "example@gmail.com",
        contact_number: "+880150000000",
        profile_pic: "",
        role: 'ADMIN'
    }

    return (
        <>
            <BlogFilterToolbar view={blogView} handleChangeView={handleChangeView} />
            <Grid container spacing={2} sx={{ my: { xs: 1, md: 2 } }}>
                {/* blog list */}
                <Grid item xs={12} md={8}>
                    {blogView === 'list' ? (
                        <BlogListView data={blog_response.data} />
                    ) : (
                        <BlogGridView data={blog_response.data} />
                    )}
                    {
                        blog_response?.meta && blog_response.meta.total > blog_response.meta.limit && (
                            <PagePagination meta={blog_response.meta} />
                        )
                    }
                </Grid>
                {/* contact form */}
                <Grid item xs={12} md={4}>
                    <ContactForm author={author} />
                </Grid>
            </Grid>
        </>
    );
};
