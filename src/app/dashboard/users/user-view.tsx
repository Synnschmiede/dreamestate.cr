'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import * as React from 'react';

import { IconButton } from '@mui/material';
import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import PageLoader from 'src/components/PageLoader/PageLoader';
import { CustomFilterPopover } from 'src/components/core/custom-filter-popover';
import { DataTable } from 'src/components/data-table/data-table';
import { ConfirmationDialog } from 'src/components/dialog/confirmation-dialog';
import { Iconify } from 'src/components/iconify';
import { RefreshPlugin } from 'src/components/plugins/RefreshPlugin';
import { DashboardContent } from 'src/layouts/dashboard';
import { UserDialog } from './_components/user-dialog';
import { getUsersAsync, updateUserAsync } from './_lib/user.actions';
import { defaultUser, IUser } from './_lib/user.types';

export const UserView = () => {
  const [list, setList] = React.useState<IUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalData, setModalData] = React.useState<IUser | null>(null);
  const [deleteModalData, setDeleteModalData] = React.useState<IUser | null>(null);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState<IUser[]>([]);
  const [status, setStatus] = React.useState('');

  const handleOpenModal = (data: IUser) => {
    setOpenModal(true);
    setModalData(data);
  };

  const handleConfirm = () => {
    setOpenModal(false);
    // fetchUsersData();
    fetchList();
  };
  async function fetchList() {
    try {
      setLoading(true);
      const response = await getUsersAsync({
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

  const handleDelete = async () => {
    if (deleteModalData) {
      const res = await updateUserAsync({
        id: deleteModalData.id as string,
        role: deleteModalData.role,
        is_deleted: true,
        status: deleteModalData.status,
        contact_number: deleteModalData.contact_number,
      });
      if (res.success) {
        setDeleteModalData(null);
        fetchList();
      } else {
        setDeleteModalData(null);
      }
    }
  };

  React.useEffect(() => {
    fetchList();
  }, [pagination, status]);

  const columns = [
    {
      formatter: (row: IUser) => (
        <Stack direction="row">
          <IconButton title="Delete" onClick={() => setDeleteModalData(row)} color="error">
            <Iconify width={18} icon="proicons:delete" />
          </IconButton>
          <IconButton title="Edit" onClick={() => handleOpenModal(row)}>
            <Iconify width={18} icon="material-symbols:edit-rounded" />
          </IconButton>
        </Stack>
      ),
      name: 'Actions',
    },
    {
      formatter: (row: IUser) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <div>
            <Typography color="text.secondary" variant="body2" fontWeight={'bold'}>
              {row.first_name} {row.last_name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {row.email}
            </Typography>
          </div>
        </Stack>
      ),
      name: 'Name',
    },
    {
      formatter: (row: IUser) => (
        <Typography color="text.secondary" variant="body2">
          {row.contact_number}
        </Typography>
      ),
      name: 'Phone',
    },
    {
      formatter: (row: IUser) => (
        <Typography color="text.secondary" variant="body2">
          {row.role}
        </Typography>
      ),
      name: 'Role',
    },
    {
      formatter(row: IUser) {
        return dayjs(row.created_at).format('MMM D, YYYY h:mm A');
      },
      name: 'Created at',
    },
    {
      formatter: (row: IUser) => {
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
            <Typography variant="h4">Users</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<Iconify width={18} icon="material-symbols:add-rounded" />}
              variant="contained"
              onClick={() => handleOpenModal(defaultUser)}
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
                  onRowsPerPageChange={(pageNumber, rowsPerPage) =>
                    setPagination({ pageNo: pageNumber, limit: rowsPerPage })
                  }
                  onPageChange={(newPageNumber) =>
                    setPagination({ ...pagination, pageNo: newPageNumber })
                  }
                  onSelection={(selectedRows) => setSelectedRows?.(selectedRows)}
                />
                {!list?.length ? (
                  <Box sx={{ p: 3 }}>
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                      No customers found
                    </Typography>
                  </Box>
                ) : null}
              </React.Fragment>
            </Box>
          </Card>
        </PageLoader>
      </Stack>
      {openModal && (
        <UserDialog
          open={true}
          onClose={() => setOpenModal(false)}
          onConfirm={handleConfirm}
          data={modalData}
        />
      )}
      {deleteModalData && (
        <ConfirmationDialog
          open={true}
          onClose={() => setDeleteModalData(null)}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this user?"
        />
      )}
    </DashboardContent>
  );
};
