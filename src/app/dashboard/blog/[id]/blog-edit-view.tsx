import { Stack, Typography } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import BlogForm from '../_components/blog-form';
import { IBlog } from '../_lib/blog.types';

type Props = {
    blog: IBlog
}

export default function BlogEditView({ blog }: Props) {
    return (
        <DashboardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                <CustomBreadcrumbs
                    heading="Edit Post"
                    links={[
                        { name: 'Home', href: paths.dashboard.root },
                        { name: 'Blog', href: paths.dashboard.blog },
                        { name: 'Edit Post' },
                    ]}
                />
            </Stack>
            {
                blog ? (
                    <BlogForm value={blog} />
                ) : (
                    <Typography>No post found to edit</Typography>
                )
            }
        </DashboardContent>
    );
}
