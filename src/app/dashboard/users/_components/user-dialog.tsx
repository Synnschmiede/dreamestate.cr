'use client';

import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { Dialog } from 'src/components/dialog/Dialog';
import { CustomPasswordInput } from 'src/components/form-fields/custom-password-fields';
import { createUserAsync, updateUserAsync } from '../_lib/user.actions';
import { userValidationSchema } from '../_lib/user.schema';
import { formConstants } from 'src/constants/form-constants';
import { ErrorText } from 'src/components/form-components/error-text';

interface IUserModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data?: any;
}
export const UserDialog = (props: IUserModalProps) => {
  const { open, onClose, onConfirm, data } = props;

  const [loading, setLoading] = React.useState(false);
  const isUpdated = data?.id ? true : false;

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
    initialValues: data,
    validate: (values) => {
      const errors: any = {};
      if (!values.first_name) {
        errors.first_name = formConstants.required;
      }
      if (!values.last_name) {
        errors.last_name = formConstants.required;
      }
      if (!values.email) {
        errors.email = formConstants.required;
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = formConstants.invalidEmail;
      }
      if (!isUpdated && !values.password) {
        errors.password = formConstants.required;
      }

      if (!isUpdated && !values.confirm_password) {
        errors.confirm_password = formConstants.required;
      }

      if (
        !isUpdated &&
        values.confirm_password &&
        JSON.stringify(values.password) !== JSON.stringify(values.confirm_password)
      ) {
        errors.confirm_password = 'Password does not match';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      let res: any;
      isUpdated
        ? (res = await updateUserAsync({
            id: data.id,
            role: values.role,
            is_deleted: false,
            status: values.status,
            contact_number: values.contact_number,
          }))
        : (res = await createUserAsync(values));

      if (res?.success) {
        onConfirm();
      }
      setLoading(false);
    },
  });

  console.log(errors, 'errors');

  return (
    <Dialog
      title={isUpdated ? 'Update User' : 'Create User'}
      onClose={onClose}
      open={open}
      size="md"
      contentWrappedWithForm={{
        onSubmit: handleSubmit,
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          my: 2,
        }}
      >
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={Boolean(errors.first_name)}>
            <TextField
              label="First name"
              type="first_name"
              name="first_name"
              disabled={isUpdated}
              value={values.first_name}
              onChange={handleChange}
            />
            {errors.first_name && <ErrorText error={errors.first_name} />}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={Boolean(errors.last_name)}>
            <TextField
              label="Last name"
              type="last_name"
              name="last_name"
              disabled={isUpdated}
              value={values.last_name}
              onChange={handleChange}
            />
          </FormControl>
          {errors.last_name && <ErrorText error={errors.last_name} />}
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth error={Boolean(errors.email)}>
            <TextField
              label="Email address"
              type="email"
              name="email"
              disabled={isUpdated}
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <ErrorText error={errors.email} />}
          </FormControl>
        </Grid>

        <Grid item xs={isUpdated ? 12 : 6}>
          <FormControl fullWidth error={Boolean(errors.contact_number)}>
            <TextField
              label="Contact number"
              type="contact_number"
              name="contact_number"
              value={values.contact_number}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        {isUpdated && (
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(errors.role)}>
              <InputLabel>Status</InputLabel>

              <Select
                labelId="status"
                id="status"
                value={values.status}
                label="Status"
                onChange={(event) => setFieldValue('status', event.target.value)}
              >
                <MenuItem value={'ACTIVE'}>Active</MenuItem>
                <MenuItem value={'BLOCKED'}>Blocked</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={Boolean(errors.role)}>
            <InputLabel>Role</InputLabel>
            <Select
              labelId="role"
              id="role"
              value={values.role}
              label="Role"
              onChange={(event) => setFieldValue('role', event.target.value)}
            >
              <MenuItem value={'USER'}>User</MenuItem>
              <MenuItem value={'ADMIN'}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {!isUpdated && (
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(errors.password)}>
              <CustomPasswordInput
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password)}
              />
            </FormControl>
            {errors.password && <ErrorText error={errors.password} />}
          </Grid>
        )}

        {!isUpdated && (
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(errors.confirm_password)}>
              <CustomPasswordInput
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.confirm_password)}
              />
            </FormControl>
            {errors.confirm_password && <ErrorText error={errors.confirm_password} />}
          </Grid>
        )}

        <Stack direction={'row'} justifyContent={'flex-end'} width={'100%'} mt={2}>
          <Button
            variant="contained"
            type={loading ? 'button' : 'submit'}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            Save
          </Button>
        </Stack>
      </Grid>
    </Dialog>
  );
};
