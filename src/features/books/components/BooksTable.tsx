import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridToolbar, ptBR } from '@mui/x-data-grid';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AssignmentReturned, Delete, RestartAlt } from '@mui/icons-material';
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
  handleGenerateExemplary: (id: string) => void
  handleAssignmentReturn: (id: string) => void
}

export function BooksTable(
  {
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete,
    handleAssignmentReturn,
    handleGenerateExemplary

  }: Props) {

  function mapDataToGridRows(data: Results) {
    const {items: books} = data
    return books.map((book) => ({
      id: book.id,
      name: book.name,
      exemplary: book.exemplary,
      year: book.year,
      origin: book.origin,
      status: book.status,
      createdAt: book.createdAt,
    }))
  }

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {debounceMs: 500},
      printOptions: { disableToolbarButton: true },
      csvOptions: { disableToolbarButton: true },
      columnsButtonOptions: { disableColumnSelector: true },
    },
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
      renderCell: renderNameCell
    },
    {
      field: 'exemplary',
      headerName: 'Exemplar',
      flex: 1,
      renderCell: renderExemplaryCel
    },
    {
      field: 'origin',
      headerName: 'Origem',
      flex: 1,
      renderCell: renderOriginCel
    },
    {
      field: 'status',
      headerName: 'Situação',
      flex: 1,
      renderCell: renderStatusCel
    },
    {
      field: 'id',
      headerName: 'Ações',
      type: 'string',
      flex: 1,
      renderCell: renderActionsCel
    }
  ];

  function renderStatusCel(rowData: GridRenderCellParams) {
    let value = rowData.value
    let text = ''
    switch (value) {
      case 'available':
        text = 'Disponível'
        break
      case 'borrowed':
        text = 'Emprestado'
        break
      case 'loss':
        text = 'Perdido'
        break
      case 'inappropriate':
        text = 'Inapropriado'
        break
      case 'misplaced':
        text = 'Extraviado'
        break
      case 'donated':
        text = 'Doado'
        break
    }
    return (
      <Typography>
        {text}
      </Typography>
    )
  }

  function renderExemplaryCel(rowData: GridRenderCellParams) {
    return (
      <Typography>
        {rowData.value}
      </Typography>
    )
  }

  function renderOriginCel(rowData: GridRenderCellParams) {
    let value = rowData.value
    let text = ''
    switch (value) {
      case 'aquisition':
        text = 'Aquisição Geccal'
        break
      case 'confection':
        text = 'Confecção Geccal'
        break
      case 'donation':
        text = 'Doação'
        break
      case 'no-information':
        text = 'Sem Informação'
        break
    }
    return (
      <Typography>
        {text}
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
      <>
        <IconButton
          color="primary"
          data-testid="generate-exemplary-button"
          onClick={() => handleGenerateExemplary(params.value)}
          aria-label="gerar exemplar"
        >
          <RestartAlt></RestartAlt>
        </IconButton>
        <IconButton
          color="primary"
          data-testid="delete-button"
          onClick={() => handleDelete(params.value)}
          aria-label="delete"
        >
          <Delete></Delete>
        </IconButton>
        <IconButton
          color="primary"
          data-testid="assignmnet-returned-button"
          onClick={() => handleAssignmentReturn(params.value)}
          aria-label="dar baixa em empréstimo"
        >
          <AssignmentReturned></AssignmentReturned>
        </IconButton>
      </>
    )

  }

  const rows = data ? mapDataToGridRows(data) : []
  const rowCount = data?.total ? data?.total : 0

  return (
    <Box sx={{display: 'flex', height: 600}}>
      <DataGrid
        columns={columns}
        rows={rows}
        componentsProps={componentProps}
        localeText={{
          ...ptBR.components.MuiDataGrid.defaultProps.localeText,
        }}
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
