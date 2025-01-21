import { Stack } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import BlogForm from '../_components/blog-form';

export default function BlogAddView() {
    return (
        <DashboardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                <CustomBreadcrumbs
                    heading="Create Post"
                    links={[
                        { name: 'Home', href: paths.dashboard.root },
                        { name: 'Blog', href: paths.dashboard.blog },
                        { name: 'Create Post' },
                    ]}
                />
            </Stack>
            <BlogForm />
        </DashboardContent>
    );
}
