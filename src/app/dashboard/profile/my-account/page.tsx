import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { AccountDetailsForm } from '../_components/AccountDetailsForm';

export const metadata = { title: `Dashboard | Profile Settings | ${CONFIG.appName}` };

export default function Page() {
  return (
    <Stack spacing={4}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Stack spacing={4}>
        <AccountDetailsForm />
      </Stack>
    </Stack>
  );
}
