'use client';

import { useEffect, useState } from 'react';

import { Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CustomFilterPopover } from 'src/components/core/custom-filter-popover';
import { FilterByValues } from 'src/components/core/filter-by-values';
import { Iconify } from 'src/components/iconify';
import { useDebounce } from 'src/hooks/use-debounce';
import { showOptions, sortByTitle, sortOptions } from '../_lib/utils';

interface IFilterToolbarProps {
    view: string;
    handleChangeView: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void;
}

export const BlogFilterToolbar = ({ view, handleChangeView }: IFilterToolbarProps) => {
    const searchParams = useSearchParams();
    const sortOrderLabel = searchParams.get('sortOrder') ? searchParams.get('sortOrder') === 'desc' ? 'NEWEST' : 'OLDEST' : '';

    const [sortBy, setSortBy] = useState(sortOrderLabel);
    const [show, setShow] = useState(searchParams.get('limit') || '');
    const [searchText, setSearchText] = useState('');

    const pathname = usePathname();
    const router = useRouter();
    const searchTerm = useDebounce(searchText);

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

    useEffect(() => {
        router.replace(`${pathname}`);
    }, [pathname, router]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (searchTerm.length) {
            params.set('searchTerm', searchTerm);
            router.push(`${pathname}?${params.toString()}`);
        } else {
            params.delete('searchTerm');
            router.push(`${pathname}?${params.toString()}`);
        }

    }, [searchTerm]);

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
            <TextField placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} sx={{ width: '30%' }} />
            <Stack direction='row' gap={2}>
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
