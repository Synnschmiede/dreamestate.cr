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
import useAuth from 'src/hooks/useAuth';

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

  const defaultValues = {
    email: '',
    password: '',
  };

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
    initialValues: defaultValues,
    validate: (values) => {
      const errors: any = {};
      // if (values.recipient_emails.length <= 0) {
      //   errors.recipient_emails = "*Email is required.";
      // }
      // if (!values.subject) {
      //   errors.subject = "*This Field is required";
      // }
      // if (!values.body) {
      //   errors.body = "*This Field is required";
      // }
      return errors;
    },
    onSubmit: async (values) => {
      console.log(values, 'values');
      setLoading(true);
      await login(values.email, values.password, (error) => {
        setError(error);
      });
      setLoading(false);
    },
  });

  console.log(values, 'values.....');

  return (
    <>
      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
              Sign up
            </Link>
          </>
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
            {errors.email ? <FormHelperText>{errors.email}</FormHelperText> : null}
          </FormControl>
          <FormControl error={Boolean(errors.password)}>
            <CustomPasswordInput
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
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

          <Link component={RouterLink} href={paths.auth.forgotPassword} variant="subtitle2">
            Forgot Password?
          </Link>
        </Stack>
      </form>
    </>
  );
};
