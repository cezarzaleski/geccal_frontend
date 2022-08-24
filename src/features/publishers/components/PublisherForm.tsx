import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Publisher } from '../../../features/publishers/publisherSlice';


type Propps = {
  publisher: Publisher,
  isDisabled?: boolean,
  isLoading?: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export function PublisherForm({
                                publisher,
                                isDisabled,
                                isLoading,
                                handleSubmit,
                                handleChange,
                                handleToggle
                              }: Propps) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Box mb={2}>
          <FormControl fullWidth>
            <TextField
              required
              disabled={isDisabled}
              value={publisher?.name}
              onChange={handleChange}
              name="name"
              label="Nome"
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                name="is_active"
                color="secondary"
                onChange={handleToggle}
                checked={publisher?.is_active}
                inputProps={{"aria-label": "controlle"}}
              />
            }
            label="Active"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" gap={2}>
          <Button variant="contained" component={Link} to="/publishers">
            Voltar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isDisabled}
          >
            Salvar
          </Button>
        </Box>
      </Grid>
    </form>
  )
}
