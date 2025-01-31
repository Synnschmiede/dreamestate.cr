'use client';

import { Box, Divider, TableContainer } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { CustomPagination } from '../pagination/custom-pagination';

interface IDataTableProps {
  columns: any[];
  hideHead?: boolean;
  hover?: boolean;
  onClick?: (event: any, row: any) => void;
  rows: any[];
  uniqueRowId?: string;
  selectionMode?: 'none' | 'single' | 'multiple';

  leftItems?: React.ReactNode;
  rightItems?: React.ReactNode;

  isPagination?: boolean;
  pageNo: number;
  totalRecords: number;
  rowsPerPage?: number;
  paginationList?: number[];
  rowsPerPageOptions?: number;
  onRowsPerPageChange?: (rowsPerPage: number, pageNo: number) => void;
  onPageChange?: (pageNo: number) => void;
  onSelection?: (rows: any[]) => void;
  selectedRows?: any[];
}
export const DataTable: React.FC<IDataTableProps> = ({
  columns,
  hideHead,
  hover,
  onClick,
  rows,
  uniqueRowId,
  selectionMode, //none | single | multiple

  leftItems,
  rightItems,

  isPagination,
  pageNo,
  totalRecords,
  rowsPerPage,
  paginationList = [5, 10, 25, 50, 100, 200],
  rowsPerPageOptions = 5,
  onRowsPerPageChange,
  onPageChange,
  onSelection,
  selectedRows,
  ...props
}) => {
  // handle single/multiple row selection
  const handleRowSelection = (rowId: string, row: any, isSelected: boolean) => {
    let newSelected: any[] = [];

    if (selectionMode === 'single') {
      newSelected = isSelected ? [] : [row];
    } else if (selectionMode === 'multiple' && selectedRows) {
      newSelected = isSelected
        ? selectedRows.filter((selectedRow) => selectedRow.id !== rowId)
        : [...selectedRows, row];
    }

    onSelection?.(newSelected);
  };

  // Handle Select all
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onSelection?.(rows);
    } else {
      onSelection?.([]);
    }
  };

  const isRowSelected = (rowId: string) =>
    selectedRows ? selectedRows.some((row: any) => row.id === rowId) : false;
  const selectedSome = selectedRows && selectedRows.length > 0 && selectedRows.length < rows.length;
  const selectedAll = rows.length > 0 && selectedRows && selectedRows.length === rows.length;

  return (
    <TableContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Box>{leftItems}</Box>
        <Box>{rightItems}</Box>
      </Box>
      <Divider />
      <Table {...props}>
        <TableHead
          sx={{ ...(hideHead && { visibility: 'collapse', '--TableCell-borderWidth': 0 }) }}
        >
          <TableRow>
            {selectionMode !== 'none' && (
              <TableCell padding="checkbox" sx={{ width: '40px' }}>
                {selectionMode === 'multiple' && (
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={handleSelectAll}
                  />
                )}
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell key={column.name} sx={{ width: column.width, textAlign: column.align }}>
                {column.hideName ? null : column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, index: number) => {
            const rowId = row.id || uniqueRowId;
            const isSelected = isRowSelected(rowId);

            return (
              <TableRow
                key={rowId ?? index}
                hover={hover}
                selected={isSelected}
                onClick={onClick ? (event) => onClick(event, row) : undefined}
                sx={{ cursor: onClick ? 'pointer' : 'default' }}
              >
                {selectionMode !== 'none' && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleRowSelection(rowId, row, isSelected)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.name}>
                    {column.formatter ? column.formatter(row, index) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Divider />
      {isPagination && (
        <CustomPagination
          rowsPerPageOptions={rowsPerPageOptions}
          pageNo={pageNo}
          paginationList={paginationList}
          totalRecords={totalRecords}
          onRowsPerPageChange={onRowsPerPageChange}
          onPageChange={onPageChange}
        />
      )}
    </TableContainer>
  );
};
