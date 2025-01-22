'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import RouterLink from 'next/link';

import Typography from '@mui/material/Typography';
import * as React from 'react';

import { LoadingButton } from '@mui/lab';
import { IconButton, Switch, TextField } from '@mui/material';
import Link from '@mui/material/Link';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { DataTable } from 'src/components/data-table/data-table';
import { Iconify } from 'src/components/iconify';
import { RefreshPlugin } from 'src/components/plugins/RefreshPlugin';
import TableSelectedAction from 'src/components/table/table-selected-action';
import { CONFIG } from 'src/config-global';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { getBlogs, updateBlogAsync } from './_lib/blog.actions';
import { IBlog } from './_lib/blog.types';

export const BlogView = () => {
    const [list, setList] = React.useState<IBlog[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [selectedRows, setSelectedRows] = React.useState<IBlog[]>([]);
    const [selectedRow, setSelectedRow] = React.useState<IBlog | null>(null);
    const [searchText, setSearchText] = React.useState('');

    console.log("selected rows: ", selectedRows);

    const searchTerm = useDebounce(searchText)

    console.log(searchTerm);
    const router = useRouter();

    const popover = usePopover();
    const deleteConfirm = useBoolean();

    async function fetchList() {
        try {
            setLoading(true);
            const response = await getBlogs([{ name: 'page', value: pagination.pageNo }, { name: 'limit', value: pagination.limit }, { name: 'searchTerm', value: searchTerm }]);
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

    const updatePublishedStatus = async () => {
        if (!selectedRow) return;
        setLoading(true);
        await updateBlogAsync(selectedRow.id, { published: !selectedRow.published });
        await fetchList();
        popover.onClose();
        setSelectedRow(null);
        setLoading(false);
    }

    const updateFeaturedStatus = async (selectedId: string, featuredStatus: boolean) => {
        console.log("inside of update featured", selectedId, featuredStatus);
        if (!selectedId) return;
        setLoading(true);
        await updateBlogAsync(selectedId, { featured: featuredStatus });
        await fetchList();
        popover.onClose();
        setLoading(false);
    }

    const handleDelete = async () => {
        console.log("selected row id", selectedRows.map((row) => row.id));
        deleteConfirm.onFalse();
        setSelectedRows([]);
    }

    React.useEffect(() => {
        fetchList();
    }, [pagination, searchTerm]);

    const columns = [
        {
            formatter: (row: IBlog) => (
                <Stack direction='row' alignItems='center' gap='4px'>
                    <IconButton title="Edit" onClick={() => router.push(paths.dashboard.edit_blog(row.id))}>
                        <Iconify width={18} icon="material-symbols:edit-rounded" />
                    </IconButton>
                    <IconButton
                        title="Featured"
                        onClick={() => updateFeaturedStatus(row.id, !row.featured)}>
                        {
                            row.featured ? (
                                <Iconify width={18} icon="material-symbols:star-rounded" sx={{ color: 'warning.main' }} />
                            ) : (
                                <Iconify width={18} icon="material-symbols:star-outline-rounded" />
                            )
                        }
                    </IconButton>
                </Stack>
            ),
            name: 'Actions',
        },
        {
            formatter: (row: IBlog) => (
                <Stack>
                    <Box component='img' src={`${CONFIG.bucketUrl}/${row.thumbnail}`} sx={{ width: '100px', height: '80px', objectFit: 'cover' }} />
                </Stack>
            ),
            name: 'Thumbnail',
        },
        {
            formatter: (row: IBlog) => (
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
            formatter(row: IBlog) {
                return <Typography variant='caption'>{`${row.author.first_name} ${row.author.last_name}`}</Typography>;
            },
            name: 'Author',
        },
        {
            formatter(row: IBlog) {
                return dayjs(row.created_at).format('MMM D, YYYY h:mm A');
            },
            name: 'Created at',
        },
        {
            formatter: (row: IBlog) => {
                return <Switch checked={row.published} onClick={(e) => {
                    setSelectedRow(row);
                    popover.onOpen(e);
                }} color="success" />
            },
            name: 'Published',
        },
    ];

    return (
        <>
            <DashboardContent>
                <Stack spacing={4}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={3}
                        sx={{ alignItems: 'flex-start' }}
                    >
                        <Box sx={{ flex: '1 1 auto' }}>
                            <Typography variant="h4">Blogs</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                startIcon={<Iconify width={18} icon="material-symbols:add-rounded" />}
                                variant="contained"
                                onClick={() => router.push(paths.dashboard.add_blog)}
                            >
                                Add
                            </Button>
                        </Box>
                    </Stack>
                    <Card>
                        {selectedRows?.length > 0 && (
                            <TableSelectedAction
                                action={deleteConfirm}
                                onConfirm={handleDelete}
                                totalSelected={selectedRows?.length}
                            />
                        )}
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
                                            <TextField size='small' onChange={(e) => setSearchText(e.target.value)} placeholder='Search...' />
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
                                    onSelection={(selectedRows: IBlog[]) => setSelectedRows?.(selectedRows)}
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
                </Stack>
            </DashboardContent>
            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                anchorEl={popover.anchorEl}
                slotProps={{ arrow: { placement: 'bottom-right' } }}
            >
                <Box sx={{ p: 2, maxWidth: 280 }}>
                    <Typography variant="subtitle1">
                        {selectedRow?.published ? 'Unpublish' : 'Publish'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: '4px' }}>
                        Are you sure want to {selectedRow?.published ? 'unnpublish' : 'publish'} this post?
                    </Typography>
                    <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            onClick={popover.onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <LoadingButton
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={updatePublishedStatus}
                            disabled={loading}
                            loading={loading}
                        >
                            Confirm
                        </LoadingButton>
                    </Stack>
                </Box>
            </CustomPopover></>
    );
};
