// ./src/app/(home)/properties/page.tsx
import { Box, Container } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { CONFIG } from 'src/config-global';
import { BlogView } from './blog-view';

export const metadata = {
  title: `${CONFIG.appName} | Properties`,
  description:
    'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/posts?${queryString}`, {
    cache: 'no-cache',
  });
  const blog_response = await res.json();

  return (
    <Box sx={{ background: '#f8f8f8', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Our Blogs"
          links={[{ name: 'Home', href: '/' }, { name: 'Blogs' }]}
          sx={{ mb: 2 }}
        />
        <BlogView blog_response={blog_response} />
      </Container>
    </Box>
  );
}
