import { GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import { IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import React from 'react';

type Props = {
  data: any;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number;
  handleOnPageChange: (page: number) => void;
  handleFilterChange: (page: number) => void;
  handleOnPageSizeChange: (page: number) => void;
  handleDelete: (id: number) => void
}

export function PublishersTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete,

}: Props) {

  function mapDataToGridRows(data: any) {
    const { data: publishers } = data
    // return publishers.map(publisher: any => ({
    //   id: publisher.id
    //   id: publisher.id
    //   id: publisher.id
    //   id: publisher.id
    // }))
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
      headerName: 'name',
      flex: 1,
      renderCell: renderNameCell
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1
    },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 1,
      renderCell: renderIsActiveCel
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1
    },
    {
      field: 'id',
      headerName: 'Actions',
      type: 'string',
      flex: 1,
      renderCell: renderActionsCel
    }
  ];

  function renderIsActiveCel(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? 'primary' : 'secondary'}>
        {rowData.value ? 'Active' : 'Inactive'}
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
        onClick={() => handleDelete(params.value)}
        aria-label="delete"
      >
        <Delete></Delete>
      </IconButton>
    )

  }

  // const rows: GridRowsProp = publishers.map((publisher) => ({
  //   id: publisher.id,
  //   name: publisher.name,
  //   description: publisher.description,
  //   isActive: publisher.is_active,
  //   createdAt: new Date(publisher.created_at).toLocaleDateString('pt-br')
  // }));

}
