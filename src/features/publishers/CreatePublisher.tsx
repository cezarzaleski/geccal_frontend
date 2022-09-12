import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Publisher, useCreatePublisherMutation } from '../../features/publishers/publisherSlice';
import { PublisherForm } from './components/PublisherForm';
import { useSnackbar } from 'notistack';

export const PublisherCreate = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [createPublisher, status] = useCreatePublisherMutation()
  const { enqueueSnackbar } = useSnackbar()
  const [publisher, setPublisher] = useState<Publisher>({
    id: '',
    name: '',
    active: true,
    deletedAt: '',
    createdAt: '',
    updatedAt: ''

  })
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await createPublisher(publisher)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setPublisher({...publisher, [name]: value})
  };
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target
    setPublisher({...publisher, [name]: checked})
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Editora criada com sucesso', {variant: 'success'})
      setIsDisabled(true)
    }
    if (status.error) {
      enqueueSnackbar('Editora não criada', {variant: 'error'})
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

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
