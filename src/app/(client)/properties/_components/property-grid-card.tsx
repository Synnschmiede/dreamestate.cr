import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import { CustomChip } from 'src/components/custom-chip';
import { Iconify } from 'src/components/iconify';
import { TitledAvatar } from 'src/components/titled-avatar';
import { currencyFormatter } from 'src/utils/currency-view';
import { IconWithText } from '../../_components/icon-with-text';
import { IProperty } from '../_lib/property.interface';

export const PropertyGridCard = ({ data }: { data: IProperty }) => {
  const {
    title,
    description,
    location,
    property_details,
    uploaded_by,
    feature_image,
    property_type,
  } = data;
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        boxShadow: 3,
        overflow: 'hidden',
        height: '100%',
        marginBottom: 1,
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.card,
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease-in-out',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
        <CardMedia
          component="img"
          height="250"
          image={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${feature_image}`}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
            zIndex: 1,
          }}
        />
        <CustomChip
          label={property_type}
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 2,
            color: 'common.white',
            zIndex: 2,
            gap: 0.5,
          }}
        >
          <Iconify icon="mdi:camera" width={18} height={18} /> {6}
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h5" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ my: 1 }}>
          {currencyFormatter(data?.price)}
        </Typography>
        {location && (
          <Stack direction='row' gap={1}>
            <Iconify icon="carbon:location" width={20} height={20} sx={{ color: 'text.secondary' }} />
            <Typography sx={{ color: 'text.secondary', mt: '-4px' }}>{`${location.street}`}</Typography>
          </Stack>
        )}
        {property_details && (
          <Box
            sx={{
              marginTop: 2,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
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
      </CardContent>

      <Divider
        sx={{
          mx: 'auto',
          width: '80%',
        }}
      />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4, py: 2 }}
      >
        <TitledAvatar
          path="/assets/home/avatar.jpg"
          title={`${uploaded_by?.first_name} ${uploaded_by?.last_name}`}
        />
        <ButtonGroup
          sx={{
            '& .MuiButton-root': {
              borderColor: '#DDDDDD',
              color: '#333',
            },
          }}
          size="small"
        >
          <Button key="one">
            <Iconify icon="material-symbols:share" />
          </Button>
          <Button key="two">
            <Iconify icon="carbon:favorite" />
          </Button>
          <Button key="three">
            <Iconify icon="ic:baseline-plus" />
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  );
};
