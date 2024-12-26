import { CONFIG } from 'src/config-global';
import { ForgotPasswordForm } from '../_components/forgot-password-form';

// ----------------------------------------------------------------------

export const metadata = { title: `Forgot password | ${CONFIG.appName}` };

export default function Page() {
  return <ForgotPasswordForm />;
}
