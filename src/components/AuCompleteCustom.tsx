import { Autocomplete, AutocompleteRenderInputParams, TextField } from '@mui/material';

type Props = {
  name: string;
  label: string;
  isLoading: boolean;
  isDisabled: boolean;
  multiple?: boolean;
  values?: (any)[];
  options?: (any)[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AuCompleteCustom = (
  {
    name,
    label,
    values,
    options,
    isLoading,
    isDisabled,
    handleChange,
    multiple = false,
  }: Props) => {
  const renderOptions = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any
  ) => (
    <li {...props} key={option.id}>
      {option.name}
    </li>
  );

  const isEqualId = (
    option: any,
    value: any
  ) => {
    return option.id === value.id;
  };

  const handleOnChange = (
    _e: React.ChangeEvent<{}>,
    newValue: (any)[]
  ) => {
    handleChange({target: {name, value: newValue}} as any);
  };

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label={label} data-testid={`${name}-input`}/>
  );

  return (
    <Autocomplete
      multiple={multiple}
      noOptionsText={'Nenhuma opção encontrada'}
      value={values}
      options={options || []}
      loading={isLoading}
      onChange={handleOnChange}
      renderInput={renderInput}
      data-testid={`${name}-search`}
      renderOption={renderOptions}
      isOptionEqualToValue={isEqualId}
      disabled={isDisabled || !options}
      getOptionLabel={(option) => option.name}
    />
  );
};