import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Publisher,
  useCreatePublisherMutation,
  useGetPublisherQuery,
  useUpdatePublisherMutation
} from './publisherSlice';
import { PublisherForm } from './components/PublisherForm';
import { useSnackbar } from 'notistack';

export const PublisherEdit = () => {
  const id = useParams().id || ''
  const {data: publisher, isFetching} = useGetPublisherQuery({id})
  const [updatePublisher, status] = useUpdatePublisherMutation()
  const [publisherState, setPublisherState] = useState<Publisher>({
    id: '',
    name: '',
    active: true,
    deletedAt: '',
    createdAt: '',
    updatedAt: ''
  });
  const {enqueueSnackbar} = useSnackbar()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await updatePublisher(publisherState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setPublisherState({...publisherState, [name]: value})
  };
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target
    setPublisherState({...publisherState, [name]: checked})
  };

  useEffect(() => {
    if (publisher) {
      setPublisherState(publisher)
    }
  }, [publisher]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Editora atualizada com sucesso', {variant: 'success'})
    }
    if (status.error) {
      enqueueSnackbar('Editora não atualziada', {variant: 'error'})
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edição de editora</Typography>
          </Box>
        </Box>
        <Box p={2}>
          <PublisherForm
            publisher={publisherState}
            isDisabled={status.isLoading}
            isLoading={isFetching}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleToggle={handleToggle}
          ></PublisherForm>
        </Box>
      </Paper>
    </Box>
  )
}
