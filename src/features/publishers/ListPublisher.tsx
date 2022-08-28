import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDeletePublisherMutation, useGetPublishersQuery } from './publisherSlice';
import { Link } from 'react-router-dom';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { PublishersTable } from './components/PublishersTable';

export const PublisherList = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [rowsPerPage] = useState([2, 4, 6]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [search, setSearch] = useState('');

  const options = {perPage, search, page}


  const {data, isFetching, error} = useGetPublishersQuery(options)
  const [deletePublisher, deletePublisherStatus] = useDeletePublisherMutation()
  async function handleDeletePublisher(id: string) {
    await deletePublisher({id})
  }

  function handleOnPageChange(page: number) {
    setPage(page + 1)
  }

  function handleOnPageSizeChange(pearPage: number) {
    setPerPage(pearPage)
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    let search = ''
    if (filterModel.quickFilterValues?.length) {
      search = filterModel.quickFilterValues.join('')
    }
    return setSearch(search)
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
      <PublishersTable
        data={data}
        isFetching={isFetching}
        perPage={perPage}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDeletePublisher}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}/>
    </Box>
  )
}
