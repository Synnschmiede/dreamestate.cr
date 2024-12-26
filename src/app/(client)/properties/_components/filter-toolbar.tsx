'use client';

import { useEffect, useState } from 'react';

import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { CustomFilterPopover } from 'src/components/core/custom-filter-popover';
import { ValuesSelector } from './filter-by-values';
import { Iconify } from 'src/components/iconify';
import { usePathname, useRouter } from 'next/navigation';

interface IFilterToolbarProps {
  view: string;
  handleChangeView: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void;
}

export const FilterToolbar = ({ view, handleChangeView }: IFilterToolbarProps) => {
  const [categories, setCategories] = useState<string>('');
  const [cities, setCities] = useState('');
  const [sortBy, setSortBy] = useState('');

  console.log('city: ', cities);
  console.log('categories: ', categories);

  const pathname = usePathname();
  const router = useRouter();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (key && value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSort = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    switch (value) {
      case 'PRICE_LOW_TO_HIGH':
        params.set('sortBy', 'price');
        params.set('sortOrder', 'asc');
        router.push(`${pathname}?${params.toString()}`);
        break;
      case 'PRICE_HIGH_TO_LOW':
        params.set('sortBy', 'price');
        params.set('sortOrder', 'desc');
        router.push(`${pathname}?${params.toString()}`);
        break;
      case 'NEWEST':
        params.set('sortBy', 'created_at');
        params.set('sortOrder', 'desc');
        router.push(`${pathname}?${params.toString()}`);
        break;
      case 'OLDEST':
        params.set('sortBy', 'created_at');
        params.set('sortOrder', 'asc');
        router.push(`${pathname}?${params.toString()}`);
        break;
      default:
        params.delete('sortBy');
        params.delete('sortOrder');
        router.push(`${pathname}?${params.toString()}`);
        break;
    }
  };

  useEffect(() => {
    router.replace(`${pathname}`);
  }, [pathname, router]);

  const categoriesOptions = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Apartment', value: 'APARTMENT' },
    { label: 'Villa', value: 'VILLA' },
    { label: 'House', value: 'HOUSE' },
    { label: 'Land', value: 'LAND' },
  ];

  const cityOptions = [
    { label: 'ALL', value: 'ALL' },
    { label: 'New York', value: 'new york' },
    { label: 'Los Angeles', value: 'los angeles' },
    { label: 'Chicago', value: 'chicago' },
    { label: 'Houston', value: 'houston' },
    { label: 'Miami', value: 'miami' },
  ];

  const sortOptions = [
    {
      label: 'Price (high → low)',
      value: 'PRICE_HIGH_TO_LOW',
    },
    {
      label: 'Price (low → high)',
      value: 'PRICE_LOW_TO_HIGH',
    },
    {
      label: 'Newest → Oldedst',
      value: 'NEWEST',
    },
    {
      label: 'Oldest → Newest',
      value: 'OLDEST',
    },
    {
      label: 'Default',
      value: 'DEFAULT',
    },
  ];

  const sortByTitle = (value: string) => {
    switch (value) {
      case 'PRICE_LOW_TO_HIGH':
        return 'Price (low → high)';
      case 'PRICE_HIGH_TO_LOW':
        return 'Price (high → low)';
      case 'NEWEST':
        return 'Newest → Oldedst';
      case 'OLDEST':
        return 'Oldest → Newest';
      default:
        return 'Default';
    }
  };

  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        boxShadow: (theme) => theme.customShadows.card,
        borderRadius: '8px',
        p: 2,
        width: '100%',
      }}
    >
      <CustomFilterPopover
        title="Search by Category"
        popoverComponent={
          <ValuesSelector
            options={categoriesOptions}
            selectedOptions={categories}
            onApply={(newCategories) => {
              handleFilter('category', newCategories);
              setCategories(newCategories);
            }}
            multiple
          />
        }
      />
      <CustomFilterPopover
        title="Search by Cities"
        popoverComponent={
          <ValuesSelector
            options={cityOptions}
            selectedOptions={cities}
            onApply={(newCities) => {
              handleFilter('city', newCities);
              setCities(newCities);
            }}
            multiple
          />
        }
      />
      <CustomFilterPopover
        title={sortBy.length > 0 ? sortByTitle(sortBy) : 'Sort by'}
        popoverComponent={
          <ValuesSelector
            options={sortOptions}
            onApply={(value) => {
              handleSort(value);
              setSortBy(value);
            }}
          />
        }
      />
      {/* <Select
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
      </Select> */}
      <ToggleButtonGroup
        size="small"
        value={view}
        exclusive
        onChange={handleChangeView}
        sx={{ ml: 'auto' }}
      >
        <ToggleButton title="List View" value="list">
          <Iconify icon="solar:list-bold" />
        </ToggleButton>

        <ToggleButton title="Grid View" value="grid">
          <Iconify icon="mingcute:dot-grid-fill" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};
