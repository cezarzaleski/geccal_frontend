import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import { Book } from '../../../features/books/bookSlice';
import { Author } from '../../../types/author';
import { Publisher } from '../../../types/publisher';

type Props = {
  book: Book,
  authors?: Author[]
  publishers?: Publisher[]
  isDisabled?: boolean,
  isLoading?: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export function BookForm(
  {
    book,
    authors,
    publishers,
    isDisabled,
    isLoading,
    handleSubmit,
    handleChange,
    handleToggle
  }: Props
) {

  function getYears() {
    const years = []
    const now = new Date()
    const start = now.getFullYear();
    for (let i = start; i >= 1988; i--) {
      years.push({
        label: '' + i,
        id: i
      })
    }
    return years
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Box mb={2}>
          <FormControl fullWidth>
            <TextField
              required
              disabled={isDisabled}
              value={book?.name}
              onChange={handleChange}
              name="name"
              label="Nome"
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                disabled={isDisabled}
                value={book?.edition}
                onChange={handleChange}
                name="edition"
                label="Edição"
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mb={2}>
            <FormControl fullWidth>
              <Autocomplete
                noOptionsText={'Nenhum ano encontrado'}
                disablePortal
                options={getYears()}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    required
                    disabled={isDisabled}
                    value={book?.year}
                    onChange={handleChange}
                    name="year"
                    label="Ano"
                  />
                }
              />
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                required
                disabled={isDisabled}
                value={book?.origin}
                onChange={handleChange}
                name="origin"
                label="Origem"
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mb={2}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                noOptionsText={'Nenhuma editora encontrada'}
                loading={isLoading}
                onChange={(_, value) => {
                  handleChange({target: {name: 'publisherId', value}} as any)
                }}
                renderOption={(props, option: any) => (
                  <li {...props} key={option.id} >
                    {option.name}
                  </li>
                )}
                options={publishers || []}
                disabled={isDisabled || !publishers}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Editora"
                    data-testid="publisher-input"
                  />
                )}/>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box mb={2}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                noOptionsText={'Nenhum autor encontrado'}
                multiple
                loading={isLoading}
                onChange={(_, value) => {
                  handleChange({target: {name: 'authors', value}} as any)
                }}
                renderOption={(props, option: any) => (
                  <li {...props} key={option.id} >
                    {option.name}
                  </li>
                )}
                options={authors || []}
                disabled={isDisabled || !authors}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Autores"
                    data-testid="authors-input"
                  />
                )}/>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                name="active"
                color="secondary"
                onChange={handleToggle}
                checked={book?.active}
                inputProps={{"aria-label": "controlle"}}
              />
            }
            label="Ativo"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" gap={2}>
          <Button variant="contained" component={Link} to="/livros">
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
