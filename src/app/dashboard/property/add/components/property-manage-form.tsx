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
import { useCallback, useState } from 'react';
import { Editor } from 'src/components/editor';
import { z } from 'zod';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ListItemField from 'src/components/form-fields/list-item-field';
import { Upload } from 'src/components/upload';

const validationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  property_type: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .nullable()
    .refine((data) => data !== null, {
      message: 'Property type is required',
    }),
  price: z
    .number({ invalid_type_error: 'Price is required' })
    .nonnegative('Price must be a positive number'),
  description: z.string(),
  property_details: z.object({
    area_size: z
      .number({ invalid_type_error: 'Area size must be a number' })
      .min(0, 'Size cannot be negative'),
  }),
});

const options = [
  { label: 'Apartment', value: 'APARTMENT' },
  { label: 'House', value: 'HOUSE' },
  { label: 'Villa', value: 'VILLA' },
  { label: 'Land', value: 'LAND' },
];

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
};

export default function PropertyManageForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const [file, setFile] = useState<File | string | null>(null);

  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    console.log('acceptedFiles', acceptedFiles);
    const newFile = acceptedFiles[0];
    console.log('new file: ', newFile);
    setFile(newFile);
  }, []);

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
                  onChange={(value) => setFieldValue('description', value)}
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
            <CardHeader title="Media Information" />
            <Grid item xs={12} sm={6} sx={{ p: 3 }}>
              <Upload
                value={file}
                onDrop={handleDropSingleFile}
                onDelete={() => setFile(null)}
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
