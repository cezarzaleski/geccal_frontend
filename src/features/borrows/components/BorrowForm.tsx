import { Box, Button, FormControl, Grid } from '@mui/material';
import React from 'react';
import { AuCompleteCustom } from '../../../components/AuCompleteCustom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Link } from 'react-router-dom';

dayjs.locale('pt-br');


type Props = {
  borrow: any,
  // authors: Author[]
  // publishers?: Publisher[]
  isDisabled?: boolean,
  isLoading?: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

export function BorrowForm(
  {
    borrow,
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


  return (
    <form onSubmit={handleSubmitWithValidation}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mb={2}>
            <FormControl fullWidth>
              <AuCompleteCustom
                name="evangelizandoId"
                label="Evangelizando"
                isLoading={isLoading}
                isDisabled={isDisabled}
                values={borrow.bookId}
                options={[]}
                handleChange={handleChange}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <FormControl fullWidth>
              <AuCompleteCustom
                name="bookId"
                label="Livro"
                isLoading={isLoading}
                isDisabled={isDisabled}
                values={borrow.bookId}
                options={[]}
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