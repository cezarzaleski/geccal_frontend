import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { deletePublisher, useGetPublishersQuery, useDeletePublisherMutation } from './publisherSlice';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

export const PublisherList = () => {
  const {data, isFetching, error} = useGetPublishersQuery()
  const [deletePublisher, deletePublisherStatus] = useDeletePublisherMutation()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  async function handleDeletePublisher(id: string) {
    await deletePublisher({id})
  }

  useEffect(() => {
    console.log(deletePublisherStatus)
    if (deletePublisherStatus.isSuccess) {
      enqueueSnackbar('Editora removida com sucesso!', {variant: 'success'})
    }
    if (deletePublisherStatus.error) {
      enqueueSnackbar('Editora não removida', {variant: 'error'})
    }
  }, [deletePublisherStatus])

  const rows: GridRowsProp = data ? data?.items.map((publisher) => ({
    id: publisher.id,
    name: publisher.name,
    isActive: true,
    createdAt: new Date(publisher.createdAt).toLocaleDateString('pt-br')
  })) : [];

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
