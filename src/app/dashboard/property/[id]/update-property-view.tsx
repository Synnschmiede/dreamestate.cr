'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';
import { DashboardContent } from 'src/layouts/dashboard';
import PropertyForm from '../_components/property-form';
import { IProperty } from '../_lib/property.types';

export const UpdatePropertyView = ({ data }: { data: IProperty }) => {
  const router = useRouter();

  return (
    <DashboardContent>
      <PropertyForm value={data} />
    </DashboardContent>
  );
};
