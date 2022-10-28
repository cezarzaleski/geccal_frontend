import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Book, useCreateBookMutation } from '../../features/books/bookSlice';
import { BookForm } from './components/BookForm';
import { useSnackbar } from 'notistack';
import { envVars } from '../../envVars';

export const BookCreate = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [createBook, status] = useCreateBookMutation()
  const { enqueueSnackbar } = useSnackbar()
  const [book, setBook] = useState<Book>({
    id: '',
    name: '',
    edition: '',
    year: 0,
    origin: '',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await createBook(book)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setBook({...book, [name]: value})
  };
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target
    setBook({...book, [name]: checked})
  };
  useEffect(() => {
    console.log('envVars', envVars.BASE_URL)
    if (status.isSuccess) {
      enqueueSnackbar('Livro cadastrado com sucesso', {variant: 'success'})
      setIsDisabled(true)
    }
    if (status.error) {
      enqueueSnackbar('Erro ao cadastrar livro', {variant: 'error'})
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

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
