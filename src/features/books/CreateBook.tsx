import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { createBook, Book } from '../../features/books/bookSlice';
import { BookForm } from './components/BookForm';
import { useAppDispatch } from '../../app/hooks';
import { useSnackbar } from 'notistack';

export const BookCreate = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [book, setBook] = useState<Book>({
    id: '',
    name: '',
    active: true,
    deletedAt: '',
    createdAt: '',
    updatedAt: ''

  })
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(createBook(book))
    enqueueSnackbar('Livro criado com sucesso!', {variant: 'success'})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setBook({...book, [name]: value})
  };
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target
    setBook({...book, [name]: checked})
  };
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Cadastro de livro</Typography>
          </Box>
        </Box>
        <Box p={2}>
          <BookForm
            book={book}
            isDisabled={isDisabled}
            isLoading={false}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleToggle={handleToggle}
          ></BookForm>
        </Box>
      </Paper>
    </Box>
  )
}
