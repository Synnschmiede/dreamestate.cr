import { Box, Button, ButtonGroup, Divider, Grid, Stack, Typography } from '@mui/material';

import { CustomChip } from 'src/components/custom-chip';
import { Iconify } from 'src/components/iconify';
import { TitledAvatar } from 'src/components/titled-avatar';
import { currencyFormatter } from 'src/utils/currency-view';
import { IconWithText } from '../../_components/icon-with-text';
import { IProperty } from '../_lib/property.interface';

export const PropertyListCard = ({ data }: { data: IProperty }) => {
  const {
    title,
    price,
    description,
    location,
    property_details,
    uploaded_by,
    feature_image,
    property_type,
  } = data;
  return (
    <Grid
      container
      sx={{
        height: '270px',
        borderRadius: '4px',
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.card,
          '& .property-image': {
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease-in-out',
          },
        },
      }}
    >
      {/* IMAGE SECTION */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      >
        <Box
          className="property-image"
          component="img"
          height="100%"
          width="100%"
          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${feature_image}`}
          alt="Property image"
          sx={{ objectFit: 'cover', borderRadius: { xs: '4px 4px 0 0', md: '4px 0 0 4px' } }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            // height: "150px",
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
            zIndex: 1,
          }}
        />

        <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 1 }}>
          <CustomChip label={property_type} color="info" size="small" />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            display: 'flex',
            alignItems: 'center',
            color: 'common.white',
            zIndex: 2,
            gap: 0.5,
          }}
        >
          <Iconify icon="mdi:camera" width={18} height={18} /> {6}
        </Box>
      </Grid>

      {/* CONTENT SECTION */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          backgroundColor: 'common.white',
          px: { xs: 2, md: 3 },
          pt: { xs: 2, md: 3 },
          borderRadius: { xs: '0 0 4px 4px', md: '0 4px 4px 0' },
        }}
      >
        <Stack direction='column' justifyContent='space-between' sx={{ height: '100%' }}>
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {currencyFormatter(price)}
            </Typography>
            {location && (
              <Stack direction='row' gap={1}>
                <Iconify icon="carbon:location" width={20} height={20} sx={{ color: 'text.secondary' }} />
                <Typography sx={{ color: 'text.secondary', mt: '-4px' }}>{`${location.street}`}</Typography>
              </Stack>
            )}
          </Box>

          {/* Icons Row */}
          <Box>
            {property_details && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'space-between', md: 'start' },
                  gap: 4,
                }}
              >
                {property_details?.bedroom > 0 && (
                  <IconWithText
                    icon="fluent:bed-16-regular"
                    text={`Bed ${property_details?.bedroom}`}
                  />
                )}
                {property_details?.bathroom > 0 && (
                  <IconWithText icon="tabler:bath" text={`Bath ${property_details?.bathroom}`} />
                )}
                {property_details?.area_size > 0 && (
                  <IconWithText
                    icon="hugeicons:square-arrow-expand-02"
                    text={`${property_details?.area_size} sqft`}
                  />
                )}
              </Box>
            )}

            <Divider sx={{ mx: 'auto', width: '100%', mb: 1, mt: 2 }} />

            {/* FOOTER SECTION */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pb: 2 }}>
              <TitledAvatar
                path={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${process.env.NEXT_PUBLIC_BUCKET_NAME}/${uploaded_by.profile_pic}`}
                title={`${uploaded_by.first_name} ${uploaded_by.last_name}`}
              />

              {/* Buttons */}
              <ButtonGroup
                sx={{
                  '& .MuiButton-root': {
                    borderColor: '#DDDDDD',
                    color: '#333',
                  },
                }}
                size="small"
              >
                <Button>
                  <Iconify icon="material-symbols:share" />
                </Button>
                <Button>
                  <Iconify icon="carbon:favorite" />
                </Button>
                <Button>
                  <Iconify icon="ic:baseline-plus" />
                </Button>
              </ButtonGroup>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};
