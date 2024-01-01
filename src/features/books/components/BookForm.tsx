import { Autocomplete, Box, Button, Chip, FormControl, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import { Book } from '../../../features/books/bookSlice';
import { Author } from '../../../types/author';
import { Publisher } from '../../../types/publisher';

type Props = {
  book: Book,
  authors: Author[]
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

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const validate = () => {
    let tempErrors = { ...errors };
    tempErrors = book?.name ? { ...tempErrors, name: "" } : { ...tempErrors, name: "Campo obrigatório" };
    tempErrors = book?.origin ? { ...tempErrors, origin: "" } : { ...tempErrors, origin: "Campo obrigatório" };
    tempErrors = book?.year ? { ...tempErrors, year: "" } : { ...tempErrors, year: "Campo obrigatório" };
    tempErrors = book?.publisher ? { ...tempErrors, publisher: "" } : { ...tempErrors, publisher: "Campo obrigatório" };
    tempErrors = book?.authors && book.authors.length > 0 ? { ...tempErrors, authors: "" } : { ...tempErrors, authors: "Campo obrigatório" };
    setErrors(tempErrors);
    return Object.values(tempErrors).every(value => value === "");
  };

  const handleSubmitWithValidation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e);
    }
  };

  const handleChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    let tempErrors = { ...errors };
    tempErrors[e.target.name] = e.target.value ? "" : "Campo obrigatório";
    setErrors(tempErrors);
  };


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
    <form onSubmit={handleSubmitWithValidation}>
      <Grid item xs={12}>
        <Box mb={2}>
          <FormControl fullWidth>
            <TextField
              disabled={isDisabled}
              value={book?.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={handleChangeWithValidation}
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
                  handleChangeWithValidation({target: {name: 'year', value: value?.id}} as any)
                }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    disabled={isDisabled}
                    value={book?.year}
                    name="year"
                    label="Ano"
                    error={!!errors.year}
                    helperText={errors.year}
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
                  handleChangeWithValidation({target: {name: 'origin', value: value?.id}} as any)
                }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    disabled={isDisabled}
                    value={book?.origin}
                    name="origin"
                    label="Origem"
                    error={!!errors.origin}
                    helperText={errors.origin}
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
                freeSolo
                noOptionsText={'Nenhuma editora encontrada'}
                loading={isLoading}
                onChange={(_, value: Publisher) => {
                  handleChangeWithValidation({target: {name: 'publisher', value: value?.id}} as any)
                }}
                renderOption={(props, option: any) => (
                  <li {...props} key={option.id} >
                    {option.name}
                  </li>
                )}
                options={publishers || []}
                disabled={isDisabled || !publishers}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') return option
                  return option.name
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Editora"
                    data-testid="publisher-input"
                    error={!!errors.publisher}
                    helperText={errors.publisher}
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
                freeSolo
                loading={isLoading}
                onChange={(_, value: any) => {
                  let authors = []
                  if (value && value.length)  authors = value.map((it: { id: any; }) => it.id)
                  handleChangeWithValidation({target: {name: 'authors', value: authors}} as any)
                }}
                renderOption={(props, option: any) => (
                  <li {...props} key={option.id} >
                    {option.name}
                  </li>
                )}
                options={authors || []}
                disabled={isDisabled || !authors}
                getOptionLabel={(option) => {
                  if (typeof option === 'string') return option
                  return option.name
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Autores"
                    data-testid="authors-input"
                    error={!!errors.authors}
                    helperText={errors.authors}
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
