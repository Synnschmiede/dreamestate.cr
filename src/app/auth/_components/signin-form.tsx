'use client';

import React from 'react';
import { z as zod } from 'zod';

import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { FormHead } from 'src/auth/components/form-head';
import { CustomPasswordInput } from 'src/components/form-fields/custom-password-fields';
import { formConstants } from 'src/constants/form-constants';
import useAuth from 'src/hooks/useAuth';
import { validateEmail } from 'src/utils/helper';
import { defaultSignInUser } from '../_lib/types';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export const SignInForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  // ******************************
  //             states
  // ******************************
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

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
    touched,
  } = useFormik({
    initialValues: defaultSignInUser,
    validate: (values) => {
      const errors: any = {};
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
      await login(values.email, values.password, (error) => {
        setError(error);
      });
      setLoading(false);
    },
  });

  return (
    <>
      <FormHead
        title="Sign in to your account"
        description={
          // <>
          //   {`Don’t have an account? `}
          //   <Link component={RouterLink} href={paths.auth.signUp} variant="subtitle2">
          //     Sign up
          //   </Link>
          // </>
          ''
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl error={Boolean(errors.email)}>
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
            />
            {touched.email && errors.email ? <FormHelperText>{errors.email}</FormHelperText> : null}
          </FormControl>
          <FormControl error={Boolean(errors.password)}>
            <CustomPasswordInput
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {touched.password && errors.password ? (
              <FormHelperText>{errors.password}</FormHelperText>
            ) : null}
          </FormControl>
          <Button
            type={loading ? 'button' : 'submit'}
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          <Link component={RouterLink} href={paths.auth.forgotPassword} variant="subtitle2">
            Forgot Password?
          </Link>
        </Stack>
      </form>
    </>
  );
};
