import { Box, Container, Grid, Stack } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { AnimatedShape } from 'src/components/animated-shape';
import { SectionDescription } from 'src/components/section-description';
import { SectionTitle } from 'src/components/section-title';

import { IBlog } from 'src/app/dashboard/blog/_lib/blog.types';
import { RedirectButton } from 'src/components/button/redirect-button';
import { NewsArticleCard } from './news-article-card';

export const NewsArticles = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/posts?featured=true`, {
    cache: 'no-cache',
  });
  const blog_response = await res.json();

  return (
    <Box
      sx={{
        // background: theme.palette.custom.dark_bg,
        // backgroundColor: "#1C2D37",
        backgroundColor: '#F1F4F5'
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          minHeight: pxToRem(300),
          py: { xs: pxToRem(40), md: pxToRem(80) },
          // px: { xs: pxToRem(15), md: pxToRem(0) },
          position: 'relative',
        }}
      >
        <AnimatedShape
          animationType="topToBottom"
          size={{ width: 100, height: 100 }}
          duration={3}
          sx={{
            position: 'absolute',
            top: 20,
            right: 0,
            mY: 4,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            component="img"
            src="\assets\core\shape_1.png"
            alt="animated shape"
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </AnimatedShape>
        <Grid
          container
          sx={{
            marginBottom: { xs: pxToRem(20), md: pxToRem(50) },
          }}
        >
          <Grid item xs={12} md={8}>
            <SectionTitle
              sx={{
                color: '#1C2D37',
              }}
            >
              News & Articles
            </SectionTitle>

            <SectionDescription
              sx={{
                color: '#1C2D37',
                marginTop: pxToRem(10),
                fontSize: { xs: pxToRem(16), sm: pxToRem(18), md: pxToRem(20) },
                maxWidth: { xs: '100%', md: '70%' },
              }}
            >
              Realar help you easily create a real estate trading website. With the function
              Register, Login, Post real estate news.
            </SectionDescription>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'start', md: 'flex-end' },
              alignItems: 'center',
            }}
          >
            <RedirectButton path='/blog' title='Browse all post' sx={{ borderColor: '#1C2D37', color: '#1C2D37' }} />
          </Grid>
        </Grid>

        <Stack direction='row' gap={2}>
          {
            blog_response?.data && blog_response?.data?.slice(0, 3).map((item: IBlog) => (
              <NewsArticleCard key={item.id} blog={item} />
            ))
          }
        </Stack>
        <AnimatedShape
          animationType="spin"
          size={{ width: 150, height: 150 }}
          duration={16}
          sx={{
            position: 'absolute',
            bottom: 2,
            left: 0,
            m: 4,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            component="img"
            src="\assets\core\shape_2.png"
            alt="animated shape"
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </AnimatedShape>
      </Container>
    </Box>
  );
};
