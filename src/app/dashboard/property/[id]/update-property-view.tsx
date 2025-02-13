'use client';


import { useEffect, useState } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';
import PropertyForm from '../_components/property-form';
import { getSingleProperty } from '../_lib/property.actions';
import { IProperty } from '../_lib/property.types';

export const UpdatePropertyView = ({ id }: { id: string }) => {
  const [data, setData] = useState<IProperty | undefined>(undefined);

  console.log(data, 'data.....');
  useEffect(() => {
    const getProperty = async () => {
      const res = await getSingleProperty(id);
      setData(res.data);
    }
    getProperty();
  }, [id])

  return (
    <DashboardContent>
      <PropertyForm value={data} />
    </DashboardContent>
  );
};
