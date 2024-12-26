'use client';

import { CircularProgress, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { CustomPasswordInput } from 'src/components/form-fields/custom-password-fields';
import { paths } from 'src/routes/paths';
import { createUser } from '../_lib/actions';
import { defaultUser } from '../_lib/types';
import { formConstants } from 'src/constants/form-constants';
import { validateEmail } from 'src/utils/helper';
const oAuthProviders = [{ id: 'google', name: 'Google', logo: '/assets/logo-google.svg' }];
const defaultValues = { email: '', password: '' };

export function SignupForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
    setFieldValue,
    isValid,
    resetForm,
  } = useFormik({
    initialValues: defaultUser,
    validate: (values) => {
      const errors = {} as any;

      if (!values.first_name) {
        errors.first_name = formConstants.required;
      }

      if (!values.email) {
        errors.email = formConstants.required;
      } else if (validateEmail(values.email)) {
        errors.email = formConstants.invalidEmail;
      }

      if (!values.password) {
        errors.password = formConstants.required;
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await createUser(values, true);
      if (res?.success) {
        router.push(paths.auth.signIn);
      }
      setLoading(false);
    },
  });

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl error={Boolean(errors.first_name)}>
              <TextField
                label="First name"
                type="first_name"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
              />
              {errors.first_name ? <FormHelperText>{errors.first_name}</FormHelperText> : null}
            </FormControl>
            <FormControl error={Boolean(errors.last_name)}>
              <TextField
                label="Last name"
                type="last_name"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl error={Boolean(errors.email)}>
              <TextField
                label="Email address"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email ? <FormHelperText>{errors.email}</FormHelperText> : null}
            </FormControl>
            <FormControl error={Boolean(errors.password)}>
              <CustomPasswordInput
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password ? <FormHelperText>{errors.password}</FormHelperText> : null}
            </FormControl>
            <Button
              type={loading ? 'button' : 'submit'}
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Stack>
        </form>
        <div>
          <Link component={RouterLink} href={paths.auth.forgotPassword} variant="subtitle2">
            Forgot password?
          </Link>
        </div>
      </Stack>
    </Stack>
  );
}
