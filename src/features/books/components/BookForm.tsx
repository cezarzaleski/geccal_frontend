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
import { MultiSelectAutocomplete } from '../../../components/MultiSelectAutocomplete';
import { useGetPublishersQuery } from '../../publishers/publisherSlice';
import { useGetAuthorsQuery } from '../../authors/authorSlice';

const authors = [
  {title: 'Amadeus', id: '1984'},
  {title: 'To Kill a Mockingbird', id: '1962'},
  {title: 'Toy Story 3', id: '2010'},
  {title: 'Logan', id: '2017'},
  {title: 'Full Metal Jacket', id: '1987'},
  {title: 'Dangal', id: '2016'},
  {title: 'The Sting', id: '1973'},
  {title: '2001: A Space Odyssey', id: '1968'},
  {title: "Singin' in the Rain", id: '1952'},
  {title: 'Toy Story', id: '1995'},
  {title: 'Bicycle Thieves', id: '1948'},
  {title: 'The Kid', id: '1921'},
  {title: 'Inglourious Basterds', id: '2009'},
  {title: 'Snatch', id: '2000'},
  {title: '3 Idiots', id: '2009'},
  {title: 'Monty Python and the Holy Grail', id: '1975'},
];


type Props = {
  book: Book,
  isDisabled?: boolean,
  isLoading?: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void
}



export function BookForm(
  {
    book,
    isDisabled,
    isLoading,
    handleSubmit,
    handleChange,
    handleToggle
  }: Props
) {
  const options = {perPage: 99999, search: '', page: 1}
  const {data: dataPublishers} = useGetPublishersQuery(options)
  const {data: dataAuthors} = useGetAuthorsQuery(options)
  const publishers = dataPublishers ? converterPublisher(dataPublishers) : []
  const authors = dataAuthors ? converterAuthors(dataAuthors) : []
  function converterPublisher(data: any) {
    const { items: publishers } = data
    return publishers?.map((it: { name: any; id: any; }) => {
      return {
        label: it.name,
        id: it.id
      }
    })
  }
  function converterAuthors(data: any) {
    const { items: authors } = data
    return authors?.map((it: { name: any; id: any; }) => {
      return {
        title: it.name,
        id: it.id
      }
    })
  }
  function getYears() {
    const years = []
    const now = new Date()
    const start = now.getFullYear();
    for (let i = start; i >= 1988; i--) {
      years.push({
        label: ''+i,
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
                options={publishers}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    required
                    disabled={isDisabled}
                    value={book?.publisherId}
                    onChange={handleChange}
                    name="publisherId"
                    label="Editora"
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
              <MultiSelectAutocomplete
                options={authors}
                label="Autores"
              />
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
          <Button variant="contained" component={Link} to="/books">
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
