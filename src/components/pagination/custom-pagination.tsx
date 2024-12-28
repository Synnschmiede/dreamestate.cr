'use client';

import TablePagination, { TablePaginationProps } from '@mui/material/TablePagination';
import * as React from 'react';

interface ICustomPaginationProps {
  pageNo: number;
  rowsPerPageOptions: number;
  paginationList: number[];
  totalRecords: number;
  onRowsPerPageChange?: (page: number, rowsPerPage: number) => void;
  onPageChange?: (page: number) => void;
}

export const CustomPagination: React.FC<ICustomPaginationProps> = ({
  pageNo,
  rowsPerPageOptions,
  paginationList,
  totalRecords,
  onRowsPerPageChange,
  onPageChange,
}) => {
  const [page, setPage] = React.useState<number>(pageNo - 1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(rowsPerPageOptions);

  const handlePageChange: TablePaginationProps['onPageChange'] = (_, newPage) => {
    if (onPageChange) {
      onPageChange(newPage + 1);
    }
    setPage(newPage);
  };

  const handleRowsPerPageChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(1, newRowsPerPage === -1 ? totalRecords : newRowsPerPage);
    }
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalRecords}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPageOptions={paginationList}
    />
  );
};
