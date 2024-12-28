import { Box } from '@mui/material';
import { CONFIG } from 'src/config-global';
import { IProperty } from '../_lib/property.types';
import { UpdatePropertyView } from './update-property-view';

export const metadata = {
  title: `${CONFIG.appName} | Property Details`,
  description:
    'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function PropertyDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/property?id=${id}`);
  const data = await res.json();

  const property: IProperty = data.data[0];

  return (
    <Box sx={{ background: '#f8f8f8', py: { xs: 4, md: 6 } }}>
      <UpdatePropertyView data={property} />
    </Box>
  );
}
