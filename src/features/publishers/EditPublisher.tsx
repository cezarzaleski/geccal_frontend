import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Publisher, selectPublishersById, updatePublisher } from './publisherSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PublisherForm } from './components/PublisherForm';
import { useSnackbar } from 'notistack';

export const PublisherEdit = () => {
  const id = useParams().id || ''
  const [isDisabled, setIsDisabled] = useState(false);
  const publisher = useAppSelector(state => selectPublishersById(state, id))
  const [publisherState, setPublisherState] = useState<Publisher>(publisher);
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(updatePublisher(publisherState))
    enqueueSnackbar('Editora atualizada com sucesso!', {variant: 'success'})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setPublisherState({...publisherState, [name]: value})
  };
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target
    setPublisherState({...publisherState, [name]: checked})
  };
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
