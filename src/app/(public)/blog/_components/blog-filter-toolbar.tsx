'use client';

import { useState } from 'react';

import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CustomFilterPopover } from 'src/components/core/custom-filter-popover';
import { FilterByValues } from 'src/components/core/filter-by-values';
import SearchBox from 'src/components/form-fields/search-box';
import { Iconify } from 'src/components/iconify';
import { showOptions } from 'src/utils/common';
import { sortByTitle, sortOptions } from '../_lib/utils';

interface IFilterToolbarProps {
    view: string;
    handleChangeView: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void;
}

export const BlogFilterToolbar = ({ view, handleChangeView }: IFilterToolbarProps) => {
    const searchParams = useSearchParams();
    const sortOrderLabel = searchParams.get('sortOrder') ? searchParams.get('sortOrder') === 'desc' ? 'NEWEST' : 'OLDEST' : '';

    const [sortBy, setSortBy] = useState(sortOrderLabel);
    const [show, setShow] = useState(searchParams.get('limit') || '');

    const pathname = usePathname();
    const router = useRouter();

    const handleSort = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        switch (value) {
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

    return (
        <Stack
            direction="row"
            justifyContent='space-between'
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
            <Stack direction='row' gap={2}>
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
        </Stack>
    );
};
