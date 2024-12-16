'use client';

import { useState, useCallback } from 'react';

import { grey } from '@mui/material/colors';
import { Stack, Select, MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { Iconify } from 'src/components/iconify';

interface IFilterToolbarProps {
  view: string;
  handleChangeView: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void;
}

export const FilterToolbar = ({ view, handleChangeView }: IFilterToolbarProps) => {
  const [categories, setCategories] = useState('ALL');
  const [city, setCity] = useState('ALL');
  const [sortBy, setSortBy] = useState('DEFAULT');



  return (
    <Stack
      direction="row"
      gap={2}
      sx={{ border: `1px solid ${grey[300]}`, borderRadius: '8px', px: 4, py: 1, width: '100%' }}
    >
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        size="small"
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      >
        <MenuItem value="ALL">{categories === 'ALL' ? 'Categories' : 'All Categories'}</MenuItem>
        <MenuItem value="APARTMENT">Apartment</MenuItem>
        <MenuItem value="HOUSE">House</MenuItem>
        <MenuItem value="VILLA">Villa</MenuItem>
        <MenuItem value="LAND">Land</MenuItem>
      </Select>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        size="small"
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      >
        <MenuItem value="ALL">{city === 'ALL' ? 'City' : 'All Cities'}</MenuItem>
        <MenuItem value="dhaka">Dhaka</MenuItem>
        <MenuItem value="chittagong">Chittagong</MenuItem>
        <MenuItem value="rajshahi">Rajshahi</MenuItem>
        <MenuItem value="khulna">Khulna</MenuItem>
      </Select>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        size="small"
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      >
        <MenuItem value="DEFAULT">Default</MenuItem>
        <MenuItem value="price-high-to-low">Price (High to Low)</MenuItem>
        <MenuItem value="price-low-to-high">Price (Low to High)</MenuItem>
        <MenuItem value="newest-first">Newest first</MenuItem>
        <MenuItem value="oldest-first">Oldest first</MenuItem>
      </Select>
      <ToggleButtonGroup
        size="small"
        value={view}
        exclusive
        onChange={handleChangeView}
        sx={{ ml: 'auto' }}
      >
        <ToggleButton
          title="List View"
          value="list">
          <Iconify icon="solar:list-bold" />
        </ToggleButton>

        <ToggleButton
          title="Grid View"
          value="grid">
          <Iconify icon="mingcute:dot-grid-fill" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};
