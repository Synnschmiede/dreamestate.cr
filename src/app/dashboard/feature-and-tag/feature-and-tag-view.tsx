'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import * as React from 'react';

import { Box, Chip, Divider } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { FeatureDialog } from './_components/feature-dialog';
import { FeatureGroupDialog } from './_components/feature-group-dialog';
import { TagDialog } from './_components/tag-dialog';
import { getUtilities } from './_lib/feature-and-tag-actions';
import { IUtilities, TDialogMode } from './_lib/feature-and-tag-types';

export const FeatureAndTagView = () => {
    const [data, setData] = React.useState<IUtilities | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [openFeatureGroupModal, setOpenFeatureGroupModal] = React.useState<TDialogMode | null>(null);
    const [openFeatureModal, setOpenFeatureModal] = React.useState<TDialogMode | null>(null);
    const [openTagModal, setOpenTagModal] = React.useState<TDialogMode | null>(null);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await getUtilities();
            if (response.success) {
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <DashboardContent>
                <Stack direction='column' gap={6} divider={<Divider />}>
                    {/* Feature Group */}
                    <Stack direction='column' gap={2}>
                        <Stack direction='row' justifyContent='space-between' alignItems='center' gap={2}>
                            <Typography variant="h4">Feature Group</Typography>
                            <Stack direction='row' gap={1}>
                                <Button
                                    startIcon={<Iconify width={18} icon="material-symbols:add-rounded" />}
                                    variant="contained"
                                    onClick={() => setOpenFeatureGroupModal('ADD')}
                                >
                                    Add
                                </Button>
                                <Button
                                    startIcon={<Iconify width={18} icon="tabler:edit" />}
                                    variant="outlined"
                                    onClick={() => setOpenFeatureGroupModal('EDIT')}
                                >
                                    Edit
                                </Button>
                                <Button
                                    startIcon={<Iconify width={18} icon="material-symbols:delete-outline-rounded" />}
                                    variant="contained"
                                    color='error'
                                    onClick={() => setOpenFeatureGroupModal('DELETE')}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack direction='row' gap={1} sx={{ flexWrap: 'wrap' }}>
                            {
                                data?.feature_groups.map((group) => (
                                    <Chip key={group.id} variant='outlined' label={group.name} sx={{ borderRadius: 4, px: 1 }} />
                                ))
                            }
                        </Stack>
                    </Stack>

                    {/* Feature */}
                    <Stack direction='column' gap={2}>
                        <Stack direction='row' justifyContent='space-between' alignItems='center' gap={2}>
                            <Typography variant="h4">Feature</Typography>
                            <Stack direction='row' gap={1}>
                                <Button
                                    startIcon={<Iconify width={18} icon="material-symbols:add-rounded" />}
                                    variant="contained"
                                    onClick={() => setOpenFeatureModal('ADD')}
                                >
                                    Add
                                </Button>
                                <Button
                                    startIcon={<Iconify width={18} icon="tabler:edit" />}
                                    variant="outlined"
                                    onClick={() => setOpenFeatureModal('EDIT')}
                                >
                                    Edit
                                </Button>
                                <Button
                                    startIcon={<Iconify width={18} icon="material-symbols:delete-outline-rounded" />}
                                    variant="contained"
                                    color='error'
                                    onClick={() => setOpenFeatureModal('DELETE')}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack direction='row' gap={1} sx={{ ml: 1 }}>
                            {
                                data?.feature_groups.map((group) => (
                                    group.feature.length > 0 && (
                                        <Box key={group.id} sx={{ width: { xs: '100%', md: '49%', lg: '24%' } }}>
                                            <Typography variant="h6" sx={{ mb: 1 }}>{group.name}</Typography>
                                            <Stack direction='column' gap={1} sx={{ flexWrap: 'wrap' }}>
                                                {
                                                    group.feature.map((f) => (
                                                        <Stack key={f.id} direction='row' alignItems='center' gap={0.5}>
                                                            <Iconify icon='radix-icons:dot' sx={{ width: 24, height: 24 }} />
                                                            <Typography>{f.name}</Typography>
                                                        </Stack>
                                                    ))
                                                }
                                            </Stack>
                                        </Box>
                                    )
                                ))
                            }
                        </Stack>
                    </Stack>

                    {/* Tag */}
                    <Stack direction='column' gap={2}>
                        <Stack direction='row' justifyContent='space-between' alignItems='center' gap={2}>
                            <Typography variant="h4">Tags</Typography>
                            <Stack direction='row' gap={1}>
                                <Button
                                    startIcon={<Iconify width={18} icon="material-symbols:add-rounded" />}
                                    variant="contained"
                                    onClick={() => setOpenTagModal('ADD')}
                                >
                                    Add
                                </Button>
                                <Button
                                    startIcon={<Iconify width={18} icon="tabler:edit" />}
                                    variant="outlined"
                                    onClick={() => setOpenTagModal('EDIT')}
                                >
                                    Edit
                                </Button>
                                <Button
                                    startIcon={<Iconify width={18} icon="material-symbols:delete-outline-rounded" />}
                                    variant="contained"
                                    color='error'
                                    onClick={() => setOpenTagModal('DELETE')}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack direction='row' gap={1} sx={{ flexWrap: 'wrap' }}>
                            {
                                data?.tags?.map((t) => (
                                    <Chip key={t.id} variant='outlined' label={t.name} sx={{ borderRadius: 4, px: 1 }} />
                                ))
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </DashboardContent>
            {openFeatureGroupModal && (
                <FeatureGroupDialog
                    open={true}
                    onClose={() => setOpenFeatureGroupModal(null)}
                    mode={openFeatureGroupModal}
                    fetchData={fetchData}
                    data={data?.feature_groups}
                />
            )}
            {openFeatureModal && (
                <FeatureDialog
                    open={true}
                    onClose={() => setOpenFeatureModal(null)}
                    mode={openFeatureModal}
                    fetchData={fetchData}
                    data={data?.feature_groups}
                />
            )}
            {openTagModal && (
                <TagDialog
                    open={true}
                    onClose={() => setOpenTagModal(null)}
                    mode={openTagModal}
                    fetchData={fetchData}
                    data={data?.tags}
                />
            )}
        </>
    );
};
