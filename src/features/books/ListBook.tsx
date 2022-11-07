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
  const [deleteBook, deleteBookStatus] = useDeleteBookMutation()
  async function handleDeleteBook(id: string) {
    await deleteBook({id})
  }

  async function handleGenerateExemplary(id: string) {
    console.log('handleGenerateExemplary', id)
  }

  async function handleAssignmentReturned(id: string) {
    console.log('handleAssignmentReturned', id)
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
    if (deleteBookStatus.isSuccess) {
      enqueueSnackbar('Livro removido com sucesso!', {variant: 'success'})
    }
    if (deleteBookStatus.error) {
      enqueueSnackbar('Livro não removido', {variant: 'error'})
    }
  }, [deleteBookStatus])

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
        handleDelete={handleDeleteBook}
        handleAssignmentReturn={handleAssignmentReturned}
        handleGenerateExemplary={handleGenerateExemplary}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}/>
    </Box>
  )
}
