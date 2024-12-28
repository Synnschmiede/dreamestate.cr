'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import RouterLink from 'next/link';

import Typography from '@mui/material/Typography';
import * as React from 'react';

import { IconButton } from '@mui/material';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import PageLoader from 'src/components/PageLoader/PageLoader';
import { CustomFilterPopover } from 'src/components/core/custom-filter-popover';
import { DataTable } from 'src/components/data-table/data-table';
import { Iconify } from 'src/components/iconify';
import { RefreshPlugin } from 'src/components/plugins/RefreshPlugin';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { getProperty } from './_lib/property.actions';
import { IProperty } from './_lib/property.types';

export const PropertyView = () => {
  const [list, setList] = React.useState<IProperty[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState<IProperty[]>([]);
  const [status, setStatus] = React.useState('');
  const router = useRouter();

  async function fetchList() {
    try {
      setLoading(true);
      const response = await getProperty({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
        status: status,
      });
      if (response.success) {
        setList(response.data);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleConfirm = () => {
    setOpenModal(false);
    // fetchUsersData();
    fetchList();
  };

  React.useEffect(() => {
    fetchList();
  }, [pagination, status]);

  const columns = [
    {
      formatter: (row: IProperty) => (
        <IconButton title="Edit" onClick={() => router.push(paths.dashboard.edit_property(row.id))}>
          <Iconify width={18} icon="material-symbols:edit-rounded" />
        </IconButton>
      ),
      name: 'Actions',
    },
    {
      formatter: (row: IProperty) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <div>
            <Link
              color="inherit"
              component={RouterLink}
              href={paths.dashboard.edit_property(row.id)}
              sx={{ whiteSpace: 'nowrap' }}
              variant="subtitle2"
            >
              {row.title}
            </Link>
          </div>
        </Stack>
      ),
      name: 'Title',
    },
    {
      formatter: (row: IProperty) => (
        <Typography color="text.secondary" variant="body2">
          {row.price}
        </Typography>
      ),
      name: 'Price',
    },
    {
      formatter: (row: IProperty) => (
        <Typography color="text.secondary" variant="body2">
          {row.location?.city}
        </Typography>
      ),
      name: 'City',
    },
    {
      formatter: (row: IProperty) => (
        <Typography color="text.secondary" variant="body2">
          {row.location?.country}
        </Typography>
      ),
      name: 'Country',
    },
    {
      formatter(row: IProperty) {
        return dayjs(row.created_at).format('MMM D, YYYY h:mm A');
      },
      name: 'Created at',
    },
    {
      formatter: (row: IProperty) => {
        return <Chip label={row.status} size="small" variant="outlined" />;
      },
      name: 'Status',
    },
  ];

  return (
    <DashboardContent>
      <Stack spacing={4}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          sx={{ alignItems: 'flex-start' }}
        >
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Properties</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<Iconify width={18} icon="material-symbols:add-rounded" />}
              variant="contained"
              onClick={() => router.push(paths.dashboard.add_property)}
            >
              Add
            </Button>
          </Box>
        </Stack>
        <PageLoader loading={loading} error={null}>
          <Card>
            <Box sx={{ overflowX: 'auto' }}>
              <React.Fragment>
                <DataTable
                  isPagination={true}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={pagination.limit}
                  pageNo={pagination.pageNo}
                  columns={columns}
                  rows={list}
                  uniqueRowId="id"
                  selectionMode="multiple"
                  leftItems={
                    <>
                      <CustomFilterPopover
                        title="Search by Category"
                        popoverComponent={<Box>Todo: add search by category</Box>}
                      />
                      <RefreshPlugin onClick={fetchList} />
                    </>
                  }
                  rightItems={<></>}
                  onRowsPerPageChange={(pageNumber: number, rowsPerPage: number) =>
                    setPagination({ pageNo: pageNumber, limit: rowsPerPage })
                  }
                  onPageChange={(newPageNumber) =>
                    setPagination({ ...pagination, pageNo: newPageNumber })
                  }
                  onSelection={(selectedRows: IProperty[]) => setSelectedRows?.(selectedRows)}
                />
                {!list?.length ? (
                  <Box sx={{ p: 3 }}>
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                      No data found
                    </Typography>
                  </Box>
                ) : null}
              </React.Fragment>
            </Box>
          </Card>
        </PageLoader>
      </Stack>
    </DashboardContent>
  );
};
