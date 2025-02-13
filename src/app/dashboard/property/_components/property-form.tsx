'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Editor } from 'src/components/editor';
import CustomAutocomplete from 'src/components/form-components/custom-autocomplete';
import { AutoCompleteWithAdding } from 'src/components/form-fields/auto-complete-with-adding';
import { UploadByModal } from 'src/components/modal/image-select-modal/upload-by-modal';
import { AuthContext } from 'src/contexts/AuthContext';
import { paths } from 'src/routes/paths';
import { getUtilities } from '../../feature-and-tag/_lib/feature-and-tag-actions';
import { IUtilities } from '../../feature-and-tag/_lib/feature-and-tag-types';
import { createPropertyAsync, updatePropertyAsync } from '../_lib/property.actions';
import { propertyTypeOptions } from '../_lib/property.constants';
import { propertyValidationSchema } from '../_lib/property.schema';
import { defaultProperty, IProperty } from '../_lib/property.types';

export default function PropertyForm({ value }: { value?: IProperty }) {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const [tagAndFeature, setTagAndFeature] = React.useState<IUtilities | null>(null);

  const tagOptions = tagAndFeature?.tags.map((t) => (
    {
      label: t.name,
      value: t.id
    }
  )) || [];

  const router = useRouter();

  // const handleLocationChange = (data: ILocationResponsePayload) => {
  //   if (data) {
  //     setFieldValue('location.address', data.address);
  //     setFieldValue('location.street', data.address);
  //     setFieldValue('location.postal_code', data.postalCode);
  //     setFieldValue('location.city', data.city);
  //     setFieldValue('location.state', data.state);
  //     setFieldValue('location.country', data.country);
  //     setFieldValue('location.latitude', data.latitude);
  //     setFieldValue('location.longitude', data.longitude);
  //   }
  // };

  const { handleChange, handleSubmit, values, setFieldValue, errors, touched, setValues } =
    useFormik({
      initialValues: defaultProperty,
      validate: (values) => {
        const result = propertyValidationSchema.safeParse(values);
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
        const res = value ? await updatePropertyAsync(value.id, values) : await createPropertyAsync(values);

        if (res?.success) {
          router.push(paths.dashboard.property);
          return;
        }
        setLoading(false);
        setSubmitSuccessful(true);
      },
    });

  const handleAddFeature = (featureID: string) => {
    values.features.includes(featureID)
      ? setFieldValue('features', values.features.filter((item: string) => item !== featureID))
      : setFieldValue('features', [...values.features, featureID]);
  }

  React.useEffect(() => {
    if (value) {
      const preSelectedFeature = value.features?.map((feature: any) => feature.id)
      setValues(value);
      setFieldValue('features', preSelectedFeature)
    }
  }, [value]);

  React.useEffect(() => {
    if (userInfo) {
      setFieldValue('contact_info.name', userInfo.name);
      setFieldValue('contact_info.email', userInfo.email);
      setFieldValue('contact_info.phone', userInfo.contact_number);
    }
  }, [userInfo]);

  React.useEffect(() => {
    const getUtilitiesData = async () => {
      const res = await getUtilities();
      if (res?.data) {
        setTagAndFeature(res.data);
      }
    }
    getUtilitiesData();
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
          Add new property
        </Alert>
        <Stack direction="column" gap={5}>
          {/* Basic Information */}
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
                <CustomAutocomplete
                  options={propertyTypeOptions}
                  setFieldValue={setFieldValue}
                  value={values.property_type}
                  error={errors.property_type}
                  fieldName="property_type"
                  label="Property Type"
                  touched={touched}
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
                  value={values.description}
                  onChange={(value: any) => setFieldValue('description', value)}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  resetValue={isSubmitSuccessful}
                  placeholder="Write something about the property..."
                />
              </Grid>
            </Grid>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader title="Property details" />
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="property_details.area_size"
                  label="Area Size"
                  type="number"
                  value={values.property_details?.area_size}
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
                  name="property_details.parking_spot"
                  label="Parking spot"
                  type="number"
                  value={values.property_details.parking_spot}
                  onChange={handleChange}
                  error={
                    touched.property_details?.parking_spot &&
                    Boolean((errors as any)['property_details.parking_spot'])
                  }
                  helperText={
                    touched.property_details?.parking_spot && (errors as any)['property_details.parking_spot']
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {
                  tagOptions?.length > 0 && (
                    <AutoCompleteWithAdding name='tags' label='Select tags' placeholder='Tags' options={tagOptions} values={values.tags} setFieldValue={setFieldValue} />
                  )
                }
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

          {/* Location */}
          <Card>
            <CardHeader title="Location" />
            <Grid container spacing={2} sx={{ p: 3 }}>
              {/* <Grid item xs={12} sx={{ zIndex: 1000 }}>
                <LocationAutoComplete
                  id="address"
                  variant="outlined"
                  type="text"
                  fullWidth
                  value={''}
                  onLocationChange={handleLocationChange}
                />
              </Grid> */}
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

          {/* Features */}
          <Card sx={{ overflow: 'visible', zIndex: 900 }}>
            <CardHeader title="Features" />
            <Grid container spacing={2} sx={{ p: 3 }}>
              {
                tagAndFeature && tagAndFeature.feature_groups?.length ? (
                  tagAndFeature.feature_groups.map((group) => (
                    <Grid item xs={12} md={6} key={group.id}>
                      <Typography variant='caption' sx={{ fontSize: '1.1rem' }}>{group.name}</Typography>
                      <FormGroup sx={{ ml: 1 }}>
                        {
                          group.feature.map((item) => {
                            const isChecked = values.features.includes(item.id)
                            return <FormControlLabel key={item.id} control={<Checkbox checked={isChecked} onChange={() => handleAddFeature(item.id)} />} label={item.name} />
                          })
                        }
                      </FormGroup>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography variant='caption' sx={{ fontSize: '1.1rem' }}>No feature found</Typography>
                  </Grid>
                )
              }
              {/* {
                featuresGroup.length > 0 ? (
                  featuresGroup.map((group) => (
                    <Grid key={group.type} item xs={12} sm={6}>
                      <Typography variant='caption' sx={{ fontSize: '1.1rem' }}>{group.type}</Typography>
                      <FormGroup sx={{ ml: 1 }}>
                        {
                          group.features.map((item) => {
                            const isChecked = values.features.interior_details.includes(item.title) || values.features.outdoor_details.includes(item.title) || values.features.utilities.includes(item.title) || values.features.other_features.includes(item.title)
                            return <FormControlLabel key={item.id} control={<Checkbox checked={isChecked} onChange={() => handleAddFeature(item.type, item.title)} />} label={item.title} />
                          })
                        }
                      </FormGroup>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography variant='caption' sx={{ fontSize: '1.1rem' }}>Interior Feature</Typography>
                  </Grid>
                )
              } */}
              {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}
            </Grid>
          </Card>

          {/* Contact Information */}
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

          {/* Media Information */}
          <Card>
            <CardHeader title="Media Information" />
            <Grid item xs={12} sm={6} sx={{ p: 3 }}>
              <UploadByModal
                values={[values.feature_image]}
                onSelectValues={(paths) => setFieldValue("feature_image", paths[0])}
                errorMessage={touched.feature_image && errors.feature_image ? errors.feature_image : ''}
                modalTitle='Select feature image'
                placeholderHeading='Select feature image'
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 3 }}>
              <UploadByModal
                values={values.images}
                onSelectValues={(paths) => setFieldValue("images", paths)}
                modalTitle='Select additional image'
                placeholderHeading='Select additional image'
                multiple
              />
            </Grid>
          </Card>
          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={loading}>
              Save
            </Button>
          </Stack>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}
