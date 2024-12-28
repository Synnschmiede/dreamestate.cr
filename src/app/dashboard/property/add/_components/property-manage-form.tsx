'use client';

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Editor } from 'src/components/editor';
import { z } from 'zod';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ListItemField from 'src/components/form-fields/list-item-field';
import { Upload } from 'src/components/upload';
import {
  ILocationResponsePayload,
  LocationAutoComplete,
} from 'src/components/form-fields/location-auto-complete';
import { AuthContext } from 'src/contexts/AuthContext';

const validationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z
    .number({ invalid_type_error: 'Price is required' })
    .nonnegative('Price must be a positive number'),
  description: z.string(),
  property_details: z.object({
    area_size: z
      .number({ invalid_type_error: 'Area size must be a number' })
      .min(0, 'Size cannot be negative'),
  }),
  location: z.object({
    street: z.string({ required_error: 'Street is required' }).min(1, 'Street is required'),
    city: z.string({ required_error: 'City is required' }).min(1, 'City is required'),
  }),
  contact_info: z.object({
    email: z.string().min(1, 'Email is required'),
  }),
});

const options = [
  { label: 'Apartment', value: 'APARTMENT' },
  { label: 'House', value: 'HOUSE' },
  { label: 'Villa', value: 'VILLA' },
  { label: 'Land', value: 'LAND' },
];

