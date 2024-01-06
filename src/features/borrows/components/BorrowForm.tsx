import { Box, FormControl, Grid } from '@mui/material';
import React from 'react';


type Props = {
  borrow: any,
  // authors: Author[]
  // publishers?: Publisher[]
  isDisabled?: boolean,
  isLoading?: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

export function BookForm(
  {
    isDisabled,
    isLoading,
    handleSubmit,
    handleChange,
  }: Props
) {

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    let tempErrors = { ...errors };
    tempErrors[e.target.name] = e.target.value ? "" : "Campo obrigatório";
    setErrors(tempErrors);
  };

  const validate = () => {
    let tempErrors = { ...errors };
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
      <Grid item xs={12}>
        <Box mb={2}>
          <FormControl fullWidth>
          </FormControl>
        </Box>
      </Grid>
    </form>
  )
}