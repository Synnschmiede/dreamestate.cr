'use client';

import React from 'react';

import { Search } from '@mui/icons-material';
import { Box, Button, Container, Grid, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { pxToRem } from 'src/theme/styles';

import { RoundedButton } from 'src/components/button/rounded-button';
import { CustomSelect } from 'src/components/form-components/custom-select';
import { CustomTextField } from 'src/components/form-components/custom-textfield';
import { Iconify } from 'src/components/iconify';
import { SectionDescription } from 'src/components/section-description';
import { SectionTitle } from 'src/components/section-title';

export const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(assets/background/hero_bg_4_1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
      }}
    >
      <Grid container spacing={0} alignItems="center">
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              maxWidth: pxToRem(750),
              ml: 'auto',
              pr: { xs: 2, md: 4 },
              pl: { xs: 2, md: 0 },
              pt: { xs: 8, md: 0 },
              pb: { xs: 4, md: 0 },
            }}
          >
            <Typography
              variant="inherit"
              sx={{
                color: 'text.disabled',
                fontSize: { xs: '16px', sm: '20px', md: '24px' },
                fontWeight: 400,
                mb: { xs: 0, md: -2 },
              }}
            >
              Top-Notch Real Estate Properties
            </Typography>
            <Typography
              variant="inherit"
              sx={{
                color: 'text.secondary',
                fontWeight: 700,
                fontSize: { xs: pxToRem(40), sm: pxToRem(60), md: pxToRem(80) },
                mb: { xs: -2, md: -4 },
              }}
            >
              Find Your
            </Typography>
            <Typography
              variant="inherit"
              sx={{
                color: 'text.secondary',
                fontWeight: 700,
                fontSize: { xs: pxToRem(40), sm: pxToRem(60), md: pxToRem(80) },
              }}
            >
              Dream Home
            </Typography>
            <HeroSearchForm />
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box>
                <Typography variant="h2" sx={{ fontWeight: 500 }} color="text.secondary">
                  65k
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 18 }} color="text.secondary">
                  Satisfied Customers
                </Typography>
              </Box>
              <Box>
                <Typography variant="h2" sx={{ fontWeight: 500 }} color="text.secondary">
                  15k
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 18 }} color="text.secondary">
                  Verified Properties
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* Right Section */}
        <Grid
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
          item
          xs={12}
          md={6}
        >
          <Box
            sx={{
              backgroundImage: 'url(assets/home/hero_thumb_4_1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              minHeight: '600px',
              position: 'relative',
              overflow: 'hidden',
              borderBottomLeftRadius: '10px',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              },
            }}
          />
        </Grid>
      </Grid>

      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 10 }, pb: { xs: 6, md: 8 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <SectionTitle
              sx={{
                color: 'text.secondary',
              }}
            >
              1,230+ Companies
            </SectionTitle>
            <SectionTitle
              sx={{
                color: 'text.secondary',
              }}
            >
              Trust by us.
            </SectionTitle>
          </Grid>
          <Grid item xs={12} md={6}>
            <SectionDescription
              sx={{
                color: 'text.disabled',
                fontSize: { xs: pxToRem(16), sm: pxToRem(18), md: pxToRem(22) },
              }}
            >
              Turning homes become dreams as your go-to real estate agent. You can rely on us to
              help you safely home. 745,000 houses and flats for sale, rent, or mortgage.
            </SectionDescription>

            <RoundedButton
              endIcon={<Iconify width={22} icon="guidance:left-2-short-arrow" />}
              variant="contained"
              sx={{ mt: 2 }}
              handleClick={() => console.log('clicked')}
            >
              Request a Visit
            </RoundedButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// search form component
const HeroSearchForm = () => {
  const [value, setValue] = React.useState('');
  const handleInputChange = (event: any) => {
    setValue(event.target.value);
  };
  const theme = useTheme();
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        mb: 4,
        mt: { xs: 2, md: 0 },
        // background: theme.palette.custom.light_bg,
        backgroundColor: '#F1F4F5',
        borderRadius: { xs: 0, md: '8px 0 0 8px' },
      }}
    >
      <CustomTextField
        placeholder="Listing ID or Location"
        value={value}
        onChange={handleInputChange}
        name="listing"
      />
      <CustomSelect value={value} onChange={handleInputChange} displayEmpty>
        <MenuItem value="">Category</MenuItem>
        <MenuItem value="luxury">Luxury</MenuItem>
        <MenuItem value="commercial">Commercial</MenuItem>
      </CustomSelect>
      <CustomSelect value={value} onChange={handleInputChange} displayEmpty>
        <MenuItem value="">Location</MenuItem>
        <MenuItem value="luxury">Luxury</MenuItem>
        <MenuItem value="commercial">Commercial</MenuItem>
      </CustomSelect>
      <Button
        variant="contained"
        type="submit"
        sx={{
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          borderRadius: { xs: 0, md: '0 8px 8px 0' },
          ml: 'auto',
          width: { xs: '100%', md: '34%' },
          py: { xs: 2, md: 2 },
          backgroundColor: 'text.secondary',
        }}
        startIcon={<Search />}
      >
        Search Property
      </Button>
    </Box>
  );
};
