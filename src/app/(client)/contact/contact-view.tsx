import { Box, Container } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { SectionDescription } from 'src/components/section-description';
import { pxToRem } from 'src/theme/styles';
import { QuickContact } from './_components/quick-contact';

export const ContactView = () => {
  return (
    <>
      <Box sx={{ background: '#f8f8f8', pt: { xs: 4, md: 6 } }} pb={{ xs: 4, md: 12 }}>
        <Container maxWidth="xl">
          <CustomBreadcrumbs
            heading="Contact Us"
            links={[{ name: 'Home', href: '/' }, { name: 'Contact' }]}
            sx={{ mb: 2 }}
          />
          <SectionDescription
            sx={{
              color: 'text.disabled',
              fontSize: { xs: pxToRem(16), sm: pxToRem(16), md: pxToRem(18) },
            }}
          >
            Want to get in touch? We'd love to hear from you!
          </SectionDescription>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <QuickContact />
      </Container>
    </>
  );
};
