import { Box, Button, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePublisher, selectPublishers } from './publisherSlice';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

export const PublisherList = () => {
  const publishers = useAppSelector(selectPublishers)
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  function handleDeletePublisher(id: string) {
    dispatch(deletePublisher(id))
    enqueueSnackbar('Editora removida com sucesso!', {variant: 'success'})
  }

  const rows: GridRowsProp = publishers.map((publisher) => ({
    id: publisher.id,
    name: publisher.name,
    description: publisher.description,
    isActive: publisher.is_active,
    createdAt: new Date(publisher.created_at).toLocaleDateString('pt-br')
  }));

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
        onClick={() => handleDeletePublisher(params.value)}
        aria-label="delete"
      >
        <Delete></Delete>
      </IconButton>
    )

  }

  return (
    <Box maxWidth="lg" sx={{mt: 4, mb: 4}}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/publishers/create"
          style={{marginBottom: '1rem'}}
        >
          Nova Editora
        </Button>
      </Box>
      <Box sx={{display: 'flex', height: 600}}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnFilter={true}
          disableColumnSelector={true}
          disableDensitySelector={true}
          disableSelectionOnClick={true}
          componentsProps={componentProps}
          components={{Toolbar: GridToolbar}}
          rowsPerPageOptions={[2, 20, 50, 100]}
        />
      </Box>
    </Box>
  )
}
