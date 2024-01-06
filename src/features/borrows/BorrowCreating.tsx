import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { BorrowForm } from './components/BorrowForm';


export const BorrowCreating = () => {

  const [isDisabled, setIsDisabled] = useState(false);
  const [borrow, setBorrow] = useState<any>({
    id: '',
    name: '',
    edition: '',
    year: 0,
    origin: '',
    publisher: '',
    active: true,
    authors: [],
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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