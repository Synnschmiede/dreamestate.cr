'use client';

import { useState } from 'react';

import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CustomFilterPopover } from 'src/components/core/custom-filter-popover';
import { FilterByValues } from 'src/components/core/filter-by-values';
import SearchBox from 'src/components/form-fields/search-box';
import { Iconify } from 'src/components/iconify';
import { showOptions } from 'src/utils/common';
import { categoriesOptions, generalFilterOptions, sortByTitle, sortOptions } from '../_lib/utils';

interface IFilterToolbarProps {
  view: string;
  handleChangeView: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void;
}

export const FilterToolbar = ({ view, handleChangeView }: IFilterToolbarProps) => {
  const searchParams = useSearchParams();
  const sortOrderLabel = searchParams.get('sortOrder') ? searchParams.get('sortOrder') === 'desc' ? 'NEWEST' : 'OLDEST' : '';

  const [categories, setCategories] = useState<string>(searchParams.get('city') || '');
  const [cities, setCities] = useState(searchParams.get('city') || '');
  const [sortBy, setSortBy] = useState(sortOrderLabel);
  const [show, setShow] = useState(searchParams.get('limit') || '');
  const [generalFilter, setGeneralFilter] = useState(searchParams.get('featured') ? 'featured' : 'relevance');

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

  const handleShow = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value.length) {
      params.set('limit', value);
      router.push(`${pathname}?${params.toString()}`);
    } else {
      params.delete('limit');
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`);
    }
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

  const handleGeneralFilter = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    switch (value) {
      case 'featured':
        params.set('featured', 'true');
        router.push(`${pathname}?${params.toString()}`);
        break;
      default:
        params.delete('featured');
        router.push(`${pathname}?${params.toString()}`);
        break;
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems='center'
      gap={2}
      sx={{
        boxShadow: (theme) => theme.customShadows.card,
        borderRadius: '8px',
        p: 2,
        width: '100%',
      }}
    >
      <SearchBox />
      <Stack direction='row' gap={1}>
        <CustomFilterPopover
          title={generalFilter.charAt(0).toUpperCase() + generalFilter.slice(1)}
          popoverComponent={
            <FilterByValues
              options={generalFilterOptions}
              onApply={(value) => {
                handleGeneralFilter(value);
                setGeneralFilter(value);
              }}
            />
          }
        />
        <CustomFilterPopover
          title="Search by Category"
          popoverComponent={
            <FilterByValues
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
        {/* <CustomFilterPopover
          title="Search by Cities"
          popoverComponent={
            <FilterByValues
              options={cityOptions}
              selectedOptions={cities}
              onApply={(newCities) => {
                handleFilter('city', newCities);
                setCities(newCities);
              }}
              multiple
            />
          }
        /> */}
        <CustomFilterPopover
          title={sortBy.length > 0 ? sortByTitle(sortBy) : 'Sort by'}
          popoverComponent={
            <FilterByValues
              options={sortOptions}
              onApply={(value) => {
                handleSort(value);
                setSortBy(value);
              }}
            />
          }
        />
        <CustomFilterPopover
          title={show.length > 0 ? show : 'Show'}
          popoverComponent={
            <FilterByValues
              options={showOptions}
              onApply={(value) => {
                handleShow(value);
                setShow(value);
              }}
            />
          }
        />
        <ToggleButtonGroup
          size="small"
          value={view}
          exclusive
          onChange={handleChangeView}
        >
          <ToggleButton title="List View" value="list">
            <Iconify icon="solar:list-bold" />
          </ToggleButton>

          <ToggleButton title="Grid View" value="grid">
            <Iconify icon="mingcute:dot-grid-fill" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};
