import { Box } from '@mui/material';
import { CONFIG } from 'src/config-global';
import { UpdatePropertyView } from './update-property-view';

export const metadata = {
  title: `${CONFIG.appName} | Property Details`,
  description:
    'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function PropertyUpdatePage({
  params: { id },
}: {
  params: { id: string };
}) {

  return (
    <Box sx={{ background: '#f8f8f8', py: { xs: 4, md: 6 } }}>
      <UpdatePropertyView id={id} />
    </Box>
  );
}
