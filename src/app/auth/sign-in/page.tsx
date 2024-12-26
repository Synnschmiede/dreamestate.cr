import { CONFIG } from 'src/config-global';
import { SignInForm } from '../_components/signin-form';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return <SignInForm />;
}