export default function PropertyManageForm() {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const handleLocationChange = (data: ILocationResponsePayload) => {
    if (data) {
      setFieldValue('location.address', data.address);
      setFieldValue('location.street', data.address);
      setFieldValue('location.postal_code', data.postalCode);
      setFieldValue('location.city', data.city);
      setFieldValue('location.state', data.state);
      setFieldValue('location.country', data.country);
      setFieldValue('location.latitude', data.latitude);
      setFieldValue('location.longitude', data.longitude);
    }
  };

  const defaultPropertyValue = {
    title: '',
    property_type: null,
    price: '',
    description: '',
    property_details: {
      area_size: '',
      property_lot_size: '',
      price_info: '',
      structure_type: '',
      room: '',
      bedroom: '',
      bathroom: '',
      garage: '',
      garage_size: '',
      available_from: null,
      build_year: null,
    },
    features: {
      interior_details: [],
      outdoor_details: [],
      utilities: [],
      other_features: [],
    },
    feature_image: null,
    images: [],
    location: {
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      street: '',
      latitude: '',
      longitude: '',
    },
    tags: [],
    contact_info: {
      name: userInfo?.name || '',
      email: userInfo?.email || '',
      phone: userInfo?.contact_number || '',
    },
  };

  const { handleChange, handleSubmit, values, setFieldValue, errors, touched } = useFormik({
    initialValues: defaultPropertyValue,
    validate: (values) => {
      const result = validationSchema.safeParse(values);
      if (result.success) {
        return {};
      } else {
        const fieldErrors: any = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path.join('.');
          fieldErrors[path] = issue.message;
        });
        return fieldErrors;
      }
    },
    onSubmit: async (values) => {
      setLoading(true);
      console.log('submitted values', values);
      setLoading(false);
      setSubmitSuccessful(true);
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
          Property creation alert
        </Alert>
        <Stack direction="column" gap={5}>
          <Card>
            <CardHeader title="Basic Information" />
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={options}
                  getOptionLabel={(option) => option.label}
                  value={values.property_type}
                  onChange={(event, newValue) => {
                    setFieldValue('property_type', newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Property Type"
                      error={touched.property_type && Boolean(errors.property_type)}
                      helperText={
                        touched.property_type && errors.property_type
                          ? errors.property_type || errors.property_type
                          : ''
                      }
                    />
                  )}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  label="Price"
                  placeholder="0.00"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box component="span" sx={{ color: 'text.disabled' }}>
                          $
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor
                  onChange={(value: any) => setFieldValue('description', value)}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  resetValue={isSubmitSuccessful}
                  placeholder="Write something about the property..."
                />
              </Grid>
            </Grid>
          </Card>
          <Card>
            <CardHeader title="Property details" />
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="property_details.area_size"
                  label="Area Size"
                  type="number"
                  value={values.property_details.area_size}
                  onChange={handleChange}
                  error={
                    touched.property_details?.area_size &&
                    Boolean((errors as any)['property_details.area_size'])
                  }
                  helperText={
                    touched.property_details?.area_size &&
                    (errors as any)['property_details.area_size']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="property_details.property_lot_size"
                  label="Property lot size"
                  value={values.property_details.property_lot_size}
                  onChange={handleChange}
                  error={
                    touched.property_details?.property_lot_size &&
                    Boolean((errors as any)['property_details.property_lot_size'])
                  }
                  helperText={
                    touched.property_details?.property_lot_size &&
                    (errors as any)['property_details.property_lot_size']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="property_details.structure_type"
                  label="Structure type"
                  value={values.property_details.structure_type}
                  onChange={handleChange}
                  error={
                    touched.property_details?.structure_type &&
                    Boolean((errors as any)['property_details.structure_type'])
                  }
                  helperText={
                    touched.property_details?.structure_type &&
                    (errors as any)['property_details.structure_type']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="property_details.price_info"
                  label="Price info"
                  value={values.property_details.price_info}
                  onChange={handleChange}
                  error={
                    touched.property_details?.price_info &&
                    Boolean((errors as any)['property_details.price_info'])
                  }
                  helperText={
                    touched.property_details?.price_info &&
                    (errors as any)['property_details.price_info']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="property_details.room"
                  label="Room"
                  type="number"
                  value={values.property_details.room}
                  onChange={handleChange}
                  error={
                    touched.property_details?.room &&
                    Boolean((errors as any)['property_details.room'])
                  }
                  helperText={
                    touched.property_details?.room && (errors as any)['property_details.room']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="property_details.bedroom"
                  label="Bedroom"
                  type="number"
                  value={values.property_details.bedroom}
                  onChange={handleChange}
                  error={
                    touched.property_details?.bedroom &&
                    Boolean((errors as any)['property_details.bedroom'])
                  }
                  helperText={
                    touched.property_details?.bedroom && (errors as any)['property_details.bedroom']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="property_details.bathroom"
                  label="Bathroom"
                  type="number"
                  value={values.property_details.bathroom}
                  onChange={handleChange}
                  error={
                    touched.property_details?.bathroom &&
                    Boolean((errors as any)['property_details.bathroom'])
                  }
                  helperText={
                    touched.property_details?.bathroom &&
                    (errors as any)['property_details.bathroom']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="property_details.garage"
                  label="Garage"
                  type="number"
                  value={values.property_details.garage}
                  onChange={handleChange}
                  error={
                    touched.property_details?.garage &&
                    Boolean((errors as any)['property_details.garage'])
                  }
                  helperText={
                    touched.property_details?.garage && (errors as any)['property_details.garage']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="property_details.garage_size"
                  label="Garage Size"
                  value={values.property_details.garage_size}
                  onChange={handleChange}
                  error={
                    touched.property_details?.garage_size &&
                    Boolean((errors as any)['property_details.garage_size'])
                  }
                  helperText={
                    touched.property_details?.garage_size &&
                    (errors as any)['property_details.garage_size']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ListItemField
                  name="tags"
                  label="Tags"
                  setFieldValue={setFieldValue}
                  values={values.tags}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  views={['year']}
                  label="Build year"
                  value={
                    values.property_details.build_year
                      ? dayjs(values.property_details.build_year)
                      : null
                  }
                  onChange={(newValue) => {
                    setFieldValue(
                      'property_details.build_year',
                      newValue ? newValue?.format('YYYY') : ''
                    );
                  }}
                  sx={{ width: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Available from"
                  value={
                    values.property_details.available_from
                      ? dayjs(values.property_details.available_from)
                      : null
                  }
                  onChange={(newValue) => {
                    setFieldValue(
                      'property_details.available_from',
                      newValue ? newValue?.format('YYYY-MM-DD') : ''
                    );
                  }}
                  sx={{ width: 1 }}
                />
              </Grid>
            </Grid>
          </Card>
          <Card>
            <CardHeader title="Location" />
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12} sx={{ zIndex: 1000 }}>
                <LocationAutoComplete
                  id="address"
                  variant="outlined"
                  type="text"
                  fullWidth
                  value={values.location.address}
                  onLocationChange={handleLocationChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location.street"
                  label="Street"
                  value={values.location.street}
                  onChange={handleChange}
                  error={
                    touched.location?.street &&
                    values.location.street.length === 0 &&
                    Boolean((errors as any)['location.street'])
                  }
                  helperText={
                    touched.location?.street &&
                    values.location.street.length === 0 &&
                    (errors as any)['location.street']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="location.postal_code"
                  label="Postal code"
                  value={values.location.postal_code}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="location.city"
                  label="City"
                  value={values.location.city}
                  onChange={handleChange}
                  error={
                    touched.location?.city &&
                    values.location.city.length === 0 &&
                    Boolean((errors as any)['location.city'])
                  }
                  helperText={
                    touched.location?.city &&
                    values.location.city.length === 0 &&
                    (errors as any)['location.city']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="location.state"
                  label="State"
                  value={values.location.state}
                  onChange={handleChange}
                  error={
                    touched.location?.state &&
                    values.location.state.length === 0 &&
                    Boolean((errors as any)['location.state'])
                  }
                  helperText={
                    touched.location?.state &&
                    values.location.state.length === 0 &&
                    (errors as any)['location.state']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="location.country"
                  label="Country"
                  value={values.location.country}
                  onChange={handleChange}
                  error={
                    touched.location?.country &&
                    values.location.country.length === 0 &&
                    Boolean((errors as any)['location.country'])
                  }
                  helperText={
                    touched.location?.country &&
                    values.location.country.length === 0 &&
                    (errors as any)['location.country']
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ overflow: 'visible', zIndex: 900 }}>
            <CardHeader title="Features" />
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12} sm={6}>
                <ListItemField
                  name="features.interior_details"
                  label="Interior features"
                  setFieldValue={setFieldValue}
                  values={values.features.interior_details}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItemField
                  name="features.outdoor_details"
                  label="Outdoor features"
                  setFieldValue={setFieldValue}
                  values={values.features.outdoor_details}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItemField
                  name="features.utilities"
                  label="Utilities"
                  setFieldValue={setFieldValue}
                  values={values.features.utilities}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItemField
                  name="features.other_features"
                  label="Others features"
                  setFieldValue={setFieldValue}
                  values={values.features.other_features}
                />
              </Grid>
            </Grid>
          </Card>
          <Card>
            <CardHeader title="Contact Information" />
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12}>
                <TextField
                  name="contact_info.name"
                  label="Name"
                  value={values.contact_info.name}
                  onChange={handleChange}
                  error={
                    touched.contact_info?.name && Boolean((errors as any)['contact_info.name'])
                  }
                  helperText={touched.contact_info?.name && (errors as any)['contact_info.name']}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="contact_info.email"
                  label="Email"
                  value={values.contact_info.email}
                  onChange={handleChange}
                  error={
                    touched.contact_info?.email && Boolean((errors as any)['contact_info.email'])
                  }
                  helperText={touched.contact_info?.email && (errors as any)['contact_info.email']}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="contact_info.phone"
                  label="Phone"
                  value={values.contact_info.phone}
                  onChange={handleChange}
                  error={
                    touched.contact_info?.phone && Boolean((errors as any)['contact_info.phone'])
                  }
                  helperText={touched.contact_info?.phone && (errors as any)['contact_info.phone']}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Card>
          <Card>
            <CardHeader title="Media Information" />
            <Grid item xs={12} sm={6} sx={{ p: 3 }}>
              <Upload
                value={values.feature_image}
                onDrop={(files) => setFieldValue('feature_image', files[0])}
                onDelete={() => setFieldValue('feature_image', null)}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 3 }}>
              <Upload
                value={values.images}
                onDrop={(files) => setFieldValue('images', files)}
                onRemove={(file) =>
                  setFieldValue(
                    'images',
                    values.images.filter((f) => f !== file)
                  )
                }
                multiple
              />
            </Grid>
          </Card>
          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={loading}>
              Add Property
            </Button>
          </Stack>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
