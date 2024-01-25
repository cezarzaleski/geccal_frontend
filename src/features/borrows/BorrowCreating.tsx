import {Box, Paper, Typography} from '@mui/material';
import React, {useState} from 'react';
import {BorrowForm} from './components/BorrowForm';
import {useGetBooksQuery} from '../books/bookSlice';
import {Book} from '../books/book';
import {useGetEvangelizandosQuery} from '../evangelizando/evangelizandoSlice';
import {Evangelizando} from '../evangelizando/evangelizando';
import dayjs from 'dayjs';


export const BorrowCreating = () => {

  const [isDisabled, setIsDisabled] = useState(false);
  const [borrow, setBorrow] = useState<any>({
    id: '',
    bookId: '',
    evangelizandoId: '',
    borrowAt: dayjs().format('YYYY-MM-DD'),
  });

  const {data: books} = useGetBooksQuery({
    perPage: 999999,
    search: '',
    page: 0
  });

  const {data: evangelizandos} = useGetEvangelizandosQuery({
    perPage: 999999,
    search: '',
    page: 0
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log(borrow)
    e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setBorrow({...borrow, [name]: value})
  };


  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Emprestar Livro</Typography>
          </Box>
        </Box>
        <Box p={2}>
          <BorrowForm
            borrow={borrow}
            books={books?.items as Array<Book.Entity>}
            evangelizandos={evangelizandos?.items as Array<Evangelizando.Borrow>}
            isDisabled={isDisabled}
            isLoading={false}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          ></BorrowForm>
        </Box>
      </Paper>
    </Box>
  )
}