import { Box } from '@mui/material';
import { CONFIG } from 'src/config-global';
import { PropertyDetailsView } from '../property-details-view';

export const metadata = {
  title: `${CONFIG.appName} | Property Details`,
  description:
    'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function PropertyDetailsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/property?slug=${slug}`);
  const data = await res.json();

  const property = data.data[0];

  return (
    <Box sx={{ background: '#f8f8f8', py: { xs: 4, md: 6 } }}>
      <PropertyDetailsView data={property} slug={slug} />
    </Box>
  );
}
