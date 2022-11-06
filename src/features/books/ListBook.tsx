import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDeleteBookMutation, useGetBooksQuery } from './bookSlice';
import { Link } from 'react-router-dom';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { BooksTable } from './components/BooksTable';

export const BookList = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [rowsPerPage] = useState([10, 50, 100]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const options = {perPage, search, page}


  const {data, isFetching, error} = useGetBooksQuery(options)
  const [deletePublisher, deletePublisherStatus] = useDeleteBookMutation()
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
    if (deletePublisherStatus.isSuccess) {
      enqueueSnackbar('Livro removido com sucesso!', {variant: 'success'})
    }
    if (deletePublisherStatus.error) {
      enqueueSnackbar('Livro não removido', {variant: 'error'})
    }
  }, [deletePublisherStatus])

  if(error) {
    return <Typography>
      Erro ao carregar os livros
    </Typography>
  }



  return (
    <Box maxWidth="lg" sx={{mt: 4, mb: 4}}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/livros/criar"
          style={{marginBottom: '1rem'}}
        >
          Novo Livro
        </Button>
      </Box>
      <BooksTable
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
