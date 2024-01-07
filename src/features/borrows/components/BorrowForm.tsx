import {Box, Button, FormControl, Grid} from '@mui/material';
import React from 'react';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {Link} from 'react-router-dom';
import {Book} from '../../books/book';
import {AutoCompleteCustom} from '../../../components/AutoCompleteCustom';
import {Evangelizando} from '../../evangelizando/evangelizando';

dayjs.locale('pt-br');


type Props = {
  borrow: any,
  books: Book.Entity[],
  evangelizandos: Evangelizando.Borrow[],
  isDisabled?: boolean,
  isLoading?: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

export function BorrowForm(
  {
    books,
    borrow,
    evangelizandos,
    isDisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange,
  }: Props
) {

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    let tempErrors = {...errors};
    tempErrors[e.target.name] = e.target.value ? "" : "Campo obrigatório";
    setErrors(tempErrors);
  };

  const validate = () => {
    let tempErrors = {...errors};
    setErrors(tempErrors);
    return Object.values(tempErrors).every(value => value === "");
  };

  const handleSubmitWithValidation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e);
    }
  };

  const booksToOption = () => {
    return books?.map((book: Book.Entity) => {
      return {
        id: book.id,
        name: `${book.name} - ${book.exemplary}`
      }
    })
  }

  const evangelizandosToOption = () => {
    return evangelizandos?.map((evangelizando: Evangelizando.Borrow) => {
      return {
        id: evangelizando.id,
        name: `${evangelizando.name} - ${evangelizando.class. name}`
      }
    })
  }


  return (
    <form onSubmit={handleSubmitWithValidation}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mb={2}>
            <FormControl fullWidth>
              <AutoCompleteCustom
                name="evangelizandoId"
                label="Evangelizando"
                isLoading={isLoading}
                isDisabled={isDisabled}
                values={borrow.bookId}
                options={evangelizandosToOption()}
                handleChange={handleChange}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <FormControl fullWidth>
              <AutoCompleteCustom
                name="bookId"
                label="Livro"
                isLoading={isLoading}
                isDisabled={isDisabled}
                values={borrow.bookId}
                options={booksToOption()}
                handleChange={handleChange}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs}>
                <DatePicker label="Data de Empréstimo" value={dayjs()}/>
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" gap={2}>
          <Button variant="contained" component={Link} to="/emprestimos" color="secondary">
            Voltar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isDisabled}
          >
            Salvar
          </Button>
        </Box>
      </Grid>
    </form>
  )
}