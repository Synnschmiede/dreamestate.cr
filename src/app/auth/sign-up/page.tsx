import { CONFIG } from 'src/config-global';

import { SignupForm } from '../_components/signup-form';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return <SignupForm />;
}
