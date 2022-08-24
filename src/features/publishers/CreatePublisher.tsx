import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { createPublisher, Publisher } from '../../features/publishers/publisherSlice';
import { PublisherForm } from './components/PublisherForm';
import { useAppDispatch } from '../../app/hooks';
import { useSnackbar } from 'notistack';

export const PublisherCreate = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [publisher, setPublisher] = useState<Publisher>({
    id: '',
    name: '',
    description: '',
    is_active: true,
    deleted_at: null,
    created_at: '',
    updated_at: ''

  })
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(createPublisher(publisher))
    enqueueSnackbar('Editora criada com sucesso!', {variant: 'success'})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setPublisher({...publisher, [name]: value})
  };
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target
    setPublisher({...publisher, [name]: checked})
  };
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Cadastro de editora</Typography>
          </Box>
        </Box>
        <Box p={2}>
          <PublisherForm
            publisher={publisher}
            isDisabled={isDisabled}
            isLoading={false}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleToggle={handleToggle}
          ></PublisherForm>
        </Box>
      </Paper>
    </Box>
  )
}
