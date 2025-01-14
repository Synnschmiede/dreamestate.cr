import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { LoginHistory } from '@/components/dashboard/settings/login-history';
import { ResetPasswordForm } from '../_components/ResetPasswordForm';
import { CONFIG } from 'src/config-global';
import dayjs from 'dayjs';

export const metadata = { title: `Security | Settings | Dashboard | ${CONFIG.appName}` };

export default function Page() {
  return (
    <Stack spacing={4}>
      <div>
        <Typography variant="h4">Security</Typography>
      </div>
      <Stack spacing={4}>
        <ResetPasswordForm />
        {/* <MultiFactor /> */}
        login history
      </Stack>
    </Stack>
  );
}
