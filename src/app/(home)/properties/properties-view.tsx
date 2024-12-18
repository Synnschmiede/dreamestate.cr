'use client';
import { Grid, Pagination } from '@mui/material';
import React from 'react';
import { FilterToolbar } from './_components/filter-toolbar';
import { PropertyCountByCategory } from './_components/property-count-by-category';
import { PropertyGridView } from './_components/property-grid-view';
import { PropertyListView } from './_components/property-list-view';
import { IProperty } from './_lib/property.interface';

export const PropertiesView = ({ properties }: { properties: IProperty[] }) => {
  const [propertyView, setPropertyView] = React.useState<string>('grid');
  const handleChangeView = React.useCallback(
    (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
      if (newView !== null) {
        setPropertyView(newView);
        localStorage.setItem('propertyView', newView);
      }
    },
    []
  );

  React.useEffect(() => {
    const view = localStorage.getItem('propertyView');
    if (view) {
      setPropertyView(view);
    }
  }, []);

  return (
    <>
      <FilterToolbar view={propertyView} handleChangeView={handleChangeView} />
      <Grid container spacing={2} sx={{ my: { xs: 1, md: 2 } }}>
        {/* property list */}
        <Grid item xs={12} md={8}>
          {propertyView === 'list' ? (
            <PropertyListView data={properties} />
          ) : (
            <PropertyGridView data={properties} />
          )}
          <Pagination sx={{ mt: 2 }} count={5} variant="outlined" shape="rounded" />
        </Grid>

        {/* right panel widgets */}
        <Grid item xs={12} md={4}>
          <PropertyCountByCategory
            title="List by Categories"
            dataArr={[
              {
                key: 'Apartments',
                value: 30,
              },
              {
                key: 'Villas',
                value: 30,
              },
              {
                key: 'Retail',
                value: 30,
              },
              {
                key: 'Houses',
                value: 10,
              },
              {
                key: 'Condos',
                value: 21,
              },
            ]}
          />
          <PropertyCountByCategory
            title="List by Types"
            dataArr={[
              {
                key: 'Sales',
                value: 30,
              },
              {
                key: 'Rentals',
                value: 30,
              },
              {
                key: 'Invest',
                value: 30,
              },
            ]}
          />
          <PropertyCountByCategory
            title="List by Cities"
            dataArr={[
              {
                key: 'Jersey City',
                value: 30,
              },
              {
                key: 'New York',
                value: 30,
              },
            ]}
          />
          <PropertyCountByCategory
            title="List by Areas"
            dataArr={[
              {
                key: 'Bayonne',
                value: 30,
              },
              {
                key: 'Greenwich Village',
                value: 30,
              },
              {
                key: 'Manhattan',
                value: 30,
              },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};
