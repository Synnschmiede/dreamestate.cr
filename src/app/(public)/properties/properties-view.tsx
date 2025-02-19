'use client';
import { Grid } from '@mui/material';
import React from 'react';
import { getUtilities } from 'src/app/dashboard/feature-and-tag/_lib/feature-and-tag-actions';
import { IUtilities } from 'src/app/dashboard/feature-and-tag/_lib/feature-and-tag-types';
import PagePagination from 'src/components/pagination/page-pagination';
import { TMeta } from 'src/types/common';
import { FilterToolbar } from './_components/filter-toolbar';
import { PropertyGridView } from './_components/property-grid-view';
import { PropertyListView } from './_components/property-list-view';
import { PropertyRightPanel } from './_components/property-right-panel';
import { IProperty } from './_lib/property.interface';

type Props =
  { properties: IProperty[]; meta: TMeta }

export const PropertiesView = ({ properties, meta }: Props) => {
  const [propertyView, setPropertyView] = React.useState<string>('grid');
  const [data, setData] = React.useState<IUtilities | null>(null);

  async function fetchData() {
    try {
      const response = await getUtilities();
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  React.useEffect(() => {
    fetchData();
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
          {
            meta && meta.total > meta.limit && (
              <PagePagination meta={meta} />
            )
          }
        </Grid>

        {/* right panel widgets */}
        <Grid item xs={12} md={4}>
          {
            data && data.feature_groups?.length > 0 && (
              data.feature_groups?.map((feature_group) => (
                feature_group.feature?.length > 0 && (
                  <PropertyRightPanel key={feature_group.id} feature_group={feature_group} />
                )
              ))
            )
          }
        </Grid>
      </Grid>
    </>
  );
};
