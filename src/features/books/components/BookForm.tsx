import { Autocomplete, Box, Button, FormControl, Grid, TextField } from '@mui/material';
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
  }: Props
) {

  function getYears() {
    const years = []
    const now = new Date()
    const start = now.getFullYear();
    for (let i = start; i >= 1988; i--) {
      years.push({
        label: '' + i,
        id: ''+ i
      })
    }
    return years
  }

  function origins() {
    return [
      {label: 'Aquisição Geccal', id: 'aquisition'},
      {label: 'Confecção Geccal', id: 'confection'},
      {label: 'Doação', id: 'donation'},
      {label: 'Sem Informação', id: 'no-information'}
    ]
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
                label="Número da Edição"
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
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id || option?.label.toLowerCase() === value?.label.toLowerCase()
                }
                onChange={(_, value: any) => {
                  handleChange({target: {name: 'year', value: value?.id}} as any)
                }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    required
                    disabled={isDisabled}
                    value={book?.year}
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
              <Autocomplete
                noOptionsText={'Nenhuma origem encontrada'}
                disablePortal
                options={origins()}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id || option?.label.toLowerCase() === value?.label.toLowerCase()
                }
                onChange={(_, value: any) => {
                  handleChange({target: {name: 'origin', value: value?.id}} as any)
                }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    required
                    disabled={isDisabled}
                    value={book?.origin}
                    name="origin"
                    label="Origem"
                  />
                }
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
                onChange={(_, value: Publisher) => {
                  handleChange({target: {name: 'publisherId', value: value?.id}} as any)
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
                onChange={(_, value: any) => {
                  let authors = []
                  if (value && value.length)  authors = value.map((it: { id: any; }) => it.id)
                  handleChange({target: {name: 'authors', value: authors}} as any)
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
