'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RouterLink from 'next/link';
import * as React from 'react';

import { CircularProgress, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { paths } from 'src/routes/paths';
import { CustomPasswordInput } from 'src/components/form-fields/custom-password-fields';
import { forgotPasswordAsync } from '../_lib/actions';
import { defaultForgotPassword } from '../_lib/types';

const getValidationSchema = (step: number) => {
  return z.object({
    email: z.string().email('Invalid email address').min(1, { message: 'Email is required!' }),
    otp: step === 2 ? z.string().min(1, { message: 'OTP is required!' }) : z.string().optional(),
    new_password:
      step === 2 ? z.string().min(1, { message: 'Password is required!' }) : z.string().optional(),
  });
};

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);

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
    initialValues: defaultForgotPassword,
    validationSchema: getValidationSchema(step),
    onSubmit: async (values) => {
      setLoading(true);
      const res =
        step === 1 ? await forgotPasswordAsync(values, 1) : await forgotPasswordAsync(values, 2);
      if (res?.success) {
        if (step === 1) {
          setStep(2);
        } else {
          router.push(paths.auth.signIn);
        }
      } else {
        console.error('Submission failed:', res?.error || 'Unknown error');
      }
      setLoading(false);
    },
  });
  return (
    <Stack spacing={4}>
      {/* <div>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </div> */}
      <Typography variant="h5">Reset password</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl error={Boolean(errors.email)}>
            <TextField
              variant="outlined"
              type="email"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              disabled={step === 2}
            />
            {errors.email ? <FormHelperText>{errors.email}</FormHelperText> : null}
          </FormControl>
          
          {step === 2 && (
            <FormControl error={Boolean(errors.otp)}>
              <InputLabel>Otp</InputLabel>
              <OutlinedInput type="umber" name="otp" value={values.otp} onChange={handleChange} />
              {errors.otp ? <FormHelperText>{errors.otp}</FormHelperText> : null}
            </FormControl>
          )}
          {step === 2 && (
            <FormControl error={Boolean(errors.new_password)}>
              <InputLabel>New Password</InputLabel>
              <CustomPasswordInput
                name="new_password"
                value={values.new_password}
                onChange={handleChange}
              />
              {errors.new_password ? <FormHelperText>{errors.new_password}</FormHelperText> : null}
            </FormControl>
          )}
          <Button
            type={loading ? 'button' : 'submit'}
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {step === 1 ? 'Get OTP' : 'Reset password'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
