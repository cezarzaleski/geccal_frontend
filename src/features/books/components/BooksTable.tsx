import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar
} from '@mui/x-data-grid';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import React from 'react';
import { Results } from '../../../types/book';

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];
  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void
}

export function BooksTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete,

}: Props) {

  function mapDataToGridRows(data: Results) {
    const { items: publishers } = data
    return publishers.map((publisher) => ({
      id: publisher.id,
      name: publisher.name,
      isActive: true,
      createdAt: publisher.createdAt,
    }))
  }

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {debounceMs: 500}
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
      renderCell: renderNameCell
    },
    {
      field: 'isActive',
      headerName: 'Ativo',
      flex: 1,
      renderCell: renderIsActiveCel
    },
    // {
    //   field: 'createdAt',
    //   headerName: 'Criado em',
    //   flex: 1
    // },
    {
      field: 'id',
      headerName: 'Ações',
      type: 'string',
      flex: 1,
      renderCell: renderActionsCel
    }
  ];

  function renderIsActiveCel(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? 'primary' : 'secondary'}>
        {rowData.value ? 'Ativo' : 'Inativo'}
      </Typography>
    )
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{textDecoration: 'none'}}
        to={`/publishers/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    )
  }

  function renderActionsCel(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        data-testid="delete-button"
        onClick={() => handleDelete(params.value)}
        aria-label="delete"
      >
        <Delete></Delete>
      </IconButton>
    )

  }

  const rows = data ? mapDataToGridRows(data) : []
  const rowCount = data?.total ? data?.total : 0

  return (
    <Box sx={{ display: 'flex', height: 600 }}>
      <DataGrid
        columns={columns}
        rows={rows}
        componentsProps={componentProps}
        pageSize={perPage}
        filterMode={'server'}
        paginationMode={'server'}
        loading={isFetching}
        rowCount={rowCount}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        disableSelectionOnClick={true}
        components={{Toolbar: GridToolbar}}
        onPageChange={handleOnPageChange}
        onPageSizeChange={handleOnPageSizeChange}
        onFilterModelChange={handleFilterChange}
        checkboxSelection={false}
        rowsPerPageOptions={rowsPerPage}
      />
    </Box>
  )
}
