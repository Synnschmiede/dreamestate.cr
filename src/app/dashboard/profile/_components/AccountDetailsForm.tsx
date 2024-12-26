'use client';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import * as React from 'react';

import { useFormik } from 'formik';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import PageLoader from 'src/components/PageLoader/PageLoader';
import { Iconify } from 'src/components/iconify';
import { ImageUploader } from 'src/components/uploaders/ImageUploader';
import { pxToRem } from 'src/theme/styles';
import { getProfileData, updateProfileData } from '../_lib/actions';
import { defaultProfile } from '../_lib/types';

export function AccountDetailsForm() {
  const [loading, setLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

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
    initialValues: defaultProfile,
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      await updateProfileData(values);
      setLoading(false);
      setIsEditing(false);
    },
  });
  async function fetchProfileData() {
    setLoading(true);
    try {
      const response = await getProfileData();

      setValues(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <PageLoader loading={loading} error={null}>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              <Iconify
                icon="prime:user"
                width={44}
                sx={{
                  color: 'white',
                  backgroundColor: 'text.secondary',
                  borderRadius: '50%',
                  padding: 1,
                }}
              />
            </Avatar>
          }
          title="My profile"
          action={
            !isEditing && (
              <IconButton title="Edit" onClick={() => setIsEditing(true)}>
                <BorderColorIcon />
              </IconButton>
            )
          }
        />
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <ImageUploader
                  disabled={!isEditing}
                  value={values.profile_pic}
                  onFileSelect={(file) => setFieldValue('profile_pic', file)}
                />
              </Stack>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(errors.first_name)}>
                      {isEditing ? (
                        <TextField
                          name="first_name"
                          label="First Name"
                          value={values.first_name}
                          onChange={handleChange}
                        />
                      ) : (
                        <Box>
                          <Typography
                            color="text.primary"
                            sx={{ mb: 0.5, fontSize: pxToRem(17), fontWeight: 600 }}
                          >
                            {' '}
                            First Name
                          </Typography>
                          <Typography color="text.secondary">
                            {values.first_name || 'N/A'}
                          </Typography>
                        </Box>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                      {isEditing ? (
                        <TextField
                          name="last_name"
                          label="Last Name"
                          value={values.last_name}
                          onChange={handleChange}
                        />
                      ) : (
                        <Box>
                          <Typography
                            color="text.primary"
                            sx={{ mb: 0.5, fontSize: pxToRem(17), fontWeight: 600 }}
                          >
                            {' '}
                            Last Name
                          </Typography>
                          <Typography color="text.secondary">
                            {values.last_name || 'N/A'}
                          </Typography>
                        </Box>
                      )}
                    </FormControl>
                  </Grid>

                  {/* <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                      {isEditing ? (
                        <TextField
                          name="contact_no"
                          value={values.contact_no}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography color="text.secondary">{values.contact_no || 'N/A'}</Typography>
                      )}
                    </FormControl>
                  </Grid> */}

                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                      {isEditing ? (
                        <TextField
                          name="email"
                          label="Email"
                          value={values.email}
                          onChange={handleChange}
                          disabled
                        />
                      ) : (
                        <Box>
                          <Typography
                            color="text.primary"
                            sx={{ mb: 0.5, fontSize: pxToRem(17), fontWeight: 600 }}
                          >
                            {' '}
                            Email
                          </Typography>
                          <Typography color="text.secondary">{values.email || 'N/A'}</Typography>
                        </Box>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                      {isEditing ? (
                        <TextField
                          name="role"
                          label="Role"
                          value={values.role}
                          onChange={handleChange}
                          disabled
                        />
                      ) : (
                        <Box>
                          <Typography
                            color="text.primary"
                            sx={{ mb: 0.5, fontSize: pxToRem(17), fontWeight: 600 }}
                          >
                            {' '}
                            Role
                          </Typography>
                          <Typography color="text.secondary">{values.role || 'N/A'}</Typography>
                        </Box>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </CardContent>
          {isEditing && (
            <CardActions>
              <Button color="primary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Update
              </Button>
            </CardActions>
          )}
        </form>
      </Card>
    </PageLoader>
  );
}
