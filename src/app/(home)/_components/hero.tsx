"use client"

import React from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Grid, Button, MenuItem, Typography } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { CustomSelect } from 'src/components/form-components/custom-select';
import { CustomTextField } from 'src/components/form-components/custom-textfield';
import { Search } from '@mui/icons-material';


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
                            maxWidth: '650px',
                            ml: 'auto',
                            pr: { xs: 2, md: 4 },
                            pl: { xs: 2, md: 0 },
                            py: { xs: 8, md: 0 }
                        }}
                    >
                        <Typography variant="inherit"
                            sx={{
                                color: 'text.secondary',
                                fontSize: { xs: '16px', sm: '20px', md: '24px' },
                                fontWeight: 400,
                                mb: { xs: 0, md: -2 }
                            }}>
                            Top-Notch Real Estate Properties
                        </Typography>
                        <Typography
                            variant="inherit"
                            sx={{
                                color: 'text.main',
                                fontWeight: 700,
                                fontSize: { xs: pxToRem(40), sm: pxToRem(60), md: pxToRem(80) },
                                mb: { xs: -2, md: -4 }
                            }}
                        >
                            Find Your
                        </Typography>
                        <Typography
                            variant="inherit"
                            sx={{
                                color: 'text.main',
                                fontWeight: 700,
                                fontSize: { xs: pxToRem(40), sm: pxToRem(60), md: pxToRem(80) },
                            }}
                        >
                            Dream Home
                        </Typography>
                        <HeroSearchForm />
                        <Box sx={{ display: 'flex', gap: 4 }}>
                            <Box>
                                <Typography variant="h2" sx={{ fontWeight: 500 }}>
                                    65k
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: 18 }}>Satisfied Customers</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h2" sx={{ fontWeight: 500 }}>
                                    15k
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: 18 }}>Verified Properties</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                {/* Right Section */}
                <Grid
                    sx={{
                        display: { xs: 'none', md: 'block' },
                    }}
                    item xs={12} md={6}>
                    <Box
                        sx={{
                            backgroundImage: 'url(assets/home/hero_thumb_4_1.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '100%',
                            minHeight: '600px',
                            position: 'relative',
                            overflow: 'hidden',
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
        </Box>
    );
};


const HeroSearchForm = () => {
    const [value, setValue] = React.useState('');
    const handleInputChange = (event: any) => {
        setValue(event.target.value);
    }
    const theme = useTheme()
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // Stack items on mobile, row on larger screens
                gap: 2,
                mb: 4,
                background: theme.palette.custom.light_bg,

            }}
        >
            <CustomTextField
                placeholder="Listing ID or Location"
                value={value}
                onChange={handleInputChange}
                name="listing"
            />
            <CustomSelect
                value={value}
                onChange={handleInputChange}
                displayEmpty
            >
                <MenuItem value="">
                    Category
                </MenuItem>
                <MenuItem value="luxury">Luxury</MenuItem>
                <MenuItem value="commercial">Commercial</MenuItem>
            </CustomSelect>
            <CustomSelect
                value={value}
                onChange={handleInputChange}
                displayEmpty
            >
                <MenuItem value="">
                    Location
                </MenuItem>
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
                    borderTopLeftRadius: { xs: 0, md: 0 }, 
                    borderBottomLeftRadius: { xs: 0, md: 0 },
                    borderTopRightRadius: { xs: 0, md: 1 },
                    borderBottomRightRadius: { xs: 0, md: 1 },
                    ml: "auto",
                    width: { xs: '100%', md: '40%' }, 
                    py: { xs: 2, md: 2 },
                }}
                startIcon={<Search />}
            >
                Search Property
            </Button>
        </Box>
    )
}
